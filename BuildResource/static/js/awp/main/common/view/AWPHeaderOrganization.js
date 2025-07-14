class AWPHeaderOrganization {
    constructor(func,loginInfo,companyOrgs,companyUsers) {
        this._func = func;
        this._loginInfo = loginInfo;
        this._companyOrgs = companyOrgs;
        this._companyUsers = companyUsers;
        this._orgUsers = null;
        this._modalElement = null;
        this._columnData = null
        this._userGrid = null;
        this._makeSelectOrgUser = null;
        this._orgCdPath = this.findPathByOrgCd(companyOrgs, loginInfo.orgKey);

        this.initOrgTree();
    }

    findPathByOrgCd(data, targetOrgId, path = []) {
    // 경로 찾기.
        for (const item of data) {
            path.push(item.orgCd);
            if (item.groupId === targetOrgId ) {
                return path;
            }
            if (item.children && item.children.length > 0) {
                const result = this.findPathByOrgCd(item.children, targetOrgId, path);
                if (result) {
                    return result; // 경로를 찾으면 반환
                }
            }
            // 현재 경로에서 orgCd 제거 (백트래킹)
            path.pop();
        }
        return null; // 경로를 찾지 못한 경우
    }


    addStateAndDepth(data, currentDepth = 1) {
    // Level 2까지만 오픈
         data.forEach(item => {
             // depth 추가
             item.depth = currentDepth;
             // state 설정: 2레벨 이하일 경우
             item.state = currentDepth <2 ? "opened" : "closed";
             // orgCd가 targetOrgCds에 포함되면 state를 "open"으로 변경
             if (this._orgCdPath != null) {  // 사용자의 조직이 잘못될 우려가 있어 임시로 수정.
                 if (this._orgCdPath.includes(item.orgCd)) {
                     item.state = "opened";
                 }
             }
             // children이 존재하면 재귀적으로 처리
             if (item.children && item.children.length > 0) {
                 this.addStateAndDepth(item.children, currentDepth + 1);
             }
         });
    }


    init(modal) {
        this._modalElement = modal;

        this.initSelectBox();

        this.addStateAndDepth(this._companyOrgs);

        const orgTree = new Tree('#modalTree01', {
                data: this._companyOrgs,
                nodeDefaultState: 'closed',
                renderTemplate: this.defaultTreeTemplate
            }).enableFeature('Selectable', {
                checkboxClassName: 'tui-tree-checkbox',
            }).on('select', (evt) => {
                this._modalElement.querySelector('.form__search').value = '';
                this._makeSelectOrgUser(evt.target.dataset.orgcd, '', evt.target.dataset.text)
            });
        this._makeSelectOrgUser('', this._loginInfo._orgKey, this._loginInfo._orgNm);
    }

    clearData() {
        this._modalElement.querySelector('.form__search').value = '';
        this._makeSelectOrgUser('', this._loginInfo._orgKey, this._loginInfo._orgNm);
    }

    get func() {
        return this._func;
    }

    get loginInfo() {
        return this._loginInfo;
    }

    get messenger() {
        return this._messenger;
    }

    get view() {
        return this._view;
    }

    get makeSelectOrgUser(){
        return this._makeSelectOrgUser;
    }

    initSelectBox() {
        const selectData =  [
            {label: '이름',value: 'userNm'},
            {label: '부서명',value: 'orgNm'},
            {label: '아이디',value: 'userId'},
            {label: '휴대전화번호',value: 'mobileNo'},
        ];
        const modalSelectBox1 = new SelectBox('#orgModal_SelectBox', {
            data: selectData,
            showIcon: true,
        });

        this._modalElement.querySelector(".form__searchBtn").addEventListener("click", () =>  {

            const searchType = this._modalElement.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
            const searchValue = this._modalElement.querySelector('.form__search').value;
            this._makeSelectOrgUser ("", "", "", searchType, searchValue);
        });

        this._modalElement.querySelector('.form__search').addEventListener("keyup", (e) => {
            if (e.key === 'Enter' ) {
//                if(e.target.value.length >= 2) {
                    const searchType = this._modalElement.querySelector(".tui-select-box-item.tui-select-box-selected").getAttribute("data-value");
                    const searchValue = e.target.value;
                    this._makeSelectOrgUser ("", "", "", searchType, searchValue);
//                } else {
//                    this._func.showAlertModal("두 글자 이상 입력하셔야 검색하실 수 있습니다.");
//                }
            }
        });

    }

    initOrgTree() {

        this._columnData = [ {
                     header: "사진", name: "_thumbImgPath",
                     width: 60, renderer: profileImgRenderer
                 },
                 {
                     header: "이름", name: "_userNm",
                     align: "center", width: 80, sortable: true,
                 },
                 {
                     header: "직위", name: "_jobPosition",
                     align: "center", width: 90, sortable: true,
                 },
                 {
                     header: "직책", name: "_jobResponsibility",
                     align: "center", width: 90, sortable: true,
                 },
                 {
                     header: "아이디", name: "_userId",
                     align: "center", width: 193, sortable: true,
                 },
                 {
                     header: "소속부서", name: "_orgNm",
                     align: "center", width: 120, sortable: true,
                 },
                 {
                     header: "휴대전화번호", name: "_mobilePhoneNo",
                     align: "center", width: 130, sortable: true,
                 },
               ];

        this._userGrid = new Grid({
              el: document.getElementById("orgModalGrid"),
              width: 780,
              minBodyHeight: 300,
              bodyHeight: 560,
              contextMenu: null,
              data: this._orgUsers,
              scrollX: false,
              scrollY: true,
              header: {
                  height: 48,
              },
              minRowHeight: 60,
              columns: this._columnData,
        });

        this._makeSelectOrgUser = (orgCd, orgKey, orgNm, searchType, searchValue) => {
//            if(searchValue?.length < 1) {
//                this._func.showAlertModal("두 글자 이상 입력하셔야 검색하실 수 있습니다.");
//                return;
//            }

            const orgUserGridEl = this._modalElement.querySelector('#orgModalGrid');
            this._modalElement.querySelector('#selectedOrgInfo')
            new Promise((resolve) => {
                this._orgUsers = [];
                this._companyUsers.forEach(userInfo  => {
                    if(searchValue == undefined || searchValue == '') {
                        if(orgCd == '') {
                            if(userInfo._orgKey == orgKey) {
                                this._orgUsers.push(userInfo);
                            }
                        } else if(userInfo._orgCd == orgCd) {
                            this._orgUsers.push(userInfo);
                        }
                    } else {
                        searchValue = searchValue.toUpperCase();
                        if(searchType == 'orgNm') {
                            if(userInfo._orgNm?.toUpperCase().includes(searchValue)) {
                                this._orgUsers.push(userInfo);
                            }
                        } else if(searchType == 'userNm') {
                            if(userInfo._userNm?.toUpperCase().includes(searchValue)) {
                                this._orgUsers.push(userInfo);
                            }
                        } else if(searchType == 'userId') {
                            if(userInfo._userId?.toUpperCase().includes(searchValue)) {
                                this._orgUsers.push(userInfo);
                            }
                        } else if(searchType == 'mobileNo') {
                            if(userInfo._mobilePhoneNo?.toUpperCase().includes(searchValue)) {
                                this._orgUsers.push(userInfo);
                            }
                        }
                    }

                });

                resolve();
            })
            .then(() => {
                this._userGrid.resetData(this._orgUsers);
            })
            .then(() => {
                this._modalElement.querySelector('#selectedOrgInfo').innerText  = '' ;
                const spanChild = document.createElement('span');
                spanChild.classList.add("fw-400");
                spanChild.innerText  = '  ' + this._orgUsers.length + "명";
                this._modalElement.querySelector('#selectedOrgInfo').append(orgNm, spanChild);
            })
            .catch((error) => console.log(error));
        }

    }

    defaultTreeTemplate = function (tmpl, props) {
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
            '</div>' +
            '</div>' +
            '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
            props.children +
            '</ul>';

        let internalNode2 =
            '<div class="tui-tree-content-wrapper">' +
            '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
            '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
            'data-id="' + props.groupId + '" ' +
            'data-orgCd="' + props.orgCd + '" ' +
            'data-upperOrgCd="' + props.upperOrgCd + '" ' +
            'data-text="' + props.text + '">' +
            '</div>' +
            '</div>';
        let leafNode =
            '<div class="tui-tree-content-wrapper">' +
            '<div class="tui-tree-text ' + props.textClass + '"' +
             'data-id="' + props.groupId + '" ' +
             'data-orgCd="' + props.orgCd + '" ' +
             'data-upperOrgCd="' + props.upperOrgCd + '" ' +
             'data-text="' + props.text +
             '">' +
            '<span class="tui-tree-ico tui-ico-line"></span>' +
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
}