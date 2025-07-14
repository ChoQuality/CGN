var MSGScripts = (function () {
  const sideBoxToggle = () => {
    const btn = document.querySelectorAll('[data-function="sideBoxOpen"]');
    const sideBox = document.querySelectorAll('[data-function="sideBox"]');
    const closeBtn = document.querySelectorAll(
      '[data-function="sideBoxClose"]'
    );
    const chatBox = document.querySelector(".chatBox");

    btn.forEach((item) => {
      item.addEventListener("click", () => {
        const type = item.getAttribute("data-type");
        const target = Array.from(sideBox).find((el) =>
          el.classList.contains(type)
        );

        if (type == "is-search") {
          const input = target.querySelector(".chatSearch__input");
          console.log(input);
          input.focus({ preventScroll: true });
        }

        sideBox.forEach((el) => el.classList.remove("is-active"));
        target.classList.add("is-active");

        chatBox.style.width = `calc(100% - ${target.clientWidth}px)`;
      });
    });

    closeBtn.forEach((item) => {
      item.addEventListener("click", () => {
        const target = item.closest('[data-function="sideBox"]');

        target.classList.remove("is-active");
        chatBox.style.width = "100%";
      });
    });
  };

  const chatFunctionMenu = () => {
    const cards = document.querySelectorAll(".chatCard__group .card");

    // 단일 이모지 피커 인스턴스 생성 (최초 한 번만)
    // const emojiPicker = new EmojiButton({
    //     i18n: {
    //         search: '이모티콘 검색',
    //         categories: {
    //             recents: '최근 이모티콘',
    //             smileys: '스마일리 및 감정',
    //             people: '사람 및 신체',
    //             animals: '동물 및 자연',
    //             food: '음식 및 음료',
    //             activities: '활동',
    //             travel: '여행 및 장소',
    //             objects: '사물',
    //             symbols: '기호',
    //             flags: '깃발',
    //             custom: 'Custom'
    //         },
    //         notFound: '이모티콘이 없습니다.',
    //     },
    //     emojiSize: '27px',
    //     emojisPerRow: 6,
    //     rows: 6,
    //     showPreview: false,
    //     showSearch: false,
    //     showCategoryButtons: false,
    //     showRecents: false,
    //     position: 'bottom-start',
    // });

    cards.forEach((card) => {
      // 각 카드마다 개별 툴바 생성
      const toolbar = document.createElement("div");
      toolbar.className = "chatToolbar";

      const innerHtml = `
                <div class="chatToolbar__wrap"> 
                    <div class="chatToolbar__emoji">
                        <button type="button" class="btn has-icon emojiBtn">😍</button>
                        <button type="button" class="btn has-icon emojiBtn">🤥</button>
                        <button type="button" class="btn has-icon emojiBtn">🥱</button>
                        <div class="emoji">
                            <button type="button" class="btn has-icon chatToolbar__emojiBtn" data-target="#chatToolbar__emojiInput">
                                <i class="icon is-24 is-chat-emoji-add"></i>
                            </button>
                            <input type="text" id="chatToolbar__emojiInput" style="display: none;">
                        </div>
                    </div>
                    
                    <div class="chatToolbar__btn">
                        <button type="button" class="btn has-icon">
                            <i class="icon is-24 is-edit-24"></i>
                        </button>
                        <div class="more">
                            <button type="button" class="btn has-icon">
                                <i class="icon is-24 is-chat-more-14"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

      // const innerHtml = `
      //     <div class="chatToolbar__wrap">
      //         <div class="chatToolbar__btn">
      //             <button type="button" class="btn has-icon">
      //                 <i class="icon is-24 is-edit-24"></i>
      //             </button>
      //             <div class="more">
      //                 <button type="button" class="btn has-icon">
      //                     <i class="icon is-24 is-chat-more-14"></i>
      //                 </button>
      //             </div>
      //         </div>
      //     </div>
      // `;
      toolbar.innerHTML = innerHtml;

      // 상태 플래그
      let isFloatingLayerOpen = false;
      // let isEmojiLayerOpen = false;

      // 툴바에 피커 참조 저장
      // toolbar.picker = emojiPicker;

      // 이모지 버튼 설정
      // const emojiBtn = toolbar.querySelector('.chatToolbar__emojiBtn');
      // emojiBtn.addEventListener('click', () => {
      //     emojiPicker.togglePicker(emojiBtn);
      //     isEmojiLayerOpen = true;
      // });

      // // 이모지 선택기 상태 감지
      // emojiPicker.on('show', () => {
      //     isEmojiLayerOpen = true;
      // });

      // emojiPicker.on('hidden', () => {
      //     isEmojiLayerOpen = false;
      //     if (!card.matches(':hover') && !isFloatingLayerOpen) {
      //         toolbar.remove();
      //     }
      // });

      // floatingLayer 열기 설정
      const openFloatingLayer = () => {
        floatingLayer(
          document.querySelectorAll(".chatToolbar__btn .more .btn"),
          [
            {
              title: "답글",
            },
            {
              title: "삭제",
            },
          ],
          {
            eventType: "click",
            onOpen: () => {
              isFloatingLayerOpen = true;
            },
            onClose: () => {
              isFloatingLayerOpen = false;
              // if (!card.matches(':hover') && !isEmojiLayerOpen) {
              //     toolbar.remove();
              // }

              if (!card.matches(":hover")) {
                toolbar.remove();
              }
            },
          }
        );
      };

      card.addEventListener("mouseenter", () => {
        if (!card.contains(toolbar)) {
          card.appendChild(toolbar);

          // card.closest('[data-overlayscrollbars-viewport]').addEventListener('scroll', () => {
          //     emojiPicker.hidePicker();
          //     isEmojiLayerOpen = false;
          // })
        }
        openFloatingLayer();
      });

      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          // if (!card.matches(':hover') && !isFloatingLayerOpen && !isEmojiLayerOpen) {
          //     toolbar.remove();
          // }

          if (!card.matches(":hover") && !isFloatingLayerOpen) {
            toolbar.remove();
          }
        }, 200);
      });
    });
  };

  // const dragDrop = () => {
  //   const dropZone = document.querySelector('[data-function="dropZone"]');
  //   const attachmentList = document.querySelector('[data-function="attachmentList"]');
  //   const uploadedFiles = [];
  //
  //   let dragOverTimer = null;
  //
  //   ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  //     dropZone.addEventListener(eventName, (e) => {
  //       e.preventDefault();
  //       e.stopPropagation();
  //     });
  //   });
  //
  //   dropZone.addEventListener("dragover", () => {
  //     // dragover 이벤트가 반복되기 때문에 클래스 유지
  //     dropZone.classList.add("dragover");
  //
  //     // 타이머 초기화
  //     if (dragOverTimer) clearTimeout(dragOverTimer);
  //
  //     // 100ms 이내 dragover가 없으면 제거
  //     dragOverTimer = setTimeout(() => {
  //       dropZone.classList.remove("dragover");
  //     }, 100);
  //   });
  //
  //   dropZone.addEventListener("drop", (e) => {
  //     dropZone.classList.remove("dragover");
  //     const files = Array.from(e.dataTransfer.files);
  //
  //     files.forEach((file) => {
  //       uploadedFiles.push(file);
  //
  //       const item = document.createElement("div");
  //       item.className = "attachment";
  //       item.innerHTML = `
  //         <i class="icon is-40 is-file-etc"></i>
  //         <span class="title">${file.name}</span>
  //         <span class="size">${(file.size / 1024 / 1024).toFixed(1)}MB</span>
  //         <div class="d-flex">
  //           <button type="button" class="btn has-icon" data-function="fileDelete">
  //             <i class="icon is-24 is-file-delete"></i>
  //           </button>
  //         </div>
  //       `;
  //       attachmentList.appendChild(item);
  //     });
  //   });
  //
  //   attachmentList.addEventListener("click", (e) => {
  //     const target = e.target.closest('[data-function="fileDelete"]');
  //     if (!target) return;
  //
  //     const attachment = target.closest(".attachment");
  //     const index = Number(attachment.dataset.index);
  //
  //     uploadedFiles[index] = null;
  //     attachment.remove();
  //   });
  //
  // };
  

  window.addEventListener("DOMContentLoaded", function () {
    sideBoxToggle();
    chatFunctionMenu();
    dragDrop();
  });

  window.addEventListener("load", function () {});

  window.addEventListener("resize", function () {});
})();
