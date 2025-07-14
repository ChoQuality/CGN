class AWPMessageViewComponent {
    constructor(loginInfo,companyOrgUser,applicationElement,subViewElement,contentViewElement,clsMessage,func) {
        this._loginInfo = loginInfo;
        this._companyOrgUser = companyOrgUser;
        this._applicationElement = applicationElement;
        this._subViewElement = subViewElement;
        this._contentViewElement = contentViewElement
        this._clsMessage = clsMessage;
        this._func = func;
        this._emojiPicker = func.getNewEmojiButton();
        this._editEmojiPicker = func.getNewEmojiButton();
        this._messageId = ""; //emojipicker 구분용
    }


    get emojiPicker() {
        return this._emojiPicker;
    }

    get editEmojiPicker() {
        return this._editEmojiPicker;
    }

    scrollDeleteMoreButtonLayer(card__moreBtn, moreButtonLayer,moreButton) {
        const viewport = card__moreBtn.closest('[data-overlayscrollbars-viewport]');

        // 스크롤 이벤트 핸들러 정의
        const onScroll = () => {
            if (moreButtonLayer) {
                moreButtonLayer.style.display = 'none'; // Hide the element
            }
            moreButton.classList.remove('is-active');
            // 이벤트를 한 번 실행한 후 제거
            viewport.removeEventListener('scroll', onScroll);
        };

        // 스크롤 이벤트 리스너 추가
        viewport.addEventListener('scroll', onScroll);
    }

    addEventClickFileUpload(contentViewElement,roomId,formData){
        const file = formData.get("file");
        const chatBox__footer = contentViewElement.querySelector('.chatBox__footer');
        const chatBox__footer__writeField = chatBox__footer.querySelector('.chatBox__writeField');
        const replyBox = this._replyFileBox(roomId,file.name);
        const replyBox__header_button = replyBox.querySelector('.replyBox__header button');
        chatBox__footer.insertBefore(replyBox, chatBox__footer__writeField);

        replyBox__header_button.addEventListener('click',function (){
            if(replyBox){
                replyBox.remove();
                document.getElementById("file_input").value = "";
            }
        })
    }

    addEventClickMoreButtonLayer(card__moreBtn, moreButtonLayer,contentViewElement,roomId) {
        /*const viewport = card__moreBtn.closest('[data-overlayscrollbars-viewport]');*/
        const replyChatButton = moreButtonLayer.querySelectorAll("li a")[0];
        const deleteChatButton = moreButtonLayer.querySelectorAll("li a")[1];
        const chatCard = card__moreBtn.closest('.chatCard');
        const chatCard__group = card__moreBtn.closest('.chatCard__group');
        const chatBox__footer = contentViewElement.querySelector('.chatBox__footer');
        const chatBox__footer__writeField = chatBox__footer.querySelector('.chatBox__writeField');
        /*const event = new Event('scroll', { bubbles: true });*/

        const replyBox = this._replyBox(chatCard,chatCard__group,roomId);
        const replyBox__header_button = replyBox.querySelector('.replyBox__header button');
        const replyButtonClickHandler = () => {
            const previousReplyBox = document.getElementById('_replyBox');
            if (previousReplyBox) {
                previousReplyBox.remove();
            }

            chatBox__footer.insertBefore(replyBox, chatBox__footer__writeField);
            /*viewport.dispatchEvent(event);*/
            replyBox__header_button.addEventListener('click', function() {
                if (replyBox) {
                    replyBox.remove();
                }
            });
            replyChatButton.removeEventListener('click', replyButtonClickHandler);
        };

        replyChatButton.addEventListener('click', replyButtonClickHandler);

        deleteChatButton.addEventListener('click', function(){
        });
    }
    _replyBox(chatCard,chatCard__group,roomId) {

        let originText = chatCard__group.querySelector('.card__text').innerText
        const chatBox__reply = document.createElement("div");
        chatBox__reply.id="_replyBox";
        chatBox__reply.classList.add("chatBox__reply");
        chatBox__reply.dataset.roomId = chatCard__group.dataset.roomId ?? ""
        chatBox__reply.dataset.company = chatCard__group.dataset.company ?? ""
        chatBox__reply.dataset.roomType = chatCard__group.dataset.roomType ?? ""
        chatBox__reply.dataset.messageContent = chatCard__group.dataset.messageContent ?? ""
        chatBox__reply.dataset.messageType = chatCard__group.dataset.messageType ?? ""
        chatBox__reply.dataset.userNm = chatCard__group.dataset.userNm ?? ""
        chatBox__reply.dataset.messageUuid = chatCard__group.dataset.messageUuid ?? ""
        chatBox__reply.dataset.replyMessageId = chatCard__group.dataset.replyMessageId ?? ""
        chatBox__reply.dataset.messageId = chatCard__group.dataset.messageId ?? ""
        chatBox__reply.dataset.deletedYn = chatCard__group.dataset.deletedYn ?? ""
        chatBox__reply.dataset.orgNm = chatCard__group.dataset.orgNm ?? ""
        chatBox__reply.dataset.sendUserKey = chatCard__group.dataset.sendUserKey ?? ""
        chatBox__reply.dataset.createUserKey = chatCard__group.dataset.createUserKey ?? ""
        chatBox__reply.dataset.modifyUserKey = chatCard__group.dataset.modifyUserKey ?? ""
        chatBox__reply.dataset.modifyDt = chatCard__group.dataset.modifyDt ?? ""
        chatBox__reply.dataset.createDt = chatCard__group.dataset.createDt ?? ""
        chatBox__reply.dataset.roomName = chatCard__group.dataset.roomName ?? ""
        chatBox__reply.dataset.description = chatCard__group.dataset.description ?? ""
        chatBox__reply.dataset.publishType = chatCard__group.dataset.publishType ?? ""

        chatBox__reply.dataset.upperMessageId = chatCard__group.dataset.upperMessageId ?? ""
        chatBox__reply.dataset.upperRoomId = chatCard__group.dataset.upperRoomId ?? ""
        chatBox__reply.dataset.upperSendUserKey = chatCard__group.dataset.upperSendUserKey ?? ""
        chatBox__reply.dataset.upperUserNm = chatCard__group.dataset.upperUserNm ?? ""
        chatBox__reply.dataset.upperMessageContent = chatCard__group.dataset.upperMessageContent ?? ""
        chatBox__reply.dataset.upperDeletedYn = chatCard__group.dataset.upperDeletedYn ?? ""
        chatBox__reply.dataset.upperCreateDt = chatCard__group.dataset.upperCreateDt ?? ""

        const replyBox = document.createElement("div");
        replyBox.classList.add("replyBox");
        chatBox__reply.appendChild(replyBox);

        const replyBox__header = document.createElement("div");
        replyBox__header.classList.add("replyBox__header");
        replyBox.appendChild(replyBox__header);

        const replyBox__target = document.createElement("div");
        replyBox__target.classList.add("replyBox__target");
        replyBox__header.appendChild(replyBox__target);

        const replyBox__target_span = document.createElement("span");
        replyBox__target.appendChild(replyBox__target_span);

        replyBox__target_span.innerText = chatCard__group.dataset.userNm;
        const replyText = document.createTextNode("에게 답글");
        replyBox__target.appendChild(replyText);

        const replyBox__header_button = document.createElement("button");
        replyBox__header_button.type = "button";
        replyBox__header_button.classList.add("btn","has-icon");
        replyBox__header.appendChild(replyBox__header_button);

        const replyBox__header_button_i = document.createElement("i");
        replyBox__header_button_i.classList.add("icon","is-14","is-chat-cancel");
        replyBox__header_button.appendChild(replyBox__header_button_i);

        const attachmentList = chatCard__group.querySelectorAll(".attachmentList .attachment");
        if(attachmentList.length > 0 && originText === ''){
            originText = "점부파일";
        }

        const replyBox__body = document.createElement("div");
        replyBox__body.classList.add("replyBox__body");
        replyBox__body.innerText = originText;
        replyBox.appendChild(replyBox__body);

        return chatBox__reply;
    }

    _replyFileBox(roomId,filename) {

        const chatBox__reply = document.createElement("div");
        chatBox__reply.id="_replyFileBox";
        chatBox__reply.classList.add("chatBox__reply");
        chatBox__reply.dataset.roomId = roomId

        const replyBox = document.createElement("div");
        replyBox.classList.add("replyBox");
        chatBox__reply.appendChild(replyBox);

        const replyBox__header = document.createElement("div");
        replyBox__header.classList.add("replyBox__header");
        replyBox.appendChild(replyBox__header);

        const replyBox__target = document.createElement("div");
        replyBox__target.classList.add("replyBox__target");
        replyBox__header.appendChild(replyBox__target);

        const replyBox__target_span = document.createElement("span");
        replyBox__target.appendChild(replyBox__target_span);

        /*replyBox__target_span.innerText = filename;*/
        const replyText = document.createTextNode("선택한 파일을 첨부 합니다.(파일 첨부는 한번에 1개만 가능 합니다)");
        replyBox__target.appendChild(replyText);

        const replyBox__header_button = document.createElement("button");
        replyBox__header_button.type = "button";
        replyBox__header_button.classList.add("btn","has-icon");
        replyBox__header.appendChild(replyBox__header_button);

        const replyBox__header_button_i = document.createElement("i");
        replyBox__header_button_i.classList.add("icon","is-14","is-chat-cancel");
        replyBox__header_button.appendChild(replyBox__header_button_i);

        const replyBox__body = document.createElement("div");
        replyBox__body.classList.add("replyBox__body");
        replyBox__body.innerText = filename;
        replyBox.appendChild(replyBox__body);

        return chatBox__reply;
    }

    chatBoxDividerWithLast(messageDetail) {
        const divider = document.createElement("div");
        divider.classList.add("chatBox__divider", "is-line");

        const span = document.createElement("span");
        span.textContent = text;
        divider.appendChild(span);
        return divider;
    }

    chatBoxDivider(messageDetail) {
        const fullDate = messageDetail.message.createDt; // "2024.02.22 HH:mm"
        const dateOnly = fullDate.split(" ")[0]; // 공백 기준으로 나눠 첫 번째 값 가져오기

        const chatBox__divider = document.createElement("div");
        chatBox__divider.classList.add("chatBox__divider");
        chatBox__divider.id = dateOnly;
        const chatBox__divider_span = document.createElement("span");
        chatBox__divider_span.textContent = dateOnly;
        chatBox__divider.appendChild(chatBox__divider_span);
        return chatBox__divider
    }

    chatBoxDividerUpdateMessage(chatMessageBody, messageDetail){
        const messageId = messageDetail.message.messageId.toString();
        const messageDiv = chatMessageBody.querySelector(`[id='${messageId}']`);
        if(messageDiv){
            const messageDeletedYn = messageDetail.message.deletedYn;
            let messageContent = messageDetail.message.messageContent;
            if(messageDeletedYn === 'Y'){
                messageContent = "사용자가 삭제한 메시지입니다.";
                messageDiv.dataset.deletedYn = 'Y';
            }

            const editSpan = messageDiv.querySelector("span.edit");
            if(!editSpan){
                messageDiv.dataset.updateYn = 'Y';
                const editSpanElement = document.createElement('span');
                editSpanElement.classList.add("edit");      // class 속성 지정
                editSpanElement.textContent = '편집됨';  // 텍스트 지정
                messageDiv.insertBefore(editSpanElement, messageDiv.firstChild);
            }

            messageDiv.dataset.messageContent = messageContent;
            const textDiv = messageDiv.querySelector(".card__text");
            if (textDiv) {
                const doc = new DOMParser().parseFromString(messageContent, 'text/html');
                textDiv.innerHTML = doc.documentElement.textContent.replace(/\r\n|\r|\n/g, "<br>");
            }

            const attachmentDiv = messageDiv.querySelector(':scope > .card > .attachmentList')
            if (attachmentDiv) {
                if(messageDeletedYn === 'Y') {
                    attachmentDiv.remove();
                }else {
                    const attachmentList = messageDetail.attachmentList;
                    if (Array.isArray(attachmentList) && attachmentList.length > 0) {
                        const oriAttachmentList = attachmentDiv.querySelectorAll(".attachment");
                        attachmentList.forEach(att => {
                            oriAttachmentList.forEach(oriAtt => {
                                const attDeletedYn = att.deletedYn;
                                const attAttId = Number(att.attachmentId);
                                const oriAttId = Number(oriAtt.dataset.attachmentId);
                                if(attDeletedYn === 'Y' && attAttId === oriAttId){
                                    oriAtt.remove();
                                }
                            });
                        });
                    }
                }
            }
        }
    }

    chatBoxDividerJoinMessage(messageDetail) {
        const fullDate = messageDetail.message.createDt; // "2024.02.22 HH:mm"
        const dateOnly = fullDate.split(" ")[0]; // 공백 기준으로 나눠 첫 번째 값 가져오기

        const chatBox__divider = document.createElement("div");
/*        chatBox__divider.id="roomJoinDivider"*/
        chatBox__divider.dataset.messageId = messageDetail.message.messageId;
        chatBox__divider.classList.add("chatBox__divider");
        const chatBox__divider_span = document.createElement("span");
        chatBox__divider_span.textContent = messageDetail.message.messageContent;
        chatBox__divider.appendChild(chatBox__divider_span);
        return chatBox__divider
    }

    chatBoxDividerExitMessage(messageDetail) {
        const fullDate = messageDetail.message.createDt; // "2024.02.22 HH:mm"
        const dateOnly = fullDate.split(" ")[0]; // 공백 기준으로 나눠 첫 번째 값 가져오기

        const chatBox__divider = document.createElement("div");
        chatBox__divider.dataset.messageId = messageDetail.message.messageId;
        chatBox__divider.classList.add("chatBox__divider");
        const chatBox__divider_span = document.createElement("span");
        chatBox__divider_span.textContent = messageDetail.message.messageContent;
        chatBox__divider.appendChild(chatBox__divider_span);
        return chatBox__divider
    }

    chatBoxDividerExportMessage(messageDetail) {
        const fullDate = messageDetail.message.createDt; // "2024.02.22 HH:mm"
        const dateOnly = fullDate.split(" ")[0]; // 공백 기준으로 나눠 첫 번째 값 가져오기
        const chatBox__divider = document.createElement("div");
        chatBox__divider.dataset.messageId = messageDetail.message.messageId;
        chatBox__divider.classList.add("chatBox__divider");
        const chatBox__divider_span = document.createElement("span");
        chatBox__divider_span.textContent = messageDetail.message.messageContent;
        chatBox__divider.appendChild(chatBox__divider_span);
        return chatBox__divider
    }

    chatBoxDividerLastRead() {
        const chatBox__divider = document.createElement("div");
        chatBox__divider.id="chatBoxDividerLastRead"
        chatBox__divider.classList.add("chatBox__divider","is-line");
        const chatBox__divider_span = document.createElement("span");
        chatBox__divider_span.textContent = "마지막 읽은 메세지";
        chatBox__divider.appendChild(chatBox__divider_span);
        return chatBox__divider
    }

    wholeMyTextChatBox(messageDetail,htmlElement,companyOrgUser) {
        const chatBox__chat = this.componentChatBox(messageDetail,true,companyOrgUser);
        this.componentChatCard(chatBox__chat,htmlElement);
        return chatBox__chat
    }
    wholeYourChatBox(messageDetail,htmlElement,companyOrgUser) {
        const chatBox__chat = this.componentChatBox(messageDetail,false,companyOrgUser);
        this.componentChatCard(chatBox__chat,htmlElement);
        return chatBox__chat
    }

    componentChatCard(chatBox__chat,htmlElement){
        const chatCard = chatBox__chat.querySelector('.chatCard');
        chatCard.appendChild(htmlElement);
        return chatCard
    }

    componentChatBox(messageDetail,isMine,companyOrgUser){

        const matchedUsers = companyOrgUser.user.filter(user =>
            Number(messageDetail.message.sendUserKey) === Number(user.userKey)
        );

        const chatBox__chat = document.createElement("div");
        if(isMine){
            chatBox__chat.classList.add("chatBox__chat", "is-right")
        } else {
            chatBox__chat.classList.add("chatBox__chat")
        }

        const chatBox__user = document.createElement("div");
        chatBox__user.classList.add("chatBox__user");

        chatBox__chat.appendChild(chatBox__user);

        if(!isMine){
            const chatBox__user_span_name = document.createElement("span");
            chatBox__user_span_name.classList.add("name");
            chatBox__user_span_name.textContent = messageDetail.message.userNm+'('+matchedUsers[0].orgNm+')';

            chatBox__user.appendChild(chatBox__user_span_name);
        }


        const chatBox__user_span_date = document.createElement("span");
        chatBox__user_span_date.classList.add("date");
        chatBox__user_span_date.textContent = messageDetail.message.createDt;

        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        if(!isMine) {
            const userThumb = document.createElement("div");
            userThumb.classList.add("userThumb");

            d_flex__align_items_start__gap_10.appendChild(userThumb)

            const userThumb__img = document.createElement("div");
            userThumb__img.classList.add("userThumb__img");

            userThumb.appendChild(userThumb__img);

            const userThumb__img_img = document.createElement("img");
            userThumb__img_img.src = matchedUsers[0].thumbImgPath;
            userThumb__img.appendChild(userThumb__img_img);

        }

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        chatCard.dataset.sendUserName = messageDetail.message.userNm
        chatCard.dataset.sendUserKey = messageDetail.message.sendUserKey
        chatCard.dataset.messageId = messageDetail.message.messageId
        d_flex__align_items_start__gap_10.appendChild(chatCard)
        return chatBox__chat
    }

    componentTextChatCardGroup(messageDetail,origin=false) {
        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard__group.dataset.roomId = messageDetail.message?.roomId ?? ""
        chatCard__group.dataset.company = messageDetail.message?.company ?? ""
        chatCard__group.dataset.roomType = messageDetail.message?.roomType ?? ""
        chatCard__group.dataset.messageContent = messageDetail.message?.messageContent ?? ""
        chatCard__group.dataset.messageType = messageDetail.message?.messageType ?? ""
        chatCard__group.dataset.userNm = messageDetail.message?.userNm ?? ""
        chatCard__group.dataset.messageUuid = messageDetail.message?.messageUuid ?? ""
        chatCard__group.dataset.replyMessageId = messageDetail.message?.replyMessageId ?? ""
        chatCard__group.dataset.messageId = messageDetail.message?.messageId ?? ""
        chatCard__group.dataset.deletedYn = messageDetail.message?.deletedYn ?? ""
        chatCard__group.dataset.updateYn = messageDetail.message?.updateYn ?? ""
        chatCard__group.dataset.orgNm = messageDetail.message?.orgNm ?? ""
        chatCard__group.dataset.sendUserKey = messageDetail.message?.sendUserKey ?? ""
        chatCard__group.dataset.createUserKey = messageDetail.message?.createUserKey ?? ""
        chatCard__group.dataset.modifyUserKey = messageDetail.message?.modifyUserKey ?? ""
        chatCard__group.dataset.modifyDt = messageDetail.message?.modifyDt ?? ""
        chatCard__group.dataset.createDt = messageDetail.message?.createDt ?? ""
        chatCard__group.dataset.roomName = messageDetail.message?.roomName ?? ""
        chatCard__group.dataset.description = messageDetail.message?.description ?? ""

        chatCard__group.dataset.upperMessageId = messageDetail.upperMessage?.messageId ?? ""
        chatCard__group.dataset.upperRoomId = messageDetail.upperMessage?.roomId ?? ""
        chatCard__group.dataset.upperSendUserKey = messageDetail.upperMessage?.sendUserKey ?? ""
        chatCard__group.dataset.upperUserNm = messageDetail.upperMessage?.userNm ?? ""
        chatCard__group.dataset.upperMessageContent = messageDetail.upperMessage?.messageContent ?? ""
        chatCard__group.dataset.upperDeletedYn = messageDetail.upperMessage?.deletedYn ?? ""
        chatCard__group.dataset.upperCreateDt = messageDetail.upperMessage?.createDt ?? ""

        chatCard__group.id = messageDetail.message.messageId;

        if(chatCard__group.dataset.updateYn === 'Y') {
            const editSpan = document.createElement('span');
            editSpan.classList.add("edit");      // class 속성 지정
            editSpan.textContent = '편집됨';  // 텍스트 지정
            chatCard__group.appendChild(editSpan);
        }

        const card = document.createElement("div");
        card.classList.add("card");

        chatCard__group.appendChild(card)

        const card__text = document.createElement("div");
        card__text.classList.add("card__text");

        // 2025.04.14 김광길 특수문자 복호화 처리
        const messageContent = messageDetail.message.messageContent ?? "";
        const doc = new DOMParser().parseFromString(messageContent, 'text/html');
        card__text.innerHTML = doc.documentElement.textContent.replace(/\r\n|\r|\n/g, "<br>");
        card.appendChild(card__text);

        if(origin){
            if( messageDetail.upperMessage !== null && messageDetail.upperMessage.messageId !== null && messageDetail.upperMessage.messageId !== 0){
                const replyBox = this.componentReplyBox(messageDetail);
                const card = chatCard__group.querySelector('.card');
                const card__text = chatCard__group.querySelector('.card .card__text');
                card.insertBefore(replyBox, card__text);
            }
        }

        if(messageDetail.attachmentList.length > 0 && messageDetail.message.deletedYn === 'N') {
            const card = chatCard__group.querySelector('.card');
            const attachmentListElement = document.createElement("div");
            attachmentListElement.classList.add("attachmentList");
            card.appendChild(attachmentListElement);

            messageDetail.attachmentList.forEach(att => {
                const cardFile = this.componentCardFile(att);
                attachmentListElement.appendChild(cardFile);
            });
        }

        chatCard__group.appendChild(this.makeEmoji(messageDetail));
        return chatCard__group
    }

    componentCardFile(attachment) {
        const card__file = document.createElement("div");
        card__file.classList.add("attachment");
        card__file.dataset.attachmentId = attachment.attachmentId
        card__file.dataset.originFileName = attachment.originFileName
        card__file.dataset.fileSize = attachment.fileSize
        card__file.dataset.savedFilePath = attachment.savedFilePath
        card__file.dataset.fileExtension = attachment.fileExtension
        card__file.dataset.deletedYn = attachment.deletedYn

        const card__file_i = document.createElement("i");

        const wordExtensions = ["doc", "docx", "dot", "dotx", "docm", "dotm"];
        const pdfExtensions = ["pdf"];
        const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "tar.gz", "tgz", "tar.bz2", "tbz2", "tar.xz", "txz"];
        const excelExtensions = ["xls", "xlsx", "xlsm", "xlsb", "xlt", "xltx", "xltm", "csv"];
        const pptExtensions = ["ppt", "pptx", "pptm", "pps", "ppsx", "ppsm", "pot", "potx", "potm"];
        const onenoteExtensions = ["one", "onepkg", "onetoc2"];
        const hwpExtensions = ["hwp", "hwpx", "hwt", "hml", "cell", "show"];

        const fileExtension = attachment.fileExtension?.toLowerCase();

        if (pdfExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-pdf");
        } else if (archiveExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-zip");
        } else if (wordExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-word");
        } else if (excelExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-excel");
        } else if (pptExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-ppt");
        } else if (onenoteExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-onenote");
        } else if (hwpExtensions.includes(fileExtension)) {
            card__file_i.classList.add("icon", "is-40", "is-file-hangle");
        } else {
            card__file_i.classList.add("icon", "is-40", "is-file-etc");
        }
        card__file.appendChild(card__file_i);

        const card__file_span_title = document.createElement("span");
        card__file_span_title.classList.add("title");
        card__file_span_title.innerText = attachment.originFileName;
        card__file.appendChild(card__file_span_title);

        const card__file_span_size = document.createElement("span");
        card__file_span_size.classList.add("size");
        const bytesToMB = (bytes) => {
            const mb = bytes / (1024 * 1024);
            return mb.toFixed(2); // 소수점 둘째 자리까지 표시
        }
        card__file_span_size.innerText = bytesToMB(attachment.fileSize) + "MB";
        card__file.appendChild(card__file_span_size);

        const card__file_more = document.createElement("div");
        card__file_more.classList.add("more");
        card__file.appendChild(card__file_more);

        const card__file_more_button = document.createElement("button");
        card__file_more_button.classList.add("btn", "has-icon");
        card__file_more.appendChild(card__file_more_button);

        const card__file_more_button_i = document.createElement("i");
        card__file_more_button_i.classList.add("icon","is-24","is-chat-more-14");
        card__file_more_button.appendChild(card__file_more_button_i);

        return card__file;
    }

    componentReplyBox(upperMessageMap) {
        const upperMessage = upperMessageMap.upperMessage;
        const upperAttachmentList =  upperMessageMap.upperAttachmentList;
        const replyBox = document.createElement("div");
        replyBox.classList.add("replyBox");
        replyBox.dataset.messageId = upperMessage.messageId
        replyBox.dataset.roomId = upperMessage.roomId
        replyBox.dataset.sendUserKey = upperMessage.sendUserKey
        replyBox.dataset.userNm = upperMessage.userNm
        replyBox.dataset.messageContent = upperMessage.messageContent
        replyBox.dataset.deletedYn = upperMessage.deletedYn
        replyBox.dataset.createDt = upperMessage.createDt

        const replyBox__header = document.createElement("div");
        replyBox__header.classList.add("replyBox__header");

        replyBox.appendChild(replyBox__header);

        const replyBox__target = document.createElement("div");
        replyBox__target.classList.add("replyBox__target");

        replyBox__header.appendChild(replyBox__target);

        const replyBox__target_span = document.createElement("span");
        replyBox__target_span.innerText = upperMessage.userNm
        replyBox__target.appendChild(replyBox__target_span);

        const replyText = document.createTextNode(" 에게 답글");
        replyBox__target.appendChild(replyText);

        const replyBox__header_button = document.createElement("button");
        replyBox__header_button.type = "button";
        replyBox__header_button.classList.add("btn");

        replyBox__header.appendChild(replyBox__header_button);

        const replyBox__body = document.createElement("div");
        replyBox__body.classList.add("replyBox__body");

        if(upperAttachmentList.length > 0){
            const attachmentListElement = document.createElement("div");
            attachmentListElement.classList.add("attachmentList");

            upperAttachmentList.forEach(att => {
                const cardFile = this.componentCardFile(att);
                attachmentListElement.appendChild(cardFile);
            });

            replyBox__body.appendChild(attachmentListElement);
        }

        if(upperMessage.messageContent !== '' && upperMessage.messageContent !== null){
            // 2025.04.14 김광길 특수문자 복호화 처리
            const upperDoc = new DOMParser().parseFromString(upperMessage.messageContent, 'text/html');

            /* 2025.04.15 김광길 개행 처리
            const messageText = document.createTextNode(upperDoc.documentElement.textContent);
            replyBox__body.appendChild(messageText);
            */
            replyBox__body.innerHTML = upperDoc.documentElement.textContent.replace(/\r\n|\r|\n/g, "<br>");
        }

        replyBox.appendChild(replyBox__body);

        return replyBox;
    }

    makeMoreButtonLayer (moreButtonEvent,card__moreBtn,moreButtonLayer,viewport,contentViewElement, element,loginInfo,clsMessage,func) {
        const roomId = element.dataset.chatRoomId;
        const { left, top, height, bottom } = card__moreBtn.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        moreButtonLayer.style.display = 'block';
        if (bottom + moreButtonLayer.offsetHeight > viewportHeight) {
            moreButtonLayer.style.top = `${top - moreButtonLayer.offsetHeight}px`; // 위쪽 배치
            moreButtonLayer.classList.add('is-bottom');
        } else {
            moreButtonLayer.style.top = `${top + height}px`; // 기본 아래쪽 배치
        }
        moreButtonLayer.style.left = `${left}px`;

        /*const viewport = card__moreBtn.closest('[data-overlayscrollbars-viewport]');*/
        const replyChatButton = moreButtonLayer.querySelectorAll("li a")[0];
        const deleteChatButton = moreButtonLayer.querySelectorAll("li a")[1];
        const chatCard = card__moreBtn.closest('.chatCard');
        const chatCard__group = card__moreBtn.closest('.chatCard__group');
        const messageId = chatCard__group.dataset.messageId;

        let isDeletedMessage = chatCard__group.dataset.deletedYn === 'Y';

        if(isDeletedMessage){
            this.closeMoreButton(moreButtonLayer);
        }

        if(Number(chatCard.dataset.sendUserKey) !== Number(loginInfo.userKey)){
            deleteChatButton.style.display='none';
            moreButtonLayer.firstElementChild.style.height = '40px';
        } else {
            if(!isDeletedMessage) {
                deleteChatButton.style.display='block';
                moreButtonLayer.firstElementChild.style.height = '80px';
                if(moreButtonEvent === false){
                    const deleteButtonClickHandler = () => {
                        const chatCard__group = document.querySelector('#message_function')?.closest('.chatCard__group') ?? null;
                        if (!chatCard__group) {
                            return;
                        }

                        const messageId = chatCard__group.dataset.messageId;

                        const delUrl = `/messenger/message/delete/${roomId}/${messageId}`
                        fetch(delUrl, {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'}
                        })
                            .then(response => response.text())
                            .then(response => {
                                try {
                                    const parsed = JSON.parse(response);
                                    if (parsed.code === undefined || parsed.code === null) {
                                        throw new Error("code 값이 없습니다.");
                                    }
                                    if (parsed.code !== 0) {
                                        throw new Error(`서버 오류 발생: code=${parsed.code}`);
                                    }
                                    const roomList = func.makeRoomList(element.dataset)
                                    clsMessage.publishRoomMessage(roomList,messageType.DISCARD, new Map().set(contextType.DISCARD,Number(messageId)));
                                    moreButtonLayer.style.display = 'none';

                                } catch (error) {
                                    this._func.showToastModal("JSON 파싱 오류:", error);
                                    return error;
                                }
                            })
                        document.querySelectorAll('.chatToolbar').forEach(el => el.remove());

                        //이모지 리스트 제거
                        const reactElement = chatCard__group.querySelector('.chatCard__react');
                        if (reactElement) {
                            reactElement.remove();
                        }
                    }
                    deleteChatButton.addEventListener('click', deleteButtonClickHandler);

                }
            } else {
                deleteChatButton.style.display='none';
                moreButtonLayer.firstElementChild.style.height = '40px';
            }
        }

        if(moreButtonEvent === false){
            const replyButtonClickHandler = () => {
                const previousReplyBox = document.getElementById('_replyBox');
                const replyBox = this.getReplyBox();

                const replyBox__header_button = replyBox.querySelector('.replyBox__header button');

                const chatBox__footer = contentViewElement.querySelector('.chatBox__footer');
                const chatBox__footer__writeField = chatBox__footer.querySelector('.chatBox__writeField');
                const event = new Event('scroll', { bubbles: true });
                if (previousReplyBox) {
                    previousReplyBox.remove();
                }

                chatBox__footer.insertBefore(replyBox, chatBox__footer__writeField);
                viewport.dispatchEvent(event);
                replyBox__header_button.addEventListener('click', function() {
                    if (replyBox) {
                        replyBox.remove();
                    }
                });
                const messengerTextArea = document.querySelector("#emojiTargeet");
                messengerTextArea.focus();
            };
            replyChatButton.addEventListener('click', replyButtonClickHandler);
        }
        return true;
    }

    makeUpdateButton(moreButtonEvent,card__moreBtn,moreButtonLayer,viewport,contentViewElement, element,loginInfo,clsMessage,func) {
        const chatCard__group = card__moreBtn.closest('.chatCard__group');
        const messageId = chatCard__group.dataset.messageId;
        const messageContents = chatCard__group.dataset.messageContent;

        const card = chatCard__group.querySelector(".card");
        if (card) {
            card.style.display = 'none';
        }

        // 수정 Element
        const editCard = document.createElement('div');
        editCard.classList.add('editCard');

        // 메시지
        const edidTextarea = document.createElement('textarea');
        edidTextarea.classList.add('has-value');
        edidTextarea.setAttribute('maxlength', '10000');

        const doc = new DOMParser().parseFromString(messageContents, 'text/html');
        edidTextarea.value = doc.documentElement.textContent.replace(/\r\n|\r|\n/g, "<br>");
        editCard.appendChild(edidTextarea);

        // 첨부파일
        const allLists = card.querySelectorAll('.attachmentList .attachment');
        const oriAttachments = Array.from(allLists).filter(el => !el.closest('div.replyBox'));
        if (oriAttachments.length > 0) {
            const attachmentList = document.createElement('div');
            attachmentList.classList.add('attachmentList', 'flex-direction-column', 'align-items-start', 'mt-15');

            oriAttachments.forEach(attr => {
                const attachment = document.createElement('div');
                attachment.classList.add('attachment');

                // data속성 복사
                [...attr.attributes].forEach(data => {
                    if (data.name.startsWith('data-')) {
                        attachment.setAttribute(data.name, data.value);
                    }
                });

                // 파일 아이콘
                const fileIcon = document.createElement('i');
                // fileIcon.className = attr.querySelector('.icon .is-40').className;
                const oriIcon = attr.querySelector('i');
                fileIcon.classList.add(...oriIcon.classList);
                // fileIcon.classList.add('icon', 'is-40', 'is-file-etc');
                attachment.appendChild(fileIcon);

                // 파일 이름
                const fileTitle = document.createElement('span');
                fileTitle.classList.add('title');
                fileTitle.textContent = attr.querySelector('.title').textContent;
                attachment.appendChild(fileTitle);

                // 파일 사이즈(size)
                const fileSize = document.createElement('span');
                fileSize.classList.add('size');
                fileSize.textContent =  attr.querySelector('.size').textContent;
                attachment.appendChild(fileSize);

                // 삭제 버튼
                const deleteWrapper = document.createElement('div');
                deleteWrapper.classList.add('d-flex');

                // 삭제버튼
                const deleteButton = document.createElement('button');
                deleteButton.type = 'button';
                deleteButton.classList.add('btn', 'has-icon');

                // 삭제버튼 아이콘
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('icon', 'is-24', 'is-file-delete');
                deleteButton.appendChild(deleteIcon);

                deleteWrapper.appendChild(deleteButton);
                attachment.appendChild(deleteWrapper);

                // 파일 삭제버튼
                deleteButton.addEventListener('click', function () {
                    const parentAttachment = this.closest('.attachment');
                    // 최종 처리를 위해 삭제 여부 값 변경
                    parentAttachment.dataset.deletedYn = 'Y';
                    parentAttachment.style.display = 'none';
                });

                attachmentList.appendChild(attachment);
            })
            editCard.appendChild(attachmentList);
        }

        // 버튼 그룹
        const btnGroup = document.createElement('div');
        btnGroup.classList.add('btnGroup', 'gap-10', 'mt-15', 'justify-content-end');

        // emoji 버튼
        const emojiWrapper = document.createElement('div');
        emojiWrapper.classList.add('emoji', 'd-flex');

        const editEmojiBtn = document.createElement('button');
        editEmojiBtn.type = 'button';
        editEmojiBtn.classList.add('btn', 'has-icon', 'emoji__btn');
        editEmojiBtn.dataset.target = '#emojiTarget';

        const emojiIcon = document.createElement('i');
        emojiIcon.classList.add('icon', 'is-24', 'is-chat-emoji');
        editEmojiBtn.appendChild(emojiIcon);

        emojiWrapper.appendChild(editEmojiBtn);
        btnGroup.appendChild(emojiWrapper);

        // 구분 bar
        const bar = document.createElement('span');
        bar.classList.add('bar');
        btnGroup.appendChild(bar);

        // 취소버튼
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.classList.add('btn', 'is-icon');
        const delIcon = document.createElement('i');
        delIcon.classList.add('icon', 'is-24', 'is-file-delete');
        delBtn.appendChild(delIcon);
        btnGroup.appendChild(delBtn);

        // 수정버튼
        const sendBtn = document.createElement('button');
        sendBtn.type = 'button';
        sendBtn.classList.add('btn', 'is-icon');
        const sendIcon = document.createElement('i');
        sendIcon.classList.add('icon', 'is-24', 'is-send-check');
        sendBtn.appendChild(sendIcon);
        btnGroup.appendChild(sendBtn);

        // 버튼 그룹 추가
        editCard.appendChild(btnGroup);

        chatCard__group.appendChild(editCard);

        // 수정 취소 버튼
        delBtn.addEventListener('click', () => {
            card.style.display = '';
            editCard.remove();
        });

        // 이모지 버튼
        const editEmojiPicker = this.editEmojiPicker;
        editEmojiPicker.targetTextarea = null; // 현재 연결된 textarea 저장
        editEmojiBtn.addEventListener("click", () => {
            editEmojiPicker.targetTextarea = edidTextarea; // 이 버튼에 대응하는 textarea 지정
            editEmojiPicker.togglePicker(editEmojiBtn); // picker 열기
        });

        if (!editEmojiPicker._emojiBound) {
            editEmojiPicker.on("emoji", (emoji) => {
                const textarea = editEmojiPicker.targetTextarea;
                if (textarea) {
                    textarea.value += emoji.emoji;
                    setTimeout(() => {
                        textarea.focus();
                        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
                    }, 10);
                }
            });
            editEmojiPicker._emojiBound = true; // 중복 방지 플래그 설정
        }

        sendBtn.addEventListener("click", () => {
            const contextMap = new Map();

            const updateAttachmentList = [];
            const updateAttachmentElements = editCard.querySelectorAll(".attachmentList .attachment");
            let updateContentVal = edidTextarea.value.trim().replace(/(?:\r\n|\r|\n)/g, '<br>');

            if(updateAttachmentElements.length === 0 && updateContentVal === ''){
                func.showAlertModal(ALERT_MESSAGES.A056);
                return;
            }

            const {chatRoomId, chatRoomType, chatRoomName, chatDescription, chatUnreadMessageCount, chatMessageType, chatLastMessageContent, chatMessageId, chatReadMessageId, chatLastMessageDt, chatFixOrder, chatParticipantList} = element.dataset;
            const currentRoomList = new RoomList(chatRoomId, chatRoomType, chatRoomName, chatDescription, chatUnreadMessageCount, chatMessageType, chatLastMessageContent, chatMessageId, chatReadMessageId, chatLastMessageDt, chatFixOrder, chatParticipantList);
            clsMessage.subscribeRoom();

            updateAttachmentElements.forEach(el => {
                const attachment = new Attachment(
                    el.dataset.attachmentId,
                    null,
                    null,
                    null,
                    null,
                    el.dataset.originFileName,
                    el.dataset.fileExtension,
                    el.dataset.fileSize,
                    el.dataset.deletedYn,
                    el.dataset.savedFilePath,
                    null
                );
                updateAttachmentList.push(attachment);
            });

            contextMap.set(contextType.TEXT, updateContentVal);
            contextMap.set(contextType.UPDATE, messageId);

            if(updateAttachmentList.length > 0){
                contextMap.set(contextType.FILE,updateAttachmentList);
            }

            clsMessage.publishRoomMessage(currentRoomList, messageType.UPDATE, contextMap);

            card.style.display = '';
            editCard.remove();

        });

        editCard.addEventListener('keypress', function (e){
            if (e.key === "Enter") {
                e.preventDefault();
                sendBtn.click();
            }
        });

        // toolbar삭제
        document.querySelectorAll('.chatToolbar').forEach(el => el.remove());
    }

    getReplyBox() {
        const chatCard__group = document.querySelector('#message_function')?.closest('.chatCard__group');
        const chatCard = document.querySelector('#message_function')?.closest('.chatCard');
        return this._replyBox(chatCard, chatCard__group);
    }

    closeMoreButton(moreButtonLayer) {
        moreButtonLayer.style.display = 'none';
    }

    _makeCardMoreButtonLayer() {
        const ul_layer = document.createElement("ul");
        ul_layer.classList.add("layer");

        const ul_layer_li_answer = document.createElement("li");
        ul_layer_li_answer.classList.add("layer__item");
        ul_layer.appendChild(ul_layer_li_answer);

        const ul_layer_li_a_answer = document.createElement("a");
        ul_layer_li_a_answer.classList.add("layer__inner");
        ul_layer_li_a_answer.innerText = "답글";
        ul_layer_li_answer.appendChild(ul_layer_li_a_answer);

        const ul_layer_li_delete = document.createElement("li");
        ul_layer_li_delete.classList.add("layer__item");
        ul_layer.appendChild(ul_layer_li_delete);

        const ul_layer_li_a_delete = document.createElement("a");
        ul_layer_li_a_delete.classList.add("layer__inner");
        ul_layer_li_a_delete.innerText = "삭제"
        ul_layer_li_delete.appendChild(ul_layer_li_a_delete);

        document.body.appendChild(ul_layer);

        return ul_layer;
    }

    chatFunctionMenu = (cards, contentViewElement, element) => {
        const func = this._func;
        const emojiPicker = func.getNewEmojiButton();
        const loginInfo = this._loginInfo;
        const clsMessage = this._clsMessage;
        let moreButtonEvent = false;
        let updateButtonEvent = false;
        // 단일 이모지 피커 인스턴스 생성 (최초 한 번만)

        emojiPicker.on('emoji', emoji => {
            this.sendEmojiApi(emoji.emoji,this._messageId);
        });


        cards.forEach(card => {
            const replyDeleteButtonLayer= document.getElementById("ReplyDeleteButtonLayer");
            // 각 카드마다 개별 툴바 생성
            const toolbar = this.getToolbarHtml();
            const toolbarMoreButton = toolbar.querySelector('.more button.btn.has-icon');
            const updateButton = toolbar.querySelector('#editBtn');
            const emojiButton = toolbar.querySelectorAll('.emojiBtn');
            this._messageId = card.parentElement.dataset.messageId; //emojipicker 구분용

            const viewport= card.closest('[data-overlayscrollbars-viewport]');

            const emojiAddButton = toolbar.querySelector('.chatToolbar__emojiBtn');

            emojiAddButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 버블링 방지
                emojiPicker.togglePicker(emojiAddButton);
                this._messageId = card.parentElement.dataset.messageId;
            });

            card.addEventListener('mouseenter', () => {
                if (!card.contains(toolbar)) {
                    document.querySelectorAll('.chatToolbar[style*="display: flex"]').forEach(el => {
                        el.remove();
                    });
                    card.appendChild(toolbar);
                    document.getElementById("ReplyDeleteButtonLayer").style.display = "none";

                    card.closest('[data-overlayscrollbars-viewport]').addEventListener('scroll', () => {
                        /*emojiPicker.hidePicker();
                        isEmojiLayerOpen = false;*/
                        document.getElementById("ReplyDeleteButtonLayer").style.display = "none";
                    })
                } else {
                    document.getElementById("ReplyDeleteButtonLayer").style.display = "none";
                }


                const hasEditor = card.querySelector('.editor-wrapper') !== null;
                if(card.parentElement.dataset.deletedYn ==='Y' || hasEditor){
                    document.querySelectorAll('.chatToolbar').forEach(el => el.remove());
                }else{
                    // 내가 작성한 글이 아니면 수정 버튼 제거
                    if(Number(card.parentElement.dataset.sendUserKey) !== loginInfo.userKey){
                        const editButton = document.querySelector('.icon.is-edit-24');
                        if (editButton) {
                            const buttonElement = editButton.closest('button');
                            if (buttonElement) {
                                buttonElement.remove();
                            }
                        }
                    }
                }
            });

            card.addEventListener('mouseleave', () => {
                setTimeout(() => {
                    const isReplyDeleteOpen= document.getElementById("ReplyDeleteButtonLayer").style.display !== "none"
                    if (!card.matches(':hover') && !isReplyDeleteOpen/* && !isFloatingLayerOpen && !isEmojiLayerOpen*/) {
                        toolbar.remove();
                        replyDeleteButtonLayer.style.display = "none";
                    }
                }, 100);
            });

            toolbarMoreButton.addEventListener('click', () => {
                moreButtonEvent = this.makeMoreButtonLayer(moreButtonEvent,toolbarMoreButton,replyDeleteButtonLayer,viewport,contentViewElement,element,loginInfo,clsMessage,func);
            });

            updateButton.addEventListener('click', () => {
                updateButtonEvent = this.makeUpdateButton(moreButtonEvent,toolbarMoreButton,replyDeleteButtonLayer,viewport,contentViewElement,element,loginInfo,clsMessage,func);
            });

            emojiButton.forEach(button => {
                button.addEventListener('click', () => { // toolbar 이모지 버튼.
                    const emoji = button.textContent.trim();
                    toolbar.remove();
                    this.sendEmojiApi(emoji,card.parentElement.dataset.messageId);
                    // 이모지 서버 전송 등 가능

                });
            });

        });
    };

    makeRoomMoreButtonLayer(room__moreBtn, moreButtonLayer,fixedRoomListViewElement,unFixedRoomListViewElement) {

        const loginInfo = this._loginInfo;
        const clsMessage = this._clsMessage;
        const func = this._func;
        const moreButtonLayerUl = moreButtonLayer.querySelector('ul');
        const { left, top, height, bottom } = room__moreBtn.getBoundingClientRect();

        if (moreButtonLayer.style.display === 'none' || moreButtonLayer.style.display === '') {
            moreButtonLayer.style.display = 'block';

            if (bottom + moreButtonLayerUl.offsetHeight > window.innerHeight) {
                moreButtonLayerUl.style.top = `${top - moreButtonLayerUl.offsetHeight}px`; // 위쪽 배치
            } else {
                moreButtonLayerUl.style.top = `${top + height}px`; // 기본 아래쪽 배치
            }
            const viewLeft= left + 20;
            moreButtonLayer.style.left = `${viewLeft}px`;
        } else {
            moreButtonLayer.style.display = 'none';
        }

        const roomMoreButtons = moreButtonLayer.querySelectorAll("li a");

        roomMoreButtons.forEach((roomMoreButton,buttonIndex) => {
            const roomMoreButtonEventHandler = (loginInfo,buttonIndex,fixedRoomListViewElement,unFixedRoomListViewElement) => {
                const eventRoom = document.querySelector('.messageList .chatList.is-active');
                const data = {
                    "roomId": eventRoom.dataset.chatRoomId,
                    "userKey": Number(loginInfo.userKey),
                    "moveFlag": ""
                }
                let alreadyFixed = false;
                if (eventRoom.dataset.chatRoomFixOrder !== undefined) {
                    alreadyFixed = true;
                }
                switch(buttonIndex){
                    case 0: // 핀고정
                        if(alreadyFixed){
                            alert(" 이미 고정된 채팅방입니다. ");
                        } else {
                            const fixedRoomNum = fixedRoomListViewElement.querySelectorAll('a.chatList').length;
                            if(fixedRoomNum < 6 ){
                                fetch('/messenger/fix/save', {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(response => response.json())
                                    .then(response => {
                                        eventRoom.querySelector('.userThumb').classList.add('is-pin');
                                        eventRoom.setAttribute('data-chat-room-fix-order',response.data.fixOrder);
                                        return eventRoom;
                                    })
                                    .then((eventRoom) => {
                                        fixedRoomListViewElement.appendChild(eventRoom);
                                    })
                                    .then(() =>{
                                        document.getElementById('ChatListLayer').style.display='none';
                                    })
                                    .catch(err => console.log(err));
                            } else {
                               alert("최대 고정 가능 갯수는 3개 입니다.");
                            }
                        }
                        break;
                    case 1: // 핀 해제
                        if(alreadyFixed){
                            fetch('/messenger/fix/delete', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.json())
                                .then(response => {
                                    const userThumb = eventRoom.querySelector('.userThumb');
                                    userThumb.classList.remove('is-pin');
                                    eventRoom.removeAttribute('data-chat-room-fix-order');
                                    return eventRoom
                                })
                                .then((eventRoom) => {
                                    const unFixedRoomList = unFixedRoomListViewElement.querySelectorAll('a.chatList');
                                    unFixedRoomListViewElement.insertBefore(eventRoom,unFixedRoomList[0]);
                                })
                                .then(() =>{
                                    document.getElementById('ChatListLayer').style.display='none';
                                })
                                .catch(err => console.log(err));

                        } else {
                            alert(" 고정되지 않은 채팅방 입니다. ");
                        }
                        break;

                    case 2: // 나가기
                        fetch('/messenger/participant/update', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                            .then(response => response.json())
                            .then(response => {
                                if(response.code === 0){
                                    const roomList = func.makeRoomList(eventRoom.dataset)
                                    eventRoom.remove();
                                    clsMessage.publishRoomMessage(roomList,messageType.EXIT, new Map());
                                }
                            })
                            .then(() =>{
                                document.getElementById('ChatListLayer').style.display='none';
                            })
                            .then(() =>{
                                location.reload();
                            })
                            .catch(err => console.log(err));
                        break;
                }
            }
            if (!roomMoreButton.dataset.eventAdded) {
                roomMoreButton.dataset.eventAdded = "true";
                roomMoreButton.addEventListener('click', () => roomMoreButtonEventHandler(loginInfo, buttonIndex,fixedRoomListViewElement,unFixedRoomListViewElement));
            }
        })
    }

    handleChatRoomOrder = (moreButtonLayer,room__moreBtn) => {
        moreButtonLayer.style.display = 'none';
        const card__file = room__moreBtn.closest('.card__file');
        const { attachmentId, originFileName } = card__file.dataset;
        if (!attachmentId) {
            this._func.showToastModal("첨부 파일 ID가 없습니다.");
            return;
        }
        msgAttachmentApi.downloadFile(attachmentId)
            .then(() => this.initiateFileDownload(originFileName))
            .catch(error => this._func.showToastModal("다운로드 중 오류 발생:", error));
    }

    makeMsgSearchListComponent(messageSearchDto, keyword){
        const {messageId,messageContent,userNm,createDt} = messageSearchDto
        function highlightWordInSentence(sentence, keyword) {
            const regex = new RegExp(`(${keyword})`, "gi"); // 단어 경계를 고려한 정규식
            return sentence.replace(regex, `<span class="word">$1</span>`); // 특정 단어 강조
        }
        const chatList = document.createElement("a");
        chatList.classList.add("chatList","is-small")
        chatList.href="javascript:void(0)";
        chatList.dataset.messageId = messageId;

        const chatList__body = document.createElement("div");
        chatList__body.classList.add("chatList__body");
        chatList.appendChild(chatList__body);

        const chatUser = document.createElement("div");
        chatUser.classList.add("chatUser");
        chatList__body.appendChild(chatUser);

        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerText = userNm;
        chatUser.appendChild(name);

        const date = document.createElement("span");
        date.classList.add("date");
        date.innerText = createDt
        chatUser.appendChild(date);

        const chat = document.createElement("div");
        chat.classList.add("chat");
        chatList__body.appendChild(chat);

        const chat__text = document.createElement("p");
        chat__text.classList.add("chat__text");
        chat__text.innerHTML = highlightWordInSentence(messageContent, keyword);
        chat.appendChild(chat__text);
        return chatList;
    }

    makeAlarmMsgSearchListComponent(messageSearchDto, keyword){
        const {messageId,messageText,createDt} = messageSearchDto
        function highlightWordInSentence(sentence, keyword) {
            const regex = new RegExp(`(${keyword})`, "gi"); // 단어 경계를 고려한 정규식
            return sentence.replace(regex, `<span class="word">$1</span>`); // 특정 단어 강조
        }
        const chatList = document.createElement("a");
        chatList.classList.add("chatList","is-small")
        chatList.href="javascript:void(0)";
        chatList.dataset.messageId = messageId;

        const chatList__body = document.createElement("div");
        chatList__body.classList.add("chatList__body");
        chatList.appendChild(chatList__body);

        const chatUser = document.createElement("div");
        chatUser.classList.add("chatUser");
        chatList__body.appendChild(chatUser);

        const name = document.createElement("h3");
        name.classList.add("name");
        name.innerText = "알림봇";
        chatUser.appendChild(name);

        const date = document.createElement("span");
        date.classList.add("date");
        date.innerText = createDt
        chatUser.appendChild(date);

        const chat = document.createElement("div");
        chat.classList.add("chat");
        chatList__body.appendChild(chat);

        const chat__text = document.createElement("p");
        chat__text.classList.add("chat__text");
        chat__text.innerHTML = highlightWordInSentence(messageText, keyword);
        chat.appendChild(chat__text);
        return chatList;
    }

    makeFileMoreButtonLayer(card__moreBtn, moreButtonLayer, viewport) {
        const { left, top, height, bottom } = card__moreBtn.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (moreButtonLayer.style.display === 'none' || moreButtonLayer.style.display === '') {
            moreButtonLayer.style.display = 'block';

            if (bottom + moreButtonLayer.offsetHeight > viewportHeight) {
                moreButtonLayer.style.top = `${top - moreButtonLayer.offsetHeight}px`; // 위쪽 배치
                moreButtonLayer.classList.add('is-bottom');
            } else {
                moreButtonLayer.style.top = `${top + height}px`; // 기본 아래쪽 배치
            }
            moreButtonLayer.style.left = `${left}px`;
        } else {
            moreButtonLayer.style.display = 'none';
        }

        const fileDownButton = moreButtonLayer.querySelectorAll("li a")[0];
        const newButton = fileDownButton.cloneNode(true);
        fileDownButton.parentNode.replaceChild(newButton, fileDownButton);

        newButton.addEventListener('click', () => {
            this.handleFileDownload(moreButtonLayer, card__moreBtn);
        });

        viewport.addEventListener('scroll', () => {
            moreButtonLayer.style.display = "none";
        })
    }

    handleFileDownload = (moreButtonLayer,card__moreBtn) => {
        moreButtonLayer.style.display = 'none';
        const card__file = card__moreBtn.closest('.attachment');
        const { attachmentId, originFileName } = card__file.dataset;
        if (!attachmentId) {
            this._func.showToastModal("첨부 파일 ID가 없습니다.");
            return;
        }
        msgAttachmentApi.downloadFile(attachmentId)
            .then((response) => {
                this.initiateFileDownload(originFileName,response)
            })
            .catch(error => this._func.showToastModal("다운로드 중 오류 발생:", error));
    }


    initiateFileDownload(fileName,response) {
        const url = URL.createObjectURL(response);
        const aTag = document.createElement('a');

        Object.assign(aTag, {
            href: url,
            download: fileName
        });
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
        URL.revokeObjectURL(url);
    }

    chatFileFunction = (cardFileList) => {
        cardFileList.forEach(cardFile => {
            const chatFileLayer= document.getElementById("ChatFileLayer");
            const cardFileMoreButton = cardFile.querySelector('.more button.btn.has-icon');
            const viewport= cardFile.closest('[data-overlayscrollbars-viewport]');

            if(cardFileMoreButton){
                cardFileMoreButton.addEventListener('click', () => {
                    this.makeFileMoreButtonLayer(cardFileMoreButton,chatFileLayer,viewport);
                })
            }
        });
    };

    makeRoomList = (roomList,loginInfo)  => {
        const chatList = document.createElement('a');
        chatList.classList.add("chatList");
        chatList.href = "javascript:void(0);";
        chatList.dataset.chatRoomId = roomList.roomId;
        chatList.dataset.chatRoomType = roomList.roomType;
        chatList.dataset.chatRoomName = roomList.roomName;
        chatList.dataset.chatRoomUnreadMessageCount = roomList.unreadMessageCount ?? 0;
        chatList.dataset.chatRoomMessageType = roomList.messageType;
        chatList.dataset.chatRoomLastMessageContent = roomList.lastMessageContent ?? '';
        chatList.dataset.chatRoomMessageId = roomList.messageId ?? '';
        chatList.dataset.chatRoomReadMessageId = roomList.readMessageId ?? '';
        chatList.dataset.chatRoomLastMessageDt = roomList.lastMessageDt ?? '';
        if(roomList.fixOrder !== '' && roomList.fixOrder !== null){
            chatList.dataset.chatRoomFixOrder = roomList.fixOrder
        }

        chatList.dataset.chatParticipantList =  JSON.stringify(Array.isArray(roomList.participantList)? roomList.participantList: [roomList.participantList]);

        const userThumb = document.createElement('div');
        userThumb.classList.add("userThumb");
        chatList.appendChild(userThumb);

        const userThumb__img = document.createElement('div');
        userThumb__img.classList.add("userThumb__img");
        userThumb.appendChild(userThumb__img);

        const userThumb__img_img = document.createElement('img');
        userThumb__img_img.src = loginInfo.userImg;
        userThumb__img.appendChild(userThumb__img_img);

        const chatList__body = document.createElement('div');
        chatList__body.classList.add("chatList__body");
        chatList.appendChild(chatList__body);

        const chatUser = document.createElement('div');
        chatUser.classList.add("chatUser");
        chatList__body.appendChild(chatUser);

        const name = document.createElement('h3');
        name.classList.add("name");
        name.textContent = roomList.roomName;
        chatUser.appendChild(name);

        const time = document.createElement('span');
        time.classList.add("time");
        time.textContent = "방금";
        chatUser.appendChild(time);

        const more = document.createElement('div');
        more.classList.add("more");
        chatUser.appendChild(more);

        const btn = document.createElement('button');
        btn.type = "button";
        btn.classList.add("btn","has-icon");
        more.appendChild(btn);

        const btn_i = document.createElement('i');
        btn_i.classList.add("icon","is-14","is-chat-more-14");
        btn.appendChild(btn_i);

        const chat = document.createElement('div');
        chat.classList.add("chat");
        chatList__body.appendChild(chat);

        const chat__text = document.createElement('p');
        chat__text.classList.add("chat__text");
        chat__text.textContent = '';
        chat.appendChild(chat__text);

        const chat__count = document.createElement('span');
        chat__count.classList.add("chat__count");
        chat__count.textContent = 0;
        chat.appendChild(chat__count);

        return chatList;
    }

    setPraiseCompanyUsers = (companyUser) => {
        const praiseCompanyUser_a = document.createElement('a');
        praiseCompanyUser_a.href = "javascript:void(0)";
        praiseCompanyUser_a.classList.add("item");
        praiseCompanyUser_a.dataset.userKey = Number(companyUser.userKey) ?? '';
        praiseCompanyUser_a.dataset.userNm = companyUser.userNm ?? '';
        praiseCompanyUser_a.dataset.orgNm = companyUser.orgNm ?? '';
        praiseCompanyUser_a.dataset.email = companyUser.email ?? '';

        praiseCompanyUser_a.textContent = companyUser.userNm + " " + companyUser.orgNm ?? '';

        const praiseCompanyUser_a_span = document.createElement('span');
        praiseCompanyUser_a_span.classList.add("text-gray-500");
        praiseCompanyUser_a.appendChild(praiseCompanyUser_a_span);
        praiseCompanyUser_a_span.textContent = companyUser.email ?? '';

        return praiseCompanyUser_a;
    }

    PraiseChatBox_chat = (praiseMessage, isMine,userList) => {
        const chatBox__chat = document.createElement('div');
        chatBox__chat.classList.add("chatBox__chat");

        const chatBox__user = document.createElement('div');
        chatBox__user.classList.add("chatBox__user");
        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement('span');
        chatBox__user_span_name.classList.add("name");
        chatBox__user_span_name.textContent = '알림봇';
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement('span');
        chatBox__user_span_name.classList.add("date");
        chatBox__user_span_name.textContent = praiseMessage.createDt;
        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        const userThumb = document.createElement("div");
        userThumb.classList.add("userThumb", "is-bot");

        d_flex__align_items_start__gap_10.appendChild(userThumb)

        const userThumb__img = document.createElement("div");
        userThumb__img.classList.add("userThumb__img");

        userThumb.appendChild(userThumb__img);

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        d_flex__align_items_start__gap_10.appendChild(chatCard);

        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard.appendChild(chatCard__group);

        const card = document.createElement("div");
        card.classList.add("card");
        chatCard__group.appendChild(card);
        chatCard__group.dataset.roomId = praiseMessage.message?.roomId ?? ""
        chatCard__group.dataset.company = praiseMessage.message?.company ?? ""
        chatCard__group.dataset.roomType = praiseMessage.message?.roomType ?? ""
        chatCard__group.dataset.messageType = praiseMessage.message?.messageType ?? ""
        chatCard__group.dataset.messageUuid = praiseMessage.message?.messageUuid ?? ""
        chatCard__group.dataset.replyMessageId = praiseMessage.message?.replyMessageId ?? ""
        chatCard__group.dataset.messageId = praiseMessage.message?.messageId ?? ""
        chatCard__group.dataset.attachmentId = praiseMessage.message?.attachmentId ?? ""
        chatCard__group.dataset.deletedYn = praiseMessage.message?.deletedYn ?? ""
        chatCard__group.dataset.modifyDt = praiseMessage.message?.modifyDt ?? ""
        chatCard__group.dataset.createDt = praiseMessage.message?.createDt ?? ""
        chatCard__group.dataset.roomName = praiseMessage.message?.roomName ?? ""
        chatCard__group.dataset.description = praiseMessage.message?.description ?? ""

        const praiseMessage_img = document.createElement('img');
        praiseMessage_img.style.width = "250px";  // 너비 설정
        praiseMessage_img.style.height = "200px"; // 높이 설정

        switch (praiseMessage.messageType){
            case messageType.PRAISE_IMG_01:
                praiseMessage_img.src = "/assets/images/compliment-card-1.gif";
                break;
            case messageType.PRAISE_IMG_02:
                praiseMessage_img.src = "/assets/images/compliment-card-2.gif";
                break;
            case messageType.PRAISE_IMG_03:
                praiseMessage_img.src = "/assets/images/compliment-card-3.gif";
                break;
            case messageType.PRAISE_IMG_04:
                praiseMessage_img.src = "/assets/images/compliment-card-4.gif";
                break;
        }
        card.appendChild(praiseMessage_img);

        const card__text = document.createElement("div");
        card__text.classList.add("card__text");
        card__text.style.width="250px";

        if(isMine){
            // 2025.04.15 김광길 수정
            const parser = new DOMParser();
            const messageContent = parser.parseFromString(praiseMessage.messageContent, "text/html").body.textContent;
            card__text.innerHTML = messageContent.replace(/\r\n|\r|\n/g, "<br>");

        } else {
            // 2025.04.15 김광길 수정
            // card__text.innerHTML = `${praiseMessage.messageContent}`;
            card__text.innerHTML = praiseMessage.messageContent.replace(/\r\n|\r|\n/g, "<br>");
        }

        card.appendChild(card__text);

        return chatBox__chat;
    }

    Praise_Alarm = (alarmMsg) => {
        const chatBox__chat = document.createElement('div');
        chatBox__chat.classList.add("chatBox__chat");
        chatBox__chat.dataset.alarmType = alarmMsg.alarmType
        chatBox__chat.dataset.templateCode = alarmMsg.templateCode
        chatBox__chat.dataset.messageId = alarmMsg.messageId

        const chatBox__user = document.createElement('div');
        chatBox__user.classList.add("chatBox__user");
        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement('span');
        chatBox__user_span_name.classList.add("name");
        chatBox__user_span_name.textContent = '알림봇';
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement('span');
        chatBox__user_span_name.classList.add("date");
        chatBox__user_span_name.textContent = alarmMsg.createDt;
        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        const userThumb = document.createElement("div");
        userThumb.classList.add("userThumb", "is-bot");

        d_flex__align_items_start__gap_10.appendChild(userThumb)

        const userThumb__img = document.createElement("div");
        userThumb__img.classList.add("userThumb__img");

        userThumb.appendChild(userThumb__img);

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        d_flex__align_items_start__gap_10.appendChild(chatCard);

        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard.appendChild(chatCard__group);

        const card = document.createElement("div");
        card.classList.add("card");
        chatCard__group.appendChild(card);

        const praiseMessage_img = document.createElement('img');
        praiseMessage_img.style.width = "250px";  // 너비 설정
        praiseMessage_img.style.height = "200px"; // 높이 설정

        switch (alarmMsg.templateCode){
            case messageType.PRAISE_IMG_01:
                praiseMessage_img.src = "/assets/images/compliment-card-1.gif";
                break;
            case messageType.PRAISE_IMG_02:
                praiseMessage_img.src = "/assets/images/compliment-card-2.gif";
                break;
            case messageType.PRAISE_IMG_03:
                praiseMessage_img.src = "/assets/images/compliment-card-3.gif";
                break;
            case messageType.PRAISE_IMG_04:
                praiseMessage_img.src = "/assets/images/compliment-card-4.gif";
                break;
        }
        card.appendChild(praiseMessage_img);

        const card__text = document.createElement("div");
        card__text.classList.add("card__text");
        card__text.style.width="250px";
        const parser = new DOMParser();
        card__text.innerHTML = parser.parseFromString(alarmMsg.messageContent, "text/html").body.textContent;

        card.appendChild(card__text);

        return chatBox__chat;
    }

    TODO_CONFIRM_Alarm = (alarmMsg,loginInfo) => {
        const chatBox__chat = document.createElement('div');
        chatBox__chat.classList.add("chatBox__chat");
        chatBox__chat.dataset.alarmType = alarmMsg.alarmType
        chatBox__chat.dataset.templateCode = alarmMsg.templateCode
        chatBox__chat.dataset.messageId = alarmMsg.messageId

        const chatBox__user = document.createElement('div');
        chatBox__user.classList.add("chatBox__user");
        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement('span');
        chatBox__user_span_name.classList.add("name");
        chatBox__user_span_name.textContent = '알림봇';
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement('span');
        chatBox__user_span_name.classList.add("date");
        chatBox__user_span_name.textContent = alarmMsg.createDt;
        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        const userThumb = document.createElement("div");
        userThumb.classList.add("userThumb", "is-bot");

        d_flex__align_items_start__gap_10.appendChild(userThumb)

        const userThumb__img = document.createElement("div");
        userThumb__img.classList.add("userThumb__img");

        userThumb.appendChild(userThumb__img);

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        d_flex__align_items_start__gap_10.appendChild(chatCard);

        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard.appendChild(chatCard__group);

        const card = document.createElement("div");
        card.classList.add("card");
        chatCard__group.appendChild(card);
        const card__text = document.createElement("div");
        card__text.classList.add("card__text");

        card__text.innerHTML = alarmMsg.messageContent.replace(/\r\n|\r|\n/g, "<br>");
        card.appendChild(card__text);

        if(!alarmMsg.confirmYn){
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("btnGroup","gap-5");
            card.appendChild(btnGroup);

            const btn__is_secondary__is_small = document.createElement("button");
            btn__is_secondary__is_small.classList.add("btn","is-secondary","is-small");
            btn__is_secondary__is_small.dataset.url = alarmMsg.rejectUrl
            btn__is_secondary__is_small.textContent = "거절";
            btnGroup.appendChild(btn__is_secondary__is_small);

            const btn__is_primary__is_small = document.createElement("button");
            btn__is_primary__is_small.classList.add("btn","is-primary","is-small");
            btn__is_primary__is_small.dataset.url = alarmMsg.acceptUrl;
            btn__is_primary__is_small.textContent = "수락";
            btnGroup.appendChild(btn__is_primary__is_small);

            const alertModal = document.getElementById('MsgAlertModal');
            const alertContext = alertModal.querySelector('.modal__contents');
            const alertCloseButton = alertModal.querySelectorAll('.modal__footer button')[0];
            const alertConfirmButton = alertModal.querySelectorAll('.modal__footer button')[1];

            let currentAction = null; // 현재 수행할 핸들러 저장

            const alertConfirmButtonEventHandler = () => {
                if (!currentAction) return;
                const { url } = currentAction.dataset;
                fetch(url, { method: "POST" })
                    .then(response => response.json())
                    .then(response => {

                        if ([0, 2105, 2111, 2112].includes(response.code)) {
                            switch (response.code){
                                case 0:
                                case 2105:
                                case 2111:
                                case 2112:
                                    const data = {
                                        "messageId": alarmMsg.messageId,
                                        "confirmYn": currentAction.dataset.confirmYn, // "Y" 또는 "N"
                                        "modifyUserKey": Number(loginInfo.userKey)
                                    };
                                    return sendAlarmConfirm(data);
                            }
                        }

                        function sendAlarmConfirm(data) {
                            const alarmConfirmUrl = '/messenger/alarm/confirm';
                            return fetch(alarmConfirmUrl, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(data)
                            })
                                .then(response => {
                                    console.log(response.json())
                                })
                                .catch(err => console.log(err));
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        btnGroup.remove();
                        alertModal.style.display = 'none';
                        currentAction = null; // 작업 완료 후 초기화
                    });
            };

            alertCloseButton.addEventListener('click', () => {alertModal.style.display = 'none';});
            alertConfirmButton.addEventListener('click', alertConfirmButtonEventHandler);

            btn__is_secondary__is_small.addEventListener('click', () => {
                alertModal.removeAttribute("style");
                alertContext.textContent = '거절 하시겠습니까?';
                alertModal.style.removeProperty("display");
                alertModal.style.removeProperty("opacity");
                alertModal.style.removeProperty("visibility");
                alertModal.style.display = 'flex';
                currentAction = btn__is_secondary__is_small;
                currentAction.dataset.confirmYn = "N";
            });

            btn__is_primary__is_small.addEventListener('click', () => {
                alertModal.removeAttribute("style");
                alertContext.textContent = '수락 하시겠습니까?';
                alertModal.style.removeProperty("display");
                alertModal.style.removeProperty("opacity");
                alertModal.style.removeProperty("visibility");
                alertModal.style.display = 'flex';
                currentAction = btn__is_primary__is_small;
                currentAction.dataset.confirmYn = "Y";
            });
        }
        return chatBox__chat;
    }

    TODO_INTERNAL_LINK_Alarm = (alarmMsg,loginInfo) => {
        const chatBox__chat = document.createElement('div');
        chatBox__chat.classList.add("chatBox__chat");
        chatBox__chat.dataset.alarmType = alarmMsg.alarmType
        chatBox__chat.dataset.templateCode = alarmMsg.templateCode
        chatBox__chat.dataset.messageId = alarmMsg.messageId

        const chatBox__user = document.createElement('div');
        chatBox__user.classList.add("chatBox__user");
        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement('span');
        chatBox__user_span_name.classList.add("name");
        chatBox__user_span_name.textContent = '알림봇';
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement('span');
        chatBox__user_span_name.classList.add("date");
        chatBox__user_span_name.textContent = alarmMsg.createDt;
        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        const userThumb = document.createElement("div");
        userThumb.classList.add("userThumb", "is-bot");

        d_flex__align_items_start__gap_10.appendChild(userThumb)

        const userThumb__img = document.createElement("div");
        userThumb__img.classList.add("userThumb__img");

        userThumb.appendChild(userThumb__img);

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        d_flex__align_items_start__gap_10.appendChild(chatCard);

        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard.appendChild(chatCard__group);

        const card = document.createElement("div");
        card.classList.add("card");
        chatCard__group.appendChild(card);
        const card__text = document.createElement("div");
        card__text.classList.add("card__text");

        card__text.innerHTML = alarmMsg.messageContent.replace(/\r\n|\r|\n/g, "<br>");
        card.appendChild(card__text);

        if(alarmMsg.linkUrl){
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("btnGroup","gap-5");
            card.appendChild(btnGroup);

            const btn__is_primary__is_small = document.createElement("button");
            btn__is_primary__is_small.classList.add("btn","is-primary","is-small");
            btn__is_primary__is_small.dataset.linkUrl = alarmMsg.linkUrl;
            btn__is_primary__is_small.textContent = alarmMsg.linkText;
            btnGroup.appendChild(btn__is_primary__is_small);

            const alertModal = document.getElementById('MsgAlertModal');
            const alertContext = alertModal.querySelector('.modal__contents');
            const alertCloseButton = alertModal.querySelectorAll('.modal__footer button')[0];
            const alertConfirmButton = alertModal.querySelectorAll('.modal__footer button')[1];

            let currentAction = null; // 현재 수행할 핸들러 저장

            const alertTODOButtonEventHandler = () => {
                if (!currentAction) return;
                const { linkUrl } = currentAction.dataset;
                window.location = linkUrl;

            };

            alertCloseButton.addEventListener('click', () => {alertModal.style.display = 'none';});
            alertConfirmButton.addEventListener('click', alertTODOButtonEventHandler);

            btn__is_primary__is_small.addEventListener('click', () => {
                alertContext.textContent = '이동 하시겠습니까?';
                alertModal.style.removeProperty("display");
                alertModal.style.removeProperty("opacity");
                alertModal.style.removeProperty("visibility");
                alertModal.style.display = 'flex';
                currentAction = btn__is_primary__is_small;
                currentAction.dataset.confirmYn = "Y";
            });
        }
        return chatBox__chat;
    }

    TODO_NOTICE_Alarm = (alarmMsg,loginInfo) => {
        const chatBox__chat = document.createElement('div');
        chatBox__chat.classList.add("chatBox__chat");
        chatBox__chat.dataset.alarmType = alarmMsg.alarmType
        chatBox__chat.dataset.templateCode = alarmMsg.templateCode
        chatBox__chat.dataset.messageId = alarmMsg.messageId

        const chatBox__user = document.createElement('div');
        chatBox__user.classList.add("chatBox__user");
        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement('span');
        chatBox__user_span_name.classList.add("name");
        chatBox__user_span_name.textContent = '알림봇';
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement('span');
        chatBox__user_span_name.classList.add("date");
        chatBox__user_span_name.textContent = alarmMsg.createDt;
        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        const userThumb = document.createElement("div");
        userThumb.classList.add("userThumb", "is-bot");

        d_flex__align_items_start__gap_10.appendChild(userThumb)

        const userThumb__img = document.createElement("div");
        userThumb__img.classList.add("userThumb__img");

        userThumb.appendChild(userThumb__img);

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        d_flex__align_items_start__gap_10.appendChild(chatCard);

        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard.appendChild(chatCard__group);

        const card = document.createElement("div");
        card.classList.add("card");
        chatCard__group.appendChild(card);
        const card__text = document.createElement("div");
        card__text.classList.add("card__text");

        card__text.innerHTML = alarmMsg.messageContent.replace(/\r\n|\r|\n/g, "<br>");
        card.appendChild(card__text);

        if(alarmMsg.linkUrl){
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("btnGroup","gap-5");
            card.appendChild(btnGroup);

            const btn__is_primary__is_small = document.createElement("button");
            btn__is_primary__is_small.classList.add("btn","is-primary","is-small");
            btn__is_primary__is_small.dataset.linkUrl = alarmMsg.linkUrl;
            btn__is_primary__is_small.textContent = alarmMsg.linkText;
            btnGroup.appendChild(btn__is_primary__is_small);

            const alertModal = document.getElementById('MsgAlertModal');
            const alertContext = alertModal.querySelector('.modal__contents');
            const alertCloseButton = alertModal.querySelectorAll('.modal__footer button')[0];
            const alertConfirmButton = alertModal.querySelectorAll('.modal__footer button')[1];

            let currentAction = null; // 현재 수행할 핸들러 저장

            const alertTODOButtonEventHandler = () => {
                if (!currentAction) return;
                const { linkUrl } = currentAction.dataset;
                window.location = linkUrl;

            };

            alertCloseButton.addEventListener('click', () => {alertModal.style.display = 'none';});
            alertConfirmButton.addEventListener('click', alertTODOButtonEventHandler);

            btn__is_primary__is_small.addEventListener('click', () => {
                alertContext.textContent = '이동 하시겠습니까?';
                alertModal.style.removeProperty("display");
                alertModal.style.removeProperty("opacity");
                alertModal.style.removeProperty("visibility");
                alertModal.style.display = 'flex';
                currentAction = btn__is_primary__is_small;
                currentAction.dataset.confirmYn = "Y";
            });
        }
        return chatBox__chat;
    }

    DorothyChatBox(messageDetail,htmlElement,companyOrgUser) {

        const isDorothy = (messageDetail.upperMessage?.messageId ?? 0) !== 0;

        const chatBox__chat = this.DorothyChatComponentChatBox(messageDetail,isDorothy,companyOrgUser);
        this.componentChatCard(chatBox__chat,htmlElement);
        return chatBox__chat
    }

    DorothyChatComponentChatBox(messageDetail,isDorothy,companyOrgUser) {

        const matchedUsers = companyOrgUser.user.filter(user =>
            Number(messageDetail.message.sendUserKey) === Number(user.userKey)
        );

        const chatBox__chat = document.createElement("div");
        if (isDorothy) {
            chatBox__chat.classList.add("chatBox__chat", "is-dorothy")
        } else {
            chatBox__chat.classList.add("chatBox__chat", "is-right")
        }

        const chatBox__user = document.createElement("div");
        chatBox__user.classList.add("chatBox__user");

        chatBox__chat.appendChild(chatBox__user);

        const chatBox__user_span_name = document.createElement("span");
        chatBox__user_span_name.classList.add("name");
        if (isDorothy) {
            chatBox__user_span_name.textContent = '도로시'
        } else {
            chatBox__user_span_name.textContent = messageDetail.message.userNm
        }
        chatBox__user.appendChild(chatBox__user_span_name);

        const chatBox__user_span_date = document.createElement("span");
        chatBox__user_span_date.classList.add("date");
        chatBox__user_span_date.textContent = messageDetail.message.createDt;

        chatBox__user.appendChild(chatBox__user_span_date);

        const d_flex__align_items_start__gap_10 = document.createElement("div");
        d_flex__align_items_start__gap_10.classList.add("d-flex", "align-items-start", "gap-10");

        chatBox__chat.appendChild(d_flex__align_items_start__gap_10);

        if (isDorothy) {
            const userThumb = document.createElement("div");
            userThumb.classList.add("userThumb","is-dorothy");

            d_flex__align_items_start__gap_10.appendChild(userThumb)

            const userThumb__img = document.createElement("div");
            userThumb__img.classList.add("userThumb__img");

            userThumb.appendChild(userThumb__img);
        }

        const chatCard = document.createElement("div");
        chatCard.classList.add("chatCard");
        chatCard.dataset.sendUserName = messageDetail.message.userNm
        chatCard.dataset.sendUserKey = messageDetail.message.sendUserKey
        chatCard.dataset.messageId = messageDetail.message.messageId
        d_flex__align_items_start__gap_10.appendChild(chatCard)
        return chatBox__chat
    }

    DorothyChatCardGroup(messageDetail, origin = false) {
        const chatCard__group = document.createElement("div");
        chatCard__group.classList.add("chatCard__group");
        chatCard__group.dataset.roomId = messageDetail.message?.roomId ?? ""
        chatCard__group.dataset.company = messageDetail.message?.company ?? ""
        chatCard__group.dataset.roomType = messageDetail.message?.roomType ?? ""
        chatCard__group.dataset.messageContent = messageDetail.message?.messageContent ?? ""
        chatCard__group.dataset.messageType = messageDetail.message?.messageType ?? ""
        chatCard__group.dataset.userNm = messageDetail.message?.userNm ?? ""
        chatCard__group.dataset.messageUuid = messageDetail.message?.messageUuid ?? ""
        chatCard__group.dataset.replyMessageId = messageDetail.message?.replyMessageId ?? ""
        chatCard__group.dataset.messageId = messageDetail.message?.messageId ?? ""
        chatCard__group.dataset.attachmentId = messageDetail.message?.attachmentId ?? ""
        chatCard__group.dataset.deletedYn = messageDetail.message?.deletedYn ?? ""
        chatCard__group.dataset.orgNm = messageDetail.message?.orgNm ?? ""
        chatCard__group.dataset.sendUserKey = messageDetail.message?.sendUserKey ?? ""
        chatCard__group.dataset.createUserKey = messageDetail.message?.createUserKey ?? ""
        chatCard__group.dataset.modifyUserKey = messageDetail.message?.modifyUserKey ?? ""
        chatCard__group.dataset.modifyDt = messageDetail.message?.modifyDt ?? ""
        chatCard__group.dataset.createDt = messageDetail.message?.createDt ?? ""
        chatCard__group.dataset.roomName = messageDetail.message?.roomName ?? ""
        chatCard__group.dataset.description = messageDetail.message?.description ?? ""

        chatCard__group.dataset.originFileName = messageDetail.message?.originFileName ?? ""
        chatCard__group.dataset.fileSize = messageDetail.message?.fileSize ?? ""
        chatCard__group.dataset.savedFilePath = messageDetail.message?.savedFilePath ?? ""
        chatCard__group.dataset.fileExtension = messageDetail.message?.fileExtension ?? ""

        chatCard__group.dataset.upperMessageId = messageDetail.upperMessage?.messageId ?? ""
        chatCard__group.dataset.upperRoomId = messageDetail.upperMessage?.roomId ?? ""
        chatCard__group.dataset.upperSendUserKey = messageDetail.upperMessage?.sendUserKey ?? ""
        chatCard__group.dataset.upperUserNm = messageDetail.upperMessage?.userNm ?? ""
        chatCard__group.dataset.upperMessageContent = messageDetail.upperMessage?.messageContent ?? ""
        chatCard__group.dataset.upperDeletedYn = messageDetail.upperMessage?.deletedYn ?? ""
        chatCard__group.dataset.upperCreateDt = messageDetail.upperMessage?.createDt ?? ""
        chatCard__group.dataset.upperAttachmentId = messageDetail.upperMessage?.attachmentId ?? ""
        chatCard__group.dataset.upperOriginFileName = messageDetail.upperMessage?.originFileName ?? ""
        chatCard__group.dataset.upperFileSize = messageDetail.upperMessage?.fileSize ?? ""
        chatCard__group.dataset.upperSavedFilePath = messageDetail.upperMessage?.savedFilePath ?? ""
        chatCard__group.dataset.upperFileExtension = messageDetail.upperMessage?.fileExtension ?? ""

        chatCard__group.id = messageDetail.message.messageId;

        const card = document.createElement("div");
        card.classList.add("card");

        chatCard__group.appendChild(card)

        const card__text = document.createElement("div");
        card__text.classList.add("card__text");
        card__text.innerHTML = messageDetail.message.messageContent.replace(/\n/g, '<br>');


        card.appendChild(card__text);

        if(origin){
            if( messageDetail.upperMessage !== null
                && messageDetail.upperMessage.messageId !== null
                && messageDetail.upperMessage.messageId !== 0
            ){
                const replyBox = this.DorothyChatReplyBox(messageDetail.upperMessage);
                const card = chatCard__group.querySelector('.card');
                const card__text = chatCard__group.querySelector('.card .card__text');
                card.insertBefore(replyBox, card__text);
            }
        }
        return chatCard__group
    }

    DorothyChatReplyBox(upperMessage) {
        const replyBox = document.createElement("div");
        replyBox.classList.add("replyBox");
        replyBox.dataset.messageId = upperMessage.messageId
        replyBox.dataset.roomId = upperMessage.roomId
        replyBox.dataset.sendUserKey = upperMessage.sendUserKey
        replyBox.dataset.userNm = upperMessage.userNm
        replyBox.dataset.messageContent = upperMessage.messageContent
        replyBox.dataset.deletedYn = upperMessage.deletedYn
        replyBox.dataset.createDt = upperMessage.createDt

        const replyBox__header = document.createElement("div");
        replyBox__header.classList.add("replyBox__header");

        replyBox.appendChild(replyBox__header);

        const replyBox__target = document.createElement("div");
        replyBox__target.classList.add("replyBox__target");

        replyBox__header.appendChild(replyBox__target);

        const replyBox__target_span = document.createElement("span");
        replyBox__target_span.innerText = upperMessage.userNm
        replyBox__target.appendChild(replyBox__target_span);

        const replyText = document.createTextNode(" 에게 응답");
        replyBox__target.appendChild(replyText);

        const replyBox__header_button = document.createElement("button");
        replyBox__header_button.type = "button";
        replyBox__header_button.classList.add("btn");

        replyBox__header.appendChild(replyBox__header_button);

        const replyBox__body = document.createElement("div");
        replyBox__body.classList.add("replyBox__body");

        if( upperMessage.attachmentId !== null
            && upperMessage.attachmentId !== 0
        ){
            const cardFile = this.componentCardFile(upperMessage);
            replyBox__body.appendChild(cardFile);
        }

        if(upperMessage.messageContent !== ''
            && upperMessage.messageContent !== null
        ){
            // 2025.04.14 김광길 특수문자 복호화 처리
            const dorothyDoc = new DOMParser().parseFromString(upperMessage.messageContent, 'text/html');
            /* 2025.04.15 김광길 개행 처리
            const messageText = document.createTextNode(dorothyDoc.documentElement.textContent);
            replyBox__body.appendChild(messageText);
            */
            replyBox__body.innerHTML = dorothyDoc.documentElement.textContent.replace(/\r\n|\r|\n/g, "<br>");
        }

        replyBox.appendChild(replyBox__body);

        return replyBox;
    }

    sendEmojiApi(emojiType, messageId, isDelete) {
        const userKey = this._loginInfo.userKey;
        const userNm = this._loginInfo.userNm;
        const orgNm = this._loginInfo.orgNm;

        const requestData = {
            emojiType,
            messageId,
            userKey,
            userNm,
            orgNm
        };

        if(isDelete){
            window.emojiApi.emojiDelete(requestData)
                .then(response =>{
                    if(response.code === 0){ //성공
                        this.updateReactions(response.data,messageId);
                        this._clsMessage.publishEmoji(this._loginInfo,this._clsMessage._currentRoomInfo._roomId,messageId,messageType.EMOJI);
                    }
                    else{
                        this._func.showToastModal("emojiDelete fail:", response.code);
                    }
                });
        }else {
            window.emojiApi.emojiCreate(requestData)
                .then(response =>{
                    if(response.code === 0){ //성공
                        this.updateReactions(response.data,messageId);
                        this._clsMessage.publishEmoji(this._loginInfo,this._clsMessage._currentRoomInfo._roomId,messageId,messageType.EMOJI);
                    }
                    else{
                        this._func.showToastModal("emojiCreate fail:", response.code);
                    }
                });
        }

    }

    getToolbarHtml() {
        const toolbar = document.createElement('div');
        toolbar.className = 'chatToolbar';
        toolbar.style.display = 'flex'
        const innerHtml = `
                <div class="chatToolbar__wrap">      
                       <div class="chatToolbar__emoji">
                            <button type="button" class="btn has-icon emojiBtn">👍</button>
                            <button type="button" class="btn has-icon emojiBtn">😍</button>
                            <button type="button" class="btn has-icon emojiBtn">😆</button>
                            <div class="emoji">
                                <button type="button" class="btn has-icon chatToolbar__emojiBtn" data-target="#chatToolbar__emojiInput">
                                    <i class="icon is-24 is-chat-emoji-add"></i>
                                </button>
                                <input type="text" id="chatToolbar__emojiInput" style="display: none;">
                            </div>
                       </div>
                    <div class="chatToolbar__btn">
                        <button type="button" class="btn has-icon" id="editBtn">
                            <i class="icon is-24 is-edit-24"></i>
                        </button>
                        <div class="more">
                            <button id="message_function" type="button" class="btn has-icon">
                                <i class="icon is-24 is-chat-more-14"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        toolbar.innerHTML = innerHtml;
        return toolbar;
    }

    createEmojiReactionUI({ emojiType, messageId, count, userList }) {
        const reactList = document.createElement('div');
        reactList.className = 'chatCard__reactList';
        reactList.style.position = 'relative';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tag';
        button.dataset.emojiType = emojiType;
        button.dataset.messageId = messageId;

        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'emoji';
        emojiSpan.textContent = emojiType;

        const countSpan = document.createElement('span');
        countSpan.className = 'count';
        countSpan.textContent = count;

        button.appendChild(emojiSpan);
        button.appendChild(countSpan);
        reactList.appendChild(button);

        const layerContainer = document.createElement('div');
        layerContainer.className = 'layerContainer reactionList';
        layerContainer.style.display = 'none';
        layerContainer.style.top = '100%';

        const ul = document.createElement('ul');
        ul.className = 'layer';

        userList.forEach(user => {
            const li = document.createElement('li');
            li.className = 'layer__item';
            li.dataset.userKey = user.userKey;
            const a = document.createElement('a');
            a.className = 'layer__inner';
            a.innerHTML = `${user.userNm} <span class="orgNm">${user.orgNm}</span>`;

            li.appendChild(a);
            ul.appendChild(li);
        });

        layerContainer.appendChild(ul);
        reactList.appendChild(layerContainer);

        return { reactList, button };
    }

    makeEmoji(messageDetail) {
        // <div className="chatCard__react">
        //     <div className="chatCard__reactList">
        //         <button type="button" className="tag"><span className="emoji">😱</span> <span className="count">12</span>
        //         </button>
        //     </div>
        //     <div className="chatCard__reactList">
        //         <button type="button" className="tag"><span className="emoji">🤡</span> <span
        //             className="count">458</span></button>
        //     </div>
        //     <div className="chatCard__reactList">
        //         <button type="button" className="tag"><span className="emoji">😑</span> <span className="count">2</span>
        //         </button>
        //     </div>
        // </div>

        const chatCard__react = document.createElement("div");
        chatCard__react.classList.add("chatCard__react");

        if(messageDetail.message.sendUserKey === this._loginInfo.userKey){
            chatCard__react.style.justifyContent = 'flex-end'; //우측정렬
        }
        if (!Array.isArray(messageDetail._emojiList)) {
            return chatCard__react;
        }
        this.makeDefaultReactUserList(messageDetail._emojiList, chatCard__react);

        return chatCard__react;
    }

    makeDefaultReactUserList(emojiList, target) {
        emojiList.forEach(emoji => {
            let emojiUserList;

            if (emoji instanceof Element) {
                const userDivs = emoji.querySelectorAll('.emoji-user-dto');
                emojiUserList = {
                    messageId: emoji.dataset.messageId,
                    emojiType: emoji.dataset.emojiType,
                    modifyDt: emoji.dataset.modifyDt,
                    userList: Array.from(userDivs).map(userDiv => ({
                        userKey: userDiv.dataset.userKey,
                        userNm: userDiv.dataset.userNm || '',
                        orgNm: userDiv.dataset.orgNm || ''
                    }))
                };
            } else {
                emojiUserList = {
                    messageId: emoji.messageId,
                    emojiType: emoji.emojiType,
                    modifyDt: emoji.modifyDt,
                    userList: Array.from(emoji.userList || []).map(user => ({
                        userKey: user.userKey,
                        userNm: user.userNm || '',
                        orgNm: user.orgNm || ''
                    }))
                };
            }

            const { reactList, button } = this.createEmojiReactionUI({
                emojiType: emojiUserList.emojiType,
                messageId: emojiUserList.messageId,
                count: emojiUserList.userList.length || 0,
                userList: emojiUserList.userList
            });

            target.appendChild(reactList);
            target.dataset.messageId = emojiUserList.messageId;

            this.addEmojiReactEvent?.(button); // 이벤트 연결 (있다면)
        });
    }


    updateReactions(newList,messageId) {
        const groupCard = document.querySelector(`.chatCard__group[data-message-id="${messageId}"]`);
        if (!groupCard) return;

        let container = groupCard.querySelector('.chatCard__react');
        if (!container) {
            container = document.createElement('div');
            container.className = 'chatCard__react';
            if (groupCard.dataset.sendUserKey === this._loginInfo.sendUserKey) {
                container.style.justifyContent = 'flex-end';
            }
            container.dataset.messageId = messageId;

            const cardElement = groupCard.querySelector('.card');
            cardElement ? cardElement.insertAdjacentElement('afterend', container) : groupCard.appendChild(container);
        }

        container.innerHTML = '';

        newList.forEach(item => {
            const { reactList, button } = this.createEmojiReactionUI({
                emojiType: item.emojiType,
                messageId: item.messageId,
                count: item.count,
                userList: item.userList
            });
            container.appendChild(reactList);
            this.addEmojiReactEvent(button); // 이벤트 등록
        });
    }

    addEmojiReactEvent(btn) {
        const reactUserList = btn.nextElementSibling; //layerContainer reactionList
        // 마우스 오버
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#f0f0f0';
            if (reactUserList) {
                const rect = btn.getBoundingClientRect();
                reactUserList.style.top = `${rect.bottom}px`;
                reactUserList.style.left = `${rect.left}px`;
                reactUserList.style.position = 'fixed';
                reactUserList.style.display = 'block';
            }


        });

        // 마우스 아웃
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '';
            // 마우스가 layerContainer로 이동 중인지 확인
            setTimeout(() => {
                if (!reactUserList.matches(':hover')) {
                    reactUserList.style.display = 'none';
                }
            }, 50);
        });

        if (reactUserList) {
            reactUserList.addEventListener('mouseenter', () => {
                reactUserList.style.display = 'block';
            });

            reactUserList.addEventListener('mouseleave', () => {
                reactUserList.style.display = 'none';
            });
        }

        // 클릭 이벤트
        btn.addEventListener('click', () => {
            const emoji = btn.querySelector('.emoji');
            reactUserList.style.display = 'none';
            this.sendEmojiApi(emoji.textContent, btn.dataset.messageId,this.isDelete(reactUserList));
        });
    }

    isDelete(reactUserList) {
        if (!reactUserList) return false; // null, undefined 방지

        const selectReactionUserList = reactUserList.querySelectorAll('.layer__item');

        return Array.from(selectReactionUserList).some(user => {
            return Number(user.dataset.userKey) === Number(this._loginInfo.userKey);
        });
    }

    updateReactionsByWebsocket(messageId){
        const requestData = {
            messageId
        };

        window.emojiApi.emojiFindGroup(requestData)
            .then(response =>{
                if(response.code === 0){ //성공
                    this.updateReactions(response.data,messageId);
                }
                else{
                    console.error('emojiFindGroup fail :',response.code)
                }
            });
    }

}