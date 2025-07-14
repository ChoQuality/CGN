package com.gsbizple.wiz.messenger.service;


import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class MsgMessageApiService {
    public static final String SAVE_MESSAGE = "MessageMapper.saveMessage";
    public static final String UPDATE_MESSAGE = "MessageMapper.updateMessage";
    public static final String FIND_MESSAGE_BY_ID = "MessageMapper.findByMessageId";
    public static final String FIND_PAGED_MESSAGES_BY_ROOM_ID = "MessageMapper.findPagedMessagesByRoomId";
    public static final String FIND_UPPER_MESSAGES_BY_ROOM_ID = "MessageMapper.findUpperMessagesByRoomId";

    public static final String FIND_UPPER_MESSAGE_BY_ID = "MessageMapper.findUpperMessageByMessageId";

    public static final String FIND_MESSAGE_READ_BY_ROOM_AND_USER = "MessageMapper.findMessageReadByRoomIdAndUserId";
    public static final String SEARCH_MESSAGE_BY_KEYWORD = "MessageMapper.searchMessageByKeyword";
    public static final String COUNT_MESSAGE_BY_KEYWORD = "MessageMapper.countMessageByKeyword";

    public static final String FIND_LATEST_MESSAGE = "MessageMapper.findByLatestMessage";

    public static final String DELETE_MESSAGE_READ = "MessageMapper.deleteMessageRead";
    public static final String DELETE_MESSAGE = "MessageMapper.deleteMessage";
    public static final String MESSAGE_MAPPER_UPDATE_READ_MESSAGE_ID = "MessageMapper.updateReadMessageId";
    public static final String GET_NOW_DATE = "MessageMapper.getNowDate";
    public static final String GET_PRAISE_RECEIVE_USER_INFO = "MessageMapper.getPraiseReceiveUserInfo";

    private final MsgMessageHandlerApiService msgMessageHandlerApiService;
    private final MsgAttachmentApiService msgAttachmentApiService;
    private final MsgEmojiApiService msgEmojiApiService;
    private final MessengerDao messengerDao;


    /**
     * 메세지 저장
     **/
    @SuppressWarnings("unchecked")
    public MessageDto saveMessage(MessageDto messageDto) {
        MessageDto dateMessageDto = (MessageDto) messengerDao.selectOne(GET_NOW_DATE, null);
        messageDto.setCreateDt(dateMessageDto.getCreateDt());
        messageDto.setModifyDt(dateMessageDto.getCreateDt());

        String msgContent = Optional.ofNullable(messageDto.getMessageContent())
                .map(s -> s.replaceAll("(?i)<br\\s*/?>", "\n"))
                .orElse("");


        messageDto.setMessageContent(StringEscapeUtils.escapeHtml4(msgContent));
        msgMessageHandlerApiService.setMessageContent(messageDto);
        messengerDao.insert(SAVE_MESSAGE, messageDto);
        log.info("saveMessage={}", messageDto);
        return messageDto;
    }

    /**
     * 메시지 편집(수정)
     *
     * @param messageDto MessageDto
     */
    @SuppressWarnings("unchecked")
    public void updateMessage(MessageDto messageDto) {
        String msgContent = messageDto.getMessageContent().replaceAll("(?i)<br\\s*/?>", "\n");
        messageDto.setMessageContent(StringEscapeUtils.escapeHtml4(msgContent));

        messengerDao.update(UPDATE_MESSAGE, messageDto);
    }

    /**
     * 메세지 조회
     **/
    @SuppressWarnings("unchecked")
    public List<MessageDto> findByAllMessage(MessageDto messageResponseDto) {
        List<MessageDto> messageDtoList = messengerDao.selectList(FIND_PAGED_MESSAGES_BY_ROOM_ID, messageResponseDto);

        List<Long> emojiMessageIdList = new ArrayList<>();

        for (MessageDto messageDto : messageDtoList) {
            messageDto.setCorporateId(SecurityUtils.getCorporateId()); // 기업아이디

            //답글인 경우, 원본 메시지 조회
            if (messageDto.getReplyMessageId() != null) {
                UpperMessageDto upperMessageDto = (UpperMessageDto) messengerDao.selectOne(FIND_UPPER_MESSAGE_BY_ID, String.valueOf(messageDto.getReplyMessageId()));
                if ("Y".equalsIgnoreCase(upperMessageDto.getAttachmentYn())) {
                    List<AttachmentDto> attachmentList = msgAttachmentApiService.getMessageAttachmentList(createSearchDtoForAttachment(messageDto));
                    upperMessageDto.setAttachmentList(attachmentList);
                }
                messageDto.setUpperMessageDto(upperMessageDto);
            }

            // 첨부파일 조회
            if ("Y".equalsIgnoreCase(messageDto.getAttachmentYn())) {
                List<AttachmentDto> attachmentList = msgAttachmentApiService.getMessageAttachmentList(messageDto);
                messageDto.setAttachmentList(attachmentList);
            }

            if ("Y".equalsIgnoreCase(messageDto.getEmojiYn())) {
                emojiMessageIdList.add(messageDto.getMessageId());
            }
        }

        setEmojiListToMessageDto(emojiMessageIdList, messageDtoList);


        return messageDtoList;
    }

    private void setEmojiListToMessageDto(List<Long> emojiMessageIdList, List<MessageDto> messageDtoList) {
        Map<Long, List<EmojiDto>> emojiMap = msgEmojiApiService.findGroupByEmojiIn(emojiMessageIdList);
        for (MessageDto messageDto : messageDtoList) {
            if ("Y".equalsIgnoreCase(messageDto.getEmojiYn())) {
                List<EmojiDto> emojiList = emojiMap.getOrDefault(messageDto.getMessageId(), Collections.emptyList());
                messageDto.setEmojiList(emojiList);
            }
        }
    }


    /**
     * 현재화면에 뿌려준 MESSAGE_ID -> UPPER_MESSAGE_ID까지의 전체 리스트 조회(답글에 대한 원글 클릭시 해당 원글로 이동하기 위한 데이터 처리)
     *
     * @param rParams Map<String, Object>
     * @return MessageDto
     */
    @SuppressWarnings("unchecked")
    public List<MessageDto> getMessagesToUpper(Map<String, Object> rParams) {
        rParams.put("corporateId", SecurityUtils.getCorporateId());
        List<MessageDto> messageDtoList = messengerDao.selectList(FIND_UPPER_MESSAGES_BY_ROOM_ID, rParams);

        List<MessageDto> resultList = new ArrayList<>();
        for (MessageDto messageDto : messageDtoList) {
            //답글인 경우, 원본 메시지 조회
            if (messageDto.getReplyMessageId() != null) {
                UpperMessageDto upperMessageDto = (UpperMessageDto) messengerDao.selectOne(FIND_UPPER_MESSAGE_BY_ID, String.valueOf(messageDto.getReplyMessageId()));
                messageDto.setUpperMessageDto(upperMessageDto);
            }
            resultList.add(messageDto);
        }
        return resultList;
    }

    /**
     * 안읽은 메시지 조회
     *
     * @param roomId        String
     * @param readMessageId int
     * @return List<MessageDto>
     */
    @SuppressWarnings("unchecked")
    public List<MessageDto> selectUnReadMessageInfo(String roomId, int readMessageId) {
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("roomId", roomId);
        rParams.put("readMessageId", readMessageId);
        rParams.put("corporateId", SecurityUtils.getCorporateId());
        return messengerDao.selectList("MessageMapper.selectUnReadMessageInfo", rParams);
    }

    /**
     * 안 읽은 메시지 건수 조회
     *
     * @param roomId        String
     * @param readMessageId int
     * @return int
     */
    @SuppressWarnings("unchecked")
    public int selectUnreadMessageCount(String roomId, long readMessageId) {
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("roomId", roomId);
        rParams.put("readMessageId", readMessageId);
        rParams.put("corporateId", SecurityUtils.getCorporateId());
        return (int) messengerDao.selectOne("MessageMapper.selectUnreadMessageCount", rParams);
    }


//    public PaginationData findByMessage(String roomId, int messageId, Pageable pageable) {
//        if (messageId != 0) {
//            Map<String, Object> params = new HashMap<>();
//            params.put("roomId", roomId);
//            params.put("messageId", messageId);
//
//            var messageIdCount = messengerDao.total(COUNT_MESSAGE_BY_ID, params);
//            var pageNumber = (messageIdCount / pageable.getPageSize()) - 1;
//            if (messageIdCount % pageable.getPageSize() != 0) {
//                pageNumber++;
//            }
//            Pageable afterPageable = PageRequest.of(pageNumber, pageable.getPageSize());
//            return findByAllMessage(roomId, afterPageable);
//        }
//        return null;
//    }

    /**
     * 최근 메시지 조회
     *
     * @param roomId
     * @return
     */
    public MessageDto findByLatestMessage(String roomId, String userKey) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        Integer messageId = (Integer) messengerDao.selectOne(FIND_LATEST_MESSAGE, params);
        return (MessageDto) messengerDao.selectOne(FIND_MESSAGE_BY_ID, messageId);
    }

    public List<MessageSearchDto> searchMessageByKeyword(String roomId, String userKey, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        params.put("keyword", keyword);
        return messengerDao.selectList(SEARCH_MESSAGE_BY_KEYWORD, params);
    }

    public Integer countMessageByKeyword(String roomId, String userKey, String keyword) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        params.put("keyword", keyword);
        return messengerDao.total(COUNT_MESSAGE_BY_KEYWORD, params);

    }

    /**
     * readMessageId 업데이트
     **/
    public void updateReadMessageId(MessageDto messageDto) {
        Map<String, Object> params = new HashMap<>();
        String roomId = messageDto.getRoomId();
        int userKey = messageDto.getSendUserKey();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        params.put("messageId", messengerDao.total(FIND_LATEST_MESSAGE, params));
        messengerDao.update(MESSAGE_MAPPER_UPDATE_READ_MESSAGE_ID, params);
    }

    /**
     * readMessage 조회
     **/
    @SuppressWarnings("unchecked")
    public ParticipantDto findByMessageRead(String roomId, String userKey) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("userKey", userKey);
        return (ParticipantDto) messengerDao.selectOne(FIND_MESSAGE_READ_BY_ROOM_AND_USER, params);
    }

    /**
     * readMessage 삭제
     **/
    public ParticipantDto messageReadDelete(ParticipantDto participantDto) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", participantDto.getRoomId());
        params.put("userKey", participantDto.getUserKey());
        messengerDao.update(DELETE_MESSAGE_READ, params);
        return participantDto;
    }

    /**
     * 메시지 삭제
     *
     * @param roomId
     * @param messageId
     * @return
     */
    public void modifyIsDelete(String roomId, int messageId) {
        Map<String, Object> params = new HashMap<>();
        params.put("roomId", roomId);
        params.put("messageId", messageId);
        messengerDao.delete(DELETE_MESSAGE, params);
    }

    /**
     * 답글 저장
     *
     * @param messageDto
     * @return
     */
    public MessageDto saveReplyMessage(MessageDto messageDto) {
        saveMessage(messageDto);
        log.info("saveReplyMessage={}", messageDto);
        return messageDto;
    }

    public MessageDto discardMessageByMessageId(Long messageId) {
        Map<String, Object> params = new HashMap<>();
        params.put("messageId", messageId);
        MessageDto messageDto = new MessageDto();
        if (messengerDao.delete(DELETE_MESSAGE, params) == 1) {
            messageDto.setMessageId(messageId);
        }
        return messageDto;
    }

    public UpperMessageDto findUpperMessageByMessageId(Long messageId) {
        return (UpperMessageDto) messengerDao.selectOne(FIND_UPPER_MESSAGE_BY_ID, messageId);
    }

    public String getSelfRoomId(Integer userKey) {
        return messengerDao.selectOne("RoomMapper.getSelfRoomId", userKey).toString();
    }


    public List<UserDto> getUserInfo(List<RoomListDto> roomList) {
        return (List<UserDto>) messengerDao.selectList("MessageMapper.getUserInfo", roomList);
    }

    @SuppressWarnings("unchecked")
    public String getPraiseReceiveUserInfo(Integer userKey) {
        return (String) messengerDao.selectOne(GET_PRAISE_RECEIVE_USER_INFO, userKey);
    }

    /**
     * 댓글 상위글에 대한 첨부파일 조회를 위한 dto생성
     *
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
