class Message {
    constructor(roomId,
                company,
                corporateId,
                roomType,
                messageContent,
                messageType,
                userNm,
                messageUuid,
                replyMessageId,
                messageId,
                deletedYn,
                updateYn,
                orgNm,
                sendUserKey,
                targetUserIdList,
                upperMessageDto,
                createUserKey,
                modifyUserKey,
                modifyDt,
                createDt,
                createDtFormatted,
                roomName,
                description,
                publishType,
                attachmentList
    ) {
        this._roomId = roomId ?? null;
        this._company = company ?? null;
        this._corporateId = corporateId ?? null;
        this._roomType = roomType ?? null;
        this._messageContent = messageContent ?? null;
        this._messageType = messageType ?? null;
        this._userNm = userNm ?? null;
        this._messageUuid = messageUuid ?? null;
        this._replyMessageId = replyMessageId ?? null;
        this._messageId = messageId ?? null;
        this._deletedYn = deletedYn ?? null;
        this._updateYn = updateYn ?? null;
        this._orgNm = orgNm ?? null;
        this._sendUserKey = sendUserKey ?? null;
        this._targetUserIdList = targetUserIdList ?? null;
        this._upperMessageDto = upperMessageDto ? this._makeUpperMessage(upperMessageDto) : null;
        this._createUserKey = createUserKey ?? null;
        this._modifyUserKey = modifyUserKey ?? null;
        this._modifyDt = modifyDt ?? null;
        this._createDt = createDt ?? null;
        this._createDtFormatted = createDtFormatted ?? null;
        this._roomName = roomName ?? null;
        this._description = description ?? null;
        this._publishType = publishType ?? null;
        this._attachmentList = Array.isArray(attachmentList) ? this._makeAttachmentList(attachmentList) : [];
    }

    _makeUpperMessage(_upperMessageDto){
        const {messageId,roomId,sendUserKey,userNm,messageContent,deletedYn,createDt,createDtFormatted} = _upperMessageDto
        return new UpperMessage(messageId,roomId,sendUserKey,userNm,messageContent,deletedYn,createDt,createDtFormatted);
    }

    _makeAttachmentList(rawList) {
        return rawList.map(attachment => ({
            attachmentId: attachment?.attachmentId ?? null,
            roomId: attachment?.roomId ?? null,
            companyId: attachment?.companyId ?? null,
            sendUserKey: attachment?.sendUserKey ?? null,
            sendUserName: attachment?.sendUserName ?? null,
            originFileName: attachment?.originFileName ?? null,
            fileExtension: attachment?.fileExtension ?? null,
            fileSize: attachment?.fileSize ?? null,
            deletedYn: attachment?.deletedYn ?? null,
            savedFilePath: attachment?.savedFilePath ?? null,
            createDt: attachment?.createDt ?? null
        }));
    }

    get roomId() {
        return this._roomId;
    }

    get corporateId() {
        return this._corporateId;
    }

    get company() {
        return this._company;
    }

    get roomType() {
        return this._roomType;
    }

    get messageContent() {
        return this._messageContent;
    }

    get messageType() {
        return this._messageType;
    }

    get userNm() {
        return this._userNm;
    }

    get messageUuid() {
        return this._messageUuid;
    }

    get replyMessageId() {
        return Number(this._replyMessageId);
    }

    get messageId() {
        return Number(this._messageId);
    }

    get deletedYn() {
        return this._deletedYn;
    }

    get updateYn() {
        return this._updateYn;
    }

    get orgNm() {
        return this._orgNm;
    }

    get sendUserKey() {
        return Number(this._sendUserKey);
    }

    get targetUserIdList() {
        return this._targetUserIdList;
    }

    get createUserKey() {
        return Number(this._createUserKey);
    }

    get modifyUserKey() {
        return Number(this._modifyUserKey);
    }

    get modifyDt() {
        return this._modifyDt;
    }

    get createDt() {
        return this._createDt;
    }

    get createDtFormatted() {
        return this._createDtFormatted;
    }

    get roomName() {
        return this._roomName;
    }

    get description() {
        return this._description;
    }

    get publishType() {
        return this._publishType;
    }

    get attachmentList() {
        return this._attachmentList;
    }


    get upperMessageDto() {
        return this._upperMessageDto;
    }

    get message(){
        return new Message(
            this._roomId,
            this._company,
            this._corporateId,
            this._roomType,
            this._messageContent,
            this._messageType,
            this._userNm,
            this._messageUuid,
            this._replyMessageId,
            this._messageId,
            this._deletedYn,
            this._updateYn,
            this._orgNm,
            this._sendUserKey,
            this._targetUserIdList,
            this._upperMessageDto,
            this._createUserKey,
            this._modifyUserKey,
            this._modifyDt,
            this._createDt,
            this._createDtFormatted,
            this._roomName,
            this._description,
            this._publishType,
            this._attachmentList
        )
    }


    get upperMessage(){
        return this._upperMessageDto;
    }

    awpMessageDetail(loginInfo, message){
        return new AWPMessageDetail(
            loginInfo
            ,Number(this._messageId)
            ,this.message
            ,this.attachmentList
            ,this.upperMessage
            ,message?.upperMessageDto?.attachmentList ?? []
            ,null)
    }

    ToJSON(){
        const targetUserIdList = this._targetUserIdList;
        let convertTargetUserIdList;
        if(targetUserIdList){
            convertTargetUserIdList = targetUserIdList.map(targetUserId => ({ userKey: String(targetUserId) }));
        }

        let convertAttachmentList;
        if (Array.isArray(this._attachmentList)) {
            convertAttachmentList = this._attachmentList.map(attachment => ({
                attachmentId: attachment?.attachmentId ?? null,
                roomId: attachment?.roomId ?? null,
                companyId: attachment?.companyId ?? null,
                sendUserKey: attachment?.sendUserKey ?? null,
                sendUserName: attachment?.sendUserName ?? null,
                originFileName: attachment?.originFileName ?? null,
                fileExtension: attachment?.fileExtension ?? null,
                fileSize: attachment?.fileSize ?? null,
                deletedYn: attachment?.deletedYn ?? null,
                savedFilePath: attachment?.savedFilePath ?? null,
                createDt: attachment?.createDt ?? null
            }));
        }

        return {
            roomId: this._roomId,
            company: this._company,
            corporateId: this._corporateId,
            roomType: this._roomType,
            messageContent: this._messageContent,
            messageType: this._messageType,
            userNm: this._userNm,
            messageUuid: this._messageUuid,
            replyMessageId: this._replyMessageId,
            messageId: this._messageId,
            deletedYn: this._deletedYn,
            updateYn: this._updateYn,
            orgNm: this._orgNm,
            sendUserKey: this._sendUserKey,
            targetUserIdList: convertTargetUserIdList,
            upperMessageDto: this._upperMessageDto
                ? {
                    messageId: this._upperMessageDto.messageId,
                    roomId: this._upperMessageDto.roomId,
                    sendUserKey: this._upperMessageDto.sendUserKey,
                    userNm: this._upperMessageDto.userNm,
                    messageContent: this._upperMessageDto.messageContent,
                    deletedYn: this._upperMessageDto.deletedYn,
                    createDt: this._upperMessageDto.createDt,
                    createDtFormatted: this._upperMessageDto.createDtFormatted,
                    attachmentId: this._upperMessageDto.attachmentId
                }
                : null,
            createUserKey: this._createUserKey,
            modifyUserKey: this._modifyUserKey,
            modifyDt: this._modifyDt,
            createDt: this._createDt,
            createDtFormatted: this._createDtFormatted,
            roomName: this._roomName,
            description: this._description,
            publishType: this._publishType,
            attachmentList: convertAttachmentList
        };
    }
}
