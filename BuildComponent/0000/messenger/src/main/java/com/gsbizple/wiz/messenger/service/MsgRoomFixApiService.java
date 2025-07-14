package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.RoomFixDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class MsgRoomFixApiService {

    private final MessengerDao messengerDao;

    /**
     * 채팅방 핀 고정 생성
     */
    @SuppressWarnings("unchecked")
    public RoomFixDto createPin(RoomFixDto roomFix) {
        RoomFixDto roomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getRoomFixInfo", roomFix);
        if (roomFixInfo != null) {
            throw new SDKException(SDKSpec.FIX_NOT_EMPTY, "A fixed pin already exists.");
        }

        RoomFixDto lastRoomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getLastRoomFixInfo", roomFix);
        int newFixOrder = (lastRoomFixInfo != null) ? lastRoomFixInfo.getFixOrder() + 1 : 1;

        roomFix.setFixOrder(newFixOrder);
        roomFix.setCreateUserKey(roomFix.getUserKey());
        roomFix.setModifyUserKey(roomFix.getUserKey());
        roomFix.setCorporateId(SecurityUtils.getCorporateId());
        messengerDao.update("RoomFixMapper.saveRoomFixOrder", roomFix);

        return roomFix;
    }

    /**
     * 채팅방 핀 해제
     */
    @SuppressWarnings("unchecked")
    public RoomFixDto pinRemove(RoomFixDto roomFix) {
        // fix_order max
        RoomFixDto lastRoomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getLastRoomFixInfo", roomFix);
        if (lastRoomFixInfo == null) {
            return roomFix;
        }
        Integer maxFixOrder = lastRoomFixInfo.getFixOrder();

        // 삭제 대상의 fix_order
        RoomFixDto deleteRoomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getRoomFixInfo", roomFix);
        if (deleteRoomFixInfo == null) {
            return roomFix;
        }
        Integer removeFixOrder = deleteRoomFixInfo.getFixOrder();

        // 채팅방 핀고정 정보 삭제
        messengerDao.delete("RoomFixMapper.deleteRoomFixOrder", deleteRoomFixInfo);
        // 삭제한 채팅방 핀 고정 순번보다 큰 채팅방 정보 업데이트 처리
        if (!removeFixOrder.equals(maxFixOrder)) {
            deleteRoomFixInfo.setSign("-");
            deleteRoomFixInfo.setModifyUserKey(roomFix.getUserKey());
            messengerDao.update("RoomFixMapper.updateRoomFixOrderSign", deleteRoomFixInfo);
        }
        return roomFix;
    }

    /**
     * 채팅방 핀 위치 이동
     */
    @SuppressWarnings("unchecked")
    public void pinModify(RoomFixDto roomFix) {

        RoomFixDto roomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getRoomFixInfo", roomFix);

        switch (roomFix.getMoveFlag()) {
            case "top":
                if (roomFixInfo.getFixOrder() != 1) {
                    // 변경 대상 순번을 1로 업데이트
                    roomFixInfo.setFixOrder(1);
                    roomFixInfo.setModifyUserKey(roomFix.getUserKey());
                    messengerDao.update("RoomFixMapper.updateRoomFixOrder", roomFixInfo);

                    // 나머지 순번을 업데이트
                    messengerDao.update("RoomFixMapper.updateOtherRoomfixOrder", roomFixInfo);
                }
                break;
            case "upOneSpace":
                if (roomFixInfo.getFixOrder() != 1) {
                    roomFixInfo.setSign("-");
                    List<RoomFixDto> updateList = messengerDao.selectList("RoomFixMapper.getOneSpaceList", roomFixInfo);
                    updateList.forEach(fixUpdate -> {
                        fixUpdate.setModifyUserKey(roomFix.getUserKey());
                        messengerDao.update("RoomFixMapper.updateRoomFixOrder", fixUpdate);
                    });
                }
                break;
            case "downOneSpace":
                RoomFixDto lastRoomFixInfo = (RoomFixDto) messengerDao.selectOne("RoomFixMapper.getLastRoomFixInfo", roomFixInfo);
                if (!Objects.equals(roomFixInfo.getFixOrder(), lastRoomFixInfo.getFixOrder())) {
                    roomFixInfo.setSign("+");
                    List<RoomFixDto> updateList = messengerDao.selectList("RoomFixMapper.getOneSpaceList", roomFixInfo);
                    updateList.forEach(fixUpdate -> {
                        fixUpdate.setModifyUserKey(roomFix.getUserKey());
                        messengerDao.update("RoomFixMapper.updateRoomFixOrder", fixUpdate);
                    });
                }
                break;
            default:
                break;
        }
    }
}
