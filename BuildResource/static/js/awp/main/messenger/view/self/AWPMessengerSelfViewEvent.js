class AWPMessengerSelfViewEvent {
    constructor() {
        this._isPaging = true;
        this._pagingMessageId = 0;
        this._createCurrentModeEvent = (element,mvc) => {
            const mode = element.dataset.mode;
            const lastReadMessageId = Number(element.dataset.chatRoomReadMessageId);
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
                        targetChatBox = lastReadMessageChatGroup
                            ? lastReadMessageChatGroup.closest(".chatBox__chat")
                            : firstChatCard.closest(".chatBox__chat");
                    }
                    // 가장 가까운 chatBox__chat 요소의 부모에 lastReadComponent 삽입
                    if (targetChatBox) {
                        targetChatBox.parentElement.insertBefore(lastReadComponent, targetChatBox);
                    }
                }
            }
        }

        this._createElementEvent = (createElementEvent, element, roomAWPMessageDetailListMap, mvc, companyOrgUser, contentViewElement) => {
            this._isPaging = true;
            if (createElementEvent === false) {
                const roomId = element.dataset.chatRoomId;
                const roomAWPMessageDetailList = roomAWPMessageDetailListMap.get(roomId);
                const chatMessageBody = contentViewElement.querySelector('.chatBox__body');

                // 마지막 messageId값을 저장한다.
                const lastItem = roomAWPMessageDetailList[roomAWPMessageDetailList.length - 1];
                this._pagingMessageId = lastItem?.message?.messageId;

                roomAWPMessageDetailList.forEach(roomAWPMessageDetail => {
                    const first = roomAWPMessageDetail.previousMessageDetail === null;
                    const mine = roomAWPMessageDetail.isMine;

                    const subMessageType = roomAWPMessageDetail.message.messageType;
                    if (subMessageType === messageType.TALK) {
                        const htmlElementFunc = (isMine, htmlElement) => {
                            return isMine
                                ? mvc.wholeMyTextChatBox(roomAWPMessageDetail, htmlElement, companyOrgUser)
                                : mvc.wholeYourChatBox(roomAWPMessageDetail, htmlElement, companyOrgUser);
                        };

                        const htmlElement = mvc.componentTextChatCardGroup(roomAWPMessageDetail, true);
                        if (first) {
                            const divider = mvc.chatBoxDivider(roomAWPMessageDetail);
                            chatMessageBody.prepend(divider);
                        }

                        const chatCard = htmlElementFunc(mine, htmlElement);
                        chatMessageBody.prepend(chatCard);
                    } else if (subMessageType === messageType.PRAISE_IMG_01 || subMessageType === messageType.PRAISE_IMG_02 || subMessageType === messageType.PRAISE_IMG_03 || subMessageType === messageType.PRAISE_IMG_04) {
                        const praiseChatBoxChat = mvc.PraiseChatBox_chat(roomAWPMessageDetail.message, true, companyOrgUser.user);
                        chatMessageBody.prepend(praiseChatBoxChat);
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

                    // 새 FormData로 재구성
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

                    // 2025.04.14 김광길 발송 후 입력 메시지 초기화 처리
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

        this._createAddMemberEvent = (element,func,toastFunc,clsMessage,contentViewElement,companyOrgUser,loginInfo) => {
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
                settingPanelParticipantList.appendChild(toastFunc.alreadyInviteUserLi(filteredUser,loginInfo));
            })


            if(settingBtn){
                const settingBtnEventHandler = () => {
                    document.getElementById("ReplyDeleteButtonLayer").style.display='none';
                    settingPanelRoomName.value = roomNameHeader.textContent;
                    settingPanelDescription.value = roomNameDescription.textContent;

                    if(settingPanel.classList.contains("is-active")){
                        settingPanel.classList.remove("is-active");
                    } else {
                        settingPanel.classList.add("is-active");
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
                                            if(code !== 0) {
                                                console.log("error :: "+ code);
                                            } else {
                                                const copiedRoomList = new RoomList(chatRoomId,chatRoomType,chatRoomName,chatDescription,chatUnreadMessageCount,chatMessageType,chatLastMessageContent,chatMessageId,chatReadMessageId,chatLastMessageDt,chatFixOrder,Array.from(invitedUserDataList.map(invitedUserData =>invitedUserData.userKey)));
                                                clsMessage.publishRoomMessage(copiedRoomList, messageType.JOIN, new Map());

                                                const currentRoomListMember = JSON.parse(currentRoomList.participantList);
                                                invitedUsers.forEach(invitedUser => {
                                                    settingPanelParticipantList.appendChild(invitedUser);
                                                    currentRoomListMember.push(Number(invitedUser.dataset.userKey))
                                                    this.element.dataset.chatParticipantList = JSON.stringify(currentRoomListMember);
                                                });
                                                const total = settingPanelParticipantList.querySelectorAll(".memberList__item[data-user-key]").length
                                                settingPanelParticipantCnt.textContent = Number(total);
                                            }
                                        })
                                        .then(() => close.click())
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

        this._createPraiseEvent = (createPraiseEvent,clsMessage,contentViewElement,companyOrgUser,mvc) => {
            if(createPraiseEvent === false){

                const praiseBtn = document.getElementById('praiseBtn');
                const complimentCards = contentViewElement.querySelectorAll('.complimentCard');
                const firstComplimentCard = complimentCards[0];
                const secondComplimentCard = complimentCards[1];
                let praiseMap = new Map();
                const complimentCardItems = firstComplimentCard.querySelectorAll('.complimentCard__list .complimentCard__item a');
                const secondComplimentInput = secondComplimentCard.querySelector('input');
                const secondComplimentInputButton = secondComplimentCard.querySelector('button.btn');
                const secondComplimentCardButtons = secondComplimentCard.querySelectorAll('button');
                const secondFormSearchForm = secondComplimentCard.querySelector('.formSearch__list');
                const closeButton = secondComplimentCardButtons[1];
                const sendButton = secondComplimentCardButtons[2];
                const companyUserList = secondComplimentCard.querySelector('.formSearch__list');
                const closeButtonEvent = () => {
                    praiseMap.clear();
                    const searchIcon = secondComplimentInputButton.querySelector('i');
                    if (searchIcon.classList.contains('is-clear-14')) {
                        secondComplimentInputButton.click();
                    }
                    secondComplimentCard.style.display = 'none';
                    secondComplimentCard.querySelector('.form__textarea.is-small').value = '';
                }
                const sendButtonEvent = () => {
                    const praiseMessage = secondComplimentCard.querySelector('.form__textarea.is-small').value ?? null;
                    if(praiseMessage && praiseMap.has('target')){
                        praiseMap.set('message', secondComplimentCard.querySelector('.form__textarea.is-small').value);
                        clsMessage.publishPraiseMessage(clsMessage.awpMessenger.view.SELF, praiseMap);
                        closeButton.click();
                        praiseBtn.click();
                    } else {
                        alert('칭찬 보내실 분/칭찬 메세지 확인해 주세요');
                    }
                }
                companyUserList.innerHTML = '';
                companyOrgUser.user.forEach(user => {
                    companyUserList.appendChild(mvc.setPraiseCompanyUsers(user));
                });

                complimentCardItems.forEach(complimentCard => {
                    const updateComplimentCardImage = (messageType) => {
                        const img = secondComplimentCard.querySelector('.complimentCard__item img');
                        const imageMap = {
                            'PRAISE_IMG_01': '/assets/images/compliment-card-1.gif',
                            'PRAISE_IMG_02': '/assets/images/compliment-card-2.gif',
                            'PRAISE_IMG_03': '/assets/images/compliment-card-3.gif',
                            'PRAISE_IMG_04': '/assets/images/compliment-card-4.gif'
                        };
                        img.src = imageMap[messageType] || '';
                        praiseMap.set('type', messageType);
                    };
                    const complimentCardEvent = () => {
                        secondComplimentCard.style.display = 'block';
                        updateComplimentCardImage(complimentCard.dataset.type);
                    }
                    complimentCard.addEventListener('click', complimentCardEvent);
                });

                const secondFormSearchList = secondFormSearchForm.querySelectorAll('a.item');
                secondFormSearchList.forEach(secondFormSearch => {
                    const secondFormSearchEvent = () => {
                        const { userKey, userNm, orgNm } = secondFormSearch.dataset;
                        praiseMap.set('target', userKey);
                        praiseMap.set('targetName', userNm);
                        secondComplimentInput.value = `${userNm} ${orgNm}`;
                        secondFormSearchForm.style.display = 'none';
                    }
                    secondFormSearch.addEventListener('click',secondFormSearchEvent)
                })

                const secondComplimentInputButtonEvent = () => {
                    const searchIcon = secondComplimentInputButton.querySelector('i');
                    const filterSearchResults = (keyword) => {
                        secondFormSearchList.forEach(item => item.style.display = 'none');
                        secondFormSearchForm.style.display = 'block';
                        secondFormSearchList.forEach(item => {
                            const { userNm, orgNm } = item.dataset;
                            item.style.display = userNm.includes(keyword) || orgNm.includes(keyword) ? 'block' : 'none';
                        });
                    };
                    if (searchIcon.classList.contains('is-search-24')) {
                        secondComplimentInput.setAttribute('readonly', 'readonly');
                        searchIcon.classList.replace('is-search-24', 'is-clear-14');
                        filterSearchResults(secondComplimentInput.value.trim());
                    } else {
                        if (praiseMap.has('target')) {
                            praiseMap.delete('target');
                            praiseMap.delete('targetName');
                        }
                        searchIcon.classList.replace('is-clear-14', 'is-search-24');
                        secondComplimentInput.removeAttribute('readonly');
                        secondComplimentInput.value = '';
                        secondFormSearchForm.style.display = 'none';
                    }
                }
                closeButton.addEventListener('click', closeButtonEvent);
                sendButton.addEventListener('click', sendButtonEvent);

                secondComplimentInputButton.addEventListener('click', secondComplimentInputButtonEvent);
                secondComplimentInput.addEventListener('keypress', (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        secondComplimentInputButton.click();
                    }
                });
                const praiseBtnEvent = () => {
                    // 2025.04.16 김광길 초기화 로직 추가
                    const searchIcon = secondComplimentInputButton.querySelector('i');
                    searchIcon.classList.replace('is-clear-14', 'is-search-24');

                    if (praiseMap.has('target')) {
                        praiseMap.delete('target');
                        praiseMap.delete('targetName');
                    }
                    secondComplimentInput.removeAttribute('readonly');
                    secondComplimentInput.value = '';
                    secondComplimentCard.querySelector('.form__textarea.is-small').value = '';

                    firstComplimentCard.style.display = firstComplimentCard.style.display === 'block' ? 'none' : 'block';
                }
                praiseBtn.addEventListener('click',praiseBtnEvent);
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

        this._createSummaryEvent = (func) => {
            const chatBoxDividerLastRead = document.getElementById('chatBoxDividerLastRead');
            const summaryBtn = document.getElementById('summaryBtn');
            const chatBox__body = document.getElementById('tab01').querySelector('.chatBox__body');
            const makeSummaryData = (summaryData) => {
                const tempChatSummary = [];
                summaryData.map(summary => {
                    const chatSummaryComponent = {};
                    const {messageContent,createDt,userNm} = summary.dataset
                    chatSummaryComponent.name = userNm;
                    chatSummaryComponent.date = createDt;
                    chatSummaryComponent.text = messageContent;
                    tempChatSummary.push(chatSummaryComponent);
                });
                return {"chat":tempChatSummary};
            }
            const executeSummary = (data) => {
                new Promise(resolve => {
                    resolve(func.updateLoadingOpen('대화 요약 중 입니다.'))
                })
                    .then(() => {
                        return fetch('/api/ai/chatSummary', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify(data)
                        })
                            .then(response => response.text())
                            .then(response => func.parseData(response))
                            .then(serverData => func.summaryModalOpen(serverData.data))
                            .then(() => func.updateLoadingClose())
                            .catch(() => {
                                func.summaryModalClose()
                            })
                    })
                    .catch(() =>{
                        func.updateLoadingClose();
                    })
            }

            const summaryBtnEventHandler = () => {
                let chatSummaryData;
                const chatBoxGroupList = Array.from(chatBox__body.querySelectorAll('.chatCard__group'));
                if (chatBoxGroupList.length > 100) {
                    const latest100 = chatBoxGroupList.slice(-50);
                    chatSummaryData = makeSummaryData(latest100);
                } else {
                    chatSummaryData = makeSummaryData(chatBoxGroupList);
                }
                executeSummary(chatSummaryData);
            }
            if(chatBoxDividerLastRead){
                summaryBtn.style.display='block';
            }
            summaryBtn.addEventListener('click', summaryBtnEventHandler);
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

        this._createUpdateReadMessageEvent = (element,func,loginInfo) => {
            const roomId = element.dataset.chatRoomId;
            func.updateReadMessage(updateType.MESSAGE, roomId, loginInfo.userKey)
                .then(() => {
                    func.changeChatRoomUnreadMessageCount(element, 0);
                })
                .catch(err => {
                    console.error("updateReadMessage 호출 중 오류 발생:", err);
                });
        }

        this._createScrollUpEvent = (createScrollUpEvent,element,func,clsMessage,mvc,loginInfo,companyOrgUser) => {
            if(createScrollUpEvent === false){
                const roomId = element.dataset.chatRoomId;
                const targetDiv = document.querySelector(".messenger__body .chatBox [data-overlayscrollbars-viewport]");

                const targetDivScrollerUpEvent = () => {
                    const mode = element.dataset.mode;
                    if (targetDiv.scrollTop === 0 && typeof mode === 'undefined' && this._isPaging) {
                        const msgPagingUrl = `/messenger/message/list`;
                        const messageDto = {"roomId":`${roomId}`, "messageId":`${this._pagingMessageId}`}
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
                                    // .sort((a, b) => a.messageId - b.messageId )
                                    .forEach( (item) => {
                                        const attachmentList = Array.from(item.attachmentList ?? []).map(att => func._makeAttachment(att));
                                        const upperAttachmentList = Array.from(item.upperMessageDto?.attachmentList ?? []).map(uAtt => func._makeAttachment(uAtt));

                                        const awpMessageDetail = new AWPMessageDetail(loginInfo,Number(item.messageId),func.makeMessage(item),attachmentList,func.makeUpperMessage(item),upperAttachmentList,previousMessageDetail);
                                        previousMessageDetail = awpMessageDetail;
                                        tempAwpMessageDetailList.push(awpMessageDetail);
                                    });

                                if(tempAwpMessageDetailList.length < 50) this._isPaging = false;

                                return tempAwpMessageDetailList;
                            })
                            .then((roomAWPMessageDetailList) => {
                                if(roomAWPMessageDetailList.length !== 0){
                                    const prevScrollHeight = targetDiv.scrollHeight; // 현재 스크롤 위치 및 높이 저장

                                    clsMessage.roomAwpMessageDetailListMap.set(roomId,roomAWPMessageDetailList);
                                    const contentViewElement = document.querySelector('.messenger');
                                    this.createElementEvent(false,element,clsMessage.roomAwpMessageDetailListMap,mvc,companyOrgUser,contentViewElement);

                                    // 새 메시지 렌더링 후 스크롤 위치 유지
                                    requestAnimationFrame(() => {
                                        const newScrollHeight = targetDiv.scrollHeight;
                                        const scrollDiff = newScrollHeight - prevScrollHeight;
                                        targetDiv.scrollTop += scrollDiff;
                                    });

                                    const cardFileList = document.querySelectorAll('.attachmentList .attachment');
                                    mvc.chatFileFunction(cardFileList);
                                } else {
                                    func.showToastModal('마지막 메시지입니다.');
                                    /*alert('불러올 메세지가 존재하지 않습니다.');*/
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

        document.addEventListener('click', function (event) {
            closeCompliment(event);
        });

        function closeCompliment(event) {
            const praiseBtn = document.getElementById('praiseBtn');
            const complimentCards = Array.from(document.querySelectorAll('.complimentCard'));
            const target = event.target;

            // 클릭한 요소가 어떤 complimentCard 안에도 포함되지 않는 경우
            const isOutside = complimentCards.every(card => !card.contains(target));

            if (!target || !praiseBtn) {
                return;
            }
            if (!praiseBtn.contains(target) && isOutside) {
                closeComplimentCard();
            }
        }
        function closeComplimentCard() {
            document.querySelectorAll('.complimentCard').forEach(element => {
                element.style.display = 'none';
            });
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
    get createPraiseEvent(){
        return this._createPraiseEvent;
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
