package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.MessageType;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
public class MsgWebSocketApiChatHandler extends MsgWebSocketApiService {
    public static final String PARTICIPANT_MAPPER_FIND_BY_ROOM_ID = "ParticipantMapper.getParticipantList";
    public static final String PARTICIPANT_MAPPER_UPDATE_PARTICIPANT = "ParticipantMapper.updateParticipant";

    private final MessengerDao messengerDao;

    private final MsgMessageApiService msgMessageApiService;
    private final MsgAttachmentApiService msgAttachmentApiService;
    private final RedissonClient redissonClient;

    public MsgWebSocketApiChatHandler(SimpMessagingTemplate messagingTemplate, MessengerDao messengerDao, MsgMessageApiService msgMessageApiService, MsgAttachmentApiService msgAttachmentApiService, RedissonClient redissonClient) {
        super(messagingTemplate);
        this.messengerDao = messengerDao;
        this.msgMessageApiService = msgMessageApiService;
        this.msgAttachmentApiService = msgAttachmentApiService;
        this.redissonClient = redissonClient;
    }


    //채팅방 정보 변경 webSocket 호출처리
    public void handleOnNotice(String data, String company) {
        log.debug("handleOnNotice.data={}", data);
        sendToWebNoticeMessage(data, company);
    }

    //채팅방 정보 변경 webSocket 호출처리
    public void handleOnRoom(RoomDto roomDto, String company) {
        log.debug("handleOnRoom.roomDto={}", roomDto);
        sendToWebRoom(roomDto.getTargetUserKey(), roomDto, company);
    }

    public void handleOnEmoji(EmojiDto emojiDto, String company) {
        log.debug("handleOnEmoji.emojiDto={}", emojiDto);
        sendToWebMessage(emojiDto.getRoomId(), emojiDto, company);
    }

    public void handleOnAlarm(AlarmDto alarmDto, String company) {
        log.debug("handleOnRoom.alarmDto={}", alarmDto);
        sendToWebMessage(alarmDto.getRoomId(), alarmDto, company);
        sendToWebList(alarmDto.getReceiveUserKey(), alarmDto, company);
    }

    public void handleOnMessage(MessageDto messageDto, String company) {
        String roomId = messageDto.getRoomId();
        log.debug("handleOnMessage.messageDto={}", messageDto);

        String lockKey = "MESSAGE_LOCK_" + messageDto.getMessageUuid();
        RLock lock = redissonClient.getLock(lockKey);

        try {
            log.debug("{} - 락 획득 시도, lock.getName: {},  lock.getHoldCount: {}", lockKey, lock.getName(), lock.getHoldCount());
            if (lock.tryLock(1, 3, TimeUnit.SECONDS)) {
                log.debug("{} - 락 획득 성공, lock.getName: {},  lock.getHoldCount: {}", lockKey, lock.getName(), lock.getHoldCount());
                // 잠금을 획득한 후 메시지 처리 로직 수행
                MessageType messageType = messageDto.getMessageType();
//                if (messageType == MessageType.TALK) { //todo 테스트 이후에 문제가 없으면 소스 삭제할 예정
//                    restoreParticipant(messageDto.getRoomType(), roomId, messageDto.getSendUserKey());
//                }
                attachUpperMessage(messageDto);
                sendToWebMessage(messageDto.getRoomId(), messageDto, company);
                if (messageType == MessageType.TALK || messageType == MessageType.JOIN
                        || messageType == MessageType.DISCARD || messageType == MessageType.EXPORT
                        || messageType == MessageType.EXIT) {
                    syncRoomList(messageDto, roomId, company);
                }
            } else {
                // 잠금을 획득하지 못한 경우
                throw new SDKException(SDKSpec.FAIL_TO_GET_LOCK, "메시지 분산락 획득 실패. message_id=" + lockKey);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }

    private void attachUpperMessage(MessageDto messageDto) {
        //답글인 경우, 원본메시지 함께
        if (messageDto.getReplyMessageId() != null) {
            UpperMessageDto upperMessageDto = msgMessageApiService.findUpperMessageByMessageId(messageDto.getReplyMessageId());
            if("Y".equalsIgnoreCase(upperMessageDto.getAttachmentYn())){
                List<AttachmentDto> attachmentList = msgAttachmentApiService.getMessageAttachmentList(createSearchDtoForAttachment(messageDto));
                upperMessageDto.setAttachmentList(attachmentList);
            }
            messageDto.setUpperMessageDto(upperMessageDto);
        }
    }

    private void restoreParticipant(RoomType roomType, String roomId, Integer sendUserKey) {
        if (roomType.equals(RoomType.PRIVATE)) {
            Map<String, Object> params = new HashMap<>();
            params.put("roomId", roomId);
            params.put("deletedYn", "Y");
            List<ParticipantDto> deleteParticipant = (List<ParticipantDto>) messengerDao.selectList(PARTICIPANT_MAPPER_FIND_BY_ROOM_ID, params);
            if (deleteParticipant != null) {
                for (ParticipantDto participantEntity : deleteParticipant) {
                    participantEntity.setDeletedYn("N");
                    participantEntity.setModifyUserKey(sendUserKey);
                    messengerDao.update(PARTICIPANT_MAPPER_UPDATE_PARTICIPANT, participantEntity);
                }
                log.info("deleteParticipant = {}", deleteParticipant);
            }
        }
    }

    public String getPraiseReceiveUserInfo(Integer receiveUserKey) {
        return msgMessageApiService.getPraiseReceiveUserInfo(receiveUserKey);
    }

    public void saveMessage(MessageDto messageDto) {
        messageDto.setSendUserKey(messageDto.getSendUserKey());
        messageDto.setOrgNm(messageDto.getOrgNm());
        msgMessageApiService.saveMessage(messageDto);
    }

    /**
     *  메시지 전송 후 파일업로드 데이터에 대한 message_id 업데이트 처리
     * @param messageDto MessageDto
     */
    public void updateAttachmentsMessageId(MessageDto messageDto){
        int result = msgAttachmentApiService.updateAttachmentsMessageId(messageDto);
    }

    public void getMessageAttachmentList(MessageDto messageDto){
        List<AttachmentDto> attachmentList = msgAttachmentApiService.getMessageAttachmentList(createSearchDtoForAttachment(messageDto));
        messageDto.getUpperMessageDto().setAttachmentList(attachmentList);
    }

    public void updateAttachmentDeletedYn(MessageDto messageDto){
        List<AttachmentDto> attachmentList = messageDto.getAttachmentList();
        boolean allDeleted = true;
        for(AttachmentDto attachmentDto : attachmentList){
            if ("Y".equals(attachmentDto.getDeletedYn())) {
                attachmentDto.setCorporateId(messageDto.getCorporateId());
                int result = msgAttachmentApiService.updateAttachmentDeletedYn(attachmentDto);
            }else{
                allDeleted = false;
            }
        }

        // 메시지 컨텐츠 내용이 없고, 첨부된 파일이 다 삭제 처리된 경우 메시지도 같이 삭제 처리한다.
        if(allDeleted){
            messageDto.setAttachmentYn("N");
            String content = messageDto.getMessageContent();
            if (content == null || content.trim().isEmpty()) {
                messageDto.setDeletedYn("Y");
            }
        }
    }


    /**
     * 메시지 편집(수정)
     *
     * @param messageDto MessageDto
     */
    public void updateMessage(MessageDto messageDto) {
        msgMessageApiService.updateMessage(messageDto);
    }

    private void syncRoomList(MessageDto messageDto, String roomId, String company) {
        try {
            List<ParticipantDto> participantList = null;
            Map<String, Object> rParams = new HashMap<String, Object>();
            rParams.put("roomId", roomId);

            if (messageDto.getRoomType().equals(RoomType.PRIVATE)) {
                rParams.put("deletedYn", "N");
            } else {
                rParams.put("presentYn", "Y");
            }
            participantList = (List<ParticipantDto>) messengerDao.selectList(PARTICIPANT_MAPPER_FIND_BY_ROOM_ID, rParams);


            messageDto.setTargetUserIdList(participantList);
            for (ParticipantDto participant : participantList) {
                sendToWebList(participant.getUserKey(), messageDto, company);
            }
            if (messageDto.getMessageType() == MessageType.EXPORT) {
                for (ParticipantDto participant : messageDto.getTargetUserIdList()) {
                    sendToWebList(participant.getUserKey(), messageDto, company);
                }
            }
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FAIL_ROOM_SYNC, e.getMessage());
        }
    }

    /**
     * 댓글 상위글에 대한 첨부파일 조회를 위한 dto생성
     * @param messageDto MessageDto
     * @return MessageDto
     */
    private MessageDto createSearchDtoForAttachment(MessageDto messageDto) {
        MessageDto dto = new MessageDto();
        dto.setCorporateId(SecurityUtils.getCorporateId());
        dto.setRoomId(messageDto.getRoomId());
        dto.setMessageId(messageDto.getReplyMessageId());
        return dto;
    }


}
