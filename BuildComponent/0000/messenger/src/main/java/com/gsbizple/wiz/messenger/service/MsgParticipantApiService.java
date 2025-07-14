package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.ParticipantDto;
import com.gsbizple.wiz.messenger.dto.ParticipantListDto;
import com.gsbizple.wiz.messenger.dto.RoomDto;
import com.gsbizple.wiz.messenger.dto.RoomListDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MsgParticipantApiService {

    private final MessengerDao messengerDao;

    /**
     * 채팅방 참가자 저장 처리
     *
     * @param participant ParticipantDto
     * @return ParticipantDto
     */
    @SuppressWarnings("unchecked")
    public ParticipantDto saveParticipant(ParticipantDto participant) {

        ParticipantDto participantInfo = (ParticipantDto) messengerDao.selectOne("ParticipantMapper.getParticipantInfo", participant);

        if (participantInfo == null) {
            participant.setCorporateId(SecurityUtils.getCorporateId());
            participant.setCreateUserKey(SecurityUtils.getUserKey());
            participant.setModifyUserKey(SecurityUtils.getUserKey());
            messengerDao.insert("ParticipantMapper.saveParticipant", participant);
        } else if (participantInfo.getPresentYn().equals("N")) {
            participant.setPresentYn("Y");
            participant.setModifyUserKey(SecurityUtils.getUserKey());
            messengerDao.update("ParticipantMapper.updateParticipant", participant);

        } else {
            throw new SDKException(SDKSpec.PARTICIPANT_NOT_EMPTY, "The participant is already joined in this room.");
        }

        return participant;
    }

    /**
     * 채팅방 참가자 리스트 저장 처리
     *
     * @param participantList List<ParticipantDto>
     * @return List<ParticipantDto>
     */
    public List<ParticipantDto> saveParticipantList(List<ParticipantDto> participantList) {
        return participantList.stream()
                .map(this::saveParticipant)
                .collect(Collectors.toList());
    }

    /**
     * 채팅방 참가자 리스트 조회
     *
     * @param roomId String
     * @return List<ParticipantListDto>
     */
    @SuppressWarnings("unchecked")
    public List<ParticipantListDto> getRoomParticipantList(String roomId) {
        Map<String, Object> rParams = new HashMap<String, Object>();
        rParams.put("roomId", roomId);
        rParams.put("presentYn", "Y"); // 참여여부
        rParams.put("deletedYn", "N"); // 삭제여부(1:1 대화)
        return (List<ParticipantListDto>) messengerDao.selectList("ParticipantMapper.getRoomParticipantList", rParams);
    }

    /**
     * 채팅참여자(룸) 상태정보 수정
     *
     * @param participant ParticipantDto
     * @return ParticipantDto
     */
    @SuppressWarnings("unchecked")
    public ParticipantDto modifyParticipant(ParticipantDto participant) {

        // 참여자수 확인(내보내기, 나가기 사용자 제외 참여자수)
        int participantCnt = (int) messengerDao.selectOne("ParticipantMapper.participantCnt", participant);

        // 채팅방의 참여자가 0인경우 채팅방 상태값 변경
        if (participantCnt == 0) {
            RoomDto roomUpdateDto = new RoomDto();
            roomUpdateDto.setRoomId(participant.getRoomId());
            roomUpdateDto.setModifyUserKey(SecurityUtils.getUserKey()); // 요청API jwttoken을 파씽해서 쓸수있을듯.
            roomUpdateDto.setActiveYn("N");
            messengerDao.update("RoomMapper.updateRoomInfo", roomUpdateDto);
        }

        // 참가 제외 처리
        Map<String, Object> rParams = new HashMap<String, Object>();
        rParams.put("roomId", participant.getRoomId());
        rParams.put("userKey", participant.getUserKey());

        RoomDto roomInfo = (RoomDto) messengerDao.selectOne("RoomMapper.getRoomInfo", rParams);
        if (roomInfo.getRoomType().equals(RoomType.PRIVATE)) {
            participant.setDeletedYn("Y");
        } else {
            participant.setPresentYn("N");
        }

        participant.setModifyUserKey(SecurityUtils.getUserKey());
        messengerDao.update("ParticipantMapper.updateParticipant", participant);

        return participant;
    }


    public List<ParticipantDto> getUserKeyListOfRoom(List<RoomListDto> roomIdList) {
        return (List<ParticipantDto>) messengerDao.selectList("ParticipantMapper.getUserKeyListOfRoom", roomIdList);
    }
}
