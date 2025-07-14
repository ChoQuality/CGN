class AWPMessengerView {
    constructor(func,toastFunc,loginInfo,companyOrgUser,clsMessage) {
        this._roomListMap = new Map();
        this._fixedRoomListViewElement = null;
        this._unFixedRoomListViewElement = null;
        this._messageViewComponent = null;

        this._applicationElement = null;
        this._subViewElement = null;
        this._contentViewElement = null;

        this._func = func;
        this._toastFunc = toastFunc;
        this._loginInfo = loginInfo;
        this._clsMessage = clsMessage;
        this._companyOrgUser = companyOrgUser;
        this._createChatModalMap = new Map();
        this._ALARM = null;
        this._DOROTHY = null;
        this._SELF = null;
        this._chatRoomList = null;
        this._alarmView = null;
        this._dorothyView = null;
        this._selfView = null;
        this._defaultView = null;
    }
    get roomListMap(){
        return this._roomListMap;
    }

    get companyOrgUser() {
        return this._companyOrgUser;
    }

    get ALARM() {
        return this._ALARM;
    }

    get DOROTHY() {
        return this._DOROTHY;
    }

    get SELF() {
        return this._SELF;
    }

    get applicationElement() {
        return this._applicationElement;
    }

    get subViewElement() {
        return this._subViewElement;
    }

    get contentViewElement() {
        return this._contentViewElement;
    }

    get messageViewComponent() {
        return this._messageViewComponent;
    }
    get toastFunc() {
        return this._toastFunc;
    }

    get fixedRoomListViewElement() {
        return this._fixedRoomListViewElement;
    }
    get unFixedRoomListViewElement() {
        return this._unFixedRoomListViewElement;
    }

    makeView(applicationElement,subViewElement,contentViewElement) {

        this._applicationElement = applicationElement;
        this._subViewElement = subViewElement;
        this._contentViewElement = contentViewElement
        
        this._fixedRoomListViewElement = subViewElement.querySelectorAll('.messageList__list')[0]
        this._unFixedRoomListViewElement = subViewElement.querySelectorAll('.messageList__list')[1]
        
        this._messageViewComponent = new AWPMessageViewComponent(this._loginInfo,this._companyOrgUser,this._applicationElement,this._subViewElement,this._contentViewElement,this._clsMessage,this._func);
        this._alarmView = new AWPMessengerAlarmView(this._loginInfo,this._func,this._clsMessage,this._messageViewComponent,this._companyOrgUser,this._contentViewElement);
        this._dorothyView = new AWPMessengerDorothyView(this._loginInfo,this._companyOrgUser,this._roomListMap,this._func,this._clsMessage,this._messageViewComponent,this._contentViewElement);
        this._selfView = new AWPMessengerSelfView(this._loginInfo,this._companyOrgUser,this._roomListMap,this._func,this._clsMessage,this._messageViewComponent,this._contentViewElement);
        this._defaultView = new AWPMessengerDefaultView(this._loginInfo,this._companyOrgUser,this._roomListMap,this._func,this._toastFunc,this._clsMessage,this._messageViewComponent,this._contentViewElement);

        const msgRoomSearchForm = document.getElementById('msgRoomSearchForm');
        const msgRoomSearchFormInput = msgRoomSearchForm.querySelector('input');
        const msgRoomSearchFormButton = msgRoomSearchForm.querySelector('button.btn.has-icon.form__searchBtn')
        const searchRoomBtnEventHandler = (msgRoomSearchForm,companyOrgUser) => {
            const participatingRoomList= document.querySelectorAll('.messageList__list')[1];
            const participatingDetailRoomList= participatingRoomList.querySelectorAll('a.chatList');
            const msgRoomSearchFormInput = msgRoomSearchForm.querySelector('input');
            const msgRoomSearchFormButton = msgRoomSearchForm.querySelector('button.btn.has-icon.form__searchBtn')

            const msgRoomSearchFormInputButtonEventHandler = () => {
                const searchIcon= msgRoomSearchFormButton.querySelector('i.icon.is-24.is-search-24');
                if(searchIcon){
                    const msgSearchIcon=msgRoomSearchFormButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-24","is-search-24");
                    msgSearchIcon.classList.add("is-14","is-clear-14");
                    msgRoomSearchFormInput.setAttribute("readonly","readonly");
                    const keyword = msgRoomSearchFormInput.value.trim();
                    const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const msgSearchEventHandler = (keyword) => {
                        const regex = new RegExp(escapeRegExp(keyword), 'i');
                        participatingDetailRoomList.forEach(participatingDetailRoom => {
                            new Promise((resolve) => {
                                participatingDetailRoom.style.display = 'none'
                                resolve(participatingDetailRoom)
                            })
                                .then((participatingDetailRoom) => {
                                    const {chatRoomName, chatParticipantList} = participatingDetailRoom.dataset;
                                    if (regex.test(chatRoomName)) {
                                        participatingDetailRoom.style.removeProperty("display");
                                        participatingDetailRoom.style.removeProperty("opacity");
                                        participatingDetailRoom.style.removeProperty("visibility");
                                        participatingDetailRoom.style.display = 'flex';
                                        return; // 방 이름에서 찾았으면 더 이상 검사할 필요 없음
                                    }

                                    const participants = JSON.parse(chatParticipantList);

                                    const matchedUsers = companyOrgUser.user.filter(user =>
                                        participants.includes(user.userKey)
                                    );
                                    const matchedUserNames = matchedUsers.map(user => user.userNm);

                                    if (matchedUserNames.some(userName => regex.test(userName))) {
                                        participatingDetailRoom.style.removeProperty("display");
                                        participatingDetailRoom.style.removeProperty("opacity");
                                        participatingDetailRoom.style.removeProperty("visibility");
                                        participatingDetailRoom.style.display = 'flex';
                                    }
                                })
                        })
                    }
                    msgSearchEventHandler(keyword)
                } else {
                    const msgSearchIcon= msgRoomSearchFormButton.querySelector('i');
                    msgSearchIcon.classList.remove("is-14","is-clear-14");
                    msgSearchIcon.classList.add("is-24","is-search-24");
                    msgRoomSearchFormInput.removeAttribute("readonly");
                    msgRoomSearchFormInput.value='';
                    participatingDetailRoomList.forEach(participatingDetailRoom => {
                        participatingDetailRoom.style.removeProperty("display");
                        participatingDetailRoom.style.removeProperty("opacity");
                        participatingDetailRoom.style.removeProperty("visibility");
                        participatingDetailRoom.style.display = 'flex';
                    })
                }
            }
            msgRoomSearchFormInputButtonEventHandler();
        }

        msgRoomSearchFormButton.addEventListener('click',() => searchRoomBtnEventHandler(msgRoomSearchForm,this._companyOrgUser));
        msgRoomSearchFormInput.addEventListener('keypress', function (e){
            if (e.key === "Enter") {
                e.preventDefault();
                msgRoomSearchFormButton.click();
            }
        });


        ////MESSENGER-1-0
        new Promise((resolve, reject) =>{
            try{
                this.initChatList(this._clsMessage);
                resolve("");
            } catch (error) {
                reject(`❌ Messenger 채팅룸 로딩 실패: ${error.message || error}`);
            }
        })
            .then(() =>{
                this.makeToastTreeData(this._clsMessage);
            })
            .catch(error => console.log(error))

    }
    makeToastTreeData(clsMessage){
        const companyOrgUser = this._companyOrgUser;
        const createChatModalOpenBtn= document.getElementById("CreateChatModalOpenBtn");
        const toastFunc = this._toastFunc;
        const createChatModalMap = this._createChatModalMap;
        const loginInfo = this._loginInfo;
        const mvc = this._messageViewComponent;
        const fixedRoomListViewElement = this._fixedRoomListViewElement;
        const unFixedRoomListViewElement = this._unFixedRoomListViewElement;
        const roomListMap = this._roomListMap;

        const funcCreateChatModalOpen = (createChatModalMap) => {
            const createChatModal= document.getElementById("createChatModal");
            const orgTree = createChatModal.querySelector('#orgTree');
            const orgUser = createChatModal.querySelector('#orgUser');

            const modalClear = () => {
                orgUser.innerHTML = '';
                orgTree.innerHTML = '';
                document.getElementById('invitedUserCnt').textContent = Number(0);
                createChatModal.style.display="none";
                createChatModalMap.set("createChatModalMap", createChatModal.outerHTML);
                createChatModalMap.set("createRoomInfo", null);
            }

            new Promise((resolve) => {
                modalClear();
                createChatModal.style.display="flex";
                resolve(createChatModal)
            })
                .then((createChatModal) => {
                    const modalSelectBox = createChatModal.querySelector('.modal__header .modalSelect-1 .tui-select-box');
                    const tui_select_box_input = modalSelectBox.children[0];
                    const tui_select_box_input_p = modalSelectBox.children[0].querySelector('p');
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

                    const search_input = createChatModal.querySelector('.modal__header .formSearch.is-square input');
                    const search_button = createChatModal.querySelector('.modal__header .formSearch.is-square button');
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
                        const searchInput = createChatModal.querySelector('.modal__header input');
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
                        toastFunc.funcSettingList(createChatModal,orgUser);
                    });

                    return createChatModal;
                })
                .then((createChatModal) => {

                    const tree = new tui.Tree(orgTree, {
                        data: companyOrgUser.org,
                        nodeDefaultState: "opened",
                        renderTemplate: toastFunc.defaultTreeTemplate
                    }).enableFeature('Checkbox', {
                        checkboxClassName: 'tui-tree-checkbox',
                    });

                    return createChatModal;
                })
                .then((createChatModal) => {

                    const orgCenters = orgTree.querySelectorAll('.tui-tree-text');
                    const orgTeams = orgTree.querySelectorAll('.tui-tree-node.tui-tree-leaf');
                    orgCenters.forEach( orgCenter => {
                        orgCenter.addEventListener('click', () => toastFunc.makeSelectOrgUser(orgUser,orgCenter,companyOrgUser,createChatModal,loginInfo));
                    });
                    orgTeams.forEach( orgTeam => {
                        orgTeam.addEventListener('click', () => toastFunc.makeSelectOrgUser(orgUser,orgTeam,companyOrgUser,createChatModal,loginInfo));
                    });

                    return createChatModal;
                })
                .then((createChatModal) => {
                    const loginInfo = this._loginInfo;
                    const createChatModalConfirmBtn = createChatModal.querySelector("#confirm")
                    const func = this._func;
                    const toastFunc = this._toastFunc;
                    const subViewElement = this._subViewElement;

                    const confirm = () => {
                        return new Promise((resolve, reject) => {
                            const invitedUsers = createChatModal.querySelector("#invitedUser").querySelectorAll('li')
                            const filteredUserKeys =
                                Array.from(invitedUsers)
                                    .map(invitedUser => {
                                        return Number(invitedUser.dataset.userKey)
                                    });
                            const matchedUsers = companyOrgUser.user.filter(user =>
                                filteredUserKeys.includes(user.userKey)
                            );
                            let roomName = createChatModal.querySelector('#roomName').value.trim();
                            let description = createChatModal.querySelector('#description').value.trim();

                            if(filteredUserKeys.length === 0){
                                alert("한명 이상 초대 해 주세요");
                                return;
                            }

                            // 2025.04.09 김광길 RoomName 빈값일때 처리 로직 제외
                            // if (roomName === '') {
                            //     const count = filteredUserKeys.length;
                            //     // 1~3인 경우에만 roomName을 생성합니다.
                            //     if (count >= 1 && count <= 3) {
                            //         roomName = [loginInfo.userNm, ...matchedUsers.slice(0, count).map(user => user.userNm)].join(',');
                            //     } else {
                            //         const extNum= filteredUserKeys.length-3;
                            //         roomName = [loginInfo.userNm, ...matchedUsers.slice(0, 3).map(user => user.userNm)].join(',')+' 외 '+ extNum + '명';
                            //     }
                            // }

                            if(description === ''){
                                description = loginInfo.userNm+'('+loginInfo.orgNm+')'+'님이 생성한 방입니다.';
                            }

                            if (!filteredUserKeys.includes(Number(loginInfo.userKey))) {
                                filteredUserKeys.push(Number(loginInfo.userKey));
                            }

                            const roomInfo = new Room(
                                null
                                ,filteredUserKeys.length > 2 ? roomType.GROUP : roomType.PRIVATE
                                , roomName
                                , description
                                , 'Y'
                                , loginInfo.userImg
                                , loginInfo.userKey
                                , null
                                , loginInfo.userKey
                                , null
                                , null
                                , null
                                , filteredUserKeys
                                , null
                            );
                            const roomJson = roomInfo.ToJSON();
                            createChatModalMap.set("createRoomInfo", JSON.stringify(roomJson));
                            resolve(JSON.stringify(roomJson));
                        })
                            .then((roomData) => {
                                return fetch('/messenger/room/participating', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: roomData,
                                })
                                    .then(response => response.text())
                                    .then(response => func.parseData(response))
                                    ;

                            })
                            .then((dataList) => {
                                const createChatModal = document.getElementById('createChatModal');
                                const headerClose= createChatModal.querySelector('.modal__header button');
                                const modalTree = createChatModal.querySelector('.modalTree');
                                const prevThirdTree = createChatModal.querySelectorAll('.modalTree__item')[2];

                                const invitedDiv = document.getElementById('invitedDiv');
                                const orgUser = document.getElementById('orgUser');


                                headerClose.addEventListener('click',() => createChatModal.style.display='none')

                                createChatModalMap.set("previousThirdTree",prevThirdTree);
                                createChatModalMap.set("invitedDiv",invitedDiv);
                                prevThirdTree.remove();

                                orgUser.innerHTML = '';
                                orgUser.appendChild(invitedDiv);

                                modalTree.appendChild(toastFunc.confirmThirdTree());
                                const settingList__item = modalTree.querySelector('.settingList .settingList__item');
                                dataList.forEach(data => {
                                    settingList__item.appendChild(toastFunc._existRoom(data));
                                })


                                const funcEnterRoom = (headerCloseBtn, roomId) => {
                                    headerCloseBtn.click();
                                    const chatList = Array.from(document.querySelectorAll('.messageList a.chatList'));
                                    const openExistRoom = chatList.filter(chatroom => chatroom.dataset.chatRoomId === roomId);
                                    if(openExistRoom[0]){
                                        openExistRoom[0].click();
                                    }
                                }

                                const existRoomButtons= modalTree.querySelectorAll('.settingList .settingList__chatRoom button');
                                existRoomButtons.forEach(existRoomButton => {
                                    existRoomButton.addEventListener('click', () => {
                                        const existRoomId= existRoomButton.closest(".settingList__chatRoom").dataset.roomId;
                                        funcEnterRoom(headerClose,existRoomId);
                                    });
                                });

                                const previousThirdTree = document.getElementById('previousThirdTree');
                                previousThirdTree.addEventListener('click', () => {
                                    const currentThirdTree = document.getElementById('createChatModal').querySelectorAll('.modalTree__item')[2];
                                    currentThirdTree.remove();
                                    const previousThirdTree = createChatModalMap.get("previousThirdTree");
                                    const previousThirdTreeSettingList = previousThirdTree.querySelector('.settingList');
                                    previousThirdTreeSettingList.appendChild(createChatModalMap.get("invitedDiv"))
                                    modalTree.appendChild(createChatModalMap.get("previousThirdTree"));
                                })
                                const createNewRoom=document.getElementById('createNewRoom')
                                createNewRoom.addEventListener('click', () => {
                                    const roomInfo = createChatModalMap.get("createRoomInfo");
                                    createChatModalMap.set("createRoomInfo",null);
                                    return fetch('/messenger/room/save', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: roomInfo,
                                    })
                                        .then(response => {
                                            if (!response.ok) {
                                                throw new Error(`Server responded with status: ${response.status}`);
                                            }
                                            return response.text();
                                        })
                                        .then(response => func.parseData(response))
                                        .then(response => {
                                            const tempRoomList = func.makeRoomList(response);
                                            try {
                                                tempRoomList.participantList = JSON.parse(roomInfo).participantList;
                                                const tempRoomListElement = mvc.makeRoomList(tempRoomList, loginInfo);

                                                if (!tempRoomListElement) {
                                                    throw new Error("tempRoomListElement is null.");
                                                }

                                                const unfixedRoomList = subViewElement.querySelectorAll('.messageList__list')[1];
                                                const firstRoomList = unfixedRoomList.querySelectorAll('a.chatList')[0];

                                                if (!firstRoomList) {
                                                    const emptyElement = unfixedRoomList.querySelector('.messageList__list .chatList.is-empty');
                                                    if (emptyElement) emptyElement.remove();
                                                    unfixedRoomList.appendChild(tempRoomListElement);
                                                } else {
                                                    unfixedRoomList.insertBefore(tempRoomListElement, firstRoomList);
                                                }

                                                tempRoomListElement.removeEventListener('click', this.handleChatClick);
                                                tempRoomListElement.addEventListener('click', this.handleChatClick);

                                                const chatListLayer = document.getElementById('ChatListLayer');
                                                const chatRoomMoreButton = tempRoomListElement.querySelector('.more button.btn.has-icon');
                                                const viewport = tempRoomListElement.closest('[data-overlayscrollbars-viewport]');

                                                if (chatRoomMoreButton) {
                                                    chatRoomMoreButton.addEventListener('click', (event) => {
                                                        mvc.makeRoomMoreButtonLayer(chatRoomMoreButton, chatListLayer, fixedRoomListViewElement, unFixedRoomListViewElement);
                                                    });
                                                }

                                                if (viewport) {
                                                    viewport.parentElement.addEventListener('scroll', () => {
                                                        document.getElementById("ChatListLayer").style.display = "none";
                                                    });
                                                }

                                                roomListMap.set(tempRoomList.roomId, tempRoomList);

                                                try {
                                                    tempRoomListElement.click(); // UI 멈춤 원인 가능성 있는 코드
                                                } catch (clickError) {
                                                    this._func.showToastModal("Error during tempRoomListElement.click():", clickError);
                                                }
                                                return new Promise((resolve) => {
                                                    const observer = new MutationObserver(() => {
                                                        observer.disconnect();
                                                        resolve(tempRoomList);
                                                    });

                                                    observer.observe(document.body, { childList: true, subtree: true });

                                                    setTimeout(() => {
                                                        observer.disconnect();
                                                    }, 3000);
                                                });
                                            } catch (error) {
                                                this._func.showToastModal("Error while processing room list:", error);
                                                return Promise.resolve(tempRoomList); // 오류 발생해도 이후 체인 실행 보장
                                            }
                                        })
                                        .then(tempRoomList => {
                                            if (tempRoomList) {
                                                clsMessage.publishRoomMessage(tempRoomList, messageType.JOIN, new Map());
                                            }
                                        })
                                        .catch(error => this._func.showToastModal("Error in fetch or processing:", error))
                                        .finally(() => {
                                            headerClose.click();
                                        })
                                        ;
                                });

                            })
                            .catch(error => {
                                if(error.code === 9999){
                                    alert("초대 멤버 확인해 주세요");
                                }
                            });
                    };
                    createChatModalConfirmBtn.addEventListener('click', () => confirm())
                    return createChatModal;
                })
                .then((createChatModal) => {

                    const createChatModalCloseBtn = createChatModal.querySelector(".modal__header button");
                    createChatModalCloseBtn.addEventListener('click',()=> {
                        createChatModal.outerHTML = createChatModalMap.get("createChatModalMap");
                        createChatModal.style.display = "none"
                    });
                    const createChatModalCancelBtn = createChatModal.querySelector('.btnGroup [data-function="modalClose"]')
                    createChatModalCancelBtn.addEventListener('click',()=> {
                        createChatModal.outerHTML = createChatModalMap.get("createChatModalMap");
                        createChatModal.style.display = "none"
                    });
                })
        };

        createChatModalOpenBtn.addEventListener("click", () => funcCreateChatModalOpen(createChatModalMap));
    }

    insertChatList(section, index,clsMessage) {
        const func = this._func;
        return fetch(`/messenger/main/chatRoomList?section=${section}`, { method: "GET" })
            .then(response => response.text())
            .then(htmlString => {
                switch (index){
                    case 0:
                        this._fixedRoomListViewElement.innerHTML = this._func.parseData(htmlString);

                        const fixedList = this._fixedRoomListViewElement.querySelectorAll('a.chatList');

                        Array.from(fixedList)
                            .map(fixedRoom => {
                                const room = func.makeRoomList(fixedRoom.dataset);
                                switch (fixedRoom.dataset.chatRoomType){
                                    case "ALARM":
                                        this._ALARM = room;
                                        this._alarmView.ALARM = this._ALARM;
                                        break
                                    case "DOROTHY":
                                        this._DOROTHY = room;
                                        this._dorothyView.DOROTHY = this._DOROTHY;
                                        break
                                    case "SELF":
                                        this._SELF = room;
                                        this._selfView.SELF = this._SELF;
                                        break
                                }
                            })
                        break;
                    case 1:
                        this._unFixedRoomListViewElement.innerHTML = this._func.parseData(htmlString);
                        this._chatRoomList = this._unFixedRoomListViewElement.querySelectorAll('a.chatList');
                        break;
                }
                return true;
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));

    }

    initChatList(clsMessage) {
        this.insertChatList('fixed', 0,clsMessage)
            .then(() => {
                return this.insertChatList('unfixed', 1,clsMessage);
            })
            .then(() => {
                const addChatClickListener = (chatList) => {
                    chatList.forEach(chat => {
                        if (!chat.dataset.listenerAdded) { // 중복 방지
                            chat.dataset.listenerAdded = "true";
                            chat.addEventListener("click", this.handleChatClick);
                        }
                    });
                };

                const fixedChatList = this._fixedRoomListViewElement.querySelectorAll('.chatList');
                addChatClickListener(fixedChatList);

                const unfixedChatList = this._unFixedRoomListViewElement.querySelectorAll('.chatList');
                addChatClickListener(unfixedChatList);
            })
            .then(() => {
                const roomListMap = this._roomListMap;
                const chatListElement = this._subViewElement.querySelectorAll('.chatList');
                const func = this._func;

                chatListElement.forEach(chatElement => {
                    if (chatElement.dataset.chatRoomId) {
                        const room = func.makeRoomList(chatElement.dataset);
                        roomListMap.set(chatElement.dataset.chatRoomId, room);
                    }
                });
            })
            .then(() =>{

                const chatRoomList = this._chatRoomList

                chatRoomList.forEach(chatRoom => {
                   if (chatRoom && chatRoom.dataset.chatRoomFixOrder !== undefined) {
                       chatRoom.querySelector('.userThumb').classList.add("is-pin");
                       this._fixedRoomListViewElement.appendChild(chatRoom);
                   }
                })

                chatRoomList.forEach((chatRoom, index) => {
                    const chatListLayer = document.getElementById('ChatListLayer');
                    const chatRoomMoreButton = chatRoom.querySelector('.more button.btn.has-icon');
                    const viewport= chatRoom.closest('[data-overlayscrollbars-viewport]');

                    if(chatRoomMoreButton){
                        chatRoomMoreButton.addEventListener('click', (event) => {
                            this._messageViewComponent.makeRoomMoreButtonLayer(chatRoomMoreButton,chatListLayer,this._fixedRoomListViewElement,this._unFixedRoomListViewElement);
                        })
                    }
                    if(viewport){
                        viewport.parentElement.addEventListener('scroll', () => {
                            document.getElementById("ChatListLayer").style.display = "none";
                        })
                    }
                });
            })
            .then(() => {
                this._contentViewElement.addEventListener('click', function() {
                    const chatListLayer = document.getElementById('ChatListLayer');
                    const isOpenStatusButton = document.getElementById('isOpenStatusButton');
                    const isUserMenu = document.getElementById('isUserMenu');
                    if (chatListLayer) chatListLayer.style.display = 'none';
                    if (isOpenStatusButton) {
                        isUserMenu.style.maxHeight = '0px';
                    }
                });
            })
            .then(() => {
                return delay(1000); // 1초 대기
            })
            .then(() => {
                clsMessage.subscribeAlarm(clsMessage.awpMessenger);
                clsMessage.subscribeDorothy(clsMessage.awpMessenger);
                clsMessage.subscribeMyRoom(clsMessage.awpMessenger);
            })
            .catch(error => {
                this._func.showToastModal('Error fetching HTML:', error);
            });

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    handleChatClick = (event) => {
        try {
            const clsMessage = this._clsMessage;
            const chatListElement = this._subViewElement.querySelectorAll('.chatList');
            const element = event.currentTarget;
            const roomId = element.dataset.chatRoomId;

            clsMessage.process = false;
            chatListElement.forEach(item => item.classList.remove('is-active'));
            element.classList.add('is-active');

            if (!roomId) return;
            if (!element.dataset.chatRoomType) return;

            switch (element.dataset.chatRoomType) {
                case "ALARM":
                    this._alarmView.element = element;
                    this._alarmView.alarmEventHandler();
                    break;
                case "DOROTHY":
                    this._dorothyView.element = element;
                    this._dorothyView.dorothyEventHandler();
                    break;
                case "SELF":
                    this._selfView.element = element;
                    this._selfView.selfEventHandler();
                    break;
                default:
                    if (!this._defaultView || !this._defaultView.defaultEventHandler) {
                        throw new Error("Default event handler is missing or undefined.");
                    }
                    this._defaultView.element = element;
                    this._defaultView.defaultEventHandler();
                    break;
            }
        } catch (error) {
            this._func.showToastModal("Error in handleChatClick:", error);
        }
    };

}
