package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MsgRoomApiService {

    private static final List<RoomType> DEFAULT_ROOM_LIST = List.of(RoomType.SELF, RoomType.DOROTHY, RoomType.ALARM);
    private final MessengerDao messengerDao;
    private final MsgRedisApiService msgRedisApiService;
    private final MsgParticipantApiService msgParticipantApiService;
    private final MsgMessageApiService msgMessageApiService;

    /**
     * 채팅방 생성
     *
     * @param roomDto RoomDto
     * @return RoomDto
     */
    @SuppressWarnings("unchecked")
    private RoomDto createRoom(RoomDto roomDto) {
        // 채팅방 생성
        roomDto.setRoomId(getRandomId());
        roomDto.setModifyUserKey(roomDto.getCreateUserKey());
        messengerDao.insert("RoomMapper.saveRoom", roomDto);

        List<Integer> uniqueParticipants = roomDto.getParticipantList().stream()
                .distinct()
                .toList(); // 중복 제거 후 리스트 변환

        uniqueParticipants.forEach(userKey -> messengerDao.insert("ParticipantMapper.saveParticipant", createParticipant(userKey, roomDto)));

        if (isEmpty(roomDto.getRoomName())) {
           Map<String, Object> rParams = new HashMap<>();
           rParams.put("roomId", roomDto.getRoomId());
           RoomDto newRoomDto = (RoomDto) messengerDao.selectOne("RoomMapper.getRoomInfo", rParams);
           roomDto.setRoomName(newRoomDto.getRoomName());
       }

        return roomDto;
    }

    private boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    private String getRandomId() {
        String randomId;
        String roomId;
        do {
            randomId = String.valueOf(java.time.Instant.now().getEpochSecond()).substring(6)
                    + RandomStringUtils.randomAlphabetic(2).toLowerCase();
            roomId = (String) messengerDao.selectOne("RoomMapper.getRoomId", randomId);
        }
        while (StringUtils.isNotEmpty(roomId));

        return randomId;
    }

    // 참가자 정보 세팅 처리
    private ParticipantDto createParticipant(int userKey, RoomDto roomDto) {
        return ParticipantDto.builder()
                .roomId(roomDto.getRoomId())
                .userKey(userKey)
                .publicYn("Y")
                .createUserKey(roomDto.getCreateUserKey())
                .modifyUserKey(roomDto.getCreateUserKey())
                .build();
    }

    /**
     * roomId, userKey로 채팅방 정보조회
     *
     * @param roomId String
     * @return RoomDto
     */
    @SuppressWarnings("unchecked")
    public RoomDto getRoomInfo(String roomId) {

        Map<String, Object> rParams = new HashMap<>();
        rParams.put("roomId", roomId);
        rParams.put("userKey", SecurityUtils.getUserKey()); // UserKey

        RoomDto result = (RoomDto) messengerDao.selectOne("RoomMapper.getRoomInfo", rParams);
        List<Integer> particiantList = msgParticipantApiService.getRoomParticipantList(roomId)
                .stream()
                .map(ParticipantListDto::getUserKey)
                .toList();
        result.setParticipantList(particiantList);
        return result;
    }

    /**
     * 참여중인 채팅방 리스트 조회
     *
     * @return List<FindRoomResponseDto>
     */
    @SuppressWarnings("unchecked")
    public List<RoomListDto> getRoomList() {
        Integer userKey = SecurityUtils.getUserKey();
        List<RoomListDto> roomList = getRoomList(userKey);
        setLastMessage(roomList);

        RoomListDto alarmRoom = getAlarmRoom(userKey);
        roomList.add(alarmRoom);

        setParticipantList(roomList);
        setSendUserInfo(roomList);

        return roomList.stream()
                .sorted(Comparator.comparing(RoomListDto::getLastMessageDt, Comparator.nullsFirst(Comparator.naturalOrder()))
                        .reversed())
                .toList();

    }


    private void setLastMessage(List<RoomListDto> roomList) {
        List<MessageDto> lastMessageList = getLastMessageList(roomList);

        if (!lastMessageList.isEmpty()) {
            Map<String, MessageDto> messageMap = lastMessageList.stream()
                    .collect(Collectors.toMap(MessageDto::getRoomId, room -> room));

            for (RoomListDto room : roomList) {
                MessageDto message = messageMap.get(room.getRoomId());
                if (message != null) {
                    setLastMessageData(room, message);
                }
                setUnreadMessageCount(room);
            }
        }
    }


    private static void setLastMessageData(RoomListDto room, MessageDto message) {
        room.setMessageId(message.getMessageId());
        room.setMessageType(message.getMessageType());

        room.setLastMessageDt(message.getCreateDt());
        room.setSendUserKey(message.getSendUserKey());
        if ("Y".equals(message.getDeletedYn())) {
            room.setLastMessageContent("사용자가 삭제한 메시지입니다.");
        } else {
            room.setLastMessageContent(message.getMessageContent());
        }
    }

    private void setParticipantList(List<RoomListDto> roomList) {
        List<ParticipantDto> userList = msgParticipantApiService.getUserKeyListOfRoom(roomList);
        for (RoomListDto room : roomList) {
            List<Integer> participantList = new ArrayList<>();
            userList.removeIf(user -> {
                if (room.getRoomId().equals(user.getRoomId())) {
                    participantList.add(user.getUserKey());
                    return true;
                }
                return false;
            });

            room.setParticipantList(participantList);
        }
    }

    private void setSendUserInfo(List<RoomListDto> roomList) {
        List<UserDto> sendUserList = msgMessageApiService.getUserInfo(roomList);
        if (!sendUserList.isEmpty()) {
            Map<Integer, UserDto> userMap = sendUserList.stream()
                    .collect(Collectors.toMap(UserDto::getUserKey, user -> user));

            for (RoomListDto room : roomList) {
                UserDto user = userMap.get(room.getSendUserKey());
                if (user != null) {
                    setSendUserInfo(room, user);
                }
                setRoomName(room, userMap);
            }
        }

    }

    private static void setRoomName(RoomListDto room, Map<Integer, UserDto> userMap) {
        RoomType roomType = room.getRoomType();
        String roomName = room.getRoomName();

        if (roomName != null && !roomName.isEmpty()) {
            return;
        }
        switch (roomType) {
            case SELF, PRIVATE -> room.setRoomName(Objects.isNull(SecurityUtils.getUserAttribute()) ? ""
                    : SecurityUtils.getUserAttribute().getUserName());

            case GROUP -> {
                List<Integer> participants = room.getParticipantList();
                int userCount = participants.size();
                roomName = participants.stream()
                        .limit(3)
                        .map(userKey -> userMap.get(userKey).getUserNm())
                        .collect(Collectors.joining(", "));
                if (userCount > 3) {
                    roomName += " 외 " + (userCount - 3) + "명";
                }
                room.setRoomName(roomName);
            }

            case ALARM -> room.setRoomName("알림봇");
            case DOROTHY -> room.setRoomName("도로시");
        }
    }

    private static void setSendUserInfo(RoomListDto room, UserDto user) {
        room.setUserNm(user.getUserNm());
        room.setLoginStatus(user.getLoginStatus());
        room.setThumbImgPath(user.getThumbImgPath());
    }

    private void setUnreadMessageCount(RoomListDto room) {
        if (Objects.equals(room.getReadMessageId(), room.getMessageId())) {
            room.setUnreadMessageCount(0);
            return;
        }
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("readMessageId", Optional.ofNullable(room.getReadMessageId()).orElse(0L)); // UserKey
        rParams.put("roomId", room.getRoomId());

        Integer unreadMessageCount = (Integer) messengerDao.selectOne("RoomMapper.getUnreadMessageCount", rParams);
        if (unreadMessageCount != null) {
            room.setUnreadMessageCount(unreadMessageCount);
        }
    }

    private RoomListDto getAlarmRoom(Integer userKey) {
        return (RoomListDto) messengerDao.selectOne("RoomMapper.getRoomInfoOfAlarm", userKey);
    }

    private List<RoomListDto> getRoomList(Integer userKey) {
        return messengerDao.selectList("RoomMapper.getRoomList", userKey);
    }

    private List<MessageDto> getLastMessageList(List<RoomListDto> roomList) {
        return messengerDao.selectList("RoomMapper.getLastMessageByRoomId", roomList);
    }

//    private List<RoomListDto> getUnreadMessageCountList(List<RoomListDto> roomList) {
//        return messengerDao.selectList("RoomMapper.getUnreadMessageCountList",
//                roomList.stream()
//                        .filter(room -> !Objects.equals(room.getReadMessageId(), room.getMessageId()))
//                        .toList());
//    }

    /**
     * 참여중인 채팅방 keyword 검색
     *
     * @param keyword string
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<RoomListDto> getRoomListByKeyword(String keyword) {
        Map<String, Object> rParams = new HashMap<>();
        rParams.put("userKey", SecurityUtils.getUserKey()); // UserKey
        rParams.put("keyword", keyword);
        List<RoomListDto> result = messengerDao.selectList("RoomMapper.getRoomListByKeyword", rParams);
        if (!result.isEmpty()) {
            setParticipantList(result);
        }
        return result;
    }

    /**
     * 채팅방 정보 변경(이름, 설명)
     *
     * @param roomDto RoomDto
     * @return RoomDto
     */
    @SuppressWarnings("unchecked")
    public RoomDto modifyRoom(RoomDto roomDto) {

        roomDto.setModifyUserKey(SecurityUtils.getUserKey());
        messengerDao.update("RoomMapper.updateRoomInfo", roomDto);

        Map<String, Object> rParams = new HashMap<>();
        rParams.put("roomId", roomDto.getRoomId());
        rParams.put("userKey", SecurityUtils.getUserKey());

        RoomDto roomInfo = (RoomDto) messengerDao.selectOne("RoomMapper.getRoomInfo", rParams);
        if (roomInfo == null) {
            throw new SDKException(SDKSpec.ROOM_EMPTY, "Room with the provided ID does not exist.");
        }

        if (roomInfo.getRoomType().equals(RoomType.PRIVATE)) { // 1:1대화방인경우
            rParams.put("deletedYn", "N");
        } else {
            rParams.put("presentYn", "Y");
        }

        List<ParticipantDto> participantList = (List<ParticipantDto>) messengerDao.selectList("ParticipantMapper.getParticipantList", rParams);

        String company = Objects.requireNonNull(SecurityUtils.getUserAttribute()).getSelectedDB();
        participantList.forEach(participantDto -> {
            roomInfo.setTargetUserKey(participantDto.getUserKey());
            roomDto.setTargetUserKey(participantDto.getUserKey());
            msgRedisApiService.publishRoomDto(roomDto, company);
        });

        return roomInfo;
    }

    /**
     * 참여자 중복 채팅방 조회
     *
     * @param roomDto RoomDto
     * @return List<RoomDto>
     */
    @SuppressWarnings("unchecked")
    public List<RoomDto> getParticipatingRoom(RoomDto roomDto) {

        List<Integer> participantList = roomDto.getParticipantList();
        participantList.add(SecurityUtils.getUserKey());

        String participantStringList = roomDto.getParticipantList().stream()
                .filter(Objects::nonNull)
                .distinct()
                .sorted()
                .map(String::valueOf)
                .collect(Collectors.joining(","));

        Map<String, Object> rParams = new HashMap<String, Object>();
        rParams.put("userKey", SecurityUtils.getUserKey());
        rParams.put("participantList", participantStringList);

        return (List<RoomDto>) messengerDao.selectList("RoomMapper.getParticipatingRoom", rParams);
    }

    /**
     * 썸네일이미지를 base64로 만들어 놓기
     *
     * @return String
     */
    public String updateRoomImage() {
        String base64Thumbnail = "";

        try {
            // 1. 원본 이미지 읽기
            File inputFile = new File("Z:\\00014.jpg");
            BufferedImage originalImage = ImageIO.read(inputFile);

            // 2. 썸네일 생성
            int thumbnailWidth = 150; // 썸네일 너비
            int thumbnailHeight = 150; // 썸네일 높이
            BufferedImage thumbnailImage = new BufferedImage(thumbnailWidth, thumbnailHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = thumbnailImage.createGraphics();
            g.drawImage(originalImage, 0, 0, thumbnailWidth, thumbnailHeight, null);
            g.dispose();

            // 3. 썸네일 이미지를 ByteArray로 변환
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(thumbnailImage, "jpg", baos);
            byte[] thumbnailBytes = baos.toByteArray();

            // 4. Base64 인코딩
            base64Thumbnail = Base64.getEncoder().encodeToString(thumbnailBytes);
            System.out.println("Base64 Thumbnail: " + base64Thumbnail);

            // 5. DB 저장 (예제: JDBC 사용)
            //saveThumbnailToDatabase(base64Thumbnail);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return base64Thumbnail;
    }

    /**
     * userId로 참여 중인 채팅방 조회
     *
     * @param userKey int
     * @return List<RoomDto>
     */
    @SuppressWarnings("unchecked")
    public List<RoomDto> getRoomListByUserKey(int userKey) {
        return (List<RoomDto>) messengerDao.selectList("RoomMapper.getRoomListByUserKey", userKey);
    }

    /**
     * 나의 기본 룸 생성
     */
    public void createMyDefaultRoom() {
        Integer userKey = SecurityUtils.getUserKey();
        createDefaultRoom(userKey);

    }

    /**
     * 모든 사용자의 기본 룸 생성
     */
    public void createAllDefaultRoom() {
        List<Integer> userKeyList = (List<Integer>) messengerDao.selectList("UserMapper.getUserKeyList", "");
        userKeyList.forEach(this::createDefaultRoom);
    }

    private void createDefaultRoom(Integer userKey) {
        List<Integer> participantList = Collections.singletonList(userKey);
        List<RoomType> roomList = messengerDao.selectList("RoomMapper.getDefaultRoomList", userKey);
        Set<RoomType> existingRoomSet = (roomList != null) ? new HashSet<>(roomList) : new HashSet<>();

        if (existingRoomSet.size() != DEFAULT_ROOM_LIST.size()) {
            for (RoomType roomType : DEFAULT_ROOM_LIST) {
                if (!existingRoomSet.contains(roomType)) {
                    createRoom(new RoomDto(roomType, userKey, participantList));
                }
            }
        }

    }

    public void createAllSelfRoom() {
        List<Integer> userKeyList = (List<Integer>) messengerDao.selectList("UserMapper.getUserKeyList", "");
        userKeyList.forEach(this::createSelfRoom);
    }

    private void createSelfRoom(Integer userKey) {
        List<Integer> participantList = Collections.singletonList(userKey);
        List<RoomType> roomList = messengerDao.selectList("RoomMapper.getDefaultRoomList", userKey);
        Set<RoomType> existingRoomSet = (roomList != null) ? new HashSet<>(roomList) : new HashSet<>();
        if (!existingRoomSet.contains(RoomType.SELF)) {
            createRoom(new RoomDto(RoomType.SELF, userKey, participantList));
        }
    }

    public RoomDto createRoomByApi(RoomDto roomDto) {
        if (roomDto.isDefaultRoom()) {
            throw new SDKException(SDKSpec.FAIL_CHATROOM_CREATE);
        }
        roomDto.setRoomType(RoomType.GROUP);
        return createRoom(roomDto);
    }
}
