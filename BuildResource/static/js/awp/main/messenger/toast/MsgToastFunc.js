class ToastFunc {

    constructor() {

        this._confirmThirdTree = () => {
            const modalTree__item = document.createElement("div");
            modalTree__item.classList.add('modalTree__item');
            modalTree__item.style.width = "36rem";
            modalTree__item.innerHTML =
                '                    <div class="settingList">\n' +
                '                        <div class="settingList__item">\n' +
                '                            <div class="label">참여중인 대화방</div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="modalTree__btn">\n' +
                '                        <button id="previousThirdTree" type="button" class="btn is-secondary is-small">이전</button>\n' +
                '                        <button id="createNewRoom" type="button" class="btn is-primary is-small">신규 대화방 생성</button>\n' +
                '                    </div>\n' +
                '                </div>'
            return modalTree__item;
        };

        this._existRoom = (room) => {
            const settingList__chatRoom = document.createElement("div");
            settingList__chatRoom.classList.add('settingList__chatRoom');
            settingList__chatRoom.dataset.roomId = room.roomId;

            const chatRoom = document.createElement("div");
            chatRoom.classList.add('chatRoom');
            settingList__chatRoom.appendChild(chatRoom);
            const chatRoom_userThumb = document.createElement("div");
            chatRoom_userThumb.classList.add('userThumb', 'is-small', 'is-state'/*,'is-online'*/);
            chatRoom.appendChild(chatRoom_userThumb);
            const userThumb__img = document.createElement("div");
            userThumb__img.classList.add('userThumb__img');
            chatRoom_userThumb.appendChild(userThumb__img);
            const userThumb__img_img = document.createElement("img");
            userThumb__img_img.src = '';
            userThumb__img.appendChild(userThumb__img_img);
            const chatRoom__title = document.createElement("div");
            chatRoom__title.classList.add('chatRoom__title');
            chatRoom__title.textContent = room.roomName;
            chatRoom.appendChild(chatRoom__title);
            const settingList__chatRoom_btn = document.createElement("button");
            settingList__chatRoom_btn.type = "button";
            settingList__chatRoom_btn.classList.add('btn', 'is-secondary', 'is-small');
            settingList__chatRoom_btn.textContent = "열기";
            settingList__chatRoom.appendChild(settingList__chatRoom_btn);
            return settingList__chatRoom;
        }

        this._selectOrgElement = (text) => {
            const selectOrgComponent = document.createElement("li");
            selectOrgComponent.innerHTML =
                `<label class="check__label">
                                <input type="checkbox" class="check__input has-value">
                                <span class="check__style"></span>
                                <span class="check__text">
                                    <span class="fw-600"></span>
                                </span>
                            </label>`
            const textElement = selectOrgComponent.querySelector(".fw-600");
            textElement.textContent = text;
            return selectOrgComponent;
        }
        this._selectOrgUserElement = (orgUser,loginInfo) => {
            /*if(Number(loginInfo.userKey) !== Number(orgUser.userKey))*/{
                const selectOrgUserComponent = document.createElement("li");
                selectOrgUserComponent.dataset.userKey = orgUser.userKey
                selectOrgUserComponent.dataset.userNm = orgUser.userNm
                selectOrgUserComponent.dataset.orgNmPath = orgUser.orgNmPath
                selectOrgUserComponent.dataset.thumbImgPath = orgUser.thumbImgPath
                selectOrgUserComponent.dataset.jobPosition = orgUser.jobPosition
                selectOrgUserComponent.dataset.jobResponsibility = orgUser.jobResponsibility

                selectOrgUserComponent.innerHTML =
                    `<label class="check__label">
                                <input type="checkbox" class="check__input has-value">
                                <span class="check__style"></span>
                                <span class="check__text">
                                    <!--<div class="userThumb is-state is-online is-small">--> <!--// 온라인 유무 알수 없다-->
                                    <div class="userThumb is-state is-small">
                                        <div class="userThumb__img">
                                            <img src="${orgUser.thumbImgPath}" alt="">
                                        </div>
                                    </div>
                                    <span>${orgUser.userNm}</span>
                                </span>
                            </label>`;
                return selectOrgUserComponent;
            }
        }

        this._inviteUserLi = (user) => {
            const selectOrgUserComponent = document.createElement("li");
            selectOrgUserComponent.classList.add("memberList__item");
            selectOrgUserComponent.dataset.userKey = user.userKey
            selectOrgUserComponent.dataset.userNm = user.userNm
            selectOrgUserComponent.dataset.orgNmPath = user.orgNmPath
            selectOrgUserComponent.dataset.thumbImgPath = user.thumbImgPath
            selectOrgUserComponent.dataset.jobResponsibility = user.jobResponsibility
            selectOrgUserComponent.innerHTML =
                `<div class="userThumb is-small is-none">
                                        <div class="userThumb__img">
                                            <img src=${user.thumbImgPath} alt="">
                                        </div>
                                    </div>
                                    <div class="memberList__profile">
                                        <div class="flex-vertical-center gap-8">
                                            <p>${user.userNm} ${user.jobResponsibility} </p>
                                            <button type="button" class="btn has-icon memberList__delete"><i class="icon is-14 is-close-14"></i></button>
                                        </div>
                                        <div class="memberList__tooltip orgList">
                                            ${user.orgNmPath.split('>').pop().trim()}
                                        <div class="memberList__tooltip__con" style="top: calc(496px); left: calc(955px);"></div></div>
                                    </div>`;
            return selectOrgUserComponent;
        }

        this._alreadyInviteUserLi = (user,loginInfo) => {
            const selectOrgUserComponent = document.createElement("li");
            selectOrgUserComponent.classList.add("memberList__item");
            selectOrgUserComponent.dataset.userKey = user.userKey
            selectOrgUserComponent.dataset.userNm = user.userNm
            selectOrgUserComponent.dataset.orgNmPath = user.orgNmPath
            selectOrgUserComponent.dataset.thumbImgPath = user.thumbImgPath
            selectOrgUserComponent.dataset.jobResponsibility = user.jobResponsibility

            if(loginInfo.userKey === user.userKey){
                selectOrgUserComponent.innerHTML =
                    `<div class="userThumb is-small is-mine">
                                        <div class="userThumb__img">
                                            <img src=${user.thumbImgPath} alt="">
                                        </div>
                                    </div>
                                    <div class="memberList__profile">
                                        <div class="flex-vertical-center gap-8">
                                            <p>${user.userNm} ${user.jobResponsibility} </p>
                                        </div>
                                        <div class="memberList__tooltip orgList">
                                             ${user.orgNmPath.split('>').pop().trim()}
                                        <div class="memberList__tooltip__con" style="top: calc(496px); left: calc(955px);"></div></div>
                                    </div>`;
            } else {
                selectOrgUserComponent.innerHTML =
                    `<div class="userThumb is-small is-none">
                                        <div class="userThumb__img">
                                            <img src=${user.thumbImgPath} alt="">
                                        </div>
                                    </div>
                                    <div class="memberList__profile">
                                        <div class="flex-vertical-center gap-8">
                                            <p>${user.userNm} ${user.jobResponsibility} </p>
                                            <button type="button" class="btn has-icon memberList__delete"><i class="icon is-14 is-close-14"></i></button>
                                        </div>
                                        <div class="memberList__tooltip orgList">
                                             ${user.orgNmPath.split('>').pop().trim()}
                                        <div class="memberList__tooltip__con" style="top: calc(496px); left: calc(955px);"></div></div>
                                    </div>`;
            }


            return selectOrgUserComponent;
        }

        this._defaultTreeTemplate = (tmpl, props) => {
            let internalNode =
                '<div class="tui-tree-content-wrapper">' +
                '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
                '<span class="tui-ico-tree"></span>' +
                props.stateLabel +
                '</button>' +
                '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '" ' +
                'data-id="' + props.groupId + '" ' +
                'data-orgCd="' + props.orgCd + '" ' +
                'data-upperOrgCd="' + props.upperOrgCd + '" ' +
                'data-text="' + props.text + '">' +
                props.text +
                '</div>'
                +
                '</div>' +
                '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
                props.children +
                '</ul>';

            let internalNode2 =
                '<div class="tui-tree-content-wrapper">' +
                '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
                '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '" ' +
                'data-id="' + props.groupId + '" ' +
                'data-orgCd="' + props.orgCd + '" ' +
                'data-upperOrgCd="' + props.upperOrgCd + '" ' +
                'data-text="' + props.text + '">' +
                '</div>' +
                '</div>';

            let leafNode =
                '<div class="tui-tree-content-wrapper" ' +
                'data-id="' + props.groupId + '" ' +
                'data-orgCd="' + props.orgCd + '" ' +
                'data-upperOrgCd="' + props.upperOrgCd + '" ' +
                'data-text="' + props.text +
                '">' +
                '<span class="tui-tree-ico tui-ico-line">' +
                '</span>' +
                '<span class="tui-tree-ico tui-ico-file"></span>' +
                props.text +
                '</div>' +
                '</div>';

            if (props.children) {
                return internalNode;
            } else if (props.isLeaf && props.noneChildren) {
                return internalNode2;
            } else if (props.isLeaf) {
                return leafNode;
            }
        }

        this._funcSettingList = (mainModal,orgUser) => {
            const handleCheckChange = (mainModal,checkElement) => {
                const checkElementLi = checkElement.closest('li');
                if (!checkElement.checked || !checkElementLi.dataset.userKey) return;

                const invitedUsers = mainModal.querySelector("#invitedUser").querySelectorAll('li');
                const isAlreadyInvited = Array.from(invitedUsers).some(invitedUser =>
                    invitedUser.dataset.userKey === checkElementLi.dataset.userKey);

                if (isAlreadyInvited) return;


                const alreadyInvitedUser = mainModal.querySelector("#alreadyInvitedUser");
                if(alreadyInvitedUser) {
                    const alreadyInvitedUsers = mainModal.querySelector("#alreadyInvitedUser").querySelectorAll('li');
                    const isAlreadyAlreadyInvited = Array.from(alreadyInvitedUsers).some(invitedUser =>
                        invitedUser.dataset.userKey === checkElementLi.dataset.userKey);
                    if (isAlreadyAlreadyInvited) return;
                }

                const inviteOrgUserComponent = this.inviteUserLi(checkElementLi.dataset);
                mainModal.querySelector("#invitedUser").appendChild(inviteOrgUserComponent);

                const element = mainModal.querySelector("#invitedUserCnt");
                element.textContent = Number(element.textContent) + 1;

                inviteOrgUserComponent.querySelector(".btn.has-icon.memberList__delete")
                    .addEventListener("click", () => {
                        inviteOrgUserComponent.remove();
                        element.textContent = Number(element.textContent) - 1;
                    });
            }

            const allCheckElementList = orgUser.querySelectorAll('.check__input');
            allCheckElementList.forEach(checkElement => {
                const checkEl = checkElement;
                checkElement.addEventListener('change', () => handleCheckChange(mainModal,checkEl));
            });

            const allCheck = orgUser.querySelector('.check__input');
            if (allCheck) {
                allCheck.addEventListener('click', function () {
                    const allCheckElements = orgUser.querySelectorAll('.check__input');
                    const isChecked = allCheck.checked;
                    allCheckElements.forEach(checkElement => {
                        checkElement.checked = isChecked;
                        handleCheckChange(mainModal,checkElement);
                    });
                });
            }
        }

        this._makeSelectOrgUser = (orgUser,orgCenter,companyOrgUser,mainModal,loginInfo) => {
            new Promise((resolve) => {
                orgUser.innerHTML = ''

                if(orgCenter.tagName === "LI"){
                    const selectLi = orgCenter.querySelector('.tui-tree-content-wrapper')
                    orgUser.appendChild(this.selectOrgElement(selectLi.dataset.text));
                    const currentOrgUsers = companyOrgUser.orgUserMap.get(Number(selectLi.dataset.id));
                    if(currentOrgUsers !== null && typeof currentOrgUsers !== "undefined"){
                        currentOrgUsers.forEach(currentOrgUser  => {
                            const addElement=this.selectOrgUserElement(currentOrgUser,loginInfo);
                            if(addElement){
                                orgUser.appendChild(addElement);
                            }
                        })
                    }
                } else {
                    orgUser.appendChild(this.selectOrgElement(orgCenter.dataset.text));
                    const currentOrgUsers = companyOrgUser.user.filter(u => u.orgCd === orgCenter.dataset.orgcd)
                    /*const currentOrgUsers = companyOrgUser.orgUserMap.get(Number(orgCenter.dataset.id));*/
                    if(currentOrgUsers !== null && typeof currentOrgUsers !== "undefined"){
                        currentOrgUsers.forEach(currentOrgUser  => {
                            const addElement=this.selectOrgUserElement(currentOrgUser,loginInfo);
                            if(addElement){
                                orgUser.appendChild(addElement);
                            }
                        })
                    }
                }
                resolve();
            })
                .then(() => {
                    this.funcSettingList(mainModal,orgUser);
                })
                .then(() => {
                    const funcInvitedUserCnt = () => {
                        const invitedUserCnt = mainModal.querySelector("#invitedUserCnt");
                        const invitedUser = mainModal.querySelector("#invitedUser");
                        invitedUserCnt.textContent = Number(invitedUser.querySelectorAll('li').length);
                    }
                    funcInvitedUserCnt();
                })
                .catch((error) => console.log(error));
        }


    }

    get defaultTreeTemplate() {
        return this._defaultTreeTemplate;
    }

    get selectOrgElement() {
        return this._selectOrgElement
    }

    get selectOrgUserElement() {
        return this._selectOrgUserElement
    }

    get inviteUserLi() {
        return this._inviteUserLi;
    }

    get alreadyInviteUserLi() {
        return this._alreadyInviteUserLi;
    }

    get existRoom() {
        return this._existRoom;
    }

    get confirmThirdTree() {
        return this._confirmThirdTree;
    }

    get funcSettingList() {
        return this._funcSettingList;
    }

    get makeSelectOrgUser(){
        return this._makeSelectOrgUser;
    }
}