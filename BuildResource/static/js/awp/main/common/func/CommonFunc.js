class CommonFunc {
    constructor() {
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
            );
        };

        this._completeLoading = () => {
            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.classList.add("hidden");
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

        this._getUserList = () =>{
            return fetch('/api/home/getUserList', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.text())
                .then(response => this._parseData(response))
        }

        this._getOrgChart = () => {
            return fetch('/api/home/getOrgChart', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })
                .then(response => response.text())
                .then(response => this._parseData(response))
        }

        this._getUserInfo = (userData) => {
            return fetch('/api/home/getUserInfo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })
                .then(response => response.json())
                .catch(error => { throw error; });
        }

        this._setUserStatus = (statusData) => {
            return fetch('/api/home/changeStatus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(statusData),
            })
                .then(response => response.json())
                .catch(error => { throw error; });
        }

        this._setChangeCookieOrgKey = (changeCookieOrgData) => {
            return fetch('/api/home/changeCookieOrgKey', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(changeCookieOrgData),
            })
                .then(response => response.json())
                .catch(error => { throw error; });
        }

    }

    get makeLoginInfo(){
        return this._makeLoginInfo;
    }
    get completeLoading() {
        return this._completeLoading;
    }
    get parseData(){
        return this._parseData
    }
    get getUserList(){
        return this._getUserList;
    }
    get getOrgChart(){
        return this._getOrgChart;
    }
    getUserInfo(userData) {
        return this._getUserInfo(userData);
    }
    setUserStatus(statusData){
        return this._setUserStatus(statusData);
    }

    showAlertModal(text, element = document.querySelector("#alertModal")){
        element.querySelector(".modal__contents").textContent = text;
        element.style.opacity  = "1";
        element.style.display  = "flex";
        element.style.visibility  = "visible";

        element.querySelector(".btn").addEventListener("click", () => {
            this.hideAlertModal(element);
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

    setSubmenuIsActive(element) {
        // 서브 메뉴 타이틀 및 isActive 설정.
        const subMenuList = element.querySelectorAll(".pageMenu__item");
        const currentPath = window.location.pathname;

        subMenuList.forEach(function (menuElement) {
            // 각 요소의 dataset 속성 값 가져오기
            const menuPath = menuElement.dataset.menupath;
            const titlenm = menuElement.dataset.titlenm;
            const menuType = menuElement.dataset.menutype;
            const icoPath = menuElement.dataset.icopath;

            if(menuPath == currentPath) {
                 if(menuType == 'P') {
                    menuElement.classList.add("is-active");
                    const subSidebar__title = element.querySelector(".subSidebar__title");
                    subSidebar__title.querySelector(".title").innerText = titlenm;
                    subSidebar__title.querySelector("i").classList.add(icoPath);
                 }
            }
        });
    }
}