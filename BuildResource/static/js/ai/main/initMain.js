document.addEventListener("DOMContentLoaded", async function () {
    try {
        initSystemPrompt();
    } catch (error) {

    }
});

function initSystemPrompt() {
    const detail = document.querySelector('.card__body .board');
    const url = window.location.origin + '/ai/view/rfp/detail';
    const formData = new FormData();

    new Promise(resolve => {
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.classList.add("hidden");
        resolve();
    })
        /*.then(() =>{
            setTemplateLi();
        })
        .then(() =>{
            setTemplateLiIcon();
        })
        .then(() =>{
            setSystemPromptModal();
        })
        .then(() =>{
            sendEvent(formData);
        })
        .then(() =>{
            createMultiFileEvent(formData);
        })*/

        .catch(error => { throw error; });


   /*
    fetch(url ,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.text())
        .then(htmlString =>{
            return JSON.parse(htmlString)
        })
        .then(r => {
            if(r.code === 0){
                detail.innerHTML = r.data
            }
        })
        .then(() => {

            const detailInputs = detail.querySelectorAll('input[type="checkbox"]');
            detailInputs.forEach(input => {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        detailInputs.forEach(otherInput => {
                            if (otherInput !== input) {
                                otherInput.checked = false;
                            }
                        });
                    }
                });
            });

        })
        .then(()=>{
            setSystemPromptButtonEvent();
        })
        .then(()=>{
            createMultiFileEvent(formData);
        })
        .then(()=>{
            sendEvent(formData);
        })
        .then(()=>{
            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.classList.add("hidden");
        })
        .catch(error => { throw error; });*/
}
function setTemplateLi(){
    const liGroup = document.querySelectorAll('.pageMenu.is-twoDepth li');

    liGroup.forEach(li => {
        li.addEventListener('click', function () {
            const anchor = this.querySelector('a');
            if (!anchor) return;

            // 1) 모든 a에서 is-active 제거
            liGroup.forEach(el => {
                const a = el.querySelector('a');
                a && a.classList.remove('is-active');
            });

            // 2) 클릭한 a에만 추가
            anchor.classList.add('is-active');
        });
    });
}

function setTemplateLiIcon(){
    const liTooltipGroup = document.querySelectorAll('.pageMenu.is-twoDepth li .tooltip ');

    liTooltipGroup.forEach(liTooltip => {
        liTooltip.addEventListener('click', function () {
            const icon = this.querySelector('i');
            if (!icon) return;

            // 1) 모든 a에서 is-active 제거
/*            liTooltipGroup.forEach(el => {
                const a = el.querySelector('i');
                a && a.classList.remove('is-system-success');
                a && a.classList.add('is-system-info');
            });*/
            // 2) 클릭한 a에만 추가
/*            liTooltip.querySelector('i').classList.add('is-system-success');
            liTooltip.querySelector('i').classList.remove('is-system-info');*/
            const systemPromptModal = document.getElementById('systemPromptModal');
            const systemPromptModal_input = document.getElementById('systemPromptModal_input');
            const systemPromptModal_input_content = this.closest('a').dataset.content;
            systemPromptModal.dataset.id = this.closest('a').dataset.id;

            systemPromptModal.style.display === 'none' ? systemPromptModal.style.display = 'flex' : systemPromptModal.style.display = 'none'
            systemPromptModal_input.value = systemPromptModal_input_content;
        });
    });
}

function setSystemPromptModal(){
    const systemPromptModal = document.getElementById('systemPromptModal');
    const modalButtons= systemPromptModal.querySelectorAll('button');

    const systemPromptModal_input = document.getElementById('systemPromptModal_input');

    const fixButton = modalButtons[0];
    const closeButton = modalButtons[1];

    closeButton.addEventListener('click', function (){
        systemPromptModal.style.display = 'none';
    })

    fixButton.addEventListener('click', function (){

        if(fixButton.innerText === '수정') {
            fixButton.innerText = '저장'
            systemPromptModal_input.removeAttribute('readonly');
        } else if(fixButton.innerText === '저장') {
            fixButton.innerText = '수정'
            const prompt = systemPromptModal_input.value;
            const systemPromptModal = document.getElementById('systemPromptModal');
            const currentId = systemPromptModal.dataset.id;
            const changedPrompt=document.getElementById(currentId);
            changedPrompt.dataset.content = prompt;
            systemPromptModal_input.setAttribute('readonly', true);
        }
    })
}

function setSystemPromptButtonEvent() {
    const btn_get_prompt = document.getElementById('btn_get_prompt');
    const sys_prompt_content = document.getElementById('sys_prompt_content');
    const sys_prompt_List = sys_prompt_content.querySelectorAll('.board li');
    const sys_prompt_content_span = sys_prompt_content.querySelector('.contentsCard.flex-grow-1 span');

    btn_get_prompt.addEventListener('click',() => {
        const btn_get_prompt_i = btn_get_prompt.querySelector('i');
        const isSystemInfo = btn_get_prompt_i.classList.contains('is-system-info');
        btn_get_prompt_i.classList.toggle('is-system-info', !isSystemInfo);
        btn_get_prompt_i.classList.toggle('is-system-complete', isSystemInfo);
        sys_prompt_content.style.display = isSystemInfo ? 'block' : 'none';
    })
    const sysPromptContent = document.getElementById('sys_prompt_content');
    const sysPromptContentSpan = document.getElementById('sys_prompt_content_span'); // 명확한 변수 선언 가정

    sys_prompt_List.forEach(sysPrompt => {
        const badgeFinish = sysPrompt.querySelectorAll('.badge')[1]; // 두 번째 badge

        badgeFinish.addEventListener('click', () => {
            const allFinishBadges = sysPromptContent.querySelectorAll('.board li .badge.is-ing');

            // 현재 배지 외의 모든 배지 상태 초기화
            allFinishBadges.forEach(badge => {
                if (badge !== badgeFinish) {
                    badge.classList.remove('is-ing');
                    badge.classList.add('is-finish');
                }
            });

            // 현재 클릭된 badge 상태 전환
            const isCurrentlyActive = badgeFinish.classList.contains('is-ing');
            badgeFinish.classList.toggle('is-ing', !isCurrentlyActive);
            badgeFinish.classList.toggle('is-finish', isCurrentlyActive);

            // context 내용 업데이트
            const currentActiveBadge = sysPromptContent.querySelector('.board li .badge.is-ing');
            sysPromptContentSpan.innerHTML = currentActiveBadge?.dataset.context.replace(/\n/g, "<br>") || '';
        });
    });
}
function createMultiFileEvent(injectedFormData) {
    const infoBox = document.getElementById('attachmentInfo');
    const dropZone = document.querySelector('[data-function="dropZone"]');
    const attachmentList = document.querySelector('[data-function="attachmentList"]');
    const fileButton = document.getElementById('file_button');
    const fileInput = document.getElementById('file_input');

    let formData = injectedFormData;
    let dragOverTimer = null;

    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    // Visual feedback for dragover
    dropZone.addEventListener("dragover", () => {
        dropZone.classList.add("dragover");
        clearTimeout(dragOverTimer);
        dragOverTimer = setTimeout(() => {
            dropZone.classList.remove("dragover");
        }, 100);
    });

    // Handle file drop
    dropZone.addEventListener("drop", (e) => {
        dropZone.classList.remove("dragover");
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 1) {
            alert('파일은 하나만 가능합니다.');
            return;
        }
        replaceFile(files[0]);
    });

    // Handle file button click
    fileButton.addEventListener("click", () => fileInput.click());

    // Handle file input change
    fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 1) {
            alert('파일은 하나만 가능합니다.');
            return;
        }
        replaceFile(files[0]);
        fileInput.value = ''; // reset input
    });

    // Handle delete button
    attachmentList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('[data-function="fileDelete"]');
        if (!deleteBtn) return;

        deleteAttachment(formData);
    });

    // Replace current file with new one
    function replaceFile(file) {
        if (!file) return;

        const ext = file.name.split('.').pop().toLowerCase();
        if (ext !== 'pdf') {
            alert('PDF 파일만 업로드할 수 있습니다.');
            return;
        }

        deleteAttachment(formData); // 기존 파일 제거
        formData.append('files', file);
        addAttachmentItem(file);
        infoBox.style.display = "none";
    }

    // Remove attachment from UI & FormData
    function deleteAttachment(formData) {
        const existing = attachmentList.querySelector('.attachment');
        if (existing) existing.remove();
        for (const key of Array.from(formData.keys())) {
            formData.delete(key);
        }
        infoBox.style.display = 'none';
    }

    // Create and append attachment item to UI
    function addAttachmentItem(file) {
        const item = document.createElement("div");
        item.className = "attachment";
        item.dataset.filename = file.name;

        item.innerHTML = `
            <i class="icon is-40 is-file-pdf"></i>
            <span class="title">${file.name}</span>
            <span class="size">${(file.size / 1024 / 1024).toFixed(2)}MB</span>
            <div class="d-flex">
                <button type="button" class="btn has-icon" data-function="fileDelete">
                    <i class="icon is-24 is-file-delete"></i>
                </button>
            </div>
        `;

        attachmentList.appendChild(item);
    }
}

function sendEvent(formData){
    const sendButton = document.querySelector('.btn.chatSendBtn');
    const attachmentList = document.querySelector('[data-function="attachmentList"]');
    const rfpRequestTextarea = document.getElementById('rfpRequest');

    rfpRequestTextarea.addEventListener('keydown', e => {
        // Shift+Enter 로 줄 바꾸기를 허용하려면 !e.shiftKey 조건을 추가
        if (e.key === 'Enter') {
            e.preventDefault();         // textarea에 줄바꿈이 입력되는 기본 동작 방지
            sendButton.click();          // '저장' 또는 '수정' 버튼 강제 클릭
        }
    });

    sendButton.addEventListener('click', () => {
        const chatBoxBody = document.querySelector('.chatBox__body');
        const url = window.location.origin + '/ai/api/rfp/question';
        const rfpRequest = document.getElementById('rfpRequest').value;
        const sysPromptId = document.querySelector('.pageMenu.is-twoDepth').querySelector('.is-active').id
        const sysPrompt= document.getElementById(sysPromptId).dataset.content;
        formData.append("question",rfpRequest)
        formData.append("sysPrompt",sysPrompt)
        _isDorothyProcessEventHandler(true);
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(serverData => {
            return serverData.json();
        })
        .then(parsed => {
            try {
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
        })
        .then(rfpResponse => {
            const reqDiv = createChatMessage(rfpRequest);
            const resDiv = createDorothyMessage(rfpRequest,rfpResponse);
            chatBoxBody.append(reqDiv);
            chatBoxBody.append(resDiv);
        })
        .then(() => {
            const existing = attachmentList.querySelector('.attachment');
            if (existing) existing.remove();
            document.getElementById('rfpRequest').value = ''
        })
        .then(() => {
            _isDorothyProcessEventHandler(false);
        })
        .catch(error => {
            _isDorothyProcessEventHandler(false);
            console.error(error);
        });
    });

    function _isDorothyProcessEventHandler (isProcess){

        const newText = '현재 도로시 대기중 입니다.';
        if(isProcess){
            document.getElementById("__contents__loading").innerHTML = `
                      <div class="loading">
                        <div class="spinner">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                      ${newText}
                    `;
            const __contents__loading = document.getElementById("__contents__loading");
            __contents__loading.style.removeProperty("display");
            __contents__loading.style.removeProperty("opacity");
            __contents__loading.style.removeProperty("visibility");

            __contents__loading.style.display="flex";
        } else {
            document.getElementById("__contents__loading").style.display="none";
        }
    }


    function createChatMessage(rfpRequest) {
        const wrapper = document.createElement("div");
        wrapper.className = "chatBox__chat is-right";

        const userDiv = document.createElement("div");
        userDiv.className = "chatBox__user";

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = "";

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        const now = new Date();
        dateSpan.textContent = now.toLocaleString(); // 예: 2025. 6. 17. 오후 2:38

        userDiv.appendChild(nameSpan);
        userDiv.appendChild(dateSpan);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "d-flex align-items-start gap-10";

        const chatCard = document.createElement("div");
        chatCard.className = "chatCard";

        const chatCardGroup = document.createElement("div");
        chatCardGroup.className = "chatCard__group";
        chatCardGroup.id = ""; // id 속성만 유지

        const card = document.createElement("div");
        card.className = "card";

        const cardText = document.createElement("div");
        cardText.className = "card__text";
        cardText.textContent = rfpRequest;

        // 조립
        card.appendChild(cardText);
        chatCardGroup.appendChild(card);
        chatCard.appendChild(chatCardGroup);
        contentWrapper.appendChild(chatCard);

        wrapper.appendChild(userDiv);
        wrapper.appendChild(contentWrapper);

        return wrapper;
    }

    function createDorothyMessage(rfpRequest,rfpResponse) {
        const wrapper = document.createElement("div");
        wrapper.className = "chatBox__chat is-dorothy";

        const userDiv = document.createElement("div");
        userDiv.className = "chatBox__user";

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = "도로시";

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        const now = new Date();
        dateSpan.textContent = now.toLocaleString(); // 예: 2025. 6. 17. 오후 2:38

        userDiv.appendChild(nameSpan);
        userDiv.appendChild(dateSpan);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "d-flex align-items-start gap-10";

        const userThumb = document.createElement("div");
        userThumb.className = "userThumb is-dorothy";

        const userThumbImg = document.createElement("div");
        userThumbImg.className = "userThumb__img";
        userThumb.appendChild(userThumbImg);

        const chatCard = document.createElement("div");
        chatCard.className = "chatCard";

        const chatCardGroup = document.createElement("div");
        chatCardGroup.className = "chatCard__group";
        chatCardGroup.id = ""; // 유지

        const card = document.createElement("div");
        card.className = "card";

        // ✅ replyBox
        const replyBox = document.createElement("div");
        replyBox.className = "replyBox";

        const replyHeader = document.createElement("div");
        replyHeader.className = "replyBox__header";

        const replyTarget = document.createElement("div");
        replyTarget.className = "replyBox__target";

        const replyTo = document.createElement("span");
        replyTo.textContent = "질문";

        replyTarget.appendChild(replyTo);
        replyTarget.appendChild(document.createTextNode(" 에 대한 응답"));

        const replyCloseBtn = document.createElement("button");
        replyCloseBtn.type = "button";
        replyCloseBtn.className = "btn";

        replyHeader.appendChild(replyTarget);
        replyHeader.appendChild(replyCloseBtn);

        const replyBody = document.createElement("div");
        replyBody.className = "replyBox__body";
        replyBody.innerHTML = rfpRequest.replace(/\n/g, "<br>");

        replyBox.appendChild(replyHeader);
        replyBox.appendChild(replyBody);

        // ✅ card__text
        const cardText = document.createElement("div");
        cardText.className = "card__text";
        cardText.innerHTML = rfpResponse.replace(/\n/g, "<br>");

        card.appendChild(replyBox);
        card.appendChild(cardText);

        chatCardGroup.appendChild(card);
        chatCard.appendChild(chatCardGroup);

        contentWrapper.appendChild(userThumb);
        contentWrapper.appendChild(chatCard);

        wrapper.appendChild(userDiv);
        wrapper.appendChild(contentWrapper);

        return wrapper;
    }
}
