package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.messenger.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@Slf4j
public class MsgMessageHandlerApiService {

    public void setMessageContent(MessageDto messageDto) {
        messageDto.setUserNm(messageDto.getUserNm());

        switch (messageDto.getMessageType()) {
            case JOIN -> handleJoinMessage(messageDto);
            case EXPORT -> handleExportMessage(messageDto);
            case EXIT -> handleExitMessage(messageDto);
        }
    }

    private void handleJoinMessage(MessageDto messageDto) {
        if (messageDto.getTargetUserIdList() != null && !messageDto.getTargetUserIdList().isEmpty()) {
            String targetUsers = getTargetUsers(messageDto);
            messageDto.setMessageContent(messageDto.getUserNm() + "님이 " + targetUsers + "을 초대하였습니다.");
        }
    }

    private void handleExportMessage(MessageDto messageDto) {
        if (messageDto.getTargetUserIdList() != null && !messageDto.getTargetUserIdList().isEmpty()) {
            String targetUsers = getTargetUsers(messageDto);
            messageDto.setMessageContent(targetUsers + "을 " + messageDto.getUserNm() + "님께서 내보내셨습니다.");
        }
    }

    private static String getTargetUsers(MessageDto messageDto) {
        return messageDto.getTargetUserIdList()
                .stream()
                .map(user -> user.getUserNm() + "님")
                .collect(Collectors.joining(", "));
    }

    private void handleExitMessage(MessageDto messageDto) {
        messageDto.setMessageContent(messageDto.getUserNm() + "님이 나가셨습니다.");
    }

    private void handlePraiseMessage(MessageDto messageDto) {
        String content = "칭찬합니다.<br><br>" +
                "- 받는 사람 : " + messageDto.getUserNm() + "(" + messageDto.getOrgNm() + ")<br>" +
                "- 메시지 : " + messageDto.getMessageContent();
        messageDto.setMessageContent(content);
    }

}
