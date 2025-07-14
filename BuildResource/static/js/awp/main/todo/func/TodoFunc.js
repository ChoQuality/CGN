class TodoFunc {
    constructor(companyOrgs, companyUsers) {
        this._orgList = companyOrgs;
        this._orgMap = this._setOrgMap(companyOrgs);
        this._companyUsers = companyUsers;

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
                this.showToastModal("JSON 파싱 오류:", error);
                return error;
            }
        }
        this._subOrgList = (orgCd)  => {
            let __orgList = [];
            let orgCdList = this._orgMap.get(orgCd).slice();
            const selectedOrgList = this._orgList;

            const funcRecursiveOrg = (orgChildrenList, _p_orgCdList) => {
                let _cur_orgCd = _p_orgCdList[0];
                orgChildrenList.forEach(childOrg => {
                    if( childOrg.orgCd == _cur_orgCd) {
                        orgCdList.shift();
                        if(orgCdList.length == 0) {
                            __orgList = childOrg.children.slice();
                        } else {
                            funcRecursiveOrg(childOrg.children, orgCdList);
                        }
                    }
                });
            }

            selectedOrgList.forEach(org => {
                let _cur_orgCd = orgCdList[0];
                if( org.orgCd == _cur_orgCd) {
                    orgCdList.shift();
                    if(orgCdList.length == 0) {
                        __orgList = org.children.slice();
                    } else {
                        funcRecursiveOrg(org.children, orgCdList);
                    }
                }
            });

            return __orgList;
        }
        this._getSubOrgDepth = (orgCd)  => {
            let childOrgDepth = 0;
            if (this._orgMap.get(orgCd) == null)
                return childOrgDepth;

            let orgCdList = this._orgMap.get(orgCd).slice();
            const selectedOrgList = this._orgList;

            const findDepthFuncRecursiveOrg = (orgChildrenList, _depth) => {
                orgChildrenList.forEach(childOrg => {
                    if(childOrg.children.length == 0 ) {
                        if(_depth > childOrgDepth) {
                            childOrgDepth = _depth;
                        }
                    } else {
                        findDepthFuncRecursiveOrg(childOrg.children, _depth + 1);
                    }
                });
            }

            const funcRecursiveOrg = (orgChildrenList, _p_orgCdList) => {
                let _cur_orgCd = _p_orgCdList[0];
                orgChildrenList.forEach(childOrg => {
                    if( childOrg.orgCd == _cur_orgCd) {
                        orgCdList.shift();
                        if(orgCdList.length == 0) {
                            if(childOrg.children.length == 0 ) {
                                childOrgDepth = 0;
                            } else {
                                findDepthFuncRecursiveOrg(childOrg.children, 1);
                            }
                        } else {
                            funcRecursiveOrg(childOrg.children, orgCdList);
                        }
                    }
                });
            }

            selectedOrgList.forEach(org => {
                let _cur_orgCd = orgCdList[0];
                if( org.orgCd == _cur_orgCd) {
                    orgCdList.shift();
                    if(orgCdList.length == 0) {
                        childOrgDepth = childOrgDepth;
                    } else {
                        funcRecursiveOrg(org.children, orgCdList);
                    }
                }
            });

            return childOrgDepth;
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
    }

    get parseData(){
        return this._parseData;
    }

    get makeLoginInfo(){
        return this._makeLoginInfo;
    }

    get getSubOrgList() {

        return this._subOrgList;
    }

    get getSubOrgDepth() {
        return this._getSubOrgDepth;
    }

    _setOrgMap = (orgs) => {
        const tempOrgMap = new Map();
        const funcRecursiveOrg_setUserMap = (org, orgCdList) => {
            const tempOrgList = [];
            for(var i=0; i<orgCdList.length; i++) {
                tempOrgList[i] = orgCdList[i];
            }
            tempOrgList.push(org.orgCd);
            tempOrgMap.set(org.orgCd, tempOrgList);

            if (org.children && org.children.length > 0) {
                org.children.forEach(childOrg => {
                    funcRecursiveOrg_setUserMap(childOrg, tempOrgList);
                });
            }
        }

        orgs.forEach(org => {
            const orgCdList = [];
            funcRecursiveOrg_setUserMap(org, orgCdList);
        });

        return tempOrgMap;
    }

    getSearchUserList(userNm, userId = null) {
        const searchUserList = [];
        this._companyUsers.forEach(userInfo  => {
            if(userNm !== '') {
                if(userInfo._userNm?.toUpperCase().includes(userNm)) {
                    searchUserList.push(userInfo);
                }
            } else if(userId != null ) {
                if(userInfo._userId?.toUpperCase().includes(userId)) {
                    searchUserList.push(userInfo);
                }
            }
        });

        return new Promise((resolve, reject) => {
            resolve(searchUserList);
        });

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

    showToastModal(text, err){
        const toast = document.querySelector(".toast");
        toast.querySelector(".toast__text").textContent = text + (err ?? '');

        toast.classList.add("is-active");
        setTimeout(() => {
            toast.classList.remove("is-active");
        }, 6000);
    }

    hideAlertModal(element){
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
    }

    showLoading(text){
        document.querySelector("#loadingText").textContent = text;
        document.querySelector(".contentsLoading").style.display = "block";
    }

    hideLoading(){
        document.querySelector(".contentsLoading").style.display = "none";
    }

    customConfirm(message) {
        return new Promise((resolve) => {

            const element = document.querySelector("#confirmModal");
            // 모달 표시
            element.querySelector(".modal__contents").textContent = message;
            element.style.opacity  = "1";
            element.style.display  = "flex";
            element.style.visibility  = "visible";

            // 버튼 이벤트 설정
            // 확인
            element.querySelector(".is-primary").addEventListener("click", () => {
                resolve(true);
                this.hideAlertModal(element);
            }, { once: true });
            // 취소
            element.querySelector(".is-secondary").addEventListener("click", () => {
                resolve(false);
                this.hideAlertModal(element);
            }, { once: true });
        });
    }

    searchInputCheck(){
        const selectedItem = document.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
        const searchText = document.querySelector('.form__search');

        if(selectedItem !== "all"){
            if(searchText.value === '' || searchText.value.length < 2){
                this.showAlertModal('2글자 이상 입력하세요.');
                return false;
            }
        }
        return true;
    }

    // 데이트 포멧 처리
    setDateFormat(ev){
        let inputDate = ev.target.value;

        // 숫자와 '-'만 남기기
        inputDate = inputDate.replace(/[^0-9-]/g, '');

        // YYYY-MM-DD 형식 적용
        if (inputDate.length > 4) inputDate = inputDate.replace(/(\d{4})(\d)/, '$1-$2');
        if (inputDate.length > 7) inputDate = inputDate.replace(/(\d{4}-\d{2})(\d)/, '$1-$2');

        // 최대 10자 제한 (YYYY-MM-DD)
        inputDate = inputDate.slice(0, 10);

        ev.target.value = inputDate;
    }

    changeTodoLoginStatus(userKey, loginStatus) {
        const elementList = document.querySelectorAll(".todoList__item");

        document.querySelectorAll(".todoList__item").forEach(todoItem => {
            const spanList = todoItem.querySelectorAll('span[user-key="' + userKey + '"]');
            spanList.forEach(span => {
                span.classList.value = ''; // 모든 클래스 제거
                span.classList.add('status');
                span.classList.add('is-gradient');

                switch (loginStatus) {
                    case 'LOGIN':
                        span.classList.add('is-online');
                        break;
                    case 'LOGOFF':
                        span.classList.add('is-offline');
                        break;
                    case 'AWAY':
                        span.classList.add('is-leftSeat');
                        break;
                    default:
                        span.classList.add('is-offline');
                }
            });
        });

    }


}