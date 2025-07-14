class MsgFunc {
    constructor() {
        this._api = new MsgApi();

        this._updateReadMessage = (updateType, roomId, userKey) => {
            const data = new Map();
            let url = null;

            switch (updateType) {
                case 'MESSAGE':
                    data.set("roomId", roomId);
                    data.set("sendUserKey", userKey.toString());
                    url = '/messenger/message/read/update';
                    break;
                case 'ALARM':
                    data.set("roomId", roomId);
                    data.set("userKey", userKey.toString());
                    url = '/messenger/alarm/read/update';
                    break;
                default:
                    this.showToastModal("Invalid updateType:", updateType);
                    return Promise.reject("Invalid updateType");
            }

            const jsonData = Object.fromEntries(data);

            // ✅ 타임아웃 컨트롤러 추가
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3초 후 요청 중단

            return fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonData),
                signal: controller.signal
            })
                .then(response => {
                    clearTimeout(timeoutId); // 응답이 오면 타임아웃 제거

                    // ✅ 응답이 JSON이 아닐 경우 대비한 예외 처리
                    const contentType = response.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                        throw new Error("서버 응답이 JSON 형식이 아닙니다.");
                    }

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    return response.json();
                })
                .then(response => {
                    if (response?.code !== 0) {
                        console.error("오류 발생 ::", response?.code);
                    }
                })
                .catch(err => {
                    console.error("오류 발생 ::", err);
                })
                .finally(() => {
                    // ✅ 오류가 발생해도 UI가 멈추지 않도록 보장
                    setTimeout(() => {}, 0);
                });
        };




        this._summaryModalOpen = (newText) => {
            const summaryModal = document.getElementById("summaryModal");
            // 2025.04.15 김광길 수정
            summaryModal.querySelector('.summaryBox__text').innerHTML = newText.replace(/\r\n|\r|\n/g, "<br>");
            summaryModal.style.removeProperty("display");
            summaryModal.style.removeProperty("opacity");
            summaryModal.style.removeProperty("visibility");
            summaryModal.style.display="flex";

            const closeButtonEventHandler = () => {
                summaryModal.style.display="none";
            }
            const closeButton= summaryModal.querySelector('.top button');
            closeButton.addEventListener('click',closeButtonEventHandler);
            const confirmButtonEventHandler = () => {
                summaryModal.style.display="none";
            }
            const confirmButton= summaryModal.querySelector('.modal__footer button');
            confirmButton.addEventListener('click',confirmButtonEventHandler);
        }
        this._summaryModalClose = (newText) => {
            document.getElementById("summaryModal").style.display="none";
        }

        this._updateLoadingOpen= (newText) => {
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
            document.getElementById("__contents__loading").style.display="flex";
        }

        this._updateLoadingClose= () => {
            document.getElementById("__contents__loading").style.display="none";
        }

        this._parseData = (serverData)  => {
            try {
                const parsed = JSON.parse(serverData);
                if (parsed.code === undefined || parsed.code === null) {
                    throw new Error("code 값이 없습니다.");
                }
                if (parsed.code !== 0) {
                    throw new Error(`서버 오류 발생: code=${parsed.code}`);
                }
                return parsed.data;
            } catch (error) {
                console.error("JSON 파싱 오류:", error);
                return error;
            }
        }
        this._makeLoginInfo = (dataset) => {
            return new LoginInfo(
                dataset.awpCorpId
                ,dataset.awpOrgKey
                ,dataset.awpOrgName
                ,dataset.awpUserKey
                ,dataset.awpUserName
                ,dataset.awpUserImage
                ,dataset.awpSelectedDb
                ,dataset.awpToken
            );};
        /*this._makeMessageResponse = (dataset) => {
            return new MessageResponse(
                dataset.messageId,
                dataset.attachmentId,
                dataset.createDt,
                dataset.deletedYn,
                dataset.messageContent,
                dataset.messageType,
                dataset.roomId,
                dataset.sendUserKey,
                dataset.replyMessageId,
                dataset.groupName,
                dataset.userNm,
                dataset.originFileName
            );
        };*/

        this._makeRoomDetail = (dataset) => {
            return new Room(
                dataset.roomId,
                dataset.roomType,
                dataset.roomName,
                dataset.description,
                dataset.activeYn,
                dataset.roomThumbnail,
                dataset.createUserKey,
                dataset.createDt,
                dataset.modifyUserKey,
                dataset.modifyDt,
                dataset.createDtFormatted,
                dataset.modifyDtFormatted,
                dataset.participantList,
                dataset.targetUserKey
            )
        };

        this._makeRoomList = (dataset) => {
            return new RoomList(
                dataset.chatRoomId ?? dataset.roomId
                ,dataset.chatRoomType ?? dataset.roomType
                ,dataset.chatRoomName ?? dataset.roomName
                ,dataset.chatRoomDescription ?? dataset.roomDescription
                ,dataset.chatRoomUnreadMessageCount ?? dataset.roomUnreadMessageCount
                ,dataset.chatRoomMessageType ?? dataset.roomMessageType
                ,dataset.chatRoomLastMessageContent ?? dataset.roomLastMessageContent
                ,dataset.chatRoomMessageId ?? dataset.roomMessageId
                ,dataset.chatRoomReadMessageId ?? dataset.roomReadMessageId
                ,dataset.chatRoomLastMessageDt ?? dataset.roomLastMessageDt
                ,dataset.chatRoomFixOrder ?? dataset.roomFixOrder
                ,dataset.chatParticipantList ?? dataset.participantList
            )
        };
        this._makeUpperMessage = (dataset) => {
            return new UpperMessage(
               dataset.upperMessageId ?? null,
               dataset.upperRoomId ?? null,
               dataset.upperSendUserKey ?? null,
               dataset.upperUserNm ?? null,
               dataset.upperMessageContent ?? null,
               dataset.upperDeletedYn ?? null,
               dataset.upperCreateDt ?? null,
               dataset.upperCreateDtFormatted ?? null,
               dataset.upperAttachmentId ?? null,
               dataset.upperOriginFileName ?? null,
               dataset.upperFileSize ?? null,
               dataset.upperSavedFilePath ?? null,
               dataset.upperFileExtension ?? null
            );
        };

        this._makeUpperMessageApi = (dataset) => {
            if (!dataset) {
                return null;
            }
            return new UpperMessage(
                dataset.messageId ?? null,
                dataset.roomId ?? null,
                dataset.sendUserKey ?? null,
                dataset.userNm ?? null,
                dataset.messageContent ?? null,
                dataset.deletedYn ?? null,
                dataset.createDt ?? null,
                dataset.createDtFormatted ?? null,
                dataset.upperAttachmentId ?? null,
                dataset.originFileName ?? null,
                dataset.fileSize ?? null,
                dataset.savedFilePath ?? null,
                dataset.fileExtension ?? null
            );
        }

        this._makeMessage = (message) => {
            return new Message(
                message.roomId,
                message.company,
                message.corporateId,
                message.roomType,
                message.messageContent,
                message.messageType,
                message.userNm,
                message.messageUuid,
                message.replyMessageId,
                message.messageId,
                message.deletedYn,
                message.updateYn,
                message.orgNm,
                message.sendUserKey,
                message.targetUserIdList,
                message.upperMessageDto,
                message.createUserKey,
                message.modifyUserKey,
                message.modifyDt,
                message.createDt,
                message.createDtFormatted,
                message.roomName,
                message.description,
                message.publishType,
                message.attachmentList
            )
        }

        this._makeAttachment = (attachment) => {
            return new Attachment(
                attachment?.attachmentId,
                attachment?.roomId ?? null,
                attachment?.companyId ?? null,
                attachment?.sendUserKey ?? null,
                attachment?.sendUserName ?? null,
                attachment?.originFileName ?? null,
                attachment?.fileExtension ?? null,
                attachment?.fileSize ?? null,
                attachment?.deletedYn ?? null,
                attachment?.savedFilePath ?? null,
                attachment?.createDt ?? null
            )
        }

        this._makeAlarm = (alarm) => {
            return new Alarm(
                alarm.messageId, //메시지ID
                alarm.roomId, //채팅방ID
                alarm.sendUserKey, //보낸사용자KEY
                alarm.sendSystem, //알림요청시스템
                alarm.receiveUserKey, //받는사용자KEY
                alarm.alarmType, //알림Type
                alarm.templateCode, //메시지템플릿코드
                alarm.templateBody, //알림발송요청문구(String JSON)
                alarm.templateMessage, //템플릿메시지
                alarm.messageText, //메시저(plain Text - 메시지 검색용)
                alarm.messageContent, //메시지컨텐츠
                alarm.linkText, //링크버튼명
                alarm.linkUrl, //링크URL
                alarm.acceptUrl, //수락URL
                alarm.rejectUrl, //거절URL
                alarm.confirmYn, //확인상태코드[Y:수락, N:거절, null:대기]
                alarm.confirmDt, // 확인일시
                alarm.deletedYn, //삭제상태
                alarm.createUserKey, //생성자
                alarm.createDt, //생성일시
                alarm.modifyUserKey, //수정자
                alarm.modifyDt, //수정일시
                alarm.keyword, //메시지 조회
                alarm.language, //템플릿언어코드
                alarm.company,
                alarm.createDtFormatted,
                alarm.modifyDtFormatted
            )
        }


        this._scrollToLastChatCard = () => {
            const chatBoxBody = document.querySelector('.chatBox__body');
            if (!chatBoxBody) return;

            const lastEl = chatBoxBody.lastElementChild;
            if (!lastEl) return;

            // 렌더링이 다 끝났을 때 실행
            setTimeout(() => {
                // scrollIntoView 시도
                lastEl.scrollIntoView({ behavior: 'smooth', block: 'end' });

                // fallback: 스크롤이 부족할 때 강제로 스크롤 최하단으로
                chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
            }, 0);


            /* 2025.04.10 원본소스 백업 김광길
                const chatBoxBody=document.querySelector('.chatBox__body');
                if(chatBoxBody.lastElementChild){
                    chatBoxBody.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            */
        };

        this._chatBoxScrollToLast = () => {
            const scrollBody = document.querySelector(".messenger__body .chatBox [data-overlayscrollbars-viewport]");

            // 모든 메시지를 append한 후에 하단으로 스크롤 이동
            scrollBody.scrollTo({
                top: scrollBody.scrollHeight
                //,behavior: 'smooth'
            });
        }

        this._focusToElement = (element) => {
            element.value = '';
            element.focus();
        };

        this._makeNowYYYYMMDD = () => {
            const now = new Date();

            const YYYY = now.getFullYear();
            const MM = String(now.getMonth() + 1).padStart(2, "0"); // 0부터 시작하므로 +1 필요
            const DD = String(now.getDate()).padStart(2, "0");
            const HH = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");

            const formattedDate = `${YYYY}-${MM}-${DD} ${HH}:${mm}`;
        }

        this._changeChatRoomUnreadMessageCount = (element, count) => {
            element.querySelector('.chat__count').textContent = Number(count);
            element.querySelector('.chat__count').style.display ='none';
            element.dataset.chatRoomUnreadMessageCount = Number(count);
        }

        this._clear = (formData,contentViewElement) => {
            const event = new Event('scroll', { bubbles: true });
            const viewport = contentViewElement.querySelector('.card__moreBtn') !== null
                ? contentViewElement.querySelector('.card__moreBtn').closest('[data-overlayscrollbars-viewport]')
                : null;
            const replyBox = document.getElementById('_replyBox');
            const replyFileBox = document.getElementById('_replyFileBox');
            const replyDeleteButtonLayer= document.getElementById("ReplyDeleteButtonLayer");

            if (replyBox) replyBox.remove();
            if (replyFileBox) replyFileBox.remove();
            /*if (chatListLayer) chatListLayer.style.display="none";*/
            if (viewport) viewport.dispatchEvent(event);
            for (let key of formData.keys()) {
                formData.delete(key);
            }
        };

        this._clearNew = (formData, uploadedFiles, contentViewElement) => {
            const event = new Event('scroll', { bubbles: true });
            const viewport = contentViewElement.querySelector('.card__moreBtn') !== null
                ? contentViewElement.querySelector('.card__moreBtn').closest('[data-overlayscrollbars-viewport]')
                : null;

            const replyBox = document.getElementById('_replyBox');
            if (replyBox) replyBox.remove();

            // 첨부파일 삭제 처리
            const attachmentList = document.querySelector('#attachmentList');
            if (attachmentList) {
                const attachments = attachmentList.querySelectorAll('.attachment');
                if (attachments.length > 0) {
                    attachments.forEach(el => el.remove()); // 각 attachment 요소 삭제
                }
            }

            // 점부파일 정보 초기화
            const attachmentInfo = document.querySelector('#attachmentInfo');
            attachmentInfo.querySelector('.current-count').textContent = "0";
            attachmentInfo.querySelector('.current-size').textContent = "0.0";
            if (attachmentInfo) {
                const displayStyle = window.getComputedStyle(attachmentInfo).display;
                if (displayStyle === 'block') {
                    attachmentInfo.style.display = 'none';
                }
            }

            if (viewport) viewport.dispatchEvent(event);
            for (const key of [...formData.keys()]) {
                formData.delete(key);
            }
            // 첨부파일 목록 초기화
            if (uploadedFiles) {
                uploadedFiles.length = 0;
            }

            function printFormData(formData) {
                console.log("---- FormData Entries ----");
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
            }

            printFormData(formData); // 비어 있어야 정상

        };


        // 2025.04.10 김광길 처리 검색 닫기 버튼 처리
        this._msgSearchCloseButtonEventHandler = (msgSearch,chatBox) => {
            msgSearch.classList.remove('is-active');
            chatBox.style.removeProperty("width");
            document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                .forEach(item => {
                    item.querySelector('.card')?.classList.remove('is-highlight');
                });
        }

        this._searchBtnEventHandler = (createSearchEvent,msgSearch,msgSearchForm,msgSearchList,element,mvc,loginInfo,companyOrgUser,clsMessage,innerEvent) => {
            const settingPanel = document.querySelector('.messenger').querySelector('.messenger__side.is-setting');
            const msgSearchCloseButton = msgSearch.querySelector('button.btn.has-icon');
            const msgSearchListCount = msgSearch.querySelector('.sideBox__body .searchList__count span');
            const msgSearchFormInput = msgSearchForm.querySelector('input');
            const msgSearchFormInputButton = msgSearchForm.querySelector('button');
            const roomId = element.dataset.chatRoomId;
            const chatBox = document.querySelector('.chatBox');
            chatBox.style.width = "calc(100% - 314px)";

            // 2025.04.10 김광길 추가, 검색창 열릴때 Setting이 열려있으면 닫기
            if(settingPanel.classList.contains("is-active")){
                settingPanel.classList.remove("is-active");
            }

            const msgSearchCloseButtonEventHandler = () => {
                this._msgSearchCloseButtonEventHandler(msgSearch,chatBox);
                
                // 2025.04.10 로직 모듈 처리
                // msgSearch.classList.remove('is-active');
                // chatBox.style.removeProperty("width");
                // document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                //     .forEach(item => {
                //         item.querySelector('.card')?.classList.remove('is-highlight');
                //     });
            }
            const msgSearchFormInputButtonEventHandler = () => {

                const searchIcon= msgSearchFormInputButton.querySelector('i.icon.is-24.is-search-24');
                if(searchIcon){
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-24","is-search-24");
                    msgSearchIcon.classList.add("is-14","is-clear-14");
                    msgSearchFormInput.setAttribute("readonly","readonly");

                    msgSearchListCount.textContent = "0";
                    msgSearchList.innerHTML = '';

                    const keyword = msgSearchFormInput.value.trim();
                    const msgSearchEventHandler = (roomId,userKey,keyword) => {
                        const msgSearchUrl = `/messenger/message/rooms/${roomId}/${userKey}/keywords/${keyword}`;
                        return fetch(msgSearchUrl, { method: 'GET' })
                            .then(response => response.text())
                            .then(response => this.parseData(response))
                            .then(messageSearchDtoList => {
                                const messageSearchDtoComponentList = []
                                messageSearchDtoList.forEach(messageSearchDto =>{
                                    const messageSearchDtoComponent= mvc.makeMsgSearchListComponent(messageSearchDto,keyword);
                                    messageSearchDtoComponentList.push(messageSearchDtoComponent);
                                    msgSearchList.appendChild(messageSearchDtoComponent);
                                })
                                msgSearchListCount.textContent = messageSearchDtoList.length.toString();

                                return messageSearchDtoComponentList;
                            })
                            .then((messageSearchDtoComponentList) => {

                                const messageSearchDtoComponentEventHandler = (e) => {
                                    element.dataset.mode = "SEARCH";
                                    const fromMessageId = e.currentTarget.dataset.messageId;
                                    const messageElement = document
                                        .querySelector('.chatBox__body')
                                        ?.querySelector(`[data-message-id="${fromMessageId}"]`);

                                    if (messageElement === null) {
                                        const toMessageId = document.querySelector('.chatBox__body')?.querySelector('[data-message-id]').dataset.messageId;
                                        const msgFromToUrl = `/messenger/message/listToUpper`;
                                        const fromToData = {"roomId":roomId, "messageId":Number(toMessageId),"upperMessageId":Number(fromMessageId)};
                                        const preRoomAwpMessageDetailList = clsMessage.roomAwpMessageDetailListMap.get(roomId);
                                        fetch(msgFromToUrl, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(fromToData),
                                        })
                                            .then(response => response.text())
                                            .then(response => this.parseData(response))
                                            .then(response => {
                                                let previousMessageDetail= null;
                                                const tempAwpMessageDetailList = [];
                                                const tempList = Array.from(response);
                                                tempList
                                                    .filter(item => item.messageId && !isNaN(Number(item.messageId)) && !(Number(item.messageId) === 0) ) // 유효한 messageId만 필터링
                                                    .sort((a, b) => a.messageId - b.messageId )
                                                    .forEach( (item) => {
                                                        const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.messageId),this.makeMessage(item),this._makeUpperMessageApi(item.upperMessageDto),previousMessageDetail);
                                                        previousMessageDetail = awpMessageDetail;
                                                        tempAwpMessageDetailList.push(awpMessageDetail);
                                                    });
                                                return tempAwpMessageDetailList;
                                            })
                                            .then((roomAWPMessageDetailList) => {
                                                if(roomAWPMessageDetailList.length !== 0){
                                                    preRoomAwpMessageDetailList[0].previousMessageDetail = roomAWPMessageDetailList[roomAWPMessageDetailList.length - 1];
                                                    const tempTotal = [...roomAWPMessageDetailList, ...preRoomAwpMessageDetailList];
                                                    const chatMessageBody = document.querySelector('.messenger__body .chatBox .chatBox__body')
                                                    chatMessageBody.innerHTML = '';
                                                    clsMessage.roomAwpMessageDetailListMap.set(roomId,tempTotal);
                                                    const contentViewElement = document.querySelector('.messenger');
                                                    innerEvent.createElementEvent(false,element,clsMessage.roomAwpMessageDetailListMap,mvc,companyOrgUser,contentViewElement);
                                                    const cards = document.querySelectorAll('.chatCard__group .card');
                                                    mvc.chatFunctionMenu(cards, contentViewElement, element);
                                                    const cardFileList = document.querySelectorAll('.chatCard__group .card__file');
                                                    mvc.chatFileFunction(cardFileList);
                                                }
                                            })
                                            .then(() =>{
                                                document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                                    .forEach(item => {
                                                        item.querySelector('.card')?.classList.remove('is-highlight');
                                                    });

                                                const messageElement = document.querySelector('.chatBox__body')?.querySelector(`[data-message-id="${fromMessageId}"]`);
                                                messageElement.querySelector('.card').classList.add('is-highlight');
                                                messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                messageElement.focus();
                                            })
                                            .catch(err => console.log(err))

                                    } else {
                                        document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                            .forEach(item => {
                                                item.querySelector('.card')?.classList.remove('is-highlight');
                                            });

                                        messageElement.querySelector('.card').classList.add('is-highlight');
                                        messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        messageElement.focus();
                                    }
                                };
                                messageSearchDtoComponentList.forEach(messageSearchDtoComponent => {
                                    messageSearchDtoComponent.addEventListener('click', messageSearchDtoComponentEventHandler);
                                })
                            })
                    }
                    const result = msgSearchEventHandler(roomId,loginInfo.userKey,keyword)
                } else {
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-14","is-clear-14");
                    msgSearchIcon.classList.add("is-24","is-search-24");
                    msgSearchFormInput.removeAttribute("readonly");
                }
            }
            msgSearchFormInput.removeAttribute("readonly");
            const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
            msgSearchIcon.classList.remove("is-14","is-clear-14");
            msgSearchIcon.classList.add("is-24","is-search-24");
            msgSearch.classList.add('is-active');
            msgSearchFormInput.value='';

            msgSearchListCount.textContent = "0";
            msgSearchList.innerHTML = '';

            if(createSearchEvent === false){

                msgSearchCloseButton.removeEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.removeEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.removeEventListener('keypress',handleKeyUp);

                msgSearchCloseButton.addEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.addEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.addEventListener('keypress',handleKeyUp);
                function handleKeyUp(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        msgSearchFormInputButton.click();
                    }
                }
            }
            return true;
        }

        this._dorothySearchBtnEventHandler = (createSearchEvent,msgSearch,msgSearchForm,msgSearchList,element,mvc,loginInfo,companyOrgUser,clsMessage,innerEvent) => {
            const settingPanel = document.querySelector('.messenger').querySelector('.messenger__side.is-setting');
            const msgSearchCloseButton = msgSearch.querySelector('button.btn.has-icon');
            const msgSearchListCount = msgSearch.querySelector('.sideBox__body .searchList__count span');
            const msgSearchFormInput = msgSearchForm.querySelector('input');
            const msgSearchFormInputButton = msgSearchForm.querySelector('button');
            const roomId = element.dataset.chatRoomId;
            const chatBox = document.querySelector('.chatBox');
            chatBox.style.width = "calc(100% - 314px)";

            // 2025.04.10 김광길 추가, 검색창 열릴때 Setting이 열려있으면 닫기
            if(settingPanel.classList.contains("is-active")){
                settingPanel.classList.remove("is-active");
            }

            const msgSearchCloseButtonEventHandler = () => {
                this._msgSearchCloseButtonEventHandler(msgSearch,chatBox);

                // 2025.04.10 로직 모듈 처리
                // msgSearch.classList.remove('is-active');
                // chatBox.style.removeProperty("width");
                // document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                //     .forEach(item => {
                //         item.querySelector('.card')?.classList.remove('is-highlight');
                //     });
            }
            const msgSearchFormInputButtonEventHandler = () => {

                const searchIcon= msgSearchFormInputButton.querySelector('i.icon.is-24.is-search-24');
                if(searchIcon){
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-24","is-search-24");
                    msgSearchIcon.classList.add("is-14","is-clear-14");
                    msgSearchFormInput.setAttribute("readonly","readonly");

                    msgSearchListCount.textContent = "0";
                    msgSearchList.innerHTML = '';

                    const keyword = msgSearchFormInput.value.trim();
                    const msgSearchEventHandler = (roomId,userKey,keyword) => {
                        const msgSearchUrl = `/messenger/message/rooms/${roomId}/${userKey}/keywords/${keyword}`;
                        return fetch(msgSearchUrl, { method: 'GET' })
                            .then(response => response.text())
                            .then(response => this.parseData(response))
                            .then(messageSearchDtoList => {
                                const messageSearchDtoComponentList = []
                                messageSearchDtoList.forEach(messageSearchDto =>{
                                    const messageSearchDtoComponent= mvc.makeMsgSearchListComponent(messageSearchDto,keyword);
                                    messageSearchDtoComponentList.push(messageSearchDtoComponent);
                                    msgSearchList.appendChild(messageSearchDtoComponent);
                                })
                                msgSearchListCount.textContent = messageSearchDtoList.length.toString();

                                return messageSearchDtoComponentList;
                            })
                            .then((messageSearchDtoComponentList) => {

                                const messageSearchDtoComponentEventHandler = (e) => {
                                    element.dataset.mode = "SEARCH";
                                    const fromMessageId = e.currentTarget.dataset.messageId;
                                    const messageElement = document
                                        .querySelector('.chatBox__body')
                                        ?.querySelector(`[data-message-id="${fromMessageId}"]`);

                                    if (messageElement === null) {
                                        const toMessageId = document.querySelector('.chatBox__body')?.querySelector('[data-message-id]').dataset.messageId;
                                        const msgFromToUrl = `/messenger/message/listToUpper`;
                                        const fromToData = {"roomId":roomId, "messageId":Number(toMessageId),"upperMessageId":Number(fromMessageId)};
                                        const preRoomAwpMessageDetailList = clsMessage.roomAwpMessageDetailListMap.get(roomId);
                                        fetch(msgFromToUrl, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(fromToData),
                                        })
                                            .then(response => response.text())
                                            .then(response => this.parseData(response))
                                            .then(response => {
                                                let previousMessageDetail= null;
                                                const tempAwpMessageDetailList = [];
                                                const tempList = Array.from(response);
                                                tempList
                                                    .filter(item => item.messageId && !isNaN(Number(item.messageId)) && !(Number(item.messageId) === 0) ) // 유효한 messageId만 필터링
                                                    .forEach( (item) => {
                                                        const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.messageId),this.makeMessage(item),this.makeUpperMessageApi(item.upperMessageDto),previousMessageDetail);
                                                        previousMessageDetail = awpMessageDetail;
                                                        tempAwpMessageDetailList.push(awpMessageDetail);
                                                    });
                                                return tempAwpMessageDetailList;
                                            })
                                            .then((roomAWPMessageDetailList) => {
                                                if(roomAWPMessageDetailList.length !== 0){
                                                    clsMessage.roomAwpMessageDetailListMap.set(roomId,roomAWPMessageDetailList);
                                                    const contentViewElement = document.querySelector('.messenger');
                                                    innerEvent.createElementEvent(false,element,clsMessage.roomAwpMessageDetailListMap,mvc,clsMessage,companyOrgUser,contentViewElement);
                                                }
                                            })
                                            .then(() =>{
                                                document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                                    .forEach(item => {
                                                        item.querySelector('.card')?.classList.remove('is-highlight');
                                                    });
                                                const messageElement = document.querySelector('.chatBox__body')?.querySelector(`[data-message-id="${fromMessageId}"]`);
                                                messageElement.querySelector('.card').classList.add('is-highlight');
                                                messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                messageElement.focus();
                                            })
                                            .catch(err => console.log(err))

                                    } else {
                                        document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                            .forEach(item => {
                                                item.querySelector('.card')?.classList.remove('is-highlight');
                                            });

                                        messageElement.querySelector('.card').classList.add('is-highlight');
                                        messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        messageElement.focus();
                                    }
                                };
                                messageSearchDtoComponentList.forEach(messageSearchDtoComponent => {
                                    messageSearchDtoComponent.addEventListener('click', messageSearchDtoComponentEventHandler);
                                })
                            })
                    }
                    const result = msgSearchEventHandler(roomId,loginInfo.userKey,keyword)
                } else {
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-14","is-clear-14");
                    msgSearchIcon.classList.add("is-24","is-search-24");
                    msgSearchFormInput.removeAttribute("readonly");
                }
            }
            msgSearchFormInput.removeAttribute("readonly");
            const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
            msgSearchIcon.classList.remove("is-14","is-clear-14");
            msgSearchIcon.classList.add("is-24","is-search-24");
            msgSearch.classList.add('is-active');
            msgSearchFormInput.value='';

            msgSearchListCount.textContent = "0";
            msgSearchList.innerHTML = '';

            if(createSearchEvent === false){

                msgSearchCloseButton.removeEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.removeEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.removeEventListener('keypress',handleKeyUp);

                msgSearchCloseButton.addEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.addEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.addEventListener('keypress',handleKeyUp);
                function handleKeyUp(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        msgSearchFormInputButton.click();
                    }
                }
            }
            return true;
        }

        this._alarmSearchBtnEventHandler = (createSearchEvent,msgSearch,msgSearchForm,msgSearchList,element,mvc,loginInfo,companyOrgUser,clsMessage,innerEvent) => {
            const settingPanel = document.querySelector('.messenger').querySelector('.messenger__side.is-setting');
            const msgSearchCloseButton = msgSearch.querySelector('button.btn.has-icon');
            const msgSearchListCount = msgSearch.querySelector('.sideBox__body .searchList__count span');
            const msgSearchFormInput = msgSearchForm.querySelector('input');
            const msgSearchFormInputButton = msgSearchForm.querySelector('button');
            const roomId = element.dataset.chatRoomId;
            const chatBox = document.querySelector('.chatBox');
            chatBox.style.width = "calc(100% - 314px)";

            // 2025.04.10 김광길 추가, 검색창 열릴때 Setting이 열려있으면 닫기
            if(settingPanel.classList.contains("is-active")){
                settingPanel.classList.remove("is-active");
            }

            const msgSearchCloseButtonEventHandler = () => {
                this._msgSearchCloseButtonEventHandler(msgSearch,chatBox);
            }

            const msgSearchFormInputButtonEventHandler = () => {

                const searchIcon= msgSearchFormInputButton.querySelector('i.icon.is-24.is-search-24');
                if(searchIcon){
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-24","is-search-24");
                    msgSearchIcon.classList.add("is-14","is-clear-14");
                    msgSearchFormInput.setAttribute("readonly","readonly");

                    msgSearchListCount.textContent = "0";
                    msgSearchList.innerHTML = '';

                    const keyword = msgSearchFormInput.value.trim();
                    const msgSearchEventHandler = (roomId,userKey,keyword) => {
                        const msgSearchUrl = `/messenger/alarm/rooms/${roomId}/${userKey}/keywords/${keyword}`;
                        return fetch(msgSearchUrl, { method: 'GET' })
                            .then(response => response.text())
                            .then(response => this.parseData(response))
                            .then(messageSearchDtoList => {
                                const messageSearchDtoComponentList = []
                                messageSearchDtoList.forEach(messageSearchDto =>{
                                    const messageSearchDtoComponent= mvc.makeAlarmMsgSearchListComponent(messageSearchDto,keyword);
                                    messageSearchDtoComponentList.push(messageSearchDtoComponent);
                                    msgSearchList.appendChild(messageSearchDtoComponent);
                                })
                                msgSearchListCount.textContent = messageSearchDtoList.length.toString();

                                return messageSearchDtoComponentList;
                            })
                            .then((messageSearchDtoComponentList) => {

                                const messageSearchDtoComponentEventHandler = (e) => {
                                    element.dataset.mode = "SEARCH";
                                    const fromMessageId = e.currentTarget.dataset.messageId;
                                    const messageElement = document
                                        .querySelector('.chatBox__body')
                                        ?.querySelector(`[data-message-id="${fromMessageId}"]`);

                                    if (messageElement === null) {
                                        const toMessageId = document.querySelector('.chatBox__body')?.querySelector('[data-message-id]').dataset.messageId;
                                        const msgFromToUrl = `/messenger/alarm/listToSearch`;
                                        const fromToData = {"roomId":roomId, "messageId":Number(toMessageId),"upperMessageId":Number(fromMessageId)};
                                        const preRoomAwpMessageDetailList = clsMessage.roomAwpMessageDetailListMap.get(roomId);
                                        fetch(msgFromToUrl, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify(fromToData),
                                        })
                                            .then(response => response.text())
                                            .then(response => this.parseData(response))
                                            .then(response => {
                                                let previousAlarmMessageDetail= null;
                                                const tempAwpMessageDetailList = [];
                                                const tempList = Array.from(response);
                                                tempList
                                                    .filter(item => item.messageId && !isNaN(Number(item.messageId)) && !(Number(item.messageId) === 0) ) // 유효한 messageId만 필터링
                                                    .forEach( (item) => {
                                                        const awpAlarmMessageDetail = new AWPMessageAlarm(loginInfo,Number(item.messageId),this.makeAlarm(item),this.makeUpperMessage(item),previousAlarmMessageDetail);
                                                        previousAlarmMessageDetail = awpAlarmMessageDetail;
                                                        tempAwpMessageDetailList.push(awpAlarmMessageDetail);
                                                    });

                                                return tempAwpMessageDetailList;
                                            })
                                            .then((roomAWPMessageDetailList) => {
                                                if(roomAWPMessageDetailList.length !== 0){
                                                    clsMessage.roomAwpMessageDetailListMap.set(roomId,roomAWPMessageDetailList);
                                                    const contentViewElement = document.querySelector('.messenger');
                                                    innerEvent.createElementEvent(false,element,clsMessage.roomAwpMessageDetailListMap,mvc,loginInfo,contentViewElement);
                                                }
                                            })
                                            .then(() =>{
                                                document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                                    .forEach(item => {
                                                        item.querySelector('.card')?.classList.remove('is-highlight');
                                                    });

                                                const messageElement = document.querySelector('.chatBox__body')?.querySelector(`[data-message-id="${fromMessageId}"]`);
                                                messageElement.querySelector('.card').classList.add('is-highlight');
                                                messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                                messageElement.focus();
                                            })
                                            .catch(err => console.log(err))

                                    } else {
                                        document.querySelector('.chatBox__body')?.querySelectorAll(`[data-message-id]`)
                                            .forEach(item => {
                                                item.querySelector('.card')?.classList.remove('is-highlight');
                                            });

                                        messageElement.querySelector('.card').classList.add('is-highlight');
                                        messageElement.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        messageElement.focus();
                                    }
                                };
                                messageSearchDtoComponentList.forEach(messageSearchDtoComponent => {
                                    messageSearchDtoComponent.addEventListener('click', messageSearchDtoComponentEventHandler);
                                })
                            })
                    }
                    const result = msgSearchEventHandler(roomId,loginInfo.userKey,keyword)
                } else {
                    const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-14","is-clear-14");
                    msgSearchIcon.classList.add("is-24","is-search-24");
                    msgSearchFormInput.removeAttribute("readonly");
                }
            }
            msgSearchFormInput.removeAttribute("readonly");
            const msgSearchIcon=msgSearchFormInputButton.querySelector('i');
            msgSearchIcon.classList.remove("is-14","is-clear-14");
            msgSearchIcon.classList.add("is-24","is-search-24");
            msgSearch.classList.add('is-active');
            msgSearchFormInput.value='';

            msgSearchListCount.textContent = "0";
            msgSearchList.innerHTML = '';

            if(createSearchEvent === false){

                msgSearchCloseButton.removeEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.removeEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.removeEventListener('keypress',handleKeyUp);

                msgSearchCloseButton.addEventListener('click',msgSearchCloseButtonEventHandler)
                msgSearchFormInputButton.addEventListener('click',msgSearchFormInputButtonEventHandler)
                msgSearchFormInput.addEventListener('keypress',handleKeyUp);
                function handleKeyUp(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        msgSearchFormInputButton.click();
                    }
                }
            }
            return true;
        }

        this._getIconClass = (fileName) => {
            const ext = fileName.split('.').pop().toLowerCase();
            if (["pdf"].includes(ext)) return "is-file-pdf";
            if (["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "tar.gz", "tgz", "tar.bz2", "tbz2", "tar.xz", "txz"].includes(ext)) return "is-file-zip";
            if (["xls", "xlsx", "xlsm", "xlsb", "xlt", "xltx", "xltm", "csv"].includes(ext)) return "is-file-excel";
            if (["ppt", "pptx", "pptm", "pps", "ppsx", "ppsm", "pot", "potx", "potm"].includes(ext)) return "is-file-ppt";
            if (["one", "onepkg", "onetoc2"].includes(ext)) return "is-file-onenote";
            if (["doc", "docx", "dot", "dotx", "docm", "dotm"].includes(ext)) return "is-file-word";
            if (["hwp", "hwpx", "hwt", "hml", "cell", "show"].includes(ext)) return "is-file-hangle";
            return "is-file-etc"; // default
        }

        this._updateAttachmentInfo = (uploadedFiles, infoBox) => {
            const currentCount = uploadedFiles.filter(f => f !== null).length;
            const currentSize = uploadedFiles
                .filter(f => f !== null)
                .reduce((sum, file) => sum + file.size, 0) / 1024 / 1024;

            if(currentSize > 20){
                infoBox.querySelector('.current-size').style.color = "#ff0000";
            }else{
                infoBox.querySelector('.current-size').style.color = "#666";
            }

            infoBox.querySelector('.current-count').textContent = currentCount.toString();
            infoBox.querySelector('.current-size').textContent = (currentSize.toFixed(2) + 'MB');

            if(currentCount === 0){
                infoBox.style.display = "none";
            }else{
                infoBox.style.display = "block";
            }
        }

    }

    get api() {
        return this._api;
    }

    get parseData(){
        return this._parseData;
    }

    get makeLoginInfo(){
        return this._makeLoginInfo;
    }

    get makeRoomDetail(){
        return this._makeRoomDetail;
    }

    get makeRoomList(){
        return this._makeRoomList;
    }

    get makeUpperMessage(){
        return this._makeUpperMessage;
    }

    get makeUpperMessageApi(){
        return this._makeUpperMessageApi;
    }

    get makeMessage(){
        return this._makeMessage;
    }

    get makeAttachment(){
        return this._makeAttachment;
    }

    get makeAlarm(){
        return this._makeAlarm;
    }

    get scrollToLastChatCard() {
        return this._scrollToLastChatCard;
    }

    get chatBoxScrollToLast() {
        return this._chatBoxScrollToLast;
    }

    get focusToElement() {
        return this._focusToElement;
    }

    get updateLoadingOpenProcess(){
        return this._updateLoadingOpenProcess;
    }
    get updateLoadingOpen() {
        return this._updateLoadingOpen;
    }
    get updateLoadingClose() {
        return this._updateLoadingClose;
    }

    get summaryModalOpen(){
      return this._summaryModalOpen;
    }

    get summaryModalClose(){
        return this._summaryModalClose;
    }

    get updateReadMessage(){
        return this._updateReadMessage;
    }

    get searchBtnEventHandler(){
        return this._searchBtnEventHandler;
    }

    get dorothySearchBtnEventHandler(){
        return this._dorothySearchBtnEventHandler;
    }

    get alarmSearchBtnEventHandler(){
        return this._alarmSearchBtnEventHandler;
    }

    get msgSearchCloseButtonEventHandler(){
        return this._msgSearchCloseButtonEventHandler;
    }

    get changeChatRoomUnreadMessageCount(){
        return this._changeChatRoomUnreadMessageCount
    }

    get clear(){
        return this._clear;
    }

    get clearNew(){
        return this._clearNew;
    }

    get getIconClass(){
        return this._getIconClass;
    }

    get updateAttachmentInfo(){
        return this._updateAttachmentInfo;
    }


    showToastModal(text, err){
        const toast = document.querySelector(".toast");
        toast.querySelector(".toast__text").textContent = text + (err ?? '');

        toast.classList.add("is-active");
        setTimeout(() => {
            toast.classList.remove("is-active");
        }, 6000);
    }

    showAlertModal(text, callbackFunc = null, element = document.querySelector("#alertModal")){
        element.querySelector(".modal__contents").textContent = text;
        element.style.opacity  = "1";
        element.style.display  = "flex";
        element.style.visibility  = "visible";

        element.querySelector(".btn").addEventListener("click", () => {
            element.style.display = "none";
            element.style.visibility = "hidden";
            element.style.opacity = "0";
            if(callbackFunc != null) {
                callbackFunc();
            }
        }, { once: true })
    }

    hideAlertModal(element){
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
    }

    getNewEmojiButton() {
        return new EmojiButton({
            i18n: {
                search: '이모티콘 검색',
                categories: {
                    recents: '최근 이모티콘',
                    smileys: '스마일리 및 감정',
                    people: '사람 및 신체',
                    animals: '동물 및 자연',
                    food: '음식 및 음료',
                    activities: '활동',
                    travel: '여행 및 장소',
                    objects: '사물',
                    symbols: '기호',
                    flags: '깃발',
                    custom: 'Custom'
                },
                notFound: '이모티콘이 없습니다.',
            },
            emojiSize: '27px',
            emojisPerRow: 6,
            rows: 6,
            showPreview: false,
            showSearch: false,
            showCategoryButtons: false,
            showRecents: false,
            position: 'bottom-start',
        });
    }

}