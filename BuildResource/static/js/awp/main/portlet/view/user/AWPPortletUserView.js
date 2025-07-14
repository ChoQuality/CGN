class AWPPortletUserView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._applicationElement = null;
        this._contentsElement = null;
        this._confirmType = null;

    }

    showAlertModal(element, text){
        element.querySelector(".modal__contents").textContent = text;
        element.style.opacity  = "1";
        element.style.display  = "flex";
        element.style.visibility  = "visible";
    }

    hideAlertModal(element){
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
    }

    showConfirmModal(element, text){
        element.querySelector(".modal__contents").textContent = text;
        element.style.opacity  = "1";
        element.style.display  = "flex";
        element.style.visibility  = "visible";
    }

    hideConfirmModal(element){
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.opacity = "0";
    }

    /***********************************************************************************************************
    * 화면 초기화 설정
    ************************************************************************************************************/
    init(applicationElement){
        this._applicationElement = applicationElement;
        this._contentsElement = applicationElement.querySelector(".contents__inner");

        // 나의정보 수정
        this.drawMyInfoView();

        // 포틀릿 설정 화면 처리
        this.drawPortletSettingView();
    }

    // 나의 정보
    drawMyInfoView(){
        fetch(`/portlet/env/userInfo`, {method: "GET"})
            .then(response => response.text())
            .then(htmlString => this._contentsElement.innerHTML = this._func.parseData(htmlString))
            .then(() => {
                const confirmModalElement = document.querySelector("#confirmModal");
                const alertModalElement = document.querySelector("#alertModal");

                // 저장버튼 클릭시
                this._contentsElement.querySelector("#save").addEventListener("click", () => {
                    this._confirmType = "save";
                    this.showConfirmModal(confirmModalElement, ALERT_MESSAGES.A005);
                })

                // 취소버튼 클릭시
                this._contentsElement.querySelector("#cancel").addEventListener("click", () => {
                    this._confirmType = "cancel";
                    this.showConfirmModal(confirmModalElement, ALERT_MESSAGES.A004);
                })

                // confirmModal 취소버튼
                confirmModalElement.querySelector("#cancelBtn").addEventListener("click", () => {
                    this.hideConfirmModal(confirmModalElement);
                })

                // confirmModal 확인버튼
                confirmModalElement.querySelector("#confirmBtn").addEventListener("click", () => {
                    if(this._confirmType === "save"){ // 저장처리
                        const formData = new FormData();
                        const imageInput = document.querySelector("#imageInput");
                        const userInfo = {
                            userKey: this._loginInfo.userKey,
                            mobilePhoneNo: this._contentsElement.querySelector("#mobileNo").value,
                            officePhoneNo: this._contentsElement.querySelector("#officeNo").value
                        }
                        formData.append("userDto", new Blob([JSON.stringify(userInfo)], { type: "application/json" }));

                        if (imageInput.files.length > 0) {
                            for (const file of imageInput.files) {
                                formData.append("files", file);
                            }
                        }

                        portletApi.updateMyInfo(formData)
                            .then(response => console.log("성공!!"))
                            .then(() => this.hideConfirmModal(confirmModalElement))
                            //.then(() => location.href= "/")
                            .catch(error => this._func.showToastModal("나의 정보 업데이트 실패", error))
                    }else{
                        location.href = "/";
                    }

                })

                // 이미지 클릭시 파일 업로드 창 보이기
                this._contentsElement.querySelector(".userThumb").addEventListener("click", () =>{
                    this._contentsElement.querySelector("#imageInput").click();
                })

                // 이미지 썸네일 처리
                this._contentsElement.querySelector("#imageInput").addEventListener("change", (event) => {
                    const imageInput = document.querySelector("#imageInput");
                    const allowedExtensions = ['jpg', 'png', 'gif'];

                    const file = event.target.files[0]; // 선택한 파일 가져오기
                    if (!file) return; // 파일이 없으면 종료

                    if (!file.type.startsWith('image/')) {
                        this.showAlertModal(alertModalElement, ALERT_MESSAGES.A007);
                        return;
                    }

                    if (file.size > 600 * 1024) { // 600KB 제한
                        this.showAlertModal(alertModalElement, ALERT_MESSAGES.A006);
                        return;
                    }

                    const fileName = file.name;
                    const fileExtension = fileName.split('.').pop().toLowerCase();
                    if(!allowedExtensions.includes(fileExtension)){
                        this.showAlertModal(alertModalElement, ALERT_MESSAGES.A007);
                        imageInput.value = ''; // 입력된 파일 초기화
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.getElementById('thumbnail');
                        img.src = e.target.result; // 파일을 base64로 변환하여 이미지 src 설정
                    };
                    reader.readAsDataURL(file); // 파일을 읽고 base64로 변환
                })

                alertModalElement.querySelector(".btn").addEventListener("click", () => {
                    this.hideAlertModal(alertModalElement);
                })

            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    // 포틀릿 설정 화면 처리
    drawPortletSettingView(){
        const wrapper = this._applicationElement.querySelector('.wrapper');

        const envMainButtonEventHandler = () => {
            return fetch(`/portlet/env/portletSetting`, { method: "GET" })
                .then(response => response.text())
                .then(response => {
                    const jsonResponse = JSON.parse(response);
                    if(jsonResponse.code === 0 ){
                        return jsonResponse.data;
                    } else {
                        throw Error("Env Main Load Error");
                    }
                })
                .then(htmlString => {
                    wrapper.innerHTML = htmlString;
                    return null;
                })
                // 포틀릿 퍼블리싱된 스크립트 처리
                .then(() => {
                    this.portletDefaultEvent();
                    return null;
                })
                .then(() => {
                    const confirmModalElement = wrapper.querySelector("#confirmModal");

                    // 저장버튼 클릭시
                    wrapper.querySelector("#save").addEventListener("click", () => {
                        this._confirmType = "save";
                        this.showConfirmModal(confirmModalElement, ALERT_MESSAGES.A005);
                    })

                    // 취소버튼 클릭시
                    wrapper.querySelector("#cancel").addEventListener("click", () => {
                        this._confirmType = "cancel";
                        this.showConfirmModal(confirmModalElement, ALERT_MESSAGES.A004);
                    })

                    // confirmModal 취소버튼
                    confirmModalElement.querySelector("#cancelBtn").addEventListener("click", () => {
                        this.hideConfirmModal(confirmModalElement);
                    })

                    // confirmModal 확인
                    confirmModalElement.querySelector("#confirmBtn").addEventListener("click", () => {
                        if(this._confirmType === "save") { // 저장처
                            //저장 처리
                            const saveData = [];
                            document.querySelectorAll('.portlet__group').forEach(div => {
                                const portletId = div.getAttribute('data-portletid');
                                if(portletId !== null){
                                    const portletData = {
                                        portletId: portletId,
                                        userKey: this._loginInfo.userKey
                                    };
                                    saveData.push(portletData);
                                }
                            });

                            portletApi.setPortletList(saveData)
                                .then(response => console.log(response))
                                .then(() => this.hideConfirmModal(confirmModalElement))
                                .then(() => location.href = "/")
                                .catch(error => this._func.showToastModal("포틀릿 설정 정보 업데이트 실패", error));
                        }else{
                            location.href = "/";
                        }
                    })
                })
                .catch(error => this._func.showToastModal("에러 발생:", error));
        }
        const envMainButton= document.getElementById('isEnvMainButton');
        envMainButton.addEventListener('click',envMainButtonEventHandler)

    }

    // 포틀릿 퍼블리싱 스크립트 처리
    portletDefaultEvent(){
        let draggableSortable;

        // 빈 포틀릿 그룹의 HTML 생성
        function getEmptyPortletHTML() {
            return `<div class="inner"><img src="../../assets/images/portlet-empty.png" alt=""></div>`;
        }

        // Sortable 인스턴스 재생성을 위한 유틸 함수
        function reinitializeSortable() {
            if (draggableSortable) {
                draggableSortable.destroy();
                initDraggableSortable();
            }
        }

        // 포틀릿 삭제 함수: 삭제 시 빈 상태로 전환하고, 필요하면 후행 empty 그룹 생성
        function portletDelete(target) {
            const sidebarItems = document.querySelectorAll('.sidebar__menu li');
            const dataContent = target.getAttribute('data-content');

            // 대상 그룹을 빈 상태로 전환
            target.classList.add('is-empty');
            target.removeAttribute('data-content');
            target.removeAttribute('draggable');
            target.removeAttribute('data-portletid');
            target.innerHTML = getEmptyPortletHTML();

            // is-col-2인 경우, 후행 empty 그룹 생성 후 is-col-2 클래스 제거
            if (target.classList.contains('is-col-2')) {
                const afterGroup = document.createElement('div');
                afterGroup.className = 'portlet__group is-empty';
                afterGroup.innerHTML = getEmptyPortletHTML();
                target.classList.remove('is-col-2');
                target.after(afterGroup);
            }

            // 사이드바 메뉴에서 선택 상태 해제
            sidebarItems.forEach(li => {
                if (li.getAttribute('data-title') === dataContent) {
                    li.classList.remove('is-selected');
                }
            });

            console.log(target);
            reinitializeSortable();
        }

        // 포틀릿 hover 이벤트: 이벤트 위임으로 동적 요소에도 적용
        function setupPortletHoverDelegation() {
            const portlet = document.getElementById('portlet');
            if (!portlet) return;

            portlet.addEventListener('mouseover', function (e) {
                const group = e.target.closest('.portlet__group');
                if (!group) return;
                // 이미 dim이 있으면 추가하지 않음
                if (group.querySelector('.dim')) return;

                const dim = document.createElement('div');
                dim.className = 'dim';
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'btn has-icon';
                btn.innerHTML = '<i class="icon is-42 is-delete-42"></i>';
                dim.appendChild(btn);
                group.appendChild(dim);

                btn.onclick = () => portletDelete(group);
            });

            portlet.addEventListener('mouseout', function (e) {
                const group = e.target.closest('.portlet__group');
                if (!group) return;
                // 그룹 내부 이동이면 무시
                if (e.relatedTarget && group.contains(e.relatedTarget)) return;
                const dim = group.querySelector('.dim');
                if (dim) {
                    dim.remove();
                }
            });
        }

        // Sortable 인스턴스 생성 함수
        function initDraggableSortable() {
            draggableSortable = Sortable.create(document.getElementById('draggable'), {
                group: {
                    name: 'widgets',
                    pull: 'clone',  // 드래그 시 복제
                    put: false      // 사이드바로는 놓을 수 없음
                },
                sort: false,       // 사이드 메뉴 내 순서 변경 불필요
                filter: '.is-selected',
                onMove: function (evt, originalEvent) {
                    const col = evt.dragged.getAttribute('data-col');
                    // 실제 HTML 구조에 맞게 선택자 수정 (내부의 .inner 요소 선택)
                    const group = evt.to.closest('.portlet__group.is-empty .inner');

                    if (col == 2 && group && group.nextElementSibling) {
                        return false;
                    }

                    evt.dragged.innerHTML = '';
                    return true;
                },
                onEnd: function (evt) {
                    const group = evt.to.closest('.portlet__group');
                    const col = evt.item.getAttribute('data-col');
                    const title = evt.item.getAttribute('data-title');
                    const image = evt.item.getAttribute('data-image');
                    const portletId = evt.item.getAttribute('data-portletId');

                    if (group) {
                        const img = document.createElement('img');
                        img.setAttribute('src', image);

                        evt.clone.classList.add('is-selected');
                        group.classList.remove('is-empty');
                        group.setAttribute('data-content', title);
                        group.setAttribute('data-portletId', portletId);

                        if (col == 2) {
                            group.classList.add('is-col-2');

                            let targetToRemove = null;
                            // 우선적으로 인접한 next 요소가 is-empty인 경우
                            if (group.nextElementSibling && group.nextElementSibling.classList.contains('is-empty')) {
                                targetToRemove = group.nextElementSibling;
                            }
                            // next가 없으면 인접한 previous 요소가 is-empty인지 확인
                            else if (group.previousElementSibling && group.previousElementSibling.classList.contains('is-empty')) {
                                targetToRemove = group.previousElementSibling;
                            }
                            // 인접 요소가 없으면 전체 형제 요소에서 is-empty인 요소를 검색
                            else {
                                const siblings = Array.from(group.parentNode.children);
                                targetToRemove = siblings.find(el => el !== group && el.classList.contains('is-empty'));
                            }

                            if (targetToRemove) {
                                targetToRemove.remove();
                            } else {
                                // 조건 미충족 시 드랍 취소 처리
                                evt.clone.classList.remove('is-selected');
                                group.classList.add('is-empty');
                                group.classList.remove('is-col-2');
                                group.removeAttribute('data-content');
                                alert("드랍할 수 없습니다. 인접 혹은 형제 요소 중 is-empty를 가진 요소가 없습니다.");
                                return;
                            }
                        }

                        group.innerHTML = '';
                        group.appendChild(img);
                    }
                }
            });

            const targets = document.querySelectorAll('.portlet__group.is-empty .inner');
            targets.forEach(target => {
                Sortable.create(target, {
                    group: {
                        name: 'widgets', // 사이드바와 동일한 그룹 이름
                        pull: false,
                        put: true       // 다른 컨테이너(또는 사이드바)에서 가져온 위젯을 놓을 수 있음
                    },
                    animation: 150,
                    sort: true // 각 컬럼 내 위젯 순서 변경 가능
                });
            });

            Sortable.create(document.getElementById('portlet'), {
                group: {
                    pull: false,
                    put: false  // 사이드바로는 놓을 수 없음
                },
                sort: true
            });
        }

        const portletGroup = document.querySelectorAll('.portlet__group');
        portletGroup.forEach(group => {
            group.addEventListener('dragstart', () => {
                const img = group.querySelector('img');
                if (img) {
                    img.style.pointerEvents = 'none'; // 드래그 시 이미지가 이벤트를 막지 않도록 설정
                }
            });

            group.addEventListener('dragend', () => {
                const img = group.querySelector('img');
                if (img) {
                    img.style.pointerEvents = ''; // 드래그 종료 후 원래대로 복원
                }
            });
        });

        // 초기화: 이벤트 위임 및 Sortable 생성
        setupPortletHoverDelegation();
        initDraggableSortable();
    }

}
