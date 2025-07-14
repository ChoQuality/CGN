class AWPMessage {
    constructor(func,loginInfo,companyOrgUser,publish,subscribe) {
        this._roomAwpMessageDetailListMap = new Map();
        this._roomAwpAlarmMessageDetailListMap = new Map();
        this._loginInfo = loginInfo;
        this._func = func;
        this._publish = publish;
        this._subscribe = subscribe;
        this._currentRoomInfo = null;
        this._awpMessenger = null;
        this._subscribeRoomInfoList = [];
        this._formData = new FormData();
        this._process = false;
        this._companyOrgUser = companyOrgUser;
        this._isDorothyProcessEventHandler = (isProcess) => {
            this._process = isProcess;
            const newText = '현재 도로시 대기중 입니다.';
            if(isProcess){
                document.getElementById("__contents__loading").innerHTML = `
                      <div class="loading">
                        <div class="spinner">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      ${newText}
                    `;
                const __contents__loading = document.getElementById("__contents__loading");
                __contents__loading.style.removeProperty("display");
                __contents__loading.style.removeProperty("opacity");
                __contents__loading.style.removeProperty("visibility");

                __contents__loading.style.display="flex";
            } else {
                document.getElementById("__contents__loading").style.display="none";
            }
        }
        this._definedReg = /<br\s*\/?>/gi;

    }
    // 도로시 알림봇 나와의 채팅방 정보 미리 세팅 필요
    get process() {
        return this._process;
    }

    get awpMessenger(){
        return this._awpMessenger;
    }

    set process(value) {
        this._process = value;
    }

    get formData() {
        return this._formData;
    }

    set formData(value) {
        this._formData = value;
    }

    get currentRoomInfo() {
        return this._currentRoomInfo;
    }

    set currentRoomInfo(value) {
        this._currentRoomInfo = value;
    }

    get roomAwpMessageDetailListMap() {
        return this._roomAwpMessageDetailListMap;
    }

    get roomAwpAlarmMessageDetailListMap() {
        return this._roomAwpAlarmMessageDetailListMap;
    }

    get func(){
        return this._func;
    }

    get isDorothyProcessEventHandler (){
        return this._isDorothyProcessEventHandler
    }
    get definedReg() {
        return this._definedReg;
    }

    init(chatRoomId) {
        const loginInfo = this._loginInfo;
        const tempServerChatData = document.getElementById('tempServerChatData');
        let previousMessageDetail= null;
        const tempAwpMessageDetailList = [];

        if(tempServerChatData !==  null){
            const tempList = Array.from(
                tempServerChatData?.children || []
            );
            tempList
                .filter(item => item.dataset.messageId && !isNaN(Number(item.dataset.messageId)) && !(Number(item.dataset.messageId) === 0) ) // 유효한 messageId만 필터링
                .forEach( (item) => {
                    // 첨부파일
                    const attachmentElements = item.querySelectorAll("#messageAttachments .attachmentData");
                    const attachmentList = Array.from(attachmentElements).map(att => this._createAttachment(att));

                    // 상위글의 첨부파일
                    const upperAttachmentElements = item.querySelectorAll("#upperMessageAttachments .attachmentData");
                    const upperAttachmentList = Array.from(upperAttachmentElements).map(att => this._createAttachment(att));

                    const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.dataset.messageId),this._createMessage(item),attachmentList,this._createUpperMessage(item),upperAttachmentList,previousMessageDetail)
                    previousMessageDetail = awpMessageDetail;
                    tempAwpMessageDetailList.push(awpMessageDetail);
                });
            this._roomAwpMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
            /*tempServerChatData.innerText = "";*/
        } else {
            this._roomAwpMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
        }

        return this._roomAwpMessageDetailListMap;
    }

    initDefault(chatRoomId) {
        const loginInfo = this._loginInfo;
        const tempServerChatData = document.getElementById('tempServerChatData');
        let previousMessageDetail= null;
        const tempAwpMessageDetailList = [];

        if(tempServerChatData !==  null){
            const tempList = Array.from(
                tempServerChatData?.children || []
            );
            tempList
                .filter(item => item.dataset.messageId && !isNaN(Number(item.dataset.messageId)) && !(Number(item.dataset.messageId) === 0) ) // 유효한 messageId만 필터링
                .sort((a, b) => Number(a.dataset.messageId) - Number(b.dataset.messageId) )
                .forEach( (item) => {
                    const emojiList = Array.from(item.querySelectorAll('.emoji-dto'));

                    // 첨부파일
                    const attachmentElements = item.querySelectorAll("#messageAttachments .attachmentData");
                    const attachmentList = Array.from(attachmentElements).map(att => this._createAttachment(att));

                    // 상위글의 첨부파일
                    const upperAttachmentElements = item.querySelectorAll("#upperMessageAttachments .attachmentData");
                    const upperAttachmentList = Array.from(upperAttachmentElements).map(att => this._createAttachment(att));

                    const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.dataset.messageId),this._createMessage(item),attachmentList,this._createUpperMessage(item),upperAttachmentList,previousMessageDetail,emojiList)
                    previousMessageDetail = awpMessageDetail;
                    tempAwpMessageDetailList.push(awpMessageDetail);
                });
            this._roomAwpMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
            /*tempServerChatData.innerText = "";*/
        } else {
            this._roomAwpMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
        }

        return this._roomAwpMessageDetailListMap;
    }

    initAlarm(chatRoomId) {
        const loginInfo = this._loginInfo;
        const tempServerAlarmData = document.getElementById('tempServerAlarmData');
        let previousAlarmMessageDetail= null;
        const tempAwpMessageDetailList = [];

        if(tempServerAlarmData !==  null){
            const tempList = Array.from(
                tempServerAlarmData?.children || []
            );
            tempList
                .filter(item => item.dataset.messageId && !isNaN(Number(item.dataset.messageId)) && !(Number(item.dataset.messageId) === 0) ) // 유효한 messageId만 필터링
                // .sort((a, b) => Number(b.dataset.messageId) - Number(a.dataset.messageId) )
                .forEach( (item) => {
                    const awpAlarmMessageDetail = new AWPMessageAlarm(loginInfo,Number(item.dataset.messageId),this._createAlarm(item),previousAlarmMessageDetail)
                    previousAlarmMessageDetail = awpAlarmMessageDetail;
                    tempAwpMessageDetailList.push(awpAlarmMessageDetail);
                });
            this._roomAwpAlarmMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
            /*tempServerChatData.innerText = "";*/
        } else {
            this._roomAwpAlarmMessageDetailListMap.set(chatRoomId,tempAwpMessageDetailList)
        }

        return this._roomAwpAlarmMessageDetailListMap;
    }

    publishPraiseMessage(roomInfo,context) {
        this._publish.publishPraiseMessage(this._loginInfo,roomInfo,context)
    }

    publishRoomMessage(roomInfo,type,context) {
        return this._publish.publishRoomMessage(this._loginInfo,roomInfo,type,context)
    }

    subscribeList(messenger){
        const funcCallback = this._callbackRoomList;
        this._awpMessenger = messenger
        this._subscribe.subscribeList(this._awpMessenger,funcCallback)
    }

    subscribeRoomDetail(messenger){
        const funcCallback = this._callbackRoomDetail;
        this._awpMessenger = messenger
        this._subscribe.subscribeRoomDetail(this._awpMessenger,funcCallback)
    }

    subscribeNotice(messenger){
        const funcCallback = this._callbackNotice;
        this._awpMessenger = messenger
        this._subscribe.subscribeNotice(this._awpMessenger,funcCallback)
    }

    subscribeRoom(){
        const isRoomInfoExist = (Info,subscribeRoomInfoList) => {
            if(subscribeRoomInfoList.length === 0){
                return false;
            } else {
                return subscribeRoomInfoList.some((preRoomInfo) => {
                    if(preRoomInfo === null)
                        return false;
                    return preRoomInfo.roomId === Info.roomId
                });
            }
        };

        const {chatRoomId,chatRoomType }= document.querySelector('.chatList.is-active').dataset;

        const roomInfo=new RoomList(chatRoomId,chatRoomType);

        if(isRoomInfoExist(roomInfo,this._subscribeRoomInfoList)){
            this._currentRoomInfo = roomInfo;
        } else {
            this._subscribeRoomInfoList.push(roomInfo)
            this._currentRoomInfo = roomInfo;
            this._subscribe.subscribeRoom(this._awpMessenger,roomInfo,this._callbackRoomMessage)
        }
    }

    subscribeMyRoom(messenger){
        const roomInfo = messenger.view.SELF
        this._subscribeRoomInfoList.push(roomInfo)
        this._subscribe.subscribeRoom(messenger,roomInfo,this._callbackMyMessage)
    }

    _callbackMyMessage(messenger, serverBody) {
        const message = JSON.parse(serverBody);
        const serverMessage= messenger.message._func.makeMessage(message);
        const awpMessageDetail = serverMessage.awpMessageDetail(messenger.loginInfo, message);
        const roomId = serverMessage.roomId;
        const currentRoomInfo = messenger.message.currentRoomInfo;
        const companyOrgUser = messenger.view.companyOrgUser

        const fixedRoomListViewElement = messenger.view.fixedRoomListViewElement;
        const self = fixedRoomListViewElement.querySelector('[data-chat-room-type="SELF"]');
        const selfTextContent =self.querySelector('.chat .chat__text');
        // const selfTextCount = self.querySelector('.chat .chat__count');
        const definedReg = messenger.message.definedReg
        let decodedText = new DOMParser().parseFromString(serverMessage.messageContent, "text/html").body.textContent;
        decodedText = decodedText.replace(definedReg, "").trim();
        selfTextContent.textContent = decodedText;
        // selfTextCount.textContent = Number(self.dataset.chatRoomUnreadMessageCount) + 1;
        // self.dataset.chatRoomUnreadMessageCount = (Number(self.dataset.chatRoomUnreadMessageCount)+1).toString()

        // 현재 방과 수신된 메시지의 방 ID가 일치하는지 확인
        if (currentRoomInfo === null || roomId !== currentRoomInfo.roomId){
            return;
        }

        messenger.message.currentRoomInfo = messenger.view.SELF;

        const roomAwpMessageDetailList = messenger.message.roomAwpMessageDetailListMap.get(roomId) || [];
        const roomAwpMessageDetailListLength = roomAwpMessageDetailList.length;
        awpMessageDetail.previousMessageDetail = roomAwpMessageDetailListLength > 0 ? roomAwpMessageDetailList[roomAwpMessageDetailListLength - 1] : null
        roomAwpMessageDetailList.push(awpMessageDetail);

        const chatMessageBody = messenger.view.contentViewElement.querySelector('.chatBox__body');
        const mvc = messenger.view.messageViewComponent;
        const scrollToLastChatCard = messenger.message._func.scrollToLastChatCard;
        const chatBoxScrollToLast = messenger.message._func.chatBoxScrollToLast;
        const focusToElement= messenger.message._func.focusToElement

        new Promise((resolve) => {
            const first = awpMessageDetail.previousMessageDetail === null;
            const mine = awpMessageDetail.isMine;

            const subMessageType = awpMessageDetail.message.messageType;

            const executeTalkHandler = () => {
                const htmlElementFunc = (isMine,htmlElement) => {
                    if(isMine){
                        return mvc.wholeMyTextChatBox(awpMessageDetail,htmlElement,companyOrgUser);
                    } else {
                        return mvc.wholeYourChatBox(awpMessageDetail,htmlElement,companyOrgUser);
                    }
                }
                const htmlElement = mvc.componentTextChatCardGroup(awpMessageDetail,true);

                if(first) {
                    chatMessageBody.appendChild(mvc.chatBoxDivider(awpMessageDetail))
                }
                chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
            }
            const executePraiseHandler = () => {
                const praiseChatBoxChat = mvc.PraiseChatBox_chat(awpMessageDetail.message,true,companyOrgUser.user);
                chatMessageBody.appendChild(praiseChatBoxChat);
            }


            switch (subMessageType){
                case messageType.TALK:
                    executeTalkHandler();
                    break;
                case messageType.PRAISE_IMG_01:
                case messageType.PRAISE_IMG_02:
                case messageType.PRAISE_IMG_03:
                case messageType.PRAISE_IMG_04:
                    executePraiseHandler();
                    break;

            }

            const length = chatMessageBody.querySelectorAll('.chatCard').length;
            const lastChatCard = chatMessageBody.querySelectorAll('.chatCard')[length -1];
            resolve(lastChatCard);
        })
            .then((lastChatCard) => {
                const attachmentList = lastChatCard.querySelectorAll('.attachmentList .attachment');
                if(attachmentList.length > 0){
                    mvc.chatFileFunction(attachmentList);
                }
            })
            .then(() => {
                chatBoxScrollToLast();
                // scrollToLastChatCard();
                // 2025.04.10 김광길 상대편 입력 메시지 초기화로 인한 주석처리
                // focusToElement(document.querySelector('.chatBox__writeField textarea'));
            })
    }

    subscribeDorothy(messenger){
        const roomInfo = messenger.view.DOROTHY
        this._subscribeRoomInfoList.push(roomInfo)
        this._subscribe.subscribeRoom(messenger,roomInfo,this._callbackDorothyMessage)
    }

    _callbackDorothyMessage(messenger, serverBody) {
        const message = JSON.parse(serverBody);
        const serverMessage= messenger.message._func.makeMessage(message);
        const awpMessageDetail = serverMessage.awpMessageDetail(messenger.loginInfo, message);
        const roomId = serverMessage.roomId;
        const currentRoomInfo = messenger.message.currentRoomInfo;
        // 현재 방과 수신된 메시지의 방 ID가 일치하는지 확인
        if (roomId !== currentRoomInfo.roomId){
            const fixedRoomListViewElement = messenger.view.fixedRoomListViewElement;
            const dorothy = fixedRoomListViewElement.querySelector('[data-chat-room-type="DOROTHY"]');
            const dorothyTextContent =dorothy.querySelector('.chat .chat__text');
            // const dorothyTextCount = dorothy.querySelector('.chat .chat__count');
            dorothyTextContent.textContent = serverMessage.messageContent;
            // dorothyTextCount.textContent = Number(dorothyTextCount.textContent) + 1;
            return;
        }

        const companyOrgUser = messenger.view.companyOrgUser
        messenger.message.currentRoomInfo = messenger.view.DOROTHY;

        const roomAwpMessageDetailList = messenger.message.roomAwpMessageDetailListMap.get(roomId) || [];
        const roomAwpMessageDetailListLength = roomAwpMessageDetailList.length;
        awpMessageDetail.previousMessageDetail = roomAwpMessageDetailListLength > 0 ? roomAwpMessageDetailList[roomAwpMessageDetailListLength - 1] : null
        roomAwpMessageDetailList.push(awpMessageDetail);

        const chatMessageBody = messenger.view.contentViewElement.querySelector('.chatBox__body');
        const mvc = messenger.view.messageViewComponent;
        const scrollToLastChatCard = messenger.message._func.scrollToLastChatCard;
        const chatBoxScrollToLast = messenger.message._func.chatBoxScrollToLast;


        const focusToElement= messenger.message._func.focusToElement

        new Promise((resolve) => {
            const first = awpMessageDetail.previousMessageDetail === null;
            const htmlElementFunc = (htmlElement) => {
                return mvc.DorothyChatBox(awpMessageDetail, htmlElement,companyOrgUser);
            };
            const htmlElement = mvc.DorothyChatCardGroup(awpMessageDetail, true);
            if (first) {
                chatMessageBody.appendChild(mvc.chatBoxDivider(awpMessageDetail));
            }
            chatMessageBody.appendChild(htmlElementFunc(htmlElement));

            const length = chatMessageBody.querySelectorAll('.chatBox__chat').length;
            const lastChatCard = chatMessageBody.querySelectorAll('.chatBox__chat')[length -1];
            resolve(lastChatCard);
        })
            .then((lastChatCard) => {
                chatBoxScrollToLast();
                focusToElement(document.querySelector('.chatBox__writeField textarea'));

                if(lastChatCard.classList.contains('is-dorothy')){
                    messenger.message.isDorothyProcessEventHandler(false);
                } else {
                    messenger.message.isDorothyProcessEventHandler(true);
                }
            })
            .catch(() => {
                messenger.message.isDorothyProcessEventHandler(false);
            })

    }

    subscribeAlarm(messenger){
        const roomInfo = messenger.view.ALARM;
        this._subscribeRoomInfoList.push(roomInfo)
        this._subscribe.subscribeRoom(messenger,roomInfo,this._callbackAlarmMessage)
    }

    _callbackAlarmMessage(messenger, serverBody) {
        const message = JSON.parse(serverBody);
        const serverAlarm= messenger.message._func.makeAlarm(message);
        const awpAlarmMessageDetail = serverAlarm.awpMessageAlarm(messenger.loginInfo)
        const roomId = serverAlarm.roomId;
        const currentRoomInfo = messenger.message.currentRoomInfo ?? null;
        const companyOrgUser = messenger.view.companyOrgUser
        // 현재 방과 수신된 메시지의 방 ID가 일치하는지 확인

        const fixedRoomListViewElement = messenger.view.fixedRoomListViewElement;
        const alarmBot = fixedRoomListViewElement.querySelector('[data-chat-room-type="ALARM"]');
        const alarmTextContent =alarmBot.querySelector('.chat .chat__text');
        const alarmTextCount = alarmBot.querySelector('.chat .chat__count');

        const parser = new DOMParser();
        alarmTextContent.textContent = parser.parseFromString(serverAlarm.messageText, "text/html").body.textContent;
        // alarmTextCount.textContent = Number(alarmBot.dataset.chatRoomUnreadMessageCount) + 1;
        // alarmBot.dataset.chatRoomUnreadMessageCount = (Number(alarmBot.dataset.chatRoomUnreadMessageCount)+1).toString()
        alarmTextCount.style.display ='none';
        if (currentRoomInfo === null || roomId !== currentRoomInfo.roomId){
            alarmTextCount.style.display ='block';
            return;
        }

        messenger.message.currentRoomInfo = messenger.view.ALARM;
        const roomAwpAlarmMessageDetailList = messenger.message.roomAwpAlarmMessageDetailListMap.get(roomId) || [];
        const roomAwpAlarmMessageDetailListLength = roomAwpAlarmMessageDetailList.length;
        awpAlarmMessageDetail.previousMessageDetail = roomAwpAlarmMessageDetailListLength > 0 ? roomAwpAlarmMessageDetailList[roomAwpAlarmMessageDetailListLength - 1] : null
        roomAwpAlarmMessageDetailList.push(awpAlarmMessageDetail);

        const chatMessageBody = messenger.view.contentViewElement.querySelector('.chatBox__body');
        const mvc = messenger.view.messageViewComponent;
        const loginInfo = messenger.message.loginInfo;
        const formData = messenger.message.formData;
        const contentViewElement = messenger.view.contentViewElement;
        const scrollToLastChatCard = messenger.message._func.scrollToLastChatCard;
        const chatBoxScrollToLast = messenger.message._func.chatBoxScrollToLast;
        const focusToElement= messenger.message._func.focusToElement

        new Promise((resolve) => {
            const sendSystem = awpAlarmMessageDetail.alarm.sendSystem;
            const alarmType = awpAlarmMessageDetail.alarm.alarmType;

            switch (sendSystem){
                case "MESSENGER":
                    switch (alarmType){
                        case "PRAISE":
                            chatMessageBody.appendChild(mvc.Praise_Alarm(awpAlarmMessageDetail.alarm));
                            break;
                    }
                    break;
                case "TODO":
                    switch (alarmType){
                        case "CONFIRM":
                            chatMessageBody.appendChild(mvc.TODO_CONFIRM_Alarm(awpAlarmMessageDetail.alarm,loginInfo));
                            break;
                        case "INTERNAL_LINK":
                            chatMessageBody.appendChild(mvc.TODO_INTERNAL_LINK_Alarm(awpAlarmMessageDetail.alarm,loginInfo));
                            break;
                        case "NOTICE":
                            chatMessageBody.appendChild(mvc.TODO_INTERNAL_LINK_Alarm(awpAlarmMessageDetail.alarm,loginInfo));
                            break;
                    }
                    break;
            }


            const length = chatMessageBody.querySelectorAll('.chatCard').length;
            const lastChatCard = chatMessageBody.querySelectorAll('.chatCard')[length -1];
            resolve(lastChatCard);
        })
            .then(() => {
                // scrollToLastChatCard();
                chatBoxScrollToLast();
            })
    }

    _callbackRoomMessage(messenger, serverBody) {
        const message = JSON.parse(serverBody);
        const serverMessage= messenger.message._func.makeMessage(message);
        const awpMessageDetail = serverMessage.awpMessageDetail(messenger.loginInfo, message);

        const roomId = serverMessage.roomId;
        const currentRoomInfo = messenger.message.currentRoomInfo;
        const element = document.querySelector('.chatList.is-active');

        // 현재 방과 수신된 메시지의 방 ID가 일치하는지 확인
        if (roomId !== currentRoomInfo.roomId) return;

        const companyOrgUser = messenger.view.companyOrgUser;
        const chatMessageBody = messenger.view.contentViewElement.querySelector('.chatBox__body');
        const mvc = messenger.view.messageViewComponent;
        const formData = messenger.message.formData;
        const contentViewElement = messenger.view.contentViewElement;
        const scrollToLastChatCard = messenger.message._func.scrollToLastChatCard;
        const chatBoxScrollToLast = messenger.message._func.chatBoxScrollToLast;

        const focusToElement= messenger.message._func.focusToElement;
        const loginInfo = messenger.loginInfo;
        const func = messenger.message.func;


        const roomAwpMessageDetailList = messenger.message.roomAwpMessageDetailListMap.get(roomId) || [];
        const roomAwpMessageDetailListLength = roomAwpMessageDetailList.length;
        awpMessageDetail.previousMessageDetail = roomAwpMessageDetailListLength > 0 ? roomAwpMessageDetailList[roomAwpMessageDetailListLength - 1] : null
        roomAwpMessageDetailList.push(awpMessageDetail);

        const executeTalkEvent = () => {

            new Promise((resolve) => {
                const first = awpMessageDetail.previousMessageDetail === null;
                const mine = awpMessageDetail.isMine;
                const sameUser = first ? mine : awpMessageDetail.isSameUser;

                const htmlElementFunc = (isMine,htmlElement) => {
                    if(isMine){
                        return mvc.wholeMyTextChatBox(awpMessageDetail,htmlElement,companyOrgUser);
                    } else {
                        return mvc.wholeYourChatBox(awpMessageDetail,htmlElement,companyOrgUser);
                    }
                }
                /*const htmlElement = htmlElementFunc(mine);*/
                const htmlElement = mvc.componentTextChatCardGroup(awpMessageDetail,true);

                if(first) {
                    chatMessageBody.appendChild(mvc.chatBoxDivider(awpMessageDetail))
                    chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
                } else {
                    if(chatMessageBody.lastElementChild.classList.contains('chatBox__divider')){
                        chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
                    } else {
                        if(awpMessageDetail.isSameCreateDt){
                            if(sameUser){
                                const length = chatMessageBody.querySelectorAll('.chatCard').length;
                                const lastChatCard = chatMessageBody.querySelectorAll('.chatCard')[length -1];
                                lastChatCard.appendChild(htmlElement)
                            } else {
                                chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
                            }
                        } else {
                            if(awpMessageDetail.isSameDate){
                                chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
                            } else {
                                chatMessageBody.appendChild(mvc.chatBoxDivider(awpMessageDetail))
                                chatMessageBody.appendChild(htmlElementFunc(mine,htmlElement));
                            }
                        }
                    }
                }
                const length = chatMessageBody.querySelectorAll('.chatCard').length;
                const lastChatCard = chatMessageBody.querySelectorAll('.chatCard')[length -1];
                resolve(lastChatCard);
            })
                .then((lastChatCard) => {
                    const length = lastChatCard.querySelectorAll('.chatCard__group .card').length;
                    const lastChatCard__group_card = lastChatCard.querySelectorAll('.chatCard__group .card')[length -1];
                    mvc.chatFunctionMenu(Array.of(lastChatCard__group_card),contentViewElement,element);
                    return lastChatCard
                })
                .then((lastChatCard) => {
                    const attachmentList = lastChatCard.querySelectorAll('.attachmentList .attachment');
                    if(attachmentList.length > 0){
                        mvc.chatFileFunction(attachmentList);
                    }
                    return func.updateReadMessage(updateType.MESSAGE, roomId, loginInfo.userKey)
                        .catch(err => {
                            this._func.showToastModal("updateReadMessage 호출 중 오류 발생:", err);
                            return Promise.resolve(); // 오류가 발생해도 이후 체인이 계속 실행되도록 보장
                        });
                })
                .then(() => {
                    chatBoxScrollToLast();
                    // scrollToLastChatCard();
                    // 2025.04.10 김광길 상대편 입력 메시지 초기화로 인한 주석처리
                    // focusToElement(document.querySelector('.chatBox__writeField textarea'));
                })
                .then(() => {
                    document.getElementById('summaryBtn').style.display='none'
                })
                .finally(() =>{})
        }

        const executeUpdateEvent = () => {
            mvc.chatBoxDividerUpdateMessage(chatMessageBody, awpMessageDetail);
        }

        const executeJoinEvent = () => {
            chatMessageBody.appendChild(mvc.chatBoxDividerJoinMessage(awpMessageDetail));
            chatBoxScrollToLast();
        }

        const executeExitEvent = () => {
            chatMessageBody.appendChild(mvc.chatBoxDividerExitMessage(awpMessageDetail));
            chatBoxScrollToLast();
        }

        const executeExportEvent = () => {
            chatMessageBody.appendChild(mvc.chatBoxDividerExportMessage(awpMessageDetail));
            chatBoxScrollToLast();
        }

        const executeDiscardEvent = () => {
            const messageId = Number(awpMessageDetail.message.messageContent);
            const delMessageId = document.querySelector(`.chatCard__group[data-message-id="${messageId}"]`);
            const upperMessageId = document.querySelector(`.chatCard__group .replyBox[data-message-id="${messageId}"]`);

            if(delMessageId){
                delMessageId.dataset.deletedYn = 'Y';
                const cardText= delMessageId.querySelector('.card__text');
                if(cardText){
                    cardText.textContent =  '사용자가 삭제한 메시지입니다.';
                }

                // 메시지 삭제 시 파일도 삭제 처리 - 2025.04.14 김광길 추가
                const cardFile = delMessageId.querySelector('.card__file');
                if(cardFile){
                    cardFile.remove();
                }

                //이모지 리스트 제거
                const reactElement = delMessageId.querySelector('.chatCard__react');
                if (reactElement) {
                    reactElement.remove();
                }

            }
            if(upperMessageId){
                upperMessageId.dataset.messageContent =  '사용자가 삭제한 메시지입니다.';
                upperMessageId.querySelector('.replyBox__body').textContent =  '사용자가 삭제한 메시지입니다.';
            }

        }

        switch (serverMessage.messageType){
            case messageType.TALK:
                executeTalkEvent();
                break;
            case messageType.UPDATE:
                executeUpdateEvent();
                break;
            case messageType.JOIN:
                executeJoinEvent();
                break;
            case messageType.EXIT:
                executeExitEvent();
                break;
            case messageType.EXPORT:
                executeExportEvent();
                break;
            case messageType.DISCARD:
                executeDiscardEvent();
                break;
            case messageType.EMOJI:
                messenger._view._messageViewComponent.updateReactionsByWebsocket(serverMessage.messageId);
                break;
        }

    }

    _callbackRoomList(messenger,serverBody){
        const loginInfo = messenger.loginInfo;
        const mvc = messenger.view.messageViewComponent;
        const roomListMap = messenger.view.roomListMap;
        const serverMessage= messenger.message.func.makeMessage(JSON.parse(serverBody))
        // const awpMessageDetail = serverMessage.awpMessageDetail(messenger.loginInfo, null);
        const roomId = serverMessage.roomId;
        const chatElement = messenger.view.subViewElement.querySelector(`[data-chat-room-id="${roomId}"]`);
        const roomAwpMessageDetailListMap = messenger.message.roomAwpMessageDetailListMap.get(roomId);

        const unFixedRoomListViewElement = messenger.view.unFixedRoomListViewElement;
        const unFixedRoomChatElement = unFixedRoomListViewElement.querySelector(`[data-chat-room-id="${roomId}"]`);

        const definedReg = messenger.message.definedReg


        const executeChatElementEvent = (chatElement,serverMessage,currentRoomInfo,roomAwpMessageDetailListMap) => {
            const chatText = chatElement.querySelector('.chat__text');
            const chatCount = chatElement.querySelector('.chat__count');
            const chatTimeText = chatElement.querySelector('.chatUser .time');

            let decodedText = new DOMParser().parseFromString(serverMessage.messageContent, "text/html").body.textContent;
            decodedText = decodedText.replace(definedReg, "").trim();

            switch (serverMessage.message.messageType){
                case messageType.DISCARD:
                    const chatBoxBody = document.querySelector('.chatBox__body');
                    if (!chatBoxBody) break;
                    const chatGroups = chatBoxBody.querySelectorAll('.chatCard__group');
                    const lastChatGroup = chatGroups[chatGroups.length - 1];
                    if(Number(serverMessage.messageContent) === Number(lastChatGroup.dataset.messageId)){
                        chatText.innerText = '사용자가 삭제한 메세지입니다.';
                        chatTimeText.innerText = serverMessage.createDtFormatted;
                        chatElement.dataset.chatRoomMessageId = serverMessage.messageId
                        chatElement.dataset.chatRoomMessageType = serverMessage.message.messageType
                        chatElement.dataset.chatRoomLastMessageContent = '사용자가 삭제한 메세지입니다.';
                        chatElement.dataset.chatRoomLastMessageDt = serverMessage.createDt
                    }
                    break;
                default:
                    let displayText = decodedText.split('\n')[0]; // 첫 줄만 추출
                    const maxLength = 22;

                    if (displayText.length > maxLength) {
                        displayText = displayText.substring(0, maxLength) + '...';
                    }

                    chatText.innerText = displayText;
                    chatTimeText.innerText = serverMessage.createDtFormatted;
                    chatElement.dataset.chatRoomMessageId = serverMessage.messageId
                    chatElement.dataset.chatRoomMessageType = serverMessage.message.messageType
                    chatElement.dataset.chatRoomLastMessageContent = serverMessage.messageContent
                    chatElement.dataset.chatRoomLastMessageDt = serverMessage.createDt
                    break;
            }

            const serverRoomId=(currentRoomInfo !== null ? currentRoomInfo.roomId : null);
            // 현재 방과 수신된 메시지의 방 ID가 일치하는지 확인
            if (roomId !== serverRoomId) {
                chatCount.textContent = Number(chatCount.textContent) + 1;
                chatCount.style.display = 'block';
                chatElement.dataset.chatRoomUnreadMessageCount = (Number(chatElement.dataset.chatRoomUnreadMessageCount)+1).toString()
            } else {
                chatCount.textContent = Number(0);
                chatCount.style.display = 'none';
                chatElement.dataset.chatRoomUnreadMessageCount = (Number(0)).toString()
            }
        }

        if(chatElement) {
            executeChatElementEvent(chatElement,serverMessage,messenger.message.currentRoomInfo,roomAwpMessageDetailListMap);

            if(unFixedRoomChatElement){
                const unFixedRoomList = unFixedRoomListViewElement.querySelectorAll('a.chatList')
                if(unFixedRoomList.length > 1){
                    unFixedRoomListViewElement.insertBefore(chatElement,unFixedRoomList[0]);
                }
            }

        } else {
            const url = `/messenger/room/${roomId}`;
            fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.json())
                .then(response => {
                    const tempRoomList = messenger.message.func.makeRoomList(response.data);
                    const tempRoomListElement = mvc.makeRoomList(tempRoomList,loginInfo);
                    const subViewElement = messenger.view.subViewElement;
                    const unfixedRoomList = subViewElement.querySelectorAll('.messageList__list')[1];
                    const firstRoomList = unfixedRoomList.querySelectorAll('a.chatList')[0];
                    if(firstRoomList === undefined){
                        unfixedRoomList.querySelector('.messageList__list .chatList.is-empty')?.remove();
                        unfixedRoomList.appendChild(tempRoomListElement) ;
                    } else {
                        unfixedRoomList.insertBefore(tempRoomListElement,firstRoomList);
                    }
                    tempRoomListElement.removeEventListener('click', messenger.view.handleChatClick);
                    tempRoomListElement.addEventListener('click', messenger.view.handleChatClick);

                    const chatListLayer = document.getElementById('ChatListLayer');
                    const chatRoomMoreButton = tempRoomListElement.querySelector('.more button.btn.has-icon');
                    const viewport= tempRoomListElement.closest('[data-overlayscrollbars-viewport]');

                    chatRoomMoreButton.addEventListener('click', (event) => {
                        mvc.makeRoomMoreButtonLayer(chatRoomMoreButton,chatListLayer,messenger.view.fixedRoomListViewElement,messenger.view.unFixedRoomListViewElement);
                    })
                    viewport.parentElement.addEventListener('scroll', () => {
                        document.getElementById("ChatListLayer").style.display = "none";
                    })
                    roomListMap.set(roomId,tempRoomList);
                })
                .then(() => {
                    const chatElement = messenger.view.subViewElement.querySelector(`[data-chat-room-id="${roomId}"]`);
                    executeChatElementEvent(chatElement,serverMessage,messenger.message.currentRoomInfo);
                })
                .catch((err) => {
                    console.log("_callbackRoomList",err);
                })
        }
    }
    _callbackRoomDetail(messenger,serverBody){
        const tempRoomDetail = messenger.message.func.makeRoomDetail(JSON.parse(serverBody));
        const roomId = tempRoomDetail.roomId;
        const chatElement = messenger.view.subViewElement.querySelector(`[data-chat-room-id="${roomId}"]`);
        const chatElementName = chatElement.querySelector('.name');
        if(tempRoomDetail.roomName){
            chatElement.dataset.chatRoomName = tempRoomDetail.roomName;
            chatElementName.textContent = tempRoomDetail.roomName;
        }
        if(tempRoomDetail.description){
            chatElement.dataset.chatRoomDescription = tempRoomDetail.description;
        }


    }
    _callbackNotice(messenger,serverBody){
        const serverMessage= messenger.message._func.makeMessage(JSON.parse(serverBody))
        const roomId = serverMessage.roomId;
    }
    _createMessage(item) {
        return this._func.makeMessage(item.dataset);
    }
    _createAttachment(item) {
        return this._func.makeAttachment(item.dataset);
    }
    _createAlarm(item) {
        return this._func.makeAlarm(item.dataset);
    }
    _createUpperMessage(item) {
        return this._func.makeUpperMessage(item.dataset);
    }
    _createSubUpperMessage(item) {
        if(item.upperMessageDto == null) return;
        return this._func.makeUpperMessage(item.upperMessageDto);
    }

    publishEmoji(loginInfo,roomId,messageId,type){
        return this._publish.publishEmoji(loginInfo,roomId,messageId,type)
    }


}
