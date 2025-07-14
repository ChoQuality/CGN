class AWP {
    constructor() {
        this._loginInfo = null;
        this._messenger = null;
        this._todo = null;
        this._portlet = null;
        this._headerOrganization = null;
        this._func = new CommonFunc();
        this._msgFunc = new MsgFunc();
        this._todoFunc = null;

        this._companyOrgUser = null;
        this._companyUsers = null;
        this._companyOrgs = null;
    }

    get loginInfo() {
        return this._loginInfo;
    }

    get messenger() {
        return this._messenger;
    }

    init(htmlElement,todoType=null,portletType=null){
        return new Promise((resolve, reject) => {
            if(!htmlElement.dataset){
                reject("Data Empty")
            }

            resolve(htmlElement.dataset)
        })
            .then(dataset => {
                this._loginInfo = this._func.makeLoginInfo(dataset);
                if(todoType){
                    this._func.setSubmenuIsActive(document.querySelector(".subSidebar"));
                }
                return this._loginInfo
            })
            .then((loginInfo) => {
                const func = this._func;
                func.getUserList()
                    .then(userList => {
                        const companyUsers = [];
                        userList.forEach((user) => {
                            companyUsers.push(new CompanyUser(user));
                        });

                        this._companyUsers = companyUsers;
                    })
                    .then(() => {
                        return func.getOrgChart()
                            .then(list => {
                                const tempCompanyList = []
                                list.forEach(data => {
                                    tempCompanyList.push(new CompanyOrg(data));
                                })
                                return tempCompanyList;
                            })
                    })
                    .then((companyOrgs) => {
                        this._companyOrgs = companyOrgs;
                        this._companyOrgUser = new CompanyOrgUser(companyOrgs,this._companyUsers);

                        this._messenger = new AWPMessenger(this._msgFunc,new ToastFunc(),loginInfo,this._companyOrgUser,new AWPWebSocketClient());

                    })
                    .then(() => {
                        const userStatus = document.querySelector("#userStatus");
                        const userStatusElement = document.querySelector("#userStatusChange");

                        // 사용자 상태 업데이트 함수
                        const updateUserStatus = (status) => {
                            userStatus.classList.remove("is-online", "is-offline", "is-leftSeat");
                            if (status === "LOGIN") userStatus.classList.add("is-online");
                            else if (status === "LOGOFF") userStatus.classList.add("is-offline");
                            else if (status === "AWAY") userStatus.classList.add("is-leftSeat");
                        };

                        // 초기 로그인 상태 설정
                        const initializeUserStatus = () => {
                            const userData = { userKey: loginInfo.userKey };

                            func.getUserInfo(userData)
                                .then(response => {
                                    const loginData = response.data;
                                    updateUserStatus(loginData.loginStatus || "LOGIN"); // 기본값: LOGIN

                                    if(!loginData.isAdminYn) {
                                        const adminElement = document.querySelector("#adminLink");
                                        adminElement.style.display = "none";
                                    }

                                    loginInfo.orgCdPath = loginData.orgCdPath;

                                    // 겸직 정보 업데이트
                                    if(loginData.pluralJobList != null && loginData.pluralJobList.length > 0) {
                                        const headerPluralJobList = document.querySelector("#_headerPluralJobList");
                                        const originLI = `<li>
                                           <button type="button" class="btn" data-orgKey="${loginData.orgKey}" data-orgNm="${loginData.orgNm}">${loginData.userNm} <span class="text-blue-600">${loginData.orgNm}</span></button>
                                        </li>`;
                                        headerPluralJobList.innerHTML += originLI;
                                        for (const pluralJob of loginData.pluralJobList) {
                                            if( loginInfo.orgKey == pluralJob.orgKey) {
                                                loginInfo.orgCdPath = pluralJob.orgCdPath;
                                            }
                                            const newLi = `<li>
                                               <button type="button" class="btn" data-orgKey="${pluralJob.orgKey}" data-orgNm="${pluralJob.orgNm}">${loginData.userNm} <span class="text-blue-600">${pluralJob.orgNm}</span></button>
                                            </li>`;
                                            headerPluralJobList.innerHTML += newLi;
                                        }
                                    } else {
                                        const headerPluralJobInfo = document.querySelector("#_headerPluralJobInfo");
                                        headerPluralJobInfo.style.display = "none";
                                    }
                                    // 이벤트 리스너 등록
                                    document.querySelector("#_headerPluralJobList").querySelectorAll(".btn").forEach(button => {
                                        button.addEventListener("click", handleOrgKeyChange);
                                    });
                                })
                                .catch(error => this._func.showToastModal("로그인 상태 정보 조회 중 오류가 발생하였습니다.", error));
                        };

                        // 겸직 조직 정보 변경 이벤트 핸들러
                        const handleOrgKeyChange = (event) => {
                            const orgKey = event.currentTarget.getAttribute("data-orgKey");
                            const orgNm = event.currentTarget.getAttribute("data-orgNm");
                            const orgChangeData = { userKey: loginInfo.userKey, orgKey: orgKey, orgNm: orgNm  };

                            func._setChangeCookieOrgKey(orgChangeData)
                                .then(response => {
                                    if (response.code === 0) {
                                        location.reload();
                                    } else {
                                        func.showAlertModal("겸직 조직 정보 변경을 위한 쿠키 변경 중 오류가 발생하였습니다.");
                                    }
                                })
                                .catch(error => this._func.showToastModal("겸직 조직 정보 변경을 위한 쿠키 변경 중 오류가 발생하였습니다.", error));
                        };

                        // 로그인 상태 변경 이벤트 핸들러
                        const handleStatusChange = (event) => {
                            const status = event.currentTarget.getAttribute("data-value");
                            const statusData = { userKey: loginInfo.userKey, loginStatus: status };

                            func.setUserStatus(statusData)
                                .then(response => {
                                    if (response.code === 0) {
                                        updateUserStatus(status);
                                        document.querySelector("#isUserMenu").style.maxHeight = '0';
                                        document.querySelector("#isOpenStatusButton").classList.remove("is-active");

                                        if (this._todoFunc != null) {
                                            this._todoFunc.changeTodoLoginStatus(loginInfo.userKey, status);
                                        }
                                    } else {
                                        func.showAlertModal("로그인 상태 변경 중 오류가 발생하였습니다. 잠시 후 다시 시도하세요.");
                                    }
                                })
                                .catch(error => this._func.showToastModal("사용자 로그인 상태 업데이트 중 오류가 발생하였습니다.", error));
                        };

                        // 이벤트 리스너 등록
                        userStatusElement.querySelectorAll(".btn").forEach(button => {
                            button.addEventListener("click", handleStatusChange);
                        });

                        // 초기 실행
                        initializeUserStatus();
                    })
                    .then(() => {
                        this.setDefaultChannelConnect(todoType,portletType)
                    })

                    .then(() => {
                        if(todoType){
                            // TODO 관련
                            this._todoFunc = new TodoFunc(this._companyOrgs, this._companyUsers);
                            this._todo = new AWPTodo(this._todoFunc,loginInfo, this._messenger);
                            const applicationElement=document.getElementById('app');
                            this.setTodoView(applicationElement,todoType);
                        }
                    })
                    .then(() => {
                        if(portletType){
                            // 포틀릿 관련
                            this._portlet = new AWPPortlet(new PortletFunc(this._companyOrgs),loginInfo,this._messenger);
                            const applicationElement=document.getElementById('app');
                            this.setPortletView(applicationElement,portletType);
                        }
                    })
                    .then(() => {
                        //조직도
                        this._headerOrganization = new AWPHeaderOrganization(func, loginInfo, this._companyOrgs, this._companyUsers);
                        const orgModal = document.querySelector('#orgModal');
                        this.setHeaderOrganization(orgModal);
                    })
                    .then(() => {
                        if(todoType === null && portletType === null){
                            // MESSENGER 관련
                            const applicationElement=document.getElementById('app');
                            const subViewElement = document.querySelector('.messageList');
                            const contentViewElement = document.querySelector('.messenger');
                            this.setMessengerView(applicationElement,subViewElement,contentViewElement);
                        }
                    })
                    .then(() => {
                        this.completeLoading()
                    })
            })
            .catch(reason => console.log(reason))

    }
    setDefaultChannelConnect(todoType,portletType){
        if(this._messenger != null){
            const messenger = this._messenger;
            const webSocketClient = this._messenger.webSocketClient;
            webSocketClient
                .connect()
                .then(() => {
                    messenger.message.subscribeList(messenger);
                })
                .then(() => {
                    messenger.message.subscribeRoomDetail(messenger);
                })
                .catch(() => location.reload())
        }
    }
    setMessengerView(applicationElement,subViewElement,contentViewElement){
            this._messenger.view.makeView(applicationElement,subViewElement,contentViewElement)
    }

    setTodoView(applicationElement,type){
        this._todo.view.makeView(applicationElement,type)
    }

    setPortletView(applicationElement,type){
        this._portlet.view.makeView(applicationElement,type)
    }

    completeLoading(){
        this._func.completeLoading();
    }

    setHeaderOrganization(orgModal) {
        this._headerOrganization.init(orgModal);

        const headerElement = document.querySelector('.header').querySelector('.header__breadcrumbs');
        const modalOpen = headerElement.querySelectorAll('[data-function="modal"]');
        modalOpen.forEach( (openBtn) =>  {
            openBtn.addEventListener("click", (e) => {
                e.preventDefault();
                const modalHref = e.target.getAttribute("data-target");
                const target = document.querySelector(modalHref);
                target.style.opacity = 1;
                target.style.filter = "alpha(opacity=0)";
                target.style.display = "flex";
                target.style.visibility = "visible";

                this._headerOrganization.clearData();
                const modalClose = target.querySelectorAll('[data-function="modalClose"]');
                modalClose.forEach(function (closeBtn) {
                    closeBtn.addEventListener("click", function (e) {
                        e.preventDefault();
                        this.closest('.modal').style.opacity = 0;
                        this.closest('.modal').style.filter = "alpha(opacity=0)";
                        this.closest('.modal').style.display = "none";
                        this.closest('.modal').style.visibility = "hidden";
                    }, { once: true });
                });
            });
        });
    }
}
