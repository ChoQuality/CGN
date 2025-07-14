class AWPMessengerPub {
    constructor(func,companyOrgUser,loginInfo,webSocketClient) {
        this._func = func
        this._companyOrgUser = companyOrgUser
        this._loginInfo = loginInfo;
        this._webSocketClient = webSocketClient;
    }

    publishPraiseMessage(loginInfo,roomInfo, context) {
        if (!(loginInfo instanceof LoginInfo)
            || !(roomInfo instanceof RoomList)
            || !(context instanceof Map)) {
            this._func.showToastModal("유효한 parameter가 아닙니다.");
            return;
        }

        const messageType = context.get("type")?.trim();
        const targetKey = Number(context.get("target"));
        const targetName = context.get("targetName");
        const messageContent = context.get("message")?.trim();

        if (!messageType || isNaN(targetKey) || !messageContent) {
            this._func.showToastModal("유효한 값이 아닙니다.");
            return;
        }
        const praiseMessage = `${messageContent}`
        const talk = this._PRAISE(loginInfo, roomInfo,targetKey, messageType, praiseMessage);
        this._webSocketClient.send("send/message", talk);
    }


    publishRoomMessage(loginInfo,roomInfo,type,context){
        if (!(loginInfo instanceof LoginInfo)
            || !(roomInfo instanceof RoomList)
            || !(context instanceof Map)
        ) {
            this._func.showToastModal("유효한 parameter 가 아닙니다.");
            return;
        }
        const companyOrgUser = this._companyOrgUser;

        switch (type){
            case messageType.TALK:
                const messageContent = context.get(contextType.TEXT) ?? '';
                const attachmentDto = context.get(contextType.FILE) ?? null;
                const replyMessageElement = context.get(contextType.REPLY) ?? null;
                if(messageContent !== '' || attachmentDto !== null ){
                    const replyMessageDataset = replyMessageElement !== null ? replyMessageElement.dataset : null;
                    const talk= this._TALK(loginInfo,roomInfo,messageContent,attachmentDto,replyMessageDataset);
                    this._webSocketClient.send('send/message',talk);
                }
                return true;
            case messageType.UPDATE:
                const updateMessageContent = context.get(contextType.TEXT) ?? '';
                const updateAttachmentDto = context.get(contextType.FILE) ?? null;
                const messageId = context.get(contextType.UPDATE) ?? '';
                if(updateMessageContent !== '' || updateAttachmentDto !== null){
                    const talk= this._UPDATE(loginInfo,roomInfo,updateMessageContent,messageId,updateAttachmentDto);
                    this._webSocketClient.send('send/message',talk);
                }
                return true;
            case messageType.JOIN:
                const addUsers = context.get(contextType.JOIN);
                let join;
                if(addUsers){
                    const filteredUser = companyOrgUser.user.filter(companyUser => addUsers.includes(companyUser.userKey));
                    join = this._ADD(loginInfo,roomInfo,filteredUser);
                } else {
                    join = this._JOIN(loginInfo,roomInfo,companyOrgUser);
                }
                this._webSocketClient.send('send/message',join);
                return true;
            case messageType.EXIT:
                const _exit= this._EXIT(loginInfo,roomInfo);
                this._webSocketClient.send('send/message',_exit);
                return true;
            case messageType.EXPORT:
                const expUser = context.get(contextType.EXPORT);
                const filteredUser = companyOrgUser.user.filter(companyUser => companyUser.userKey === expUser);
                const _export= this._EXPORT(loginInfo,filteredUser[0],roomInfo);
                this._webSocketClient.send('send/message',_export);
                return true;
            case messageType.DISCARD:
                const discardMessageId = context.get(contextType.DISCARD);
                const _discard= this._DISCARD(loginInfo,discardMessageId,roomInfo);
                this._webSocketClient.send('send/message',_discard);
                return true;
            default:
                return false;
        }
    }
    getCurrentDateTime() {
        const now = new Date();

        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(now.getDate()).padStart(2, '0');

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    _TALK(loginInfo,roomInfo,context,attachmentDto,replyMessageDataset){
        let upperMessage = null;

        if(replyMessageDataset !== null){
            upperMessage = new UpperMessage(
                replyMessageDataset.messageId,
                roomInfo.roomId,
                replyMessageDataset.sendUserKey,
                replyMessageDataset.userNm,
                replyMessageDataset.messageContent,
                replyMessageDataset.deletedYn,
                replyMessageDataset.createDt,
                replyMessageDataset.createDt,
                replyMessageDataset.attachmentId,
                replyMessageDataset.originFileName,
                replyMessageDataset.fileSize,
                replyMessageDataset.savedFilePath,
                replyMessageDataset.fileExtension
            );
        }
        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            context,
            messageType.TALK,
            loginInfo.userNm,
            crypto.randomUUID(),
            replyMessageDataset !== null ? replyMessageDataset.messageId : null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            upperMessage,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            attachmentDto
        );

        return message.ToJSON();
    }

    _UPDATE(loginInfo,roomInfo,context,messageId,attachmentDto){
        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            context,
            messageType.UPDATE,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            messageId,
            'N',
            'Y',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            attachmentDto
        );

        return message.ToJSON();
    }

    _JOIN(loginInfo,roomInfo,companyOrgUser){

        const participantList = Array.isArray(roomInfo.participantList)
            ? roomInfo.participantList
            : [roomInfo.participantList];

        const filteredUsers = companyOrgUser.user.filter(companyUser =>
            companyUser.userKey !==loginInfo.userKey &&
            participantList.includes(companyUser.userKey)
        );
        let messageContent = loginInfo.userNm+'님이 ';

        messageContent += filteredUsers
            .map(filteredUser => filteredUser.userNm+'('+filteredUser.orgNm+')'+'님')
            .join(',').concat('을 초대하였습니다.');


        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            messageContent,
            messageType.JOIN,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }

    _ADD(loginInfo,roomInfo,addUsers){

        let messageContent = loginInfo.userNm+'님이 ';

        messageContent += addUsers
            .map(addUser => addUser.userNm+'('+addUser.orgNm+')'+'님')
            .join(',').concat('을 초대하였습니다.');

        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            messageContent,
            messageType.JOIN,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }

    _EXIT(loginInfo,roomInfo){
        const makeContent = (loginInfo) => loginInfo.userNm+"("+loginInfo.orgNm+")"+' 님이 나가셨습니다.';

        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            makeContent(loginInfo),
            messageType.EXIT,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }

    _DISCARD(loginInfo,messageId,roomInfo){
        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            messageId,
            messageType.DISCARD,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            messageId,
            'Y',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }

    _EXPORT(loginInfo,user,roomInfo){
        const makeContent = (loginInfo,user) =>
            loginInfo.userNm + "(" + loginInfo.orgNm + ") 님이 " + user.userNm + "(" + user.orgNm + ") 님을 내보내셨습니다.";

        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            roomInfo.roomType,
            makeContent(loginInfo,user),
            messageType.EXPORT,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            null,
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }


    _PRAISE(loginInfo,roomInfo,targetKey,messageType,context){
        const message = new Message(
            roomInfo.roomId,
            loginInfo.selectedDb,
            loginInfo.corpId,
            null,
            context,
            messageType,
            loginInfo.userNm,
            crypto.randomUUID(),
            null,
            null,
            'N',
            'N',
            loginInfo.orgNm,
            loginInfo.userKey,
            [targetKey],
            null,
            loginInfo.userKey,
            loginInfo.userKey,
            this.getCurrentDateTime(),
            this.getCurrentDateTime(),
            null,
            null,
            null,
            null,
            null
        );

        return message.ToJSON();
    }


    publishEmoji(loginInfo,roomId,messageId,type){
        switch (type){
            case messageType.EMOJI:
                const message = {
                    "company": loginInfo.selectedDb,
                    "corpId": loginInfo.corpId,
                    "messageId": messageId,
                    "roomId": roomId,
                    "messageType" : type
                }
                console.log('publish emoji :',message);
                this._webSocketClient.send('send/message',message);
                return true;
            default:
                return false;
        }
    }
}
