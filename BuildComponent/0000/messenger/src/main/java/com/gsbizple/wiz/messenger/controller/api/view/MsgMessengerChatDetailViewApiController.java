package com.gsbizple.wiz.messenger.controller.api.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.service.view.LayoutService;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.messenger.common.view.MsgViewDataKey;
import com.gsbizple.wiz.messenger.dto.*;
import com.gsbizple.wiz.messenger.service.MsgAlarmApiService;
import com.gsbizple.wiz.messenger.service.MsgMessageApiService;
import com.gsbizple.wiz.messenger.service.MsgRoomApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;

@Controller
@RequestMapping("/messenger")
public class MsgMessengerChatDetailViewApiController {

    private final LayoutService layoutService;
    private final MsgRoomApiService msgRoomApiService;
    private final MsgMessageApiService msgMessageApiService;
    private final MsgAlarmApiService msgAlarmApiService;

    public MsgMessengerChatDetailViewApiController(Function<ContextType, LayoutService> layoutService
            , MsgRoomApiService msgRoomApiService
            , MsgMessageApiService msgMessageApiService
            , MsgAlarmApiService msgAlarmApiService
    ) {
        this.layoutService = layoutService.apply(ContextType.MESSENGER);
        this.msgRoomApiService = msgRoomApiService;
        this.msgMessageApiService = msgMessageApiService;
        this.msgAlarmApiService = msgAlarmApiService;
    }

    @GetMapping(value = "/default/chatDetail")
    public ResponseEntity<ResponseDto<String>> defaultChatListView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale,
            @RequestParam(name = "roomId", required = true) String roomId,
            @RequestParam(name = "lastReadMessageId", required = false, defaultValue = "0") Integer lastReadMessageId,
            @RequestParam(name = "isAllRead", required = true) boolean isAllRead,
            @RequestParam(name = "mode", required = false, defaultValue = "ENTER") String mode
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());
            var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            var roomDto = msgRoomApiService.getRoomInfo(roomId);
            if (roomDto.getCreateDt() != null) {
                roomDto.setCreateDtFormatted(roomDto.getCreateDt().format(formatter));
            }
            if (roomDto.getModifyDt() != null) {
                roomDto.setModifyDtFormatted(roomDto.getModifyDt().format(formatter));
            }
            List<MessageDto> messageDtoList = Collections.emptyList();
            int unReadCount = 0;
            long readMessageId = 0;
            switch (mode) {
                case "ENTER":
                    messageDtoList = msgMessageApiService.findByAllMessage(MessageDto.builder().roomId(roomId).corporateId(SecurityUtils.getCorporateId()).build());

                    ParticipantDto participantDto = msgMessageApiService.findByMessageRead(roomId, String.valueOf(SecurityUtils.getUserKey()));
                    readMessageId = participantDto.getReadMessageId();

                    unReadCount = msgMessageApiService.selectUnreadMessageCount(roomId, readMessageId);
                    break;
            }

            messageDtoList.forEach(responseDto -> {
                if (responseDto.getCreateDt() != null) {
                    responseDto.setCreateDtFormatted(responseDto.getCreateDt().format(formatter));
                }
                if (responseDto.getUpperMessageDto() != null && responseDto.getUpperMessageDto().getCreateDt() != null) {
                    responseDto.getUpperMessageDto().setCreateDtFormatted(responseDto.getUpperMessageDto().getCreateDt().format(formatter));
                }
            });

            layoutService.setData(MsgViewDataKey.lastReadMessageId, readMessageId, Long.class);
            layoutService.setData(MsgViewDataKey.unReadCount, unReadCount, Integer.class);
            layoutService.setData(MsgViewDataKey.roomDto, roomDto, RoomDto.class);
            layoutService.setData(MsgViewDataKey.messageDtos, messageDtoList, List.class);
            var convertedHtml = layoutService.convertHtml("context/messenger/component/main/chat/chatDetail_default");

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(convertedHtml)
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_VIEW_CHAT_LIST.getCode())
                            .msg(SDKSpec.FAIL_VIEW_CHAT_LIST.getMessage())
                            .build()
            );
        }
    }

    @GetMapping(value = "/dorothy/chatDetail")
    public ResponseEntity<ResponseDto<String>> dorothyChatListView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale,
            @RequestParam(name = "roomId", required = true) String roomId,
            @RequestParam(name = "lastReadMessageId", required = false, defaultValue = "0") Integer lastReadMessageId,
            @RequestParam(name = "isAllRead", required = false) boolean isAllRead,
            @RequestParam(name = "mode", required = false, defaultValue = "ENTER") String mode
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());
            var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            var roomDto = msgRoomApiService.getRoomInfo(roomId);
            if (roomDto.getCreateDt() != null) {
                roomDto.setCreateDtFormatted(roomDto.getCreateDt().format(formatter));
            }
            if (roomDto.getModifyDt() != null) {
                roomDto.setModifyDtFormatted(roomDto.getModifyDt().format(formatter));
            }
            List<MessageDto> messageDtoList = Collections.emptyList();
            switch (mode) {
                case "ENTER":
                    messageDtoList = msgMessageApiService.findByAllMessage(MessageDto.builder().roomId(roomId).corporateId(SecurityUtils.getCorporateId()).build());
                    break;
            }
            messageDtoList.forEach(responseDto -> {
                if (responseDto.getCreateDt() != null) {
                    responseDto.setCreateDtFormatted(responseDto.getCreateDt().format(formatter));
                }
                if (responseDto.getUpperMessageDto() != null && responseDto.getUpperMessageDto().getCreateDt() != null) {
                    responseDto.getUpperMessageDto().setCreateDtFormatted(responseDto.getUpperMessageDto().getCreateDt().format(formatter));
                }
            });

            layoutService.setData(MsgViewDataKey.roomDto, roomDto, RoomDto.class);
            layoutService.setData(MsgViewDataKey.messageDtos, messageDtoList, List.class);
            var convertedHtml = layoutService.convertHtml("context/messenger/component/main/chat/chatDetail_dorothy");

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(convertedHtml)
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_VIEW_CHAT_LIST.getCode())
                            .msg(SDKSpec.FAIL_VIEW_CHAT_LIST.getMessage())
                            .build()
            );
        }
    }

    @GetMapping(value = "/alarm/chatDetail")
    public ResponseEntity<ResponseDto<String>> alarmChatListView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale,
            @RequestParam(name = "roomId", required = true) String roomId,
            @RequestParam(name = "lastReadMessageId", required = false, defaultValue = "0") Integer lastReadMessageId,
            @RequestParam(name = "isAllRead", required = true) boolean isAllRead,
            @RequestParam(name = "mode", required = false, defaultValue = "ENTER") String mode
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());
            var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            var roomDto = msgRoomApiService.getRoomInfo(roomId);
            if (roomDto.getCreateDt() != null) {
                roomDto.setCreateDtFormatted(roomDto.getCreateDt().format(formatter));
            }
            if (roomDto.getModifyDt() != null) {
                roomDto.setModifyDtFormatted(roomDto.getModifyDt().format(formatter));
            }
            List<AlarmDto> alarmDtoList = Collections.emptyList();
            switch (mode) {
                case "ENTER":
                    alarmDtoList = msgAlarmApiService.getAlarmList(AlarmDto.builder().roomId(roomId).build());
                    break;
            }
            alarmDtoList.forEach(alarmDto -> {
                if (alarmDto.getCreateDt() != null) {
                    alarmDto.setCreateDtFormatted(alarmDto.getCreateDt().format(formatter));
                }
                if (alarmDto.getModifyDt() != null) {
                    alarmDto.setModifyDtFormatted(alarmDto.getModifyDt().format(formatter));
                }
            });

            layoutService.setData(MsgViewDataKey.roomDto, roomDto, RoomDto.class);
            layoutService.setData(MsgViewDataKey.alarmDtos, alarmDtoList, List.class);
            var convertedHtml = layoutService.convertHtml("context/messenger/component/main/chat/chatDetail_alarm");

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(convertedHtml)
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_VIEW_CHAT_LIST.getCode())
                            .msg(SDKSpec.FAIL_VIEW_CHAT_LIST.getMessage())
                            .build()
            );
        }
    }

    @GetMapping(value = "/self/chatDetail")
    public ResponseEntity<ResponseDto<String>> selfChatListView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale,
            @RequestParam(name = "roomId", required = true) String roomId,
            @RequestParam(name = "lastReadMessageId", required = false, defaultValue = "0") Integer lastReadMessageId,
            @RequestParam(name = "isAllRead", required = false) boolean isAllRead,
            @RequestParam(name = "mode", required = false, defaultValue = "ENTER") String mode
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());
            var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            var roomDto = msgRoomApiService.getRoomInfo(roomId);
            if (roomDto.getCreateDt() != null) {
                roomDto.setCreateDtFormatted(roomDto.getCreateDt().format(formatter));
            }
            if (roomDto.getModifyDt() != null) {
                roomDto.setModifyDtFormatted(roomDto.getModifyDt().format(formatter));
            }
            List<MessageDto> messageDtoList = Collections.emptyList();
            switch (mode) {
                case "ENTER":
                    messageDtoList = msgMessageApiService.findByAllMessage(MessageDto.builder().roomId(roomId).corporateId(SecurityUtils.getCorporateId()).build());
                    break;
            }
            messageDtoList.forEach(responseDto -> {
                if (responseDto.getCreateDt() != null) {
                    responseDto.setCreateDtFormatted(responseDto.getCreateDt().format(formatter));
                }
                if (responseDto.getUpperMessageDto() != null && responseDto.getUpperMessageDto().getCreateDt() != null) {
                    responseDto.getUpperMessageDto().setCreateDtFormatted(responseDto.getUpperMessageDto().getCreateDt().format(formatter));
                }
            });

            layoutService.setData(MsgViewDataKey.roomDto, roomDto, RoomDto.class);
            layoutService.setData(MsgViewDataKey.messageDtos, messageDtoList, List.class);
            var convertedHtml = layoutService.convertHtml("context/messenger/component/main/chat/chatDetail_self");

            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.SUCCESS.getCode())
                            .msg(SDKSpec.SUCCESS.getMessage())
                            .data(convertedHtml)
                            .build()
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    ResponseDto.<String>builder()
                            .code(SDKSpec.FAIL_VIEW_CHAT_LIST.getCode())
                            .msg(SDKSpec.FAIL_VIEW_CHAT_LIST.getMessage())
                            .build()
            );
        }
    }

    // 고정된 채팅방 목록 필터링
    private List<RoomListDto> getFixedList(List<RoomListDto> roomList) {
        return roomList.stream()
                .filter(room -> room.getRoomType() == RoomType.SELF
                        || room.getRoomType() == RoomType.ALARM
                        || room.getRoomType() == RoomType.DOROTHY)
                .sorted(Comparator.comparing(room -> getSortOrder(room.getRoomType())))
                .toList();
    }

    // 고정되지 않은 채팅방 목록 필터링
    private List<RoomListDto> getUnfixedList(List<RoomListDto> roomList) {
        return roomList.stream()
                .filter(room -> room.getRoomType() == RoomType.GROUP
                        || room.getRoomType() == RoomType.PRIVATE)
                .sorted(Comparator.comparing(room -> getSortOrder(room.getRoomType())))
                .toList();
    }

    private int getSortOrder(RoomType roomType) {
        return switch (roomType) {
            case ALARM -> 1;
            case DOROTHY -> 2;
            case SELF -> 3;
            case GROUP -> 4;
            case PRIVATE -> 5;
            default -> 6; // 다른 타입이 있으면 가장 마지막으로 정렬
        };
    }
}