// UI 관련 유틸리티 클래스
class UIUtils {
    static hideElement(element) {
        if (element) element.style.display = 'none';
    }

    static showElement(element, display = 'block') {
        if (element) element.style.display = display;
    }

    static toggleElement(element, display = 'block') {
        if (!element) return;
        element.style.display = element.style.display === 'none' ? display : 'none';
    }

    static formatDateTime(date = new Date()) {
        return date.toLocaleString();
    }

    static formatFileSize(bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    }

    static sanitizeHTML(text) {
        return text.replace(/\n/g, "<br>");
    }
}

// 시스템 프롬프트 관리 클래스
class SystemPromptManager {
    constructor() {
        this.modal = null;
        this.modalInput = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('systemPromptModal');
        this.modalInput = document.getElementById('systemPromptModal_input');
        this.setupMenuEvents();
        this.setupIconEvents();
        this.setupModalEvents();
        this.setupPromptButtonEvents();
    }

    setupMenuEvents() {
        const liGroup = document.querySelectorAll('.pageMenu.is-twoDepth li');

        liGroup.forEach(li => {
            li.addEventListener('click', () => {
                const anchor = li.querySelector('a');
                if (!anchor) return;

                // 모든 active 상태 제거
                liGroup.forEach(el => {
                    const a = el.querySelector('a');
                    if (a) a.classList.remove('is-active');
                });

                // 클릭된 항목만 활성화
                anchor.classList.add('is-active');
            });
        });
    }

    setupIconEvents() {
        const tooltipGroup = document.querySelectorAll('.pageMenu.is-twoDepth li .tooltip');

        tooltipGroup.forEach(tooltip => {
            tooltip.addEventListener('click', () => {
                const icon = tooltip.querySelector('i');
                if (!icon) return;

                const anchor = tooltip.closest('a');
                const content = anchor.dataset.content;
                const id = anchor.dataset.id;

                this.openModal(id, content);
            });
        });
    }

    setupModalEvents() {
        if (!this.modal) return;

        const buttons = this.modal.querySelectorAll('button');
        const [editButton, closeButton] = buttons;

        closeButton.addEventListener('click', () => this.closeModal());
        editButton.addEventListener('click', () => this.handleEditButton(editButton));
    }

    setupPromptButtonEvents() {
        const btnGetPrompt = document.getElementById('btn_get_prompt');
        const sysPromptContent = document.getElementById('sys_prompt_content');
        const sysPromptList = sysPromptContent.querySelectorAll('.board li');
        const sysPromptContentSpan = document.getElementById('sys_prompt_content_span');

        btnGetPrompt.addEventListener('click', () => {
            const icon = btnGetPrompt.querySelector('i');
            const isSystemInfo = icon.classList.contains('is-system-info');

            icon.classList.toggle('is-system-info', !isSystemInfo);
            icon.classList.toggle('is-system-complete', isSystemInfo);
            sysPromptContent.style.display = isSystemInfo ? 'block' : 'none';
        });

        sysPromptList.forEach(sysPrompt => {
            const badgeFinish = sysPrompt.querySelectorAll('.badge')[1];

            badgeFinish.addEventListener('click', () => {
                this.handleBadgeClick(badgeFinish, sysPromptContent, sysPromptContentSpan);
            });
        });
    }

    openModal(id, content) {
        if (!this.modal || !this.modalInput) return;

        this.modal.dataset.id = id;
        this.modalInput.value = content;
        UIUtils.showElement(this.modal, 'flex');
    }

    closeModal() {
        UIUtils.hideElement(this.modal);
    }

    handleEditButton(button) {
        if (button.innerText === '수정') {
            button.innerText = '저장';
            this.modalInput.removeAttribute('readonly');
        } else if (button.innerText === '저장') {
            button.innerText = '수정';
            this.savePrompt();
            this.modalInput.setAttribute('readonly', true);
        }
    }

    savePrompt() {
        const prompt = this.modalInput.value;
        const currentId = this.modal.dataset.id;
        const promptElement = document.getElementById(currentId);

        if (promptElement) {
            promptElement.dataset.content = prompt;
        }
    }

    handleBadgeClick(badgeFinish, sysPromptContent, sysPromptContentSpan) {
        const allFinishBadges = sysPromptContent.querySelectorAll('.board li .badge.is-ing');

        // 다른 모든 배지 비활성화
        allFinishBadges.forEach(badge => {
            if (badge !== badgeFinish) {
                badge.classList.remove('is-ing');
                badge.classList.add('is-finish');
            }
        });

        // 현재 배지 토글
        const isCurrentlyActive = badgeFinish.classList.contains('is-ing');
        badgeFinish.classList.toggle('is-ing', !isCurrentlyActive);
        badgeFinish.classList.toggle('is-finish', isCurrentlyActive);

        // 활성화된 배지 내용 표시
        const currentActiveBadge = sysPromptContent.querySelector('.board li .badge.is-ing');
        sysPromptContentSpan.innerHTML = currentActiveBadge?.dataset.context.replace(/\n/g, "<br>") || '';
    }

    getCurrentPrompt() {
        const activeElement = document.querySelector('.pageMenu.is-twoDepth .is-active');
        return activeElement ? document.getElementById(activeElement.id).dataset.content : '';
    }
}

// 파일 관리 클래스
class FileManager {
    constructor(formData) {
        this.formData = formData;
        this.allowedExtensions = ['pdf', 'txt', 'doc'];
        this.maxFiles = 1;
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupFileInput();
        this.setupDeleteEvent();
    }

    setupDragAndDrop() {
        const dropZone = document.querySelector('[data-function="dropZone"]');
        if (!dropZone) return;

        let dragOverTimer = null;

        // 드래그 이벤트 방지
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // 드래그 오버 효과
        dropZone.addEventListener("dragover", () => {
            dropZone.classList.add("dragover");
            clearTimeout(dragOverTimer);
            dragOverTimer = setTimeout(() => {
                dropZone.classList.remove("dragover");
            }, 100);
        });

        // 파일 드롭 처리
        dropZone.addEventListener("drop", (e) => {
            dropZone.classList.remove("dragover");
            const files = Array.from(e.dataTransfer.files);
            this.handleFiles(files);
        });
    }

    setupFileInput() {
        const fileButton = document.getElementById('file_button');
        const fileInput = document.getElementById('file_input');

        if (fileButton && fileInput) {
            fileButton.addEventListener("click", () => fileInput.click());
            fileInput.addEventListener("change", (e) => {
                const files = Array.from(e.target.files);
                this.handleFiles(files);
                fileInput.value = '';
            });
        }
    }

    setupDeleteEvent() {
        const attachmentList = document.querySelector('[data-function="attachmentList"]');
        if (!attachmentList) return;

        attachmentList.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('[data-function="fileDelete"]');
            if (deleteBtn) {
                this.deleteAttachment();
            }
        });
    }

    handleFiles(files) {
        if (files.length > this.maxFiles) {
            alert(`파일은 ${this.maxFiles}개만 가능합니다.`);
            return;
        }

        const file = files[0];
        if (!this.validateFile(file)) return;

        this.replaceFile(file);
    }

    validateFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        if (!this.allowedExtensions.includes(ext)) {
            alert(`${this.allowedExtensions.join(', ').toUpperCase()} 파일만 업로드할 수 있습니다.`);
            return false;
        }
        return true;
    }

    replaceFile(file) {
        this.deleteAttachment();
        this.formData.append('files', file);
        this.addAttachmentItem(file);
        this.hideInfoBox();
    }

    deleteAttachment() {
        const attachmentList = document.querySelector('[data-function="attachmentList"]');
        const existing = attachmentList?.querySelector('.attachment');

        if (existing) {
            existing.remove();
        }

        // FormData 초기화
        for (const key of Array.from(this.formData.keys())) {
            this.formData.delete(key);
        }

        this.hideInfoBox();
    }

    addAttachmentItem(file) {
        const attachmentList = document.querySelector('[data-function="attachmentList"]');
        if (!attachmentList) return;

        const item = document.createElement("div");
        item.className = "attachment";
        item.dataset.filename = file.name;

        item.innerHTML = `
            <i class="icon is-40 is-file-pdf"></i>
            <span class="title">${file.name}</span>
            <span class="size">${UIUtils.formatFileSize(file.size)}</span>
            <div class="d-flex">
                <button type="button" class="btn has-icon" data-function="fileDelete">
                    <i class="icon is-24 is-file-delete"></i>
                </button>
            </div>
        `;

        attachmentList.appendChild(item);
    }

    hideInfoBox() {
        const infoBox = document.getElementById('attachmentInfo');
        UIUtils.hideElement(infoBox);
    }
}

// 채팅 메시지 생성 클래스
class ChatMessageBuilder {
    static createUserMessage(content) {
        const wrapper = document.createElement("div");
        wrapper.className = "chatBox__chat is-right";

        const userDiv = document.createElement("div");
        userDiv.className = "chatBox__user";

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = "";

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = UIUtils.formatDateTime();

        userDiv.appendChild(nameSpan);
        userDiv.appendChild(dateSpan);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "d-flex align-items-start gap-10";

        const chatCard = document.createElement("div");
        chatCard.className = "chatCard";

        const chatCardGroup = document.createElement("div");
        chatCardGroup.className = "chatCard__group";

        const card = document.createElement("div");
        card.className = "card";

        const cardText = document.createElement("div");
        cardText.className = "card__text";
        cardText.textContent = content;

        card.appendChild(cardText);
        chatCardGroup.appendChild(card);
        chatCard.appendChild(chatCardGroup);
        contentWrapper.appendChild(chatCard);

        wrapper.appendChild(userDiv);
        wrapper.appendChild(contentWrapper);

        return wrapper;
    }

    static createDorothyMessage(file_name,question, response) {
        const wrapper = document.createElement("div");
        wrapper.className = "chatBox__chat is-dorothy";

        const userDiv = document.createElement("div");
        userDiv.className = "chatBox__user";

        const nameSpan = document.createElement("span");
        nameSpan.className = "name";
        nameSpan.textContent = "도로시";

        const dateSpan = document.createElement("span");
        dateSpan.className = "date";
        dateSpan.textContent = UIUtils.formatDateTime();

        userDiv.appendChild(nameSpan);
        userDiv.appendChild(dateSpan);

        const contentWrapper = document.createElement("div");
        contentWrapper.className = "d-flex align-items-start gap-10";

        const userThumb = document.createElement("div");
        userThumb.className = "userThumb is-dorothy";
        userThumb.appendChild(document.createElement("div")).className = "userThumb__img";

        const chatCard = document.createElement("div");
        chatCard.className = "chatCard";

        const chatCardGroup = document.createElement("div");
        chatCardGroup.className = "chatCard__group";

        const card = document.createElement("div");
        card.className = "card";

        // 답변 박스 생성
        const replyBox = this.createReplyBox(file_name,question);
        card.appendChild(replyBox);

        const cardText = document.createElement("div");
        cardText.className = "card__text";
        const formatted = response.replace(/\n/g, '<br>');
        cardText.innerHTML = formatted;

        card.appendChild(cardText);
        chatCardGroup.appendChild(card);
        chatCard.appendChild(chatCardGroup);

        contentWrapper.appendChild(userThumb);
        contentWrapper.appendChild(chatCard);

        wrapper.appendChild(userDiv);
        wrapper.appendChild(contentWrapper);

        return wrapper;
    }

    static createReplyBox(file_name,question) {
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
        /*replyBody.appendChild(document.createTextNode('<strong>회의록 파일:</strong>'+file_name+" 에 대한" ));*/

        const labelStrong = document.createElement("strong");
        labelStrong.textContent = "회의록 파일:";            // 굵게
        const nameStrong = document.createElement("strong");
        nameStrong.style.color = "#007bff";                 // 글자색
        nameStrong.textContent = file_name;                 // 파일명

        replyBody.append(labelStrong," ",nameStrong," 에 대한");
        replyBody.appendChild(document.createElement("br"));
        replyBody.appendChild(document.createTextNode("내용이 아래와 같이 정리 됐습니다."));

        replyBox.appendChild(replyHeader);
        replyBox.appendChild(replyBody);

        return replyBox;
    }
}

// 채팅 서비스 클래스
class ChatService {
    constructor(formData, systemPromptManager) {
        this.formData = formData;
        this.systemPromptManager = systemPromptManager;
        this.isProcessing = false;
        this.apiUrl = window.location.origin + '/ai/api/meeting/question';
        this.init();
    }

    init() {
        this.setupSendEvents();
    }

    setupSendEvents() {
        const sendButton = document.querySelector('.btn.chatSendBtn');
        const textarea = document.getElementById('rfpRequest');

        if (sendButton) {
            sendButton.addEventListener('click', () => this.handleSend());
        }

        if (textarea) {
            textarea.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSend();
                }
            });
        }
    }

    async handleSend() {
        if (this.isProcessing) return;

        const textarea = document.getElementById('rfpRequest');
        const message = textarea.value.trim();

        if (!message) return;

        this.isProcessing = true;

        try {
            this.showLoading(true);

            const response = await this.sendMessage(message);
            this.displayMessages(message, response);
            this.clearInput();

        } catch (error) {
            console.error('전송 중 오류:', error);
        } finally {
            this.isProcessing = false;
            this.showLoading(false);
            this.clearInput();
            const scrollBody = document.querySelector(".messenger__body .chatBox [data-overlayscrollbars-viewport]");
            // 모든 메시지를 append한 후에 하단으로 스크롤 이동
            scrollBody.scrollTo({
                top: scrollBody.scrollHeight
                //,behavior: 'smooth'
            });
        }
    }
    async sendMessage(message) {
        const sendFormData = new FormData();

        // 기존 formData 복사
        for (const [key, value] of this.formData.entries()) {
            sendFormData.append(key, value);
        }

        sendFormData.append("question", message);
        sendFormData.append("sysPrompt", this.systemPromptManager.getCurrentPrompt());

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            body: sendFormData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const raw1  = await response.text();            // "{'overview': ... }"
        const obj1 = JSON.parse(raw1);       // {code:0, data:"{...}"}

        /* 2단계 : obj1.data 문자열 → 중간 JSON */
        const obj2 = JSON.parse(obj1.data);  // {code:200, data:"{'overview':...'}"}

        /* 3단계 : obj2.data 문자열 → 가짜 JSON → 진짜 JSON */
        let raw3 = obj2.data;                //  ' 가 들어 있는 문자열

        // 3-1) 앞뒤 큰따옴표(글자 그대로 " ) 제거 (있다면)
        if (raw3.startsWith('"') && raw3.endsWith('"')) {
            raw3 = raw3.slice(1, -1);
        }

        // 3-2) \n, \t 같은 이스케이프 복구
        raw3 = raw3.replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"');   // \" → "

        // 3-3) 작은따옴표 → 큰따옴표 (키·값 모두)
        //      * 값 안에 ' 가 들어 있을 때는 깨질 수 있으므로
        //        가능하면 백엔드 수정이 정석!
        const safe = raw3.replace(/'/g, '"');

        /* 3-4) 최종 파싱 */
        const data = JSON.parse(safe);       // {overview:{...}, mainTopics:[...], ...}

        let result_doc = ""

        let actionItems = data.actionItems;
        let decisions = data.decisions;
        let mainTopics = data.mainTopics;
        let overview = data.overview;
        let blank = '&nbsp;';
/*        result_doc += '\t\t주제:\t' + overview.subject + '\t\n';*/
        // 주제 한 줄(볼드 + 가운데 정렬)
        result_doc += blank + blank + blank + blank + blank +
            '<span style="display:block; text-align:center;">' +
            '<strong>주제:</strong>' +
            UIUtils.sanitizeHTML(overview.subject) +
            '</span>\n' ;
        let attendees = overview.attendees
        if(attendees != null && attendees !== '') result_doc += '<strong>              참석자:</strong> ' + attendees;
        let att = ''
        for(let i=0; i<attendees.length; i++) {
            att += ', ' + attendees[i]
        }
        att = att.substr(2);


        result_doc += att + '\n';

        result_doc += '<strong>              일자:</strong> '
        let docDate = overview.date;
        if(docDate != null && docDate !== '') result_doc += docDate;
        result_doc += '\n';

        let docLocation = overview.location;
        if(docLocation != null && docLocation !== '') result_doc += '<strong>              장소:</strong> ' + docLocation;
        result_doc += '\n\n';

        result_doc += '<strong>              회의 내용:</strong> <br>';

        if(mainTopics.length > 0) {
            result_doc += blank + '<strong>              주요 내용:</strong> <br>';
            for(let i=0; i<mainTopics.length; i++) {
                result_doc += blank + blank
                    + (i+1) + '. ' + mainTopics[i].topic + '\n';
                let top_dtl =  mainTopics[i].details;
                for(let j=0; j<top_dtl.length; j++) {
                    result_doc += blank + blank + blank
                        + '- ' + top_dtl[j] + '\n'
                }
            }
            if(decisions.length > 0 || actionItems.length > 0)  result_doc += '\n'
        }

        if(decisions.length > 0) {
            result_doc += blank + '<strong>              결정 사항:</strong> <br>';
            for(let i=0; i<decisions.length; i++) {
                result_doc += blank + blank
                    + '- ' + decisions[i] + '\n'
            }
            if(actionItems.length > 0) result_doc += '\n'
        }

        if(actionItems.length > 0) {
            result_doc += blank + '<strong>              액션 아이템:</strong> <br>';
            for(let i=0; i<actionItems.length; i++) {
                result_doc += blank + blank
                    + (i+1) + '. ' + actionItems[i].task
                let responsible = actionItems[i].responsible;
                let dueDate = actionItems[i].dueDate;
                if(responsible != '') {
                    result_doc += ' (' + responsible
                    if(dueDate != '') {
                        result_doc += ', ' + dueDate
                    }
                    result_doc += ')' + '\n'
                } else {
                    if(dueDate != '') {
                        result_doc += ' (' + dueDate + ')' + '\n'
                    }
                }
            }
        }

        return result_doc;
    }

    displayMessages(question, response) {
        const chatBoxBody = document.querySelector('.chatBox__body');
        if (!chatBoxBody) return;
        const file = this.formData.get("files")
        const userMessage = ChatMessageBuilder.createUserMessage(question);
        const dorothyMessage = ChatMessageBuilder.createDorothyMessage(file.name,question, response);

        chatBoxBody.appendChild(userMessage);
        chatBoxBody.appendChild(dorothyMessage);

        // 스크롤을 최하단으로
        chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
    }

    clearInput() {
        const textarea = document.getElementById('rfpRequest');
        const attachmentList = document.querySelector('[data-function="attachmentList"]');

        if (textarea) textarea.value = '';

        const existing = attachmentList?.querySelector('.attachment');
        if (existing) existing.remove();
    }

    showLoading(show) {
        const loadingElement = document.getElementById("__contents__loading");
        if (!loadingElement) return;

        if (show) {
            loadingElement.innerHTML = `
                <div class="loading">
                    <div class="spinner">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                현재 도로시 대기중 입니다.
            `;
            loadingElement.style.display = "flex";
        } else {
            loadingElement.style.display = "none";
        }
    }
}

// 메인 애플리케이션 클래스
class ChatApplication {
    constructor() {
        this.formData = new FormData();
        this.systemPromptManager = null;
        this.fileManager = null;
        this.chatService = null;
    }

    async init() {
        try {
            this.hideLoadingScreen();
            this.initializeManagers();
        } catch (error) {
            console.error('초기화 중 오류:', error);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById("loading-screen");
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }
    }

    initializeManagers() {
        this.systemPromptManager = new SystemPromptManager();
        this.fileManager = new FileManager(this.formData);
        this.chatService = new ChatService(this.formData, this.systemPromptManager);
    }
}

// 애플리케이션 시작
document.addEventListener("DOMContentLoaded", async function () {
    const app = new ChatApplication();
    await app.init();
});