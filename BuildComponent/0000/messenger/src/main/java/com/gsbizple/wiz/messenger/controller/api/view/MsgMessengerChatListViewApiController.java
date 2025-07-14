package com.gsbizple.wiz.messenger.controller.api.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import com.gsbizple.wiz.common.dto.api.ResponseDto;
import com.gsbizple.wiz.common.security.AWPUser;
import com.gsbizple.wiz.common.service.view.LayoutService;
import com.gsbizple.wiz.common.spec.messenger.RoomType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.common.view.MsgViewDataKey;
import com.gsbizple.wiz.messenger.dto.RoomListDto;
import com.gsbizple.wiz.messenger.service.MsgRoomApiService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.function.Function;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/messenger")
public class MsgMessengerChatListViewApiController {

    private final LayoutService layoutService;
    private final MsgRoomApiService msgRoomApiService;

    public MsgMessengerChatListViewApiController(Function<ContextType,LayoutService> layoutService, MsgRoomApiService msgRoomApiService) {
        this.layoutService = layoutService.apply(ContextType.MESSENGER);
        this.msgRoomApiService = msgRoomApiService;
    }
    @GetMapping(value = "/main/chatRoomList")
    public ResponseEntity<ResponseDto<String>> mainChatListView(
            @AuthenticationPrincipal AWPUser user,
            Locale locale,
            @RequestParam(name = "section", required = false, defaultValue = "fixed") String section
    ) {
        try {
            layoutService.clean();
            layoutService.setLocale(locale);
            layoutService.setLoginInfo(user.getLoginInfo());

            var roomList = msgRoomApiService.getRoomList();
            var formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            roomList.forEach(dto -> {
                if (dto.getLastMessageDt() != null) {
                    dto.setLastMessageDtFormatted(dto.getLastMessageDt().format(formatter));
                }
            });

            var filteredList = "fixed".equals(section) ? getFixedList(roomList) : getUnfixedList(roomList);

            layoutService.setData(MsgViewDataKey.roomDto, filteredList, List.class);
            var convertedHtml = layoutService.convertHtml("context/messenger/component/main/chat/chatRoomList");

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
                .sorted(Comparator.comparing(room -> getFixSortOrder(room.getFixOrder())))
                .collect(Collectors.toList());
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
    private int getFixSortOrder(Integer order) {
        return order != null ? order: 999;
    }
}