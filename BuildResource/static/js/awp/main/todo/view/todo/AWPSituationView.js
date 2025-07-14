class AWPSituationView {
    constructor(func, loginInfo) {
        this._func = func;
        this._loginInfo = loginInfo;

        this._applicationElement = null
        this._subViewElement = null
        this._contentViewElement = null;

        this._multiUploader;

        this._slideOpenYn = false;
        this._alertModalElement = document.querySelector("#alertModal");

        this.url = new URL(window.location.href);
        this.params = new URLSearchParams(this.url.search);
    }

    getParam(name) {
        return this.params.get(name);
    }

    init(applicationElement){

        this._applicationElement = applicationElement;
        //그다음 화면 그리는 액션 추가 해주세요.
        // ToDO 현황 조회 조건
        this._listSearch = this._applicationElement.querySelector('.listSearch');
        // ToDO 조회 옵션 1 ( 완료된 Todo 보지 않기 등)
        //this._todoViewOption1 = this._applicationElement.querySelector('.listSearch');
        this._todoDetailElement = this._applicationElement.querySelector('#todoDetailDiv');
        // ToDO 조회 옵션 2 ( 조회순서(마감일순/진척율순) ,  내 Todo, 요청한 To DO)
        this._todoViewOption2 = this._applicationElement.querySelector('.todoList__top');
        // Todo 목록 조회
        this._todoListElement = this._applicationElement.querySelector('.todoList__body');
        // 조회 조건 업무기간 조회
        this.setDatePicker();

        this._listSearch.querySelector('.form__search').addEventListener("keyup", (e) => {
            //if(e.target.value.length >= 2) {
                if (e.key === 'Enter' ) {
                    this.insertTodoList(1);
                }
            // }
        });

        // 파라미터에 todo-ID 지정하여 link 넘어온 경우 처리.
        const todoParamId = this.getParam('todoId'); // Replace 'paramName' with the actual parameter name
        if(todoParamId == null || todoParamId == '') {
            // 조회조건 등록.
             this.setSelectBox('');
        } else {
            // 조회조건 등록.
            this._applicationElement.querySelector('#isNotViewCompleteYn').checked = false;
            this.setSelectBox(todoParamId);
        }

        this.insertTodoList(1);

        // 완료된 Todo 보지 않기
        this._applicationElement.querySelector('#isNotViewCompleteYn').addEventListener("change", () => {
            this.insertTodoList(1);
        });
        // 내 Todo
        this._applicationElement.querySelector('#isMyTodoYn').addEventListener("change", () => {
            this.insertTodoList(1);
        });
        // 요청한 Todo
        this._applicationElement.querySelector('#isRequestTodoYn').addEventListener("change", () => {
            this.insertTodoList(1);
        });

        // 마감일순 진척율 순.
        this._applicationElement.querySelectorAll('input[name="searchOrder"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                this.insertTodoList(1);
            });
        });

        this._applicationElement.querySelector('#btnRegistTodo').addEventListener("click", () => {
            this.setNewAWPTodoDetail();
        });
        this._todoDetailElement.querySelector('#__deleteTodo').addEventListener("click", () => {
            this.deleteTodo();
        });
        this._todoDetailElement.querySelector('#__cancelTodo').addEventListener("click", () => {
//            this.slideClose(this._todoDetailElement);
            this.cancelTodo();
        });
        this._todoDetailElement.querySelector('#__saveTodo').addEventListener("click", (e) => {
            if(e.target.textContent == '저장') {
                this.saveTodo(false);
            } else {
                // 재요청
                this.saveTodo(true);
            }

        });
        this._todoDetailElement.querySelector('#__searchUserList').addEventListener("keyup", (e) => {
            if (e.key === 'Enter' ) {
                // 만약 목록이 1개라면 맨위 선택
                const searchUserList = this._todoDetailElement.querySelector('.formSearch__list').querySelectorAll('a.item');
                if(searchUserList.length != 0) {
                    const repUserSearch = searchUserList[0];

                    const {userkey,usernm,orgnm,email}=repUserSearch.dataset;
                    this.addTodoRepUser(userkey, usernm, orgnm);
                    this._todoDetailElement.querySelector('.formSearch__list').innerHTML = "";
                    this._todoDetailElement.querySelector('#__searchUserList').value = "";
                }

            } else if(e.target.value.length >= 1) {
                this.getRepUserList(e.target.value);
            } else {
                this._todoDetailElement.querySelector('.formSearch__list').innerHTML = "";
                this._todoDetailElement.querySelector('#__searchUserList').value = "";
            }
        });
        this._todoDetailElement.querySelector('#__memoText').addEventListener("keyup", (e) => {
            if (e.key === 'Enter' ) {
                if(e.shiftKey) {
                    console.log("Shift Enter!!");
                } else {
                    const inputValue = e.target.value.trim();
                    if ( inputValue == null || inputValue == ""){
                        console.log("Memo contents empty");
                        e.target.value = '';
                    } else {
                        this.addTodoDetailMemo(null, inputValue, this._loginInfo.userNm, this._loginInfo.orgNm, this._loginInfo.userKey, "");
                        e.target.value = '';
                    }
                }
            }
        });

        this.inputValueCheck_number(this._todoDetailElement.querySelector('#__completeRatio'));

        // this.modalPopup();
    }

    inputValueCheck_number(item) {
        item.addEventListener("blur", () => {
            if (item.value.trim() === "" || isNaN(item.value)) {
                item.classList.add('is-error');
                this._func.showToastModal (ALERT_MESSAGES.A013);
                item.focus();
            } else  if (item.value > 100 ) {
                item.classList.add('is-error');
                this._func.showToastModal (ALERT_MESSAGES.A054);
                item.focus();
            }  else  {
                item.classList.remove('is-error');
            }
        });
    }

    // selectBox 이벤트 등록
    setSelectBox(_todoId) {
        const selectBox = new SelectBox('.listSearchSelect', {
            data: [{label: '전체', value: 'ALL'},
             {label: '업무명', value: 'todoReqConts'},
             {label: '담당자명', value: 'repUserNm'},
             {label: '요청자명', value: 'reqUserNm'},
             {label: '메모', value: 'memoConts'},
             {label: '파일명', value: 'fileNm'},
             {label: 'TODO-ID', value: 'todoId'},
             ],
            showIcon: true,
        });
        if(_todoId != '') {
            selectBox.select('todoId');
            this._applicationElement.querySelector(".form__search").value = _todoId;
        }


        this._applicationElement.querySelector(".form__searchBtn").addEventListener("click", () =>  {
            this.insertTodoList(1);
        });
    }

    // datePicker 이벤트 등록
    setDatePicker(){
        let today = new Date();
        const startDate  = new Date();
        startDate.setDate(today.getDate() - 7);
        new DatePicker.createRangePicker({
            startpicker: {date: null, input: '#search__startInput', container: '#search__startCal',},
            endpicker: {date: null, input: '#search__endInput', container: '#search__endCal',},
            format: 'YYYY-MM-dd',
            language: 'ko',
            selectableRanges: [[new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()), new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())]],
        });
    }

    // Slide Toggle ( AWPTodo 등록하기 )
    slideOpen = (element, duration = 300) => {
        this._slideOpenYn = false;
        element.style.removeProperty("display");
        let height = element.scrollHeight + "px";
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
        element.style.maxHeight = "0px";
        element.style.opacity = "0";

        setTimeout(() => {
            element.style.maxHeight = height;
            element.style.opacity = "1";
        }, 10);
    };

    slideClose = (element, duration = 300) => {
        this._slideOpenYn = true;
        element.style.maxHeight = element.scrollHeight + "px";
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.maxHeight = "0px";
            element.style.opacity = "0";
        }, 10);
    };

    slideToggle = (element, duration = 300) => {
        if (window.getComputedStyle(element).maxHeight === "0px" || element.style.opacity === "0") {
            // this.slideOpen(element, duration);
             this.fadeIn(this._todoDetailElement, duration);
        } else {
            this.slideClose(element, duration);
        }
    };

    fadeIn = (elem, ms) => {
        if (!elem) return;
        elem.style.opacity = 0;
        elem.style.filter = "alpha(opacity=0)";
        elem.style.display = "flex";
        elem.style.visibility = "visible";

        if (ms) {
            var opacity = 0;
            var timer = setInterval(function () {
                opacity += 50 / ms;
                if (opacity >= 1) {
                    clearInterval(timer);
                    opacity = 1;
                }
                elem.style.opacity = opacity;
                elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
            }, 50);
        } else {
            elem.style.opacity = 1;
            elem.style.filter = "alpha(opacity=1)";
        }
    }

    fadeOut = (elem, ms) => {
        if (!elem) return;
        if (ms) {
            var opacity = 1;
            var timer = setInterval(function () {
                opacity -= 50 / ms;
                if (opacity <= 0) {
                    clearInterval(timer);
                    opacity = 0;
                    elem.style.display = "none";
                    elem.style.visibility = "hidden";
                }
                elem.style.opacity = opacity;
                elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
            }, 50);
        } else {
            elem.style.opacity = 0;
            elem.style.filter = "alpha(opacity=0)";
            elem.style.display = "none";
            elem.style.visibility = "hidden";
        }
    }
    addTodoDetailMemo = (memoId, memoConts, addMemoUserNm, addMemoOrgNm, addMemoCreateKey, addMemoCreateDt) => {
        const todoDetailMemoList = this._todoDetailElement.querySelector('.memoList');
        todoDetailMemoList.insertAdjacentHTML("afterbegin",
        `<li class="memoList__item">
            <div class="todoMemo">
                <input type="hidden" name="__memoId" value="${memoId}">
                <input type="hidden" name="__createUserKey" value="${addMemoCreateKey}">
                <input type="hidden" name="__memoConts" value="${memoConts}">
                <p>${memoConts}</p>
                <div class="writer">
                    ${addMemoUserNm} ${addMemoOrgNm} ${addMemoCreateDt}
                    <button type="button" class="btn has-icon"><i class="icon is-18 is-delete-16"></i></button>
                </div>
            </div>
        </li>
        `);
        todoDetailMemoList.querySelector('.memoList__item .todoMemo .writer .btn').addEventListener("click", (event) => {
            this.deleteMemo(event);
        });
    }

    deleteMemo = (event) => {
        const __memoContents = event.target.closest(".memoList__item").querySelector('.todoMemo p');
        const __createUserKey = event.target.closest(".memoList__item").querySelector('[name="__createUserKey"]').value;
        if(__createUserKey != this._loginInfo.userKey) {
            this._func.showAlertModal(ALERT_MESSAGES.A046);
            return;
        }

        console.log(" Delete Memo : " + __memoContents.innerText + " by : " + __createUserKey);

        event.target.closest(".memoList__item").remove();
    }

    clearAllMemo = () => {
        // this._todoDetailElement.querySelector('#__todoDetailAddUser').
        const todoDetailMemoList = this._todoDetailElement.querySelector('.memoList');

        const _memoList = todoDetailMemoList.querySelectorAll('.memoList__item');
        _memoList.forEach((memoItem) => {
            memoItem.remove();
        });
    }


    addTodoDetailUploadedFile = (fileId, fileName, fileSize, downloadUrl) => {
        let displayFileSize = "";

        displayFileSize =  (fileSize / (1024 * 1024)).toFixed(2) + " MB";

        const todoDetailFileList = this._todoDetailElement.querySelector('.uploadList').querySelector('.fileUploadMultiple__list');
        todoDetailFileList.insertAdjacentHTML("afterbegin",
        `<li class="fileUploadMultiple__item">
             <input type="hidden" name="__fileId" value="${fileId}">
             <div class="is-item is-flex-grow"><a href="${downloadUrl}"><label>${fileName}</label></a></div>
             <div class="is-item is-file">${displayFileSize}</div>
             <div class="is-item is-delete fileUploadMultiple__delete" data-size="${fileSize}"><button class="btn has-icon"><i class="icon is-24 is-wastebasket-24"></i></button></div>
         </li>
        `);
        todoDetailFileList.querySelector('.fileUploadMultiple__delete').addEventListener("click", (event) => {
            const dataset = event.currentTarget.dataset;

            console.log("dataSet = " + dataset)
            this._multiUploader.deleteAsisFile(parseInt(dataset.size));
            this.deleteUploadedFile(event);
        });
    }

    deleteUploadedFile = (event) => {
        const __uploadFile = event.target.closest(".fileUploadMultiple__item").querySelector('.is-flex-grow label');
        console.log(" Delete File : " + __uploadFile.innerText);

        event.target.closest(".fileUploadMultiple__item").remove();
    }

    clearAllUploadedFile = () => {
        // this._todoDetailElement.querySelector('#__todoDetailAddUser').

        if(this._todoDetailElement.querySelector(".file__input") !== undefined ) {
            let fileInput = this._todoDetailElement.querySelector(".file__input");
            let newInput = fileInput.cloneNode(true);
            fileInput.parentNode.replaceChild(newInput, fileInput);

            // this._todoDetailElement.querySelector(".file__input") = "";
        }

        const todoUploadedFileList = this._todoDetailElement.querySelectorAll('.fileUploadMultiple__list');
        todoUploadedFileList.forEach((uploadList) => {
            const _fileList = uploadList.querySelectorAll('.fileUploadMultiple__item');
            _fileList.forEach((fileItem) => {
                fileItem.remove();
            });
        });

    }

    addTodoRepUser = (repUserKey, repUserNm, repOrgNm, deleteUseYn = true) => {
        this.clearAllRepUser();

        const todoDetailRepUser = this._todoDetailElement.querySelector('#__repUser');
        todoDetailRepUser.insertAdjacentHTML("afterbegin",
        `
            <div class="inputSearch__value" id="__repUser">
                <input type="hidden" id="__repUserKey" value="${repUserKey}">
                <p>${repUserNm} <span class="text-blue-600">${repOrgNm}</span></p>
                <button type="button" class="btn has-icon"><i class="icon is-20 is-clear-20"></i></button>
            </div>
        `);
        todoDetailRepUser.querySelector('.inputSearch__value .btn').addEventListener("click", (event) => {
            if(deleteUseYn) {
                this.deleteRepUser(event);
            } else {
                this._func.showToastModal ('담당자를 삭제할 수 없습니다.');
                // alert("담당자를 삭제할 수 없습니다.");
            }
        });

    }
    deleteRepUser = (event) => {
        const __RepUserNm = event.target.closest(".inputSearch__value").querySelector('span');
        console.log(" Delete RepUser : " + __RepUserNm.innerText);
        event.target.closest(".inputSearch__value").remove();
    }

    clearAllRepUser = () => {
        const todoDetailRepUser = this._todoDetailElement.querySelector('#__repUser');

        const _repUserList = todoDetailRepUser.querySelectorAll('.inputSearch__value');
        _repUserList.forEach((repUser) => {
            repUser.remove();
        });
    }

    clickRepUser = (event) => {
        console.log("clickRepUser");
    }

    getRepUserList = (userNm) => {
        if(userNm.lenght < 1) return;
        return this._func.getSearchUserList(userNm)
            .then(response => {
                const _formUserSearchList = this._todoDetailElement.querySelector('.formSearch__list');
                _formUserSearchList.innerHTML = "";
                response.forEach((userInfo) => {
                    _formUserSearchList.insertAdjacentHTML("beforeend",
                        `<a href="javascript:void(0)" class="item" data-userKey="${userInfo.userKey}" data-userNm="${userInfo.userNm}" data-orgNm="${userInfo.orgNm}">
                            ${userInfo.userNm} ${userInfo.orgNm}
                            <span class="text-gray-500">${userInfo.email}</span>
                        </a>`);
                });
            })
            .then( () => {
                const repUser__List = this._todoDetailElement.querySelector('.formSearch__list').querySelectorAll('a.item');
                const repUserSearchEventHandler = (repUserSearch) => {
                    const {userkey,usernm,orgnm,email}=repUserSearch.dataset;
                    this.addTodoRepUser(userkey, usernm, orgnm);
                    this._todoDetailElement.querySelector('.formSearch__list').innerHTML = "";
                    this._todoDetailElement.querySelector('#__searchUserList').value = "";
                };

                repUser__List.forEach((a_link) => {
                    a_link.addEventListener("click", () => repUserSearchEventHandler(a_link) );
                });
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    cancelTodo = async () => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A004);
        if (result) {
            console.log("cancelTodo");
        } else {
            return;
        }

        this._todoDetailElement.querySelector('[data-function="modalClose"]').click();
    }

    deleteTodo = async () => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A014);
        if (result) {
            console.log("deleteTodo");
        } else {
            return;
        }

        const todoId = this._todoDetailElement.querySelector('#__todoId').value;
        todoSituationApi.deleteTodo(todoId)
                        .then(response => {
                            this.sendAlarmList (response.data.alarmList);
                            //this.slideClose(this._todoDetailElement);

                            this._todoDetailElement.querySelector('[data-function="modalClose"]').click();
                            this.insertTodoList(1);
                        })
                        .catch(error => this._func.showToastModal("TODO 삭제 중 오류가 발생하였습니다.", error))
    }

    saveTodo = async (reRequestYn = false) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A005);
        if (result) {
            console.log("saveTodo");
        } else {
            return;
        }

        const memoList = [];
        const _memoList = this._todoDetailElement.querySelector('.memoList').querySelectorAll('.memoList__item');
        _memoList.forEach((memoItem) => {
            memoList.push( {
                "memoId": memoItem.querySelector('input[name=__memoId]').value,
                "createUserKey": memoItem.querySelector('input[name=__createUserKey]').value,
                "memoConts" : memoItem.querySelector('input[name=__memoConts]').value
                }
            )
        });
        const memoText = this._todoDetailElement.querySelector('#__memoText').value.trim();
        if(memoText != '') {
            memoList.push( {
                "memoId": '',
                "createUserKey": this._loginInfo.userKey,
                "memoConts" : memoText
                }
            )
        }

        const reqUserList = [];
        const _requUserList = this._todoDetailElement.querySelectorAll('.inputSearch__value');
        _requUserList.forEach((reqUserItem) => {
            reqUserList.push({
                "repUserKey": reqUserItem.querySelector('#__repUserKey').value,
                }
            )
        });

        const todoFileList = [];
        const _todoFileIdList = this._todoDetailElement.querySelectorAll('[name="__fileId"]');
        _todoFileIdList.forEach((todoFileId) => {
            todoFileList.push({
                "fileId": todoFileId.value,
                }
            )
        });

        const completeRatio = this._todoDetailElement.querySelector('#__completeRatio').value;
        if ( ! /^\d+$/.test(completeRatio)) { // 숫자만 있는지 체크
          this._func.showAlertModal(ALERT_MESSAGES.A013, () => { this._todoDetailElement.querySelector('#__completeRatio').focus(); } );
          return;
        }

        if ( parseInt(completeRatio) > 100 || parseInt(completeRatio) < 0 ) { // 숫자만 있는지 체크
          this._func.showAlertModal(ALERT_MESSAGES.A054, () => { this._todoDetailElement.querySelector('#__completeRatio').focus(); } );
          return;
        }

        const saveTodoDto = {
            todoId: this._todoDetailElement.querySelector('#__todoId').value,
            reqUserKey: this._todoDetailElement.querySelector('#__reqUserKey').value,
            jobStartDt: this._todoDetailElement.querySelector('#__jobStartDt').value,
            jobEndDt: this._todoDetailElement.querySelector('#__jobEndDt').value,
            completeRatio: this._todoDetailElement.querySelector('#__completeRatio').value,
            importantYn: this._todoDetailElement.querySelector('#__importantYn').checked ? "1" : "0",
            privateYn: this._todoDetailElement.querySelector('#__privateYn').checked ? "1" : "0",
            todoReqConts: this._todoDetailElement.querySelector('#__todoReqConts').value,
            todoFlag: "",
            repUserList: reqUserList,
            todoFileList: todoFileList,
            todoMemoList: memoList,
            files: null
        }

        if ( saveTodoDto.jobEndDt == '') { // 숫자만 있는지 체크
          this._func.showAlertModal(ALERT_MESSAGES.A017, () => { this._todoDetailElement.querySelector('#__jobEndDt').focus(); } );
          return;
        }

        if ( saveTodoDto.todoReqConts.length > 50) { // 50자 까지만 작성 가능.
          this._func.showAlertModal(ALERT_MESSAGES.A012, () => { this._todoDetailElement.querySelector('#__todoReqConts').focus(); } );
          return;
        }

        if ( saveTodoDto.todoReqConts == '') { // TODO 제목이 없으면 안됨.
          this._func.showAlertModal(ALERT_MESSAGES.A016, () => { this._todoDetailElement.querySelector('#__todoReqConts').focus(); } );
          return;
        }

        const fileInput = this._todoDetailElement.querySelector(".file__input"); // 파일 입력 필드

        // FormData 객체 생성
        const formData = new FormData();

        // 파일 여러 개 추가
        // 선택된 파일이 있을 경우에만 추가
        if (fileInput.files.length > 0) {
            for (let file of fileInput.files) {
                formData.append("files", file);
            }
        }

        formData.append("todoDto", new Blob([JSON.stringify(saveTodoDto)], { type: "application/json" }));

        if(this._todoDetailElement.querySelector('#__todoId').value == null || this._todoDetailElement.querySelector('#__todoId').value == "") {
            todoSituationApi.registTodoDetail(formData)
                .then(response => {
                    console.log(response.data);
//                    this.slideClose(this._todoDetailElement);
                    this._todoDetailElement.querySelector('[data-function="modalClose"]').click();
                    this.sendAlarmList (response.data.alarmList);

                    this.insertTodoList(1);
                })
                .catch(error => this._func.showToastModal("TODO 등록 중 오류가 발생하였습니다..", error))
        } else {
            if(this._todoDetailElement.querySelector('#__todoStatus').value == 'R' && saveTodoDto.reqUserKey == this._loginInfo.userKey) {
                todoSituationApi.reRequestTodo(formData)
                    .then(response => {
                        console.log(response.data);

                        this.sendAlarmList (response.data.alarmList);
                        //this.slideClose(this._todoDetailElement);
                        this._todoDetailElement.querySelector('[data-function="modalClose"]').click();
                        this.insertTodoList(1);
                    })
                    .catch(error => this._func.showToastModal("TODO 재요청 중 오류가 발생하였습니다.", error))
            } else {
                todoSituationApi.updateTodoDetail(formData)
                    .then(response => {
                        console.log(response.data);

                        this.sendAlarmList (response.data.alarmList);
                        // this.slideClose(this._todoDetailElement);
                        this._todoDetailElement.querySelector('[data-function="modalClose"]').click();

                        this.insertTodoList(1);
                    })
                    .catch(error => this._func.showToastModal("TODO 수정 중 오류가 발생하였습니다.", error))
            }

        }

    }

    insertTodoList(index) {
        const workFromDt = this._listSearch.querySelector('#search__startInput').value;
        const workToDt = this._listSearch.querySelector('#search__endInput').value;
        const searchType = this._listSearch.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
        const searchConts = this._listSearch.querySelector('.form__search').value;

        const isNotViewCompleteYn = this._applicationElement.querySelector('#isNotViewCompleteYn').checked;
        const searchOrder = this._todoViewOption2.querySelector('input[name="searchOrder"]:checked').value;
        const isMyTodoYn = this._todoViewOption2.querySelector('#isMyTodoYn').checked;
        const isRequestTodoYn = this._todoViewOption2.querySelector('#isRequestTodoYn').checked;
//        if(isMyTodoYn == false && isRequestTodoYn == false) {
//            this._func.showAlertModal("내 ToDO 또는 요청한 ToDO 중 한 개이상 선택이 되어야 합니다.");
//            return;
//        }

//  this._applicationElement.querySelectorAll('input[name="searchOrder"]')
        const searchTodoOption =
        {
            "isMyTodoYn": isMyTodoYn?"Y":"N", "isRequestTodoYn": isRequestTodoYn?"Y":"N", "isViewCompleteYn":isNotViewCompleteYn?"N":"Y",
            "workFromDt": workFromDt, "workToDt" : workToDt, "searchType" : searchType, "searchConts" : searchConts,
            "pageIndex": index, "searchOrder" : searchOrder,
        }

        return todoSituationApi.todoListHtml(searchTodoOption)
            .then(htmlString => {
                if(index == 1) {
                    this._todoListElement.innerHTML = this._func.parseData(htmlString);
                } else {
                    this._todoListElement.querySelector('.todoList__more').remove();

                    const template = document.createElement('template');
                    template.innerHTML = this._func.parseData(htmlString).replace('<html lang="ko">', '').trim();
                    this._todoListElement.appendChild(template.content);
                }
                    this._applicationElement.querySelector('#viewTodoTotalCnt').innerHTML  = this._todoListElement.querySelector('#totalTodoCnt').value;
            })
            .then( () => {
                const moreBtn = this._todoListElement.querySelector(".todoList__more button");
                if(moreBtn != null) {
                    moreBtn.addEventListener('click',()=> this.insertTodoList(moreBtn.getAttribute("data-next-index")));
                }
            })
            .then( () => {
                const btn = this._todoListElement.querySelectorAll('[name="todoDetailBtn"]');
                btn.forEach((button) => {
                    button.addEventListener("click", () => {
                        const todoID = button.closest(".todoList__item").getAttribute("data-todo-id");

                        this.getAWPTodoDetail(todoID, this._todoDetailElement);

                    });
                });
            })
            .then( () => {
                const btn = this._todoListElement.querySelectorAll('button[name=confirmBtn]');
                btn.forEach((button) => {
                    button.addEventListener("click", () => {
                        const todoID = button.closest(".todoList__item").getAttribute("data-todo-id");
                        this.confirmTodo(todoID);
                    });
                });
            })
            .then( () => {
                const btn = this._todoListElement.querySelectorAll('button[name=rejectBtn]');
                btn.forEach((button) => {
                    button.addEventListener("click", () => {
                        const todoID = button.closest(".todoList__item").getAttribute("data-todo-id");
                        this.rejectTodo(todoID);
                    });
                });
            })

            .catch(error => this._func.showToastModal("에러 발생:", error));
    }

    // Init AWPTodo Detail
    setNewAWPTodoDetail = (element = this._todoDetailElement, duration = 300) => {
        element.querySelector('.modal__header .top .title').innerHTML = "TO DO 등록하기";
        this.clearTodoDetail();

        this.fadeIn(element, duration);
    };


    clearTodoDetail = () => {
        // Set Todo Detail
        this._todoDetailElement.querySelector('#__todoId').value = "";
        this._todoDetailElement.querySelector('#__todoReqConts').value = "";
        this._todoDetailElement.querySelector('#__todoReqConts').removeAttribute("readonly");

        this._todoDetailElement.querySelector('#__importantYn').checked = false ;
        this._todoDetailElement.querySelector('#__importantYn').readOnly = false ;
        this._todoDetailElement.querySelector('#__privateYn').checked = false;
        this._todoDetailElement.querySelector('#__privateYn').readOnly = false;

        this._todoDetailElement.querySelector('#__jobStartDt').value = "";
        this._todoDetailElement.querySelector('#__jobEndDt').value = "";
        this._todoDetailElement.querySelector('#__completeRatio').value = "0";
        this._todoDetailElement.querySelector('#__memoText').value = "";

        // 버튼 활성화 하기.
        this._todoDetailElement.querySelector('#__deleteTodo').style.display = 'none';
        this._todoDetailElement.querySelector('#__cancelTodo').style.display = 'block';
        this._todoDetailElement.querySelector('#__saveTodo').style.display = 'block';
        this._todoDetailElement.querySelector('#__saveTodo').innerHTML = "저장";

        const workStartDate = new Date();
        workStartDate.setHours(9, 0, 0, 0);
        let workEndDate  = new Date();
        workEndDate.setDate(workEndDate.getDate());
        workEndDate.setHours(18, 0, 0, 0);
        workEndDate = "";
        const picker = new DatePicker.createRangePicker({
            startpicker: {date: workStartDate, input: '#__jobStartDt', container: '#__jobStartDt_Cal',},
            endpicker: {date: workEndDate, input: '#__jobEndDt', container: '#__jobEndDt_Cal',},
            format: 'YYYY-MM-dd hh:mm',
            language: 'ko',
            // selectableRanges: [[workStartDate, new Date(workStartDate.getFullYear() + 2, workStartDate.getMonth(), workStartDate.getDate())]],
            timePicker: {
                initialHour: 18,
                inputType: 'spinbox',
                showMeridiem: false,
                minuteStep: 15,
                format: 'hh:mm',
            }
        });

        this._todoDetailElement.querySelector('#__reqUserKey').value = this._loginInfo.userKey;

        this._todoDetailElement.querySelector('#__searchUserList').removeAttribute("readonly");
        this._todoDetailElement.querySelector('#__searchUserList').value = '';
        this.clearAllRepUser();
        this.addTodoRepUser(this._loginInfo.userKey, this._loginInfo.userNm,  this._loginInfo.orgNm);

        this.clearAllMemo();

        this._multiUploader = new dsMultiUpload('multipleUploader', {
                          fileMaxSize: '20',
                          totalMaxSize: '20'
                      }, this._func.showAlertModal);
        this.clearAllUploadedFile();

        const fileList = new Array();
        this._multiUploader.setFileList(fileList);
    }

    parseDate(dateString) {
        let [datePart, timePart] = dateString.split(" ");
        let [year, month, day] = datePart.split("-").map(Number);
        let [hours, minutes] = timePart.split(":").map(Number);

        // Month is 0-based in JavaScript Date
        return new Date(year, month - 1, day, hours, minutes);
    }

    // Get AWPTodo Detail
    getAWPTodoDetail = (todoId, targetElement, duration = 400) => {
        console.log("getAWPTodoDetail ==> " + todoId);
        const searchTodoOption =
        {
            "todoId": todoId
        }
        return todoSituationApi.getTodoDetail(searchTodoOption)
            .then(response => {
                // 요청자 여부 체크.
                let requesterYn = true;
                if(response.data.reqUserKey == this._loginInfo.userKey) {
                    // 로그인 사용자가 요청자
                    requesterYn = true;
                } else {
                    // 로그인 사용자가 담당자 인 경우 ( 요청자가 아닌 경우)
                    requesterYn = false;
                }

                this.clearTodoDetail();
                this._todoDetailElement.querySelector('.modal__header .top .title').innerHTML = "TO DO 수정 하기";
                // AWPTODO 상세 정보 설정
                this._todoDetailElement.querySelector('#__todoId').value = response.data.todoId;
                this._todoDetailElement.querySelector('#__todoStatus').value = response.data.todoStatus;
                this._todoDetailElement.querySelector('#__todoReqConts').value = response.data.todoReqConts;
                // 중요, 비공개 체크
                this._todoDetailElement.querySelector('#__importantYn').checked = response.data.importantYn == "1" ? true : false ;
                this._todoDetailElement.querySelector('#__privateYn').checked = response.data.privateYn == "1" ? true : false;
                //
                const workStartDate = this.parseDate(response.data.jobStartDt);
                let workEndDate  = this.parseDate(response.data.jobEndDt);
                new DatePicker.createRangePicker({
                    startpicker: {date: workStartDate, input: '#__jobStartDt', container: '#__jobStartDt_Cal',},
                    endpicker: {date: workEndDate, input: '#__jobEndDt', container: '#__jobEndDt_Cal',},
                    format: 'YYYY-MM-dd hh:mm',
                    language: 'ko',
                    // selectableRanges: [[new Date(workStartDate.getFullYear() -2, workStartDate.getMonth(), workStartDate.getDate()), new Date(workStartDate.getFullYear() + 2, workStartDate.getMonth(), workStartDate.getDate())]],
                    timePicker: {
                        inputType: 'spinbox',
                        showMeridiem: false,
                    }
                });
                this._todoDetailElement.querySelector('#__completeRatio').value = response.data.completeRatio;
                this._todoDetailElement.querySelector('#__reqUserKey').value = response.data.reqUserKey;

                this.clearAllRepUser();
                const repUpdateAuthYn = !requesterYn || ['P', 'F'].includes(response.data.todoStatus);
                // 담당자 수정 권한여부 : 요청자 이며, 수락하지 않은 경우
                response.data.repUserList.forEach((repUser) => {
                    this.addTodoRepUser(repUser.repUserKey, repUser.repUserNm, repUser.repOrgNm, !repUpdateAuthYn);
                });
                this.clearAllMemo();
                if(response.data.todoMemoList != null) {
                    response.data.todoMemoList.reverse().forEach((todoMemo) => {
                        this.addTodoDetailMemo(todoMemo.memoId, todoMemo.memoConts, todoMemo.createUserNm, todoMemo.createUserOrgNm, todoMemo.createUserKey, todoMemo.createDt);
                    })
                }

                this.clearAllUploadedFile();
                const fileList = new Array( );
                let asisFileSize=0;
                if(response.data.todoFileList !== null) {
                    response.data.todoFileList.forEach((todoFile) => {
                        asisFileSize += todoFile.fileSize;
                        this.addTodoDetailUploadedFile (todoFile.fileId, todoFile.fileNm, todoFile.fileSize, '/api/todo/download/' + todoFile.fileId);
                    })
                }

                this._multiUploader.setAsisFileSize(asisFileSize);

//                this._todoDetailElement.querySelector('#__jobStartDt').value = response.data.jobStartDt;
//                this._todoDetailElement.querySelector('#__jobEndDt').value = response.data.jobEndDt;

                // 버튼 및 권한 설정.
                // 1. 공통. ( 취소 / 저장 버튼 활성화)
                this._todoDetailElement.querySelector('#__cancelTodo').style.display = 'block';
                this._todoDetailElement.querySelector('#__saveTodo').style.display = 'block';
                this._todoDetailElement.querySelector('#__deleteTodo').disabled = false;
                this._todoDetailElement.querySelector('#__cancelTodo').disabled = false;
                this._todoDetailElement.querySelector('#__saveTodo').disabled = false;

                if(response.data.todoStatus == "R" && requesterYn == true ) {
                    // 거절 및 요청자 인 경우
                    this._todoDetailElement.querySelector('#__saveTodo').innerHTML = "재요청";
                } else {
                    this._todoDetailElement.querySelector('#__saveTodo').innerHTML = "저장";
                }

                // 담당자 수정 여부 체크.
                if(repUpdateAuthYn ) {
                    // 요청자 이면서 상태가 시작 또는 거절 인 경우
                    // 담당자 수정 못하도록 함.
                    this._todoDetailElement.querySelector('#__searchUserList').readOnly = true;
                }

                if(response.data.todoStatus == "R" && requesterYn == false ) {
                    // 거절 상태에서 담당자인 경우 업무기간 및 진척율, 비공개/중요 수정 금지

                    this._todoDetailElement.querySelector('#__completeRatio').readOnly = true;
                    // 중요, 비공개 체크
                    this._todoDetailElement.querySelector('#__importantYn').readOnly = true ;
                    this._todoDetailElement.querySelector('#__privateYn').readOnly = true;
                    // 중요, 비공개 체크
                    this._todoDetailElement.querySelector('#__jobStartDt').readOnly = true ;
                    this._todoDetailElement.querySelector('#__jobEndDt').readOnly = true;
                    this._todoDetailElement.querySelector('#__todoReqConts').readOnly = true;

                }

                // 삭제 버튼 활성화 여부 선택
                if(requesterYn) {  //  로그인 사용자가 요청자인 경우
                    this._todoDetailElement.querySelector('#__deleteTodo').style.display = 'block';
                } else {
                    this._todoDetailElement.querySelector('#__deleteTodo').style.display = 'none';
                }

            })
            .then(() => {

                // this.slideOpen(this._todoDetailElement, duration);
                this.fadeIn(this._todoDetailElement, duration);
                //
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    };

    // Reject AWPTodo
    rejectTodo = async (todoId) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A009);
        if (result) {
            console.log("rejectTodo ==> " + todoId);
        } else {
            return;
        }
        return todoSituationApi.rejectTodo(todoId)
            .then(response => {
                // 기존에 보냈던 수락/거절 알림 - 처리된 알림으로 처리함.
                todoSituationApi.set_alarmMessage_todoConfirm(todoId, this._loginInfo.userKey, 'N');

                // 거절 메시지 전송
                this.sendAlarmList (response.data.alarmList);

                // AWP_todo Refresh.
                this.insertTodoList(1);
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    };

    // confirm AWPTodo
    confirmTodo = async (todoId) => {
        const result = await this._func.customConfirm(ALERT_MESSAGES.A010);
        if (result) {
            console.log("confirmTodo ==> " + todoId);
        } else {
            return;
        }
        return todoSituationApi.confirmTodo(todoId)
            .then(response => {
                // 기존에 보냈던 수락/거절 알림 - 처리된 알림으로 처리함.
                todoSituationApi.set_alarmMessage_todoConfirm(todoId, this._loginInfo.userKey, 'Y');
                // Confirm 알림 메시지 전송
                this.sendAlarmList (response.data.alarmList);
                // AWP_todo Refresh.
                this.insertTodoList(1);
            })
            .catch(error => this._func.showToastModal("에러 발생:", error));
    };

    sendAlarmList = (alarmList) => {
        if(alarmList == null) {
            console.log("보내야할 알람이 존재하지 않습니다. ");
            return true;
        }
        console.log("confirmTodo ==> " + alarmList.length);

        alarmList.forEach((alarmData) => {
            todoSituationApi.saveAlarm(alarmData);
        })

    }

}