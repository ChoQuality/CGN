var DevScripts = (function () {
    // 텍스트입력창 height 조절
    const handleResizeHeight = function () {
        let textarea = document.querySelectorAll('textarea[data-function="autoHeight"]');

        textarea.forEach((item) => {
            item.oninput = (e) => {
                const target = e.target;
                const height = item.getAttribute('data-height');
                const maxHeight = height ? parseInt(height, 10) : 1000;

                // 높이 리셋: 이로 인해 텍스트 삭제 시 줄어들게 됩니다.
                target.style.height = 'auto';

                // 스크롤 높이를 기준으로 높이 재설정 (최대 maxHeight 까지)
                if (target.scrollHeight < maxHeight) {
                    target.style.height = (target.scrollHeight + 1) + 'px';
                } else {
                    target.style.height = maxHeight + 'px';
                }

                // 내용 유무에 따른 테두리 색상 변경
                if (target.value) {
                    target.style.borderColor = '#9F9F9F';
                } else {
                    target.style.borderColor = '#ececec';
                }
            }
        })
    };


    const inputValueCheck = () => {
        const input = document.querySelectorAll('input, textarea');

        input.forEach(item => {
            item.value ? item.classList.add('has-value') : '';

            item.addEventListener('focusout', () => {
                item.classList.remove('is-typing');

                if (item.value) {
                    item.classList.add('has-value');
                } else {
                    item.classList.remove('has-value');
                }
            })

            item.addEventListener('focusin', () => {
                item.classList.add('is-typing');
            })
        })
    }

    const inputClear = () => {
        const btn = document.querySelectorAll('[data-function="inputClear"]');

        if (btn) {
            btn.forEach((item) => {
                const parent = item.closest('div');
                const target = parent.querySelector('input');

                if (target.value) {
                    target.classList.add('has-value');
                };

                item.addEventListener('click', () => {
                    target.classList.remove('has-value');
                    target.value = '';
                    target.focus();
                })
            })
        }
    }

    const inputShow = () => {
        const btn = document.querySelectorAll('[data-function="inputShow"]');
        
        if (btn) {
            btn.forEach((item) => {
                item.addEventListener('click', () => {
                    const parent = item.closest('div');
                    const target = parent.querySelector('input');
                    
                    if( !item.classList.contains('is-show') ){
                        item.classList.add('is-show');
                        target.setAttribute('type', 'text');
                    }else {
                        item.classList.remove('is-show');
                        target.setAttribute('type', 'password');
                    }
    
                });
            })
        }
    }

    const dropDownOnOff = () => {
        const dropdownButton = document.querySelectorAll('[data-function="dropdown"]');

        dropdownButton.forEach(item => {
            const dropdown = item.closest('.dropdown');

            item.addEventListener('click', () => {
                if (!dropdown.classList.contains('is-active')) {
                    dropdown.classList.add('is-active');
                } else {
                    dropdown.classList.remove('is-active');
                }
            })
        })
    }

    const tabs = () => {
        let tab = document.querySelectorAll('.tabs');

        if (tab) {
            tab.forEach((el) => {
                let dataTabs = el.getAttribute('data-tabs');
                let tabItems = el.querySelectorAll('.tab__link');

                tabItems.forEach((item) => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();

                        let tabsContainer = item.closest('.tabs');
                        let targetHref = item.getAttribute('href');
                        let tabsLink = tabsContainer.querySelectorAll('.tab__link');

                        tabsLink.forEach((e) => {
                            e.classList.remove('is-active');
                        })

                        item.classList.add('is-active');

                        if (targetHref) {
                            let targetContents = document.querySelector(targetHref);
                            let tabContentsContainer = targetContents.parentNode;
                            let tabContents = tabContentsContainer.querySelectorAll('.tab__contents');

                            if (dataTabs == 'tabs') {
                                tabContents.forEach((e) => {
                                    e.classList.remove('is-active');
                                    e.style.display = 'none';
                                })

                                if (item.classList.contains('is-active')) {
                                    targetContents.style.display = 'block';
                                }
                            } else if (dataTabs == 'scroll') {
                                let top = targetContents.offsetTop;

                                window.scrollTo({
                                    top: `${top - 65}`,
                                    behavior: 'smooth'
                                })
                            }
                        }

                    })
                })
            })

        }
    }

    const slideDown = (element, duration = 300) => {
        element.style.removeProperty("display");
        let height = element.scrollHeight + "px"; // 🔥 현재 높이를 미리 계산
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;
        element.style.maxHeight = "0px";
        element.style.opacity = "0";

        setTimeout(() => {
            element.style.maxHeight = height; // 💡 max-height 조정
            element.style.opacity = "1";
        }, 10);
    };

    const slideUp = (element, duration = 300) => {
        element.style.maxHeight = element.scrollHeight + "px"; // 💡 현재 높이에서 시작
        element.style.overflow = "hidden";
        element.style.transition = `max-height ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`;

        setTimeout(() => {
            element.style.maxHeight = "0px";
            element.style.opacity = "0";
        }, 10);
    };


    const slideToggle = (element, duration = 300) => {
        if (window.getComputedStyle(element).maxHeight === "0px" || element.style.opacity === "0") {
            slideDown(element, duration);
        } else {
            slideUp(element, duration);
        }
    };

    const toggle = () => {
        const btn = document.querySelectorAll('[data-function="slideToggle"]');

        btn.forEach((button) => {
            button.addEventListener("click", () => {
                const target = document.querySelector(button.getAttribute("data-target"));

                if (target) {
                    slideToggle(target, 400);
                }
            });
        });
    }


    const drowDownToggle = function () {
        const toggleEl = document.querySelectorAll('[data-function="toggle"]');

        toggleEl.forEach((item) => {
            const btn = item.querySelector('[data-function="btn"]');
            const list = item.querySelector('[data-function="list"]');
            const subList = list.querySelector('[data-function="list"]');
            const height = list.getAttribute('data-height');

            list.style.maxHeight = height ? `${height}px` : '0';

            btn.addEventListener('click', () => {
                if (item.classList.contains("is-active")) {
                    height ? list.style.maxHeight = `${height}px` : list.style.maxHeight = '0';
                    item.classList.remove("is-active");
                } else {
                    list.style.maxHeight = subList ? `${list.scrollHeight + subList.scrollHeight}px` : `${list.scrollHeight}px`;

                    item.classList.add("is-active");
                }
            });

            document.body.addEventListener('click', (e) => {
                if (subList && !item.contains(e.target)) {
                    list.style.maxHeight = height ? `${height}px` : '0';
                    item.classList.remove("is-active");
                }
            });
        })
    }

    //Modal Popup
    const modal = () => {
        const body = document.querySelector("body");
        const modalOpen = document.querySelectorAll('[data-function="modal"]');
        const modalClose = document.querySelectorAll('[data-function="modalClose"]');

        modalOpen.forEach(function (openBtn) {
            openBtn.addEventListener("click", function (e) {
                e.preventDefault();
                const modalHref = this.getAttribute("data-target");
                const target = document.querySelector(modalHref);

                // body.classList.add("overflow-hidden");
                fadeIn(target, 100);
            });
        });

        modalClose.forEach(function (closeBtn) {
            closeBtn.addEventListener("click", function (e) {
                e.preventDefault();

                // body.classList.remove("overflow-hidden");
                fadeOut(this.closest('.modal'), 100);
                // this.closest('[data-modal="modal"]').style.display = 'block';
            });
        });
    };

    function fadeIn(elem, ms) {
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

    function fadeOut(elem, ms) {
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

    // const formSearchList = () => {
    //     const inputSearch = document.querySelectorAll('[data-function="searchList"]');

    //     inputSearch.forEach((item) => {
    //         const input = item.querySelector('input');

    //         if (input.value.length >= 2) {
    //             item.classList.add('is-active');
    //         }

    //         input.addEventListener('input', () => {
    //             if (input.value.length >= 2) {
    //                 item.classList.add('is-active');
    //             } else {
    //                 item.classList.remove('is-active');
    //             }
    //         });
    //     })
    // }


    // const fixedPosition = () => {
    //     const target = document.querySelectorAll('[data-function="position"]');

    //     if (target){
    //         target.forEach(item => {
    //             const posTarget = item.closest('[data-function="posTarget"]');
    //             const rect = posTarget.getBoundingClientRect();

    //             item.style.top = `${rect.top + rect.height}px`;
    //             item.style.left = `${rect.left}px`;
    //         })
    //     }
    // }

    // table toggle
    const tableToggle = function () {
        const toggleEl = document.querySelectorAll('[data-function="tableToggle"]');

        toggleEl.forEach((item) => {
            const btn = item.querySelector('[data-function="toggleBtn"]');
            const table = item.querySelector('[data-function="toggleTable"]');

            btn.addEventListener('click', () => {
                if (table.classList.contains("d-none")) {
                    table.classList.remove("d-none");
                    btn.classList.remove("is-active");
                    btn.style.marginTop = '-0.1rem'
                } else {
                    table.classList.add("d-none");
                    btn.classList.add("is-active");
                    btn.style.marginTop = '0'
                }
            });
        })
    }

    window.slideDown = slideDown;
    window.fadeIn = fadeIn;

    window.addEventListener("DOMContentLoaded", function () {
        handleResizeHeight();
        inputValueCheck();
        inputClear();
        inputShow();
        dropDownOnOff();
        tabs();
        toggle();
        drowDownToggle();
        modal();
        tableToggle();
        // formSearchList();
        // fixedPosition();
    })
})();


// Default Tree Template
const defaultTreeTemplate = function (tmpl, props) {
    let internalNode =
        '<div class="tui-tree-content-wrapper">' +
        '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        '<span class="tui-ico-tree"></span>' +
        props.stateLabel +
        '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
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
        props.text +
        '</div>' +
        '</div>';

    let leafNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text ' + props.textClass + '">' +
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
// Check Tree Template
const checkTreeTemplate = function (tmpl, props) {
    // Checkbox Tree template Custom 
    let internalNode =
        '<div class="tui-tree-content-wrapper">' +
        '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        '<span class="tui-ico-tree"></span>' +
        props.stateLabel +
        '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check ">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
        '</div>' +
        '</div>' +
        '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
        props.children +
        '</ul>';

    let internalNode2 =
        '<div class="tui-tree-content-wrapper">' +
        '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
        '</div>' +
        '</div>';

    let leafNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text ' + props.textClass + '">' +
        '<span class="tui-tree-ico tui-ico-line"></span>' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check ">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
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

// Radio Tree Template
const radioTreeTemplate = function (tmpl, props) {
    // Checkbox Tree template Custom 
    let internalNode =
        '<div class="tui-tree-content-wrapper">' +
        '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        '<span class="tui-ico-tree"></span>' +
        props.stateLabel +
        '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="radio__label">' +
        '<input class="radio__input" type="radio" name="treeRadio">' +
        '<span class="radio__style"></span>' +
        '</label>' +
        '<span class="radio__text">' + props.text + '</span>' +
        '</div>' +
        '</div>' +
        '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
        props.children +
        '</ul>';

    let internalNode2 =
        '<div class="tui-tree-content-wrapper">' +
        '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="radio__label">' +
        '<input class="radio__input" type="radio" name="treeRadio">' +
        '<span class="radio__style"></span>' +
        '</label>' +
        '<span class="radio__text">' + props.text + '</span>' +
        '</div>' +
        '</div>';

    let leafNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text ' + props.textClass + '">' +
        '<span class="tui-tree-ico tui-ico-line"></span>' +
        '<label class="radio__label">' +
        '<input class="radio__input" type="radio" name="treeRadio">' +
        '<span class="radio__style"></span>' +
        '</label>' +
        '<span class="radio__text">' + props.text + '</span>' +
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

// Edit Tree Template
const editTreeTemplate = function (tmpl, props) {
    // Checkbox Tree template Custom 
    let internalNode =
        '<div class="tui-tree-content-wrapper">' +
        '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        '<span class="tui-ico-tree"></span>' +
        props.stateLabel +
        '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
        '<button class="tui-tree-edit-btn"></button>' +
        '</div>' +
        '</div>' +
        '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
        props.children +
        '</ul>';

    let internalNode2 =
        '<div class="tui-tree-content-wrapper">' +
        '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
        '<button class="tui-tree-edit-btn"></button>' +
        '</div>' +
        '</div>';

    let leafNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text">' +
        '<span class="tui-tree-ico tui-ico-line"></span>' +
        '<label class="tui-checkbox">' +
        '<span class="tui-ico-check">' +
        '<input type="checkbox" class="tui-tree-checkbox">' +
        '</span>' +
        '</label>' +
        '<span class="check__text">' + props.text + '</span>' +
        '<button class="tui-tree-edit-btn"></button>' +
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

// Folder Tree Template
const folderTreeTemplate = function (tmpl, props) {
    let firstNode =
        '<div class="tui-tree-content-wrapper">' +
        // '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        // '<span class="tui-ico-tree"></span>' +
        // props.stateLabel +
        // '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<div class="tui-tree-textWrap">' +
        '<span class="tui-tree-ico tui-ico-folder"></span>' +
        props.text +
        '</div>' +
        '<div class="more">' +
        '<button type="button" data-btnType="more" class="btn tree__moreBtn is-icon"><i class="icon is-more-icon-3"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
        props.children +
        '</ul>';

    let binNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<div class="tui-tree-textWrap">' +
        '<span class="tui-tree-ico tui-ico-bin"></span>' +
        props.text +
        '</div>' +
        '</div>' +
        '</div>';


    let internalNode =
        '<div class="tui-tree-content-wrapper">' +
        '<button type="button" class="tui-tree-toggle-btn ' + props.toggleBtnClass + '">' +
        '<span class="tui-ico-tree"></span>' +
        props.stateLabel +
        '</button>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<div class="tui-tree-textWrap">' +
        '<span class="tui-tree-ico tui-ico-folder"></span>' +
        props.text +
        '</div>' +
        '<div class="more">' +
        '<button type="button" data-btnType="more" class="btn tree__moreBtn is-icon"><i class="icon is-more-icon-3"></i></button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<ul class="tui-tree-subtree tui-js-tree-subtree">' +
        props.children +
        '</ul>';

    let internalNode2 =
        '<div class="tui-tree-content-wrapper">' +
        '<span class="tui-tree-ico tui-tree-toggle-none"></span>' +
        '<div class="tui-tree-text tui-js-tree-text is-parents is-depth-' + props.indent + '">' +
        '<div class="tui-tree-textWrap">' +
        '<span class="tui-tree-ico tui-ico-line"></span>' +
        '<span class="tui-tree-ico tui-ico-folder"></span>' +
        props.text +
        '</div>' +
        '</div>' +
        '</div>';

    let leafNode =
        '<div class="tui-tree-content-wrapper">' +
        '<div class="tui-tree-text ' + props.textClass + '">' +
        '<div class="tui-tree-textWrap">' +
        '<span class="tui-tree-ico tui-ico-line"></span>' +
        props.text +
        '</div>' +
        '</div>' +
        '</div>';

    // console.log(props)

    if (props.indent == '23' && props.text !== '휴지통') {
        return firstNode;
    } else if (props.children) {
        return internalNode;
    } else if (props.isLeaf && props.noneChildren) {
        return internalNode2;
    } else if (props.isLeaf && props.text !== '휴지통') {
        return leafNode;
    } else if (props.text == '휴지통') {
        return binNode;
    }

}



// more 메뉴 생성
const floatingLayer = (buttons, menuData, options) => {
    let menu;

    const layerCreate = (items) => {
        // 기존 메뉴 제거
        const existingMenu = document.querySelector('.layerContainer');
        if (existingMenu) existingMenu.remove();

        menu = document.createElement('div');
        menu.className = 'layerContainer';

        const menuList = document.createElement('ul');
        menuList.className = 'layer';

        if (options.className) menu.classList.add(options.className);

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'layer__item';

            const link = document.createElement('a');
            link.classList.add('layer__inner');
            link.innerHTML = item.orgNm ? `${item.title} <span class="orgNm">${item.orgNm}</span>` : item.title;

            if (item.children) {
                const subMenu = layerCreate(item.children);
                subMenu.style.display = 'none';
                subMenu.classList.add('children');
                li.appendChild(subMenu);
                li.addEventListener('mouseenter', () => {
                    subMenu.style.display = 'block';
                    const {
                        bottom
                    } = subMenu.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;
                    if (bottom > viewportHeight) {
                        subMenu.style.top = 'auto'; // 위쪽 배치
                        subMenu.style.bottom = '0';
                    }
                });
                li.addEventListener('mouseleave', () => subMenu.style.display = 'none');
            }

            if (item.className) li.classList.add(item.className);
            if (item.click) link.addEventListener('click', (e) => {
                e.preventDefault();
                item.click();
            });
            if (item.href) link.setAttribute('href', item.href);

            li.appendChild(link);
            menuList.appendChild(li);
        });

        menu.appendChild(menuList);
        document.body.appendChild(menu);
        return menuList;
    };

    const layerShow = (target) => {
        const {
            left,
            top,
            height,
            bottom
        } = target.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const layer = document.querySelector('.layer');

        target.classList.add('is-active');
        layer.style.display = 'block';
        if (bottom + layer.offsetHeight > viewportHeight) {
            layer.style.top = `${top - layer.offsetHeight}px`; // 위쪽 배치
            layer.classList.add('is-bottom');
        } else {
            layer.style.top = `${top + height}px`; // 기본 아래쪽 배치
        }
        layer.style.left = `${left}px`;
    };

    const layerRemove = () => {
        buttons.forEach(btn => {
            if (btn.classList.contains('is-active')) btn.classList.remove('is-active');
        });
        if (menu) {
            menu.remove();
            menu = null;
            // floatingLayer가 닫혔음을 알리는 onClose 콜백 호출
            if (options.onClose && typeof options.onClose === 'function') {
                options.onClose();
            }
        }
    };

    // 이벤트 핸들러 등록
    buttons.forEach(btn => {
        if (options.eventType === 'click') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (options.onOpen && typeof options.onOpen === 'function') {
                    options.onOpen();
                }
                layerCreate(menuData);
                layerShow(btn);
            });
        } else if (options.eventType === 'mouseenter') {
            btn.addEventListener('mouseenter', (e) => {
                if (options.onOpen && typeof options.onOpen === 'function') {
                    options.onOpen();
                }
                layerCreate(menuData);
                layerShow(btn);
                menu.addEventListener('mouseleave', () => {
                    layerRemove();
                });
            });
            btn.addEventListener('mouseleave', (e) => {
                if (menu && !menu.contains(e.relatedTarget)) layerRemove();
            });
        }
    });
    
    window.addEventListener('wheel', layerRemove);
    window.addEventListener('scroll', layerRemove, true);
    window.addEventListener('click', layerRemove, true);
};