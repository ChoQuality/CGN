class AWPMessengerDefaultViewEvent {
    constructor() {
        this._isPaging = true;
        this._createCurrentModeEvent = (createCurrentModeEvent,element,mvc,loginInfo,func) => {
            if(createCurrentModeEvent === false){
                const mode = element.dataset.mode;

                // 마지막 읽은 메시지 아이디 확인
                msgMessageApi.getReadMessages(element.dataset.chatRoomId, loginInfo.userKey)
                    .then(response => {
                        const lastReadMessageId = response.data.readMessageId;
                        const isAllRead = Number(element.dataset.chatRoomUnreadMessageCount) === 0;

                        if(mode){
                            element.removeAttribute("data-mode")
                        } else {
                            const firstChatCard = document.querySelector('.chatCard__group');
                            if (!isAllRead && firstChatCard !== null) {
                                const lastReadComponent = mvc.chatBoxDividerLastRead();
                                // lastReadMessageId가 0일 경우와 그렇지 않은 경우 처리
                                let targetChatBox;

                                if (lastReadMessageId === 0) {
                                    targetChatBox = firstChatCard.closest(".chatBox__chat");
                                } else {
                                    const lastReadMessageChatGroup = document.getElementById(lastReadMessageId.toString());
                                    if(lastReadMessageChatGroup){
                                        const currentChatBox = lastReadMessageChatGroup.closest(".chatBox__chat");
                                        const nextChatBox = currentChatBox?.nextElementSibling;

                                        targetChatBox = nextChatBox?.classList.contains("chatBox__chat")
                                            ? nextChatBox
                                            : currentChatBox;
                                    }else{
                                        targetChatBox = firstChatCard.closest(".chatBox__chat");
                                    }
                                }
                                // 가장 가까운 chatBox__chat 요소의 부모에 lastReadComponent 삽입
                                if (targetChatBox) {
                                    targetChatBox.parentElement.insertBefore(lastReadComponent, targetChatBox);
                                }
                            }
                        }
                        return true;
                    })
                    .then(bl => {
                        // func.scrollToLastChatCard(); 2025.05.12 김광길 chatBoxScrollToLast()로 변경 처리
                        func.chatBoxScrollToLast();
                    })
            }
        }

        this._createElementEvent = (createElementEvent,element,roomAWPMessageDetailListMap,mvc,companyOrgUser,contentViewElement) => {
            this._isPaging = true;
            if(createElementEvent ===  false){
                const roomId = element.dataset.chatRoomId;
                const roomAWPMessageDetailList = roomAWPMessageDetailListMap.get(roomId);
                const chatMessageBody = contentViewElement.querySelector('.chatBox__body');

                roomAWPMessageDetailList.forEach(roomAWPMessageDetail => {
                    const executeTalkEvent = () => {
                        const first = roomAWPMessageDetail.previousMessageDetail === null;
                        const mine = roomAWPMessageDetail.isMine;
                        const sameUser = first ? mine : roomAWPMessageDetail.isSameUser;

                        const htmlElementFunc = (isMine, htmlElement) => {
                            return isMine
                                ? mvc.wholeMyTextChatBox(roomAWPMessageDetail, htmlElement,companyOrgUser)
                                : mvc.wholeYourChatBox(roomAWPMessageDetail, htmlElement,companyOrgUser);
                        };

                        const htmlElement = mvc.componentTextChatCardGroup(roomAWPMessageDetail, true);
                        if (first) {
                            chatMessageBody.appendChild(mvc.chatBoxDivider(roomAWPMessageDetail));
                            chatMessageBody.appendChild(htmlElementFunc(mine, htmlElement));
                        } else {
                            if (roomAWPMessageDetail.isSameCreateDt) {
                                if (sameUser) {
                                    const chatCards = chatMessageBody.querySelectorAll('.chatCard');
                                    const lastChatCard = chatCards[chatCards.length - 1];

                                    if(lastChatCard !== undefined){
                                        lastChatCard.appendChild(htmlElement);
                                    } else {
                                        chatMessageBody.appendChild(htmlElementFunc(mine, htmlElement));
                                    }
                                } else {
                                    chatMessageBody.appendChild(htmlElementFunc(mine, htmlElement));
                                }
                            } else {
                                if (roomAWPMessageDetail.isSameDate) {
                                    chatMessageBody.appendChild(htmlElementFunc(mine, htmlElement));
                                } else {
                                    chatMessageBody.appendChild(mvc.chatBoxDivider(roomAWPMessageDetail));
                                    chatMessageBody.appendChild(htmlElementFunc(mine, htmlElement));
                                }
                            }
                        }
                    }

                    const executeJoinEvent = () => {
                        const first = roomAWPMessageDetail.previousMessageDetail === null;
                        if (first) {
                            chatMessageBody.appendChild(mvc.chatBoxDivider(roomAWPMessageDetail));
                            chatMessageBody.appendChild(mvc.chatBoxDividerJoinMessage(roomAWPMessageDetail))
                        } else {
                            chatMessageBody.appendChild(mvc.chatBoxDividerJoinMessage(roomAWPMessageDetail))
                        }

                    }

                    const executeExitEvent = () => {
                        chatMessageBody.appendChild(mvc.chatBoxDividerExitMessage(roomAWPMessageDetail))
                    }

                    const executeExportEvent = () => {
                        chatMessageBody.appendChild(mvc.chatBoxDividerExportMessage(roomAWPMessageDetail))
                    }

                    switch (roomAWPMessageDetail.message.messageType){
                        case messageType.TALK:
                            executeTalkEvent();
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
                    }
                });
            }
        };

        this._createFileEvent = (createFileEvent,element,func,mvc,formData,contentViewElement) => {
            if(createFileEvent === false){
                const roomId = element.dataset.chatRoomId;
                const file_button = document.getElementById("file_button");
                const file_input = document.getElementById("file_input");

                const handleFileClick = () => {
                    func.clear(formData,contentViewElement);
                    file_input.value = "";
                    file_input.click();
                }

                const handleFileChange = (event) =>{
                    const file = event.target.files[0];
                    if (file) {
                        const fileSizeInMB = file.size / (1024 * 1024); // 파일 크기(MB 단위로 변환)

                        if (fileSizeInMB > 5) {
                            alert("파일 크기가 5MB를 초과합니다. 다시 선택해주세요.");
                            const _replyFileBox = document.getElementById("_replyFileBox");
                            if (_replyFileBox) {
                                _replyFileBox.remove();
                            }
                            event.target.value = "";
                            return;
                        }

                        const allowedExtensions = ["hwp","doc","docx","ppt","pptx","xls","xlsx","jpg","jpeg","gif","bmp","png","txt","zip","pdf","tif","mp4","pdf"]; // 허용할 확장자 목록
                        const fileExtension = file.name.split(".").pop().toLowerCase(); // 파일 확장자 추출

                        if (!allowedExtensions.includes(fileExtension)) {
                            alert("허용되지 않은 파일 형식입니다. HWP, DOC, DOCX, PPT, PPTX, XLS, XLSX, JPG, JPEG, GIF, BMP, PNG, TXT, ZIP, PDF, TIF 파일만 업로드 가능합니다.");
                            event.target.value = ""; // 파일 선택 초기화
                            return;
                        }

                        formData.append("file", file);
                        formData.append("roomId", element.dataset.chatRoomId);
                        const _replyFileBox = document.getElementById("_replyFileBox");
                        if (_replyFileBox) {
                            _replyFileBox.remove();
                        }
                        mvc.addEventClickFileUpload(contentViewElement, roomId, formData);
                    }
                }
                file_button.addEventListener("click", handleFileClick);
                file_input.addEventListener("change", handleFileChange);
            }
        };

        this._createMultiFileEvent = (createFileEvent,element,func,mvc,formData,uploadedFiles,contentViewElement) => {
            if(createFileEvent === false){
                const infoBox = document.getElementById('attachmentInfo');
                const dropZone = document.querySelector('[data-function="dropZone"]');
                const attachmentList = document.querySelector('[data-function="attachmentList"]');
                const fileButton = document.getElementById('file_button');
                const fileInput = document.getElementById('file_input');
                let dragOverTimer = null;

                ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                    dropZone.addEventListener(eventName, (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });

                dropZone.addEventListener("dragover", () => {
                    // dragover 이벤트가 반복되기 때문에 클래스 유지
                    dropZone.classList.add("dragover");

                    // 타이머 초기화
                    if (dragOverTimer) clearTimeout(dragOverTimer);

                    // 100ms 이내 dragover가 없으면 제거
                    dragOverTimer = setTimeout(() => {
                      dropZone.classList.remove("dragover");
                    }, 100);
                });

                dropZone.addEventListener("drop", (e) => {
                    dropZone.classList.remove("dragover");
                    const files = Array.from(e.dataTransfer.files);
                    handleFiles(files);
                });

                fileButton.addEventListener("click", () => fileInput.click());
                fileInput.addEventListener("change", (e) => {
                    const files = Array.from(e.target.files);
                    handleFiles(files);
                    fileInput.value = '';
                });

                function handleFiles(files) {
                    let isUploadLimit = false;

                    files.forEach((file) => {
                        const count = uploadedFiles.filter(f => f !== null).length < 10;
                        if(count){
                            const ext = file.name.split('.').pop().toLowerCase();
                            if (["hwp", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "gif", "bmp", "png", "txt", "zip", "pdf", "tif", "mp4", "pdf"].includes(ext)){
                                const index = uploadedFiles.length;
                                uploadedFiles.push(file);
                                formData.append('files', file);

                                const item = document.createElement("div");
                                item.className = "attachment";
                                item.dataset.index = index;
                                item.dataset.filename = file.name; // 파일 이름으로 식별

                                item.innerHTML = `  <i class="icon is-40 ${func.getIconClass(file.name)}"></i>
                                                <span class="title">${file.name}</span>
                                                <span class="size">${(file.size / 1024 / 1024).toFixed(2)}MB</span>
                                                <div class="d-flex">
                                                    <button type="button" class="btn has-icon" data-function="fileDelete">
                                                        <i class="icon is-24 is-file-delete"></i>
                                                    </button>
                                                </div>`;
                                attachmentList.appendChild(item);
                            }else{
                                func.showToastModal(ALERT_MESSAGES.A058);
                            }
                        }else{
                            isUploadLimit = true;
                        }
                    });
                    if(isUploadLimit) func.showAlertModal(ALERT_MESSAGES.A059);
                    func.updateAttachmentInfo(uploadedFiles, infoBox);
                }

                // 삭제 이벤트 처리
                attachmentList.addEventListener('click', (e) => {
                    const target = e.target.closest('[data-function="fileDelete"]');
                    if (!target) return;

                    const attachment = target.closest('.attachment');
                    const index = Number(attachment.dataset.index);

                    // 파일 배열에서 제거 (null 처리)
                    uploadedFiles[index] = null;

                    // → 새 FormData로 재구성
                    const newFormData = new FormData();
                    uploadedFiles.forEach(file => {
                        if (file) newFormData.append('files', file);
                    });
                    // 기존 FormData 덮어쓰기
                    for (const key of formData.keys()) {
                        formData.delete(key);
                    }
                    for (const pair of newFormData.entries()) {
                        formData.append(pair[0], pair[1]);
                    }

                    // UI 삭제
                    attachment.remove();
                    func.updateAttachmentInfo(uploadedFiles, infoBox);
                });
            }
        };

        this._createSendEvent = (createSendEvent,element,func,clsMessage,formData,uploadedFiles,contentViewElement) => {
            if(createSendEvent === false){
                const {chatRoomId,chatRoomType,chatRoomName,chatDescription,chatUnreadMessageCount,chatMessageType,chatLastMessageContent,chatMessageId,chatReadMessageId,chatLastMessageDt,chatFixOrder,chatParticipantList} = element.dataset;
                const currentRoomList = new RoomList(chatRoomId,chatRoomType,chatRoomName,chatDescription,chatUnreadMessageCount,chatMessageType,chatLastMessageContent,chatMessageId,chatReadMessageId,chatLastMessageDt,chatFixOrder,chatParticipantList);
                const sendButton = contentViewElement.querySelector('#tab01 .btn.chatSendBtn');
                const sendMessageArea = contentViewElement.querySelector('#tab01 .textarea');
                clsMessage.subscribeRoom();

                const handleSendClick = (formData) => {
                    const contextMap = new Map();
                    // const replyFileBox=document.getElementById('_replyFileBox');

                    const replyBox=document.getElementById('_replyBox');
                    const messageText = sendMessageArea.value.trim();
                    let messageContentVal = messageText.replace(/(?:\r\n|\r|\n)/g, '<br>');

                    replyBox ? contextMap.set(contextType.REPLY,replyBox) : contextMap.set(contextType.REPLY,null);
                    contextMap.set(contextType.TEXT,messageContentVal);

                    if(formData.has('files')){
                        const size = uploadedFiles.filter(f => f !== null).reduce((sum, file) => sum + file.size, 0) <= 20971520; //(20 * 1024 * 1024)
                        if(!size){ // 20메가 초과인경우 return;
                            func.showAlertModal(ALERT_MESSAGES.A057);
                            return;
                        }

                        func.updateLoadingOpen('파일 전송 중');
                        formData.append("roomId", chatRoomId);
                        window.msgAttachmentApi.uploadFiles(formData)
                            .then(response => {
                                if(response.code !== 0){
                                    clsMessage.process = false;
                                    throw new Error(response.code+"::"+response.msg ?? "");
                                }
                                const attachments = [];
                                response.data.forEach(att => {
                                    const {attachmentId,roomId,companyId,sendUserKey,sendUserName,originFileName,fileExtension,fileSize,deletedYn,savedFilePath,createDt} = att;
                                    const attachment = new Attachment(attachmentId,roomId,companyId,sendUserKey,sendUserName,originFileName,fileExtension,fileSize,deletedYn,savedFilePath,createDt);
                                    attachments.push(attachment);
                                });
                                contextMap.set(contextType.FILE,attachments);
                            })
                            .then(() => {
                                clsMessage.publishRoomMessage(currentRoomList,messageType.TALK,contextMap);
                                func.updateLoadingClose();
                                func.clearNew(formData,uploadedFiles,contentViewElement);
                            })
                            .catch(err => {
                                func.updateLoadingClose();
                                func.clearNew(formData,uploadedFiles,contentViewElement);
                                console.log(err)
                            });
                    } else {
                        clsMessage.publishRoomMessage(currentRoomList,messageType.TALK,contextMap);
                        func.clearNew(formData,uploadedFiles,contentViewElement);
                    }

                    // 2025.04.10 김광길 발송 후 입력 메시지 초기화 처리
                    func.focusToElement(document.querySelector('.chatBox__writeField textarea'));
                }

                sendMessageArea.addEventListener('keypress', function (e){
                    if (e.key === "Enter") {
                        e.preventDefault();
                        sendButton.click();
                    }
                });
                sendButton.addEventListener('click', () => handleSendClick(formData));
            }
        }

        this._createAddMemberEvent = (createAddMemberEvent,element,func,toastFunc,clsMessage,contentViewElement,companyOrgUser,loginInfo) => {
            const addMemberModal = document.getElementById("addMemberModal");
            const newElement = addMemberModal.cloneNode(true);
            addMemberModal.parentNode.replaceChild(newElement, addMemberModal);
            if(createAddMemberEvent === false){
                const settingBtn = contentViewElement.querySelector('#settingBtn');
                const roomNameHeader = contentViewElement.querySelector('.title h3');
                const roomNameDescription = contentViewElement.querySelector('.title .description');
                const settingPanel = contentViewElement.querySelector('.messenger__side.is-setting');
                const settingPanelParticipantCnt = settingPanel.querySelector('#participantCnt');
                const settingPanelParticipantList = settingPanel.querySelector('#participantList');
                const settingPanelRoomName = settingPanel.querySelector('#roomName');
                const settingPanelRoomNameButton = settingPanel.querySelector('#roomNameButton');
                const settingPanelDescription = settingPanel.querySelector('#description');
                const settingPanelDescriptionButton = settingPanel.querySelector('#descriptionButton');
                const settingPanelCloseButton = settingPanel.querySelector('[data-function="sideBoxClose"]');

                const alertModal = document.getElementById('MsgAlertModal');
                const alertContext= alertModal.querySelector('.modal__contents');
                const alertCloseButton= alertModal.querySelectorAll('.modal__footer button')[0];
                let alertConfirmButton= alertModal.querySelectorAll('.modal__footer button')[1];

                const addMemberModal = document.getElementById('addMemberModal');

                const participantListAddButton = document.getElementById('addChatModalOpenBtn');
                let participantList = JSON.parse(element.dataset.chatParticipantList);

                let filteredUsers = companyOrgUser.user.filter(companyUser =>
                    participantList.includes(companyUser.userKey)
                );

                settingPanelParticipantCnt.textContent = filteredUsers.length;
                filteredUsers.forEach(filteredUser => {
                    const alreadyInviteUserLi= toastFunc.alreadyInviteUserLi(filteredUser,loginInfo);
                    const alreadyInviteUserDelete= alreadyInviteUserLi.querySelector('button.btn.has-icon.memberList__delete');
                    const alreadyInviteUserDeleteEventHandler = () => {
                        const removeNumberFromChatParticipantList = (datasetStr, numberToRemove) => {
                            let arr = JSON.parse(datasetStr);
                            arr = arr.filter(num => num !== numberToRemove);
                            return JSON.stringify(arr);
                        }
                        const funcDeleteMessage = (origin) => { return origin.userNm + ' 님을 '+ ' 내보내시겠습니까?';}
                        const settingPanelButtonEventHandler = (type,user,element,component) => {
                            if (user !== null) {
                                alertContext.textContent = funcDeleteMessage(user);
                                alertModal.style.removeProperty("display");
                                alertModal.style.removeProperty("opacity");
                                alertModal.style.removeProperty("visibility");
                                alertModal.style.display = 'flex';

                                const alertConfirmButtonEventHandler = () => {
                                    let delData = {};
                                    if(type === settingPanelType.DELETE){
                                        delData.roomId = element.dataset.chatRoomId;
                                        delData.userKey = user.userKey;
                                    }

                                    fetch('/messenger/participant/update', {
                                        method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify(delData)
                                    })
                                        .then(response => response.text())
                                        .then(response => func.parseData(response))
                                        .then(response => {
                                            const roomList = func.makeRoomList(element.dataset)
                                            element.dataset.chatParticipantList = removeNumberFromChatParticipantList(element.dataset.chatParticipantList,user.userKey);
                                            component.remove();
                                            clsMessage.publishRoomMessage(roomList,messageType.EXPORT, new Map().set(contextType.EXPORT,user.userKey));
                                            alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                                            new Promise(resolve => {
                                                alertCloseButton.click();
                                                resolve();
                                            })
                                                .then(() => element.click())
                                        })
                                        .catch(err => console.log(err));
                                };

                                // 기존 이벤트 제거 후 새 이벤트 추가
                                alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                                alertConfirmButton.addEventListener('click', alertConfirmButtonEventHandler);

                                alertCloseButton.addEventListener('click', () => {
                                    alertModal.style.display = 'none';
                                    alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                                });
                            }
                        };
                        settingPanelButtonEventHandler(settingPanelType.DELETE,filteredUser,element,alreadyInviteUserLi);
                    }
                    if(alreadyInviteUserDelete){
                        alreadyInviteUserDelete.addEventListener('click',alreadyInviteUserDeleteEventHandler);
                    }
                    settingPanelParticipantList.appendChild(alreadyInviteUserLi);
                })


                if(settingBtn){
                    const settingBtnEventHandler = () => {
                        document.getElementById("ReplyDeleteButtonLayer").style.display='none';

                        // 2025.04.10 세팅창도 chatBox 사이즈 줄이기 처리
                        const chatBox = document.querySelector('.chatBox');
                        const msgSearch = document.getElementById('msgSearch');
                        settingPanelRoomName.value = roomNameHeader.textContent;
                        settingPanelDescription.value = roomNameDescription.textContent;

                        // 2025.04.10 메시지 검색 창 처리
                        if(msgSearch.classList.contains("is-active")){
                            func.msgSearchCloseButtonEventHandler(msgSearch,chatBox);
                        }

                        if(settingPanel.classList.contains("is-active")){
                            settingPanel.classList.remove("is-active");
                            chatBox.style.removeProperty("width");
                        } else {
                            settingPanel.classList.add("is-active");
                            chatBox.style.width = "calc(100% - 314px)";
                        }

                    };
                    settingBtn.addEventListener('click',settingBtnEventHandler);
                }

                settingPanelCloseButton.addEventListener('click', () => settingBtn.click());

                const settingPanelButtonEventHandler = (type,origin,inputElement, funcMessage, updateTarget) => {
                    const changeValue = inputElement.value.trim() !== "" ? inputElement.value : null;

                    if (changeValue !== null) {
                        alertContext.textContent = funcMessage(origin,changeValue);
                        alertModal.style.removeProperty("display");
                        alertModal.style.removeProperty("opacity");
                        alertModal.style.removeProperty("visibility");
                        alertModal.style.display = 'flex';

                        const alertConfirmButtonEventHandler = () => {

                            let roomData = {};
                            if(type === settingPanelType.NAME){
                                roomData.roomId = element.dataset.chatRoomId;
                                roomData.roomName = changeValue;
                            } else if(type === settingPanelType.DESCRIPTION){
                                roomData.roomId = element.dataset.chatRoomId;
                                roomData.description = changeValue;
                            }

                            fetch('/messenger/room/modifyRoom', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify(roomData)
                            })
                                .then(response => response.text())
                                .then(response => func.parseData(response))
                                .then(response => {
                                    updateTarget.textContent = changeValue;
                                    alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                                    alertCloseButton.click();
                                })
                                .catch(err => console.log(err));
                        };

                        // 기존 이벤트 제거 후 새 이벤트 추가
                        alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                        alertConfirmButton.addEventListener('click', alertConfirmButtonEventHandler);

                        alertCloseButton.addEventListener('click', () => {
                            alertModal.style.display = 'none';
                            alertConfirmButton.removeEventListener('click', alertConfirmButtonEventHandler);
                        });
                    }
                };


                const funcChangeMessage = (origin,change) => { return origin + ' ➡ ' + change+ ' 으로'+ ' 변경하시겠습니까?';}
                settingPanelRoomNameButton.addEventListener('click', () =>
                    settingPanelButtonEventHandler(settingPanelType.NAME,roomNameHeader.textContent ,settingPanelRoomName, funcChangeMessage, roomNameHeader)
                );

                settingPanelDescriptionButton.addEventListener('click', () =>
                    settingPanelButtonEventHandler(settingPanelType.DESCRIPTION,roomNameDescription.textContent,settingPanelDescription, funcChangeMessage, roomNameDescription)
                );

                const participantListAddButtonEventHandler = () => {
                    participantList = JSON.parse(element.dataset.chatParticipantList);
                    filteredUsers = companyOrgUser.user.filter(companyUser =>
                        participantList.includes(companyUser.userKey)
                    );

                    if(addMemberModal.style.display === 'none'){
                        addMemberModal.style.removeProperty("display");
                        addMemberModal.style.removeProperty("opacity");
                        addMemberModal.style.removeProperty("visibility");
                        addMemberModal.style.display = 'flex'
                    }else {
                        addMemberModal.style.display = 'none'
                    }

                    const orgTree = addMemberModal.querySelector('#orgTree');
                    const orgUser = addMemberModal.querySelector('#orgUser');
                    const invitedUserCnt = addMemberModal.querySelector('#invitedUserCnt');
                    const invitedUser = addMemberModal.querySelector('#invitedUser');

                    const alreadyInvitedUserCnt = addMemberModal.querySelector('#alreadyInvitedUserCnt');
                    const alreadyInvitedUser = addMemberModal.querySelector('#alreadyInvitedUser');

                    const close = addMemberModal.querySelector('.btnGroup [data-function="modalClose"]');
                    const headerClose = addMemberModal.querySelector('.modal__header [data-function="modalClose"]');
                    const confirm = addMemberModal.querySelector('#confirm');

                    const modalClear = () => {
                        orgUser.innerHTML = '';
                        invitedUser.innerHTML ='';
                        alreadyInvitedUser.innerHTML ='';
                        filteredUsers.forEach(alreadyFilteredUser => {
                            alreadyInvitedUser.appendChild(toastFunc.alreadyInviteUserLi(alreadyFilteredUser,loginInfo));
                        });
                        alreadyInvitedUserCnt.textContent = Number(filteredUsers.length);
                        invitedUserCnt.textContent = Number(0);
                    }
                    modalClear();

                    close.addEventListener('click', () => addMemberModal.style.display = 'none');
                    headerClose.addEventListener('click', () => close.click());

                    if(addMemberModal.style.display === 'flex'){

                        new Promise((resolve) => {
                            orgTree.innerHTML = '';
                            const tree = new tui.Tree(orgTree, {
                                data: companyOrgUser.org,
                                nodeDefaultState: "opened",
                                renderTemplate: toastFunc.defaultTreeTemplate
                            }).enableFeature('Checkbox', {
                                checkboxClassName: 'tui-tree-checkbox',
                            });

                            resolve(addMemberModal);
                        })
                            .then((addMemberModal) => {

                                const modalSelectBox = addMemberModal.querySelector('.modal__header .modalSelect-1 .tui-select-box');
                                const tui_select_box_input = modalSelectBox.children[0];
                                const tui_select_box_input_p = tui_select_box_input.querySelector('p');
                                const tui_select_box_icon = tui_select_box_input.querySelector('.tui-select-box-icon');
                                const tui_select_box_dropdown = modalSelectBox.children[1];
                                const listItems = tui_select_box_dropdown.querySelectorAll('li');

                                listItems.forEach(item => {
                                    item.addEventListener("mouseover", () => {
                                        listItems.forEach(el => el.classList.remove("tui-select-box-highlight"));
                                        item.classList.add("tui-select-box-highlight");
                                    });
                                    item.addEventListener("click", () => {
                                        tui_select_box_icon.click();
                                        listItems.forEach(el => el.classList.remove("tui-select-box-selected"));
                                        item.classList.add("tui-select-box-selected");
                                        tui_select_box_input_p.textContent = item.textContent;
                                    });
                                });

                                function tuiSelectBoxIcon(){
                                    if(tui_select_box_input.classList.contains('tui-select-box-open')){
                                        tui_select_box_input.classList.remove('tui-select-box-open');
                                        tui_select_box_dropdown.classList.add('tui-select-box-hidden');
                                    } else {
                                        tui_select_box_input.classList.add('tui-select-box-open');
                                        tui_select_box_dropdown.classList.remove('tui-select-box-hidden');
                                    }
                                }
                                tui_select_box_icon.addEventListener('click', tuiSelectBoxIcon);

                                const search_input = addMemberModal.querySelector('.modal__header .formSearch.is-square input');
                                const search_button = addMemberModal.querySelector('.modal__header .formSearch.is-square button');
                                function handleKeyUp(event) {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        search_button.click();
                                    }
                                }
                                search_input.addEventListener('click', () => {
                                    if(tui_select_box_input.classList.contains('tui-select-box-open')){
                                        tui_select_box_icon.click()
                                    }
                                })
                                search_input.addEventListener('keypress', handleKeyUp);
                                search_button.addEventListener('click', () => {
                                    const searchInput = addMemberModal.querySelector('.modal__header input');
                                    // 2025.04.15 김광길 2글자 이상 제한 제거
                                    // if(searchInput.value.length >= 2){
                                        const users = companyOrgUser.user;
                                        let filteredUsers= null;
                                        switch (tui_select_box_input_p.textContent){
                                            case '이름':
                                                filteredUsers = Array.from(users)
                                                    .filter(user =>
                                                        user.userNm.toLowerCase().includes(searchInput.value.toLowerCase())
                                                    );
                                                break;
                                            case '부서':
                                                filteredUsers = Array.from(users)
                                                    .filter(user =>
                                                        user.orgNm.toLowerCase().includes(searchInput.value.toLowerCase())
                                                    );
                                                break;
                                            case '휴대전화번호':
                                                filteredUsers = Array.from(users)
                                                    .filter(user =>
                                                        user.mobilePhoneNo.includes(searchInput.value.toLowerCase())
                                                    );
                                                break;
                                            case '아이디':
                                                filteredUsers = Array.from(users)
                                                    .filter(user =>
                                                        user.userId.toLowerCase().includes(searchInput.value.toLowerCase())
                                                    );
                                                break;
                                        }
                                        if(filteredUsers){
                                            orgUser.innerHTML = '';
                                            orgUser.appendChild(toastFunc.selectOrgElement("검색 결과"));
                                            filteredUsers.forEach(currentOrgUser  => {
                                                const addElement=toastFunc.selectOrgUserElement(currentOrgUser,loginInfo);
                                                if(addElement){
                                                    orgUser.appendChild(addElement);
                                                }
                                            });
                                            searchInput.value = '';
                                        }
                                    // } else {
                                    //     alert('2글자 이상 입력해주세요');
                                    //     return;
                                    // }
                                    toastFunc.funcSettingList(addMemberModal,orgUser);
                                });

                                return addMemberModal;
                            })
                            .then((addMemberModal) => {
                                const orgCenters = orgTree.querySelectorAll('.tui-tree-text');
                                const orgTeams = orgTree.querySelectorAll('.tui-tree-node.tui-tree-leaf');

                                orgCenters.forEach( orgCenter => {
                                    orgCenter.addEventListener('click', () => toastFunc.makeSelectOrgUser(orgUser,orgCenter,companyOrgUser,addMemberModal,loginInfo));
                                });
                                orgTeams.forEach( orgTeam => {
                                    orgTeam.addEventListener('click', () => toastFunc.makeSelectOrgUser(orgUser,orgTeam,companyOrgUser,addMemberModal,loginInfo));
                                });

                                return addMemberModal;
                            })
                            .then((addMemberModal) => {
                                const confirmEventHandler = () => {
                                    let invitedUserDataList = [];
                                    const invitedUsers = addMemberModal.querySelector("#invitedUser").querySelectorAll('li')
                                    const settingPanelParticipantCnt = settingPanel.querySelector('#participantCnt');
                                    const settingPanelParticipantList = settingPanel.querySelector('#participantList');
                                    invitedUsers.forEach(invitedUser => {
                                        let invitedUserData = {};
                                        invitedUserData.userKey = Number(invitedUser.dataset.userKey);
                                        invitedUserData.roomId = element.dataset.chatRoomId;
                                        invitedUserData.publicYn = 'Y';
                                        invitedUserDataList.push(invitedUserData);
                                    });

                                    if(invitedUserDataList.length !== 0) {
                                        fetch('/messenger/participant/list/save', {
                                            method: 'POST',
                                            headers: {'Content-Type': 'application/json'},
                                            body: JSON.stringify(invitedUserDataList)
                                        })
                                            .then(response => response.json())
                                            .then(response => response.code)
                                            .then((code) => {
                                                new Promise(resolve => {
                                                    if(code !== 0) {
                                                        console.log("error :: "+ code);
                                                    } else {
                                                        const roomList = func.makeRoomList(element.dataset)
                                                        const numbers = Array.from(invitedUsers).map(invitedUser => Number(invitedUser.dataset.userKey))
                                                        clsMessage.publishRoomMessage(roomList, messageType.JOIN, new Map().set(contextType.JOIN,numbers));
                                                        const currentRoomListMember = JSON.parse(roomList.participantList);
                                                        invitedUsers.forEach(invitedUser => {
                                                            settingPanelParticipantList.appendChild(invitedUser);
                                                            currentRoomListMember.push(Number(invitedUser.dataset.userKey));
                                                        });
                                                        element.dataset.chatParticipantList = JSON.stringify(currentRoomListMember);
                                                        const total = settingPanelParticipantList.querySelectorAll(".memberList__item[data-user-key]").length
                                                        settingPanelParticipantCnt.textContent = Number(total);
                                                    }
                                                    resolve()
                                                })
                                                    .then(() => close.click())
                                                    .then(() => element.click())
                                            })
                                            .catch(err => console.log(err));
                                    } else {
                                        alert('초대할 멤버를 선택해 주세요');
                                    }
                                }
                                confirm.addEventListener('click',confirmEventHandler);
                                return addMemberModal;
                            })
                    }

                };
                participantListAddButton.addEventListener('click', participantListAddButtonEventHandler);
            }
        }

        this._createTab02Event = (createTab02Event,element,func,contentViewElement,mvc) => {
            if(createTab02Event === false){
                const tab01_btn = contentViewElement.querySelector("#contentsTab a");
                const tab02_btn = contentViewElement.querySelector("#fileTab a");
                const tab01 = document.getElementById('tab01');
                const tab02 = document.getElementById('tab02');
                const roomId = element.dataset.chatRoomId;

                let currentPage = 1; // 현재 페이지 번호
                const pageSize = 5; // 한 페이지에 표시할 데이터 개수

                let pagination = null;
                // ✅ API 호출하여 데이터 가져오기
                const fetchData = (page) => {
                    return fetch(`/messenger/attachment/${roomId}/${page}/${pageSize}/history`, { method: 'GET' })
                        .then(response => response.text())
                        .then(response => func.parseData(response))
                        .then(response => {
                            console.log("📌 데이터 가져옴:", response);
                            return new PaginationData(response.totalCount, response.contents);
                        });
                };


                // ✅ Tab 클릭 시 이벤트 핸들러
                const handleTab02Handler = () => {
                    document.getElementById("ReplyDeleteButtonLayer").style.display='none';
                    document.getElementById('fileGrid').innerHTML ='';
                    tab01_btn.classList.remove("is-active");
                    tab02_btn.classList.add("is-active");
                    tab01.style.display = 'none'
                    tab02.style.display = 'block'
                    currentPage = 1;

                    fetchData(currentPage)
                        .then((msgData) => {
                            const tab02Grid = new Grid({
                                el: document.getElementById('fileGrid'),
                                data: msgData.contents,
                                columns: [
                                    {
                                        header: '파일 이름',
                                        name: '_originFileName',
                                        width: 400,
                                        sortable: true // 파일 이름 기준 정렬 가능
                                        , align: 'center'
                                    },
                                    {
                                        header: '보낸 이',
                                        name: '_sendUserName',
                                        width: 200
                                        , align: 'center'
                                    },
                                    {
                                        header: '보낸 날짜',
                                        name: '_createDt',
                                        width: 250,
                                        sortable: true // 보낸 날짜 기준 정렬 가능
                                        , align: 'center'
                                    },
                                    {
                                        header: '다운로드',
                                        name: 'download',
                                        align: 'center',
                                        editor: false,
                                        disabled: true,
                                        formatter: ({row}) =>
                                            `<button class="btn is-download" data-attachment-id="${row._attachmentId}" data-origin-file-name="${row._originFileName}">다운로드</button>`
                                    }
                                ],
                                // 컨텍스트 메뉴(우클릭 메뉴) 비활성화
                                contextMenu: null,
                                // rowHeaders: ['rowNum'], // 행 번호 추가 (선택 사항)

                            });

                            pagination = new Pagination(document.getElementById('pagination'), {
                                totalItems: msgData.totalCount,
                                itemsPerPage: pageSize,
                                visiblePages: 5,
                                centerAlign: true
                            });

                            pagination.on('beforeMove', (event) => {
                                currentPage = event.page;
                                fetchData(currentPage).then((msgData) => {
                                    tab02Grid.resetData(msgData.contents);
                                    pagination.setTotalItems(msgData.totalCount); // 총 아이템 수 갱신
                                });
                            });
                        })

                        .then(() => {
                            const fileGrid= document.getElementById('fileGrid');
                            // 우클릭(컨텍스트 메뉴) 자체를 막는 방법 (추가적인 보안)
                            fileGrid.addEventListener('contextmenu', event => {
                                event.preventDefault();
                            });
                            return fileGrid;
                        })
                        .then((fileGrid) => {
                            const gridDownloadHandler = (attachmentId,originFileName) => {
                                msgAttachmentApi.downloadFile(attachmentId)
                                    .then((response) => mvc.initiateFileDownload(originFileName,response))
                                    .catch(error => console.error("다운로드 중 오류 발생:", error));}
                            const downloadButtons= fileGrid.querySelectorAll('.btn.is-download');
                            downloadButtons.forEach(downloadButton => {
                                const downloadButtonTd = downloadButton.closest('[data-column-name="download"]');
                                const {attachmentId, originFileName} = downloadButton.dataset;
                                downloadButtonTd.addEventListener("click", () => gridDownloadHandler(attachmentId,originFileName))
                            });
                        })
                        .then(() => {
                            const handleTab01Handler = () => {
                                tab02_btn.classList.remove("is-active");
                                tab01_btn.classList.add("is-active");
                                tab02.style.display = 'none'
                                tab01.style.display = 'block'
                            }
                            tab01_btn.addEventListener("click", handleTab01Handler);
                        })
                        .catch( err => { console.log(err); })
                };
                // ✅ 이벤트 리스너 추가
                tab02_btn.addEventListener("click", handleTab02Handler);
            }
        }

        this._createSearchEvent = (createSearchEvent,element,func,mvc,loginInfo,companyOrgUser,clsMessage,innerEvent) => {
            if(createSearchEvent === false){
                const searchBtn = document.getElementById('searchBtn');
                const msgSearch = document.getElementById('msgSearch');
                const msgSearchForm = document.getElementById('msgSearchForm');
                const msgSearchList = document.getElementById('msgSearchList');

                const searchBtnEventHandler = () => {
                    createSearchEvent = func.searchBtnEventHandler(createSearchEvent,msgSearch, msgSearchForm, msgSearchList, element, mvc, loginInfo,companyOrgUser,clsMessage,innerEvent);
                };
                searchBtn.addEventListener('click', searchBtnEventHandler); // 이벤트 리스너 추가
            }
        }

        this._createSummaryEvent = (createSummaryEvent,element,func) => {
            if(createSummaryEvent ===  false){
                const roomId = element.dataset.chatRoomId;
                const unReadCount = document.querySelector(".chatBox__footer").querySelector("#unReadCount").value;
                const lastReadMessageId = document.querySelector(".chatBox__footer").querySelector("#lastReadMessageId").value;
                const summaryBtn = document.getElementById('summaryBtn');

                const summaryBtnEventHandler = () => {
                    func.updateLoadingOpen('대화 요약 중 입니다.');

                    msgMessageApi.getUnReadMessages(roomId, lastReadMessageId)
                        .then(response => {
                            let unReadList = response.data;
                            if(unReadList.length > 30){
                                unReadList = unReadList.slice(30);
                            }
                            const chatList = [];
                            unReadList.forEach(item => {
                                chatList.push({
                                    name: item.userNm,
                                    date: item.createDt,
                                    text: item.messageContent,
                                });
                            });

                            AiApi.realTime({
                                serviceCd: 'MSG_SUMMARY',
                                jobResult: `요약 요청건수[${chatList.length}]`,
                                data: { chat:chatList },
                            })
                                .then(response => {
                                    console.log(response.data);
                                    const aiData = response.data;
                                    if(response.code === 0){
                                        func.summaryModalOpen(aiData);
                                    }else{
                                        func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", response.msg);
                                    }
                                    func.updateLoadingClose();
                                })
                                .catch(error => {
                                    func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", error);
                                    func.updateLoadingClose();
                                    func.summaryModalClose();
                                })
                        })
                        .catch(error => {
                            func.showToastModal("AI실시간 연동 중 오류가 발생하였습니다.", error);
                            func.updateLoadingClose();
                        })
                }

                if(Number(unReadCount) >= 10){
                    summaryBtn.style.display='block';
                }
                summaryBtn.addEventListener('click', summaryBtnEventHandler);
            }
        }

        this._createEmojiEvent = (createEmojiEvent,mvc,contentViewElement) =>{
            if(createEmojiEvent === false){
                const emojiPicker = mvc.emojiPicker;
                const emojiBtn = contentViewElement.querySelector("#emojiBtn");
                const messengerTextArea = document.querySelector("#emojiTargeet");

                function handleEmojiClick() {
                    emojiPicker.togglePicker(emojiBtn);
                }

                function handleEmojiSelect(emoji) {
                    console.log("선택한 이모지:", emoji);
                    document.getElementById("ReplyDeleteButtonLayer").style.display='none';
                    // 중복 추가 방지
                    if (!messengerTextArea.value.endsWith(emoji.emoji)) {
                        messengerTextArea.value += emoji.emoji;
                        setTimeout(() => {
                            messengerTextArea.focus();
                            messengerTextArea.setSelectionRange(messengerTextArea.value.length, messengerTextArea.value.length);
                        }, 10);
                    }
                }

                if (emojiBtn) {
                    // 기존 이벤트 핸들러를 정확히 제거
                    emojiBtn.removeEventListener("click", handleEmojiClick);
                    emojiPicker.off("emoji", handleEmojiSelect);

                    // 새로운 이벤트 리스너 등록
                    emojiBtn.addEventListener("click", handleEmojiClick);
                    emojiPicker.on("emoji", handleEmojiSelect);
                }
            }
        }

        this._createUpdateReadMessageEvent = (createUpdateReadMessageEvent,element,func,loginInfo) => {
            if(createUpdateReadMessageEvent === false){
                const roomId = element.dataset.chatRoomId;
                func.updateReadMessage(updateType.MESSAGE, roomId, loginInfo.userKey)
                    .then(() => {
                        func.changeChatRoomUnreadMessageCount(element, 0);
                    })
                    .catch(err => {
                        console.error("updateReadMessage 호출 중 오류 발생:", err);
                    });
            }
        }

        this._createScrollUpEvent = (createScrollUpEvent,element,func,clsMessage,mvc,loginInfo,companyOrgUser) => {
            if(createScrollUpEvent === false){
                const roomId = element.dataset.chatRoomId;
                const targetDiv = document.querySelector(".messenger__body .chatBox [data-overlayscrollbars-viewport]");

                const targetDivScrollerUpEvent = () => {
                    const preRoomAwpMessageDetailList = clsMessage.roomAwpMessageDetailListMap.get(roomId);
                    const mode = element.dataset.mode;
                    if (targetDiv.scrollTop === 0 && typeof mode === 'undefined' && this._isPaging) {
                        const tempChildren= Array.from(document.querySelector(".messenger__body .chatBox .chatBox__body").children);
                        const currentMessageId = tempChildren.find(child => {
                            if (child.classList.contains('chatBox__divider') && child.dataset.messageId) {
                                return true;
                            }
                            const groupElement = child.querySelector('.chatCard__group');
                            return groupElement?.dataset?.messageId !== undefined;
                        })?.dataset?.messageId || tempChildren.find(child => {
                            const groupElement = child.querySelector('.chatCard__group');
                            return groupElement?.dataset?.messageId;
                        })?.querySelector('.chatCard__group')?.dataset?.messageId;

                        const msgPagingUrl = `/messenger/message/list`;
                        const messageDto = {"roomId":`${roomId}`, "messageId":`${Number(currentMessageId)}`}
                        fetch(msgPagingUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(messageDto),
                        })
                            .then(response => response.text())
                            .then(response => func.parseData(response))
                            .then(response => {
                                let previousMessageDetail= null;
                                const tempAwpMessageDetailList = [];
                                const tempList = Array.from(response);
                                tempList
                                    .filter(item => item.messageId && !isNaN(Number(item.messageId)) && !(Number(item.messageId) === 0) ) // 유효한 messageId만 필터링
                                    .sort((a, b) => a.messageId - b.messageId )
                                    .forEach( (item) => {
                                        const attachmentList = Array.from(item.attachmentList ?? []).map(att => func._makeAttachment(att));
                                        const upperAttachmentList = Array.from(item.upperMessageDto?.attachmentList ?? []).map(uAtt => func._makeAttachment(uAtt));
                                        const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.messageId),func.makeMessage(item),attachmentList,func._makeUpperMessageApi(item.upperMessageDto),upperAttachmentList,previousMessageDetail,item.emojiList);
                                        previousMessageDetail = awpMessageDetail;
                                        tempAwpMessageDetailList.push(awpMessageDetail);
                                    });

                                if(tempAwpMessageDetailList.length < 50) this._isPaging = false;

                                return tempAwpMessageDetailList;
                            })
                            .then((roomAWPMessageDetailList) => {
                                if(roomAWPMessageDetailList.length !== 0){
                                    const prevScrollHeight = targetDiv.scrollHeight; // 현재 스크롤 위치 및 높이 저장
                                    preRoomAwpMessageDetailList[0].previousMessageDetail = roomAWPMessageDetailList[roomAWPMessageDetailList.length - 1];
                                    const tempTotal = [...roomAWPMessageDetailList, ...preRoomAwpMessageDetailList];
                                    const chatMessageBody = document.querySelector('.messenger__body .chatBox .chatBox__body')
                                    chatMessageBody.innerHTML = '';
                                    clsMessage.roomAwpMessageDetailListMap.set(roomId,tempTotal);
                                    const contentViewElement = document.querySelector('.messenger');
                                    this.createElementEvent(false,element,clsMessage.roomAwpMessageDetailListMap,mvc,companyOrgUser,contentViewElement);
                                    // 새 메시지 렌더링 후 스크롤 위치 유지
                                    requestAnimationFrame(() => {
                                        const newScrollHeight = targetDiv.scrollHeight;
                                        const scrollDiff = newScrollHeight - prevScrollHeight;
                                        targetDiv.scrollTop += scrollDiff;
                                    });
                                    const cards = document.querySelectorAll('.chatCard__group .card');
                                    mvc.chatFunctionMenu(cards, contentViewElement, element);
                                    const cardFileList = document.querySelectorAll('.attachmentList .attachment');
                                    mvc.chatFileFunction(cardFileList);
                                } else {
                                    func.showToastModal('마지막 메시지입니다.');
                                }
                            })
                    } else {
                        if (targetDiv.scrollTop === 0){
                            element.removeAttribute("data-mode");
                        }
                    }
                }
                targetDiv.addEventListener("scroll",targetDivScrollerUpEvent);
            }
        }
    }

    get createCurrentModeEvent(){
        return this._createCurrentModeEvent;
    }
    get createElementEvent(){
      return this._createElementEvent;
    }
    get createFileEvent(){
        return this._createFileEvent;
    }
    get createMultiFileEvent(){
        return this._createMultiFileEvent;
    }
    get createSendEvent(){
        return this._createSendEvent;
    }
    get createAddMemberEvent(){
        return this._createAddMemberEvent;
    }
    get createTab02Event(){
        return this._createTab02Event;
    }
    get createSearchEvent(){
        return this._createSearchEvent;
    }
    get createSummaryEvent(){
        return this._createSummaryEvent;
    }
    get createEmojiEvent(){
        return this._createEmojiEvent;
    }
    get createUpdateReadMessageEvent(){
        return this._createUpdateReadMessageEvent;
    }
    get createScrollUpEvent(){
        return this._createScrollUpEvent;
    }

}
