(function(window){

  var dsMultiUpload = function(_id, _options, alertFunc){

    if(!document.getElementById(_id)) return;

    const id = _id;
    var curFileList = [];
    var curFileSize = 0;

    var config = {
      fileMaxSize : 20,
      totalMaxSize : 100,
      asisFileSize : 0, // 기 첨부된 파일 사이즈 설정,
    };

    var alertFunc = alertFunc;

    if(_options){
      config.fileMaxSize = _options.fileMaxSize ? _options.fileMaxSize : config.fileMaxSize;
      config.totalMaxSize = _options.totalMaxSize ? _options.totalMaxSize : config.totalMaxSize;
      config.asisFileSize = _options.asisFileSize ? _options.asisFileSize : config.asisFileSize;
      curFileSize = byteToMB(config.asisFileSize);
      // if(_options.fileList && _options.fileList.length > 0){
      //   curFileList = _options.fileList;
      //   curFileSize = byteToMB(_options.fileList.reduce((tot, file) => { return tot + file.size}, 0));
      // }
    }

    // init multiUpload
    initMultiUpload();
    removeFiles();
    // if(_options && _options.fileList.length > 0)
    //   addFiles(_options.fileList);
    // else
      drawEmptyContent();

    // ------------------- 라이브러리 내에서 사용할 함수들 (private function)  --------------------
    // file upload init fn
    function initMultiUpload()
    {
      const mainEl = document.getElementById(id);
      if(mainEl.childNodes.length > 0) mainEl.innerHTML = '';

      mainEl.innerHTML = drawMultiUploader();

      // OverayScroll 생성
      OverlayScrollbars(document.querySelector(`#${id} .has-scrollbars`), {
        scrollbars: {
          autoHide: "leave",
          autoHideDelay: 700,
        },
      });

      // event init
      multiUploadEventInit();
    }

    // event binding
    function multiUploadEventInit(){
      var fileInput = document.querySelector(`#${id} .file__input`);
      const findBtn = document.querySelector(`#${id} .file__search`);
      const allCheckBtn = document.querySelector(`#${id} .check__all`);
      const removeFilesBtn = document.querySelector(`#${id} .file__remove`);
      const fileListUl = document.querySelector(`#${id} .fileUploadMultiple__list`);
      const fileListBtn = document.querySelector(`#${id} .fileUploadMultiple__delete .btn`)

      // searchBtn event
      findBtn.addEventListener('click' , e => {
        fileInput.click();
      });

      // file search input event
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        if (!files || files.length === 0) return; // 선택 취소한 경우 무시
        addFiles(files);
        removeFiles();
      });

      // file drop event
      fileListUl.addEventListener('drop', e => {
        e.preventDefault();
        const files = [...e.dataTransfer?.files];

        // 👇 드래그 드랍 취소 시 방어
        if (!files || files.length === 0) return;

        addFiles(files);
        removeFiles();
      });

      // drop event를 사용하려면 dragover 필수
      fileListUl.addEventListener('dragover' , e => {
        e.preventDefault();
      });

      // all checkbox event
      allCheckBtn.addEventListener('click', e => {
        const isEmpty = checkEmptyFile();
        const isCheck = e.target.checked;

        if(isEmpty) return;
        // checklist all check or all uncheck
        const liCheckList = document.querySelectorAll(`#${id} .fileUploadMultiple__item input[type=checkbox]`);
        for(let i = 0; i < liCheckList.length; i++){
          const li = liCheckList[i];
          li.checked = isCheck;
        }
      });

      // file removebtn event
      removeFilesBtn.addEventListener('click', e => {
        const isEmpty = checkEmptyFile();
        if(isEmpty) return;

        const liCheckList = document.querySelectorAll(`#${id} .fileUploadMultiple__item input[type=checkbox]`);
        // remove file content
        for(let i = 0; i < liCheckList.length; i++){
          const liCheck = liCheckList[i];
          if(liCheck.checked){
            const li = liCheck.parentElement.parentElement.parentElement.parentElement;
            const fileName = li.childNodes[3].textContent;
            const fileSize = li.childNodes[5].textContent;

            console.log(fileSize);
            if(curFileList.length > 0){
              curFileList.forEach((item, index) => {
                if(item.name === fileName){
                  curFileSize -= Number(fileSize.split('MB')[0]);
                  curFileList.splice(index, 1);
                }
              })
            }
            // 체크된 checkbox file content 삭제
            li.remove();
          }
        }

        const resultCheckList = document.querySelectorAll(`#${id} .fileUploadMultiple__item input[type=checkbox]`);
        if(!resultCheckList || resultCheckList.length === 0){
          const ulContent = document.querySelector(`#${id} .fileUploadMultiple__list`);
          ulContent.innerHTML = `
              <li class="fileUploadMultiple__item is-empty">
                파일을 끌어 업로드 해주세요.
              </li>
          `;
          curFileSize = 0;
        }

        // allCheckBtn unCheck
        syncInputFileList(curFileList);
        allCheckBtn.checked = false;
        const fileSizeSpan = document.querySelector(`#${id} .file__size`);
        fileSizeSpan.innerHTML = `${Number(curFileSize.toFixed(2))}MB / ${config.totalMaxSize} MB`;
      });

    }

    // file 추가
    function addFiles(files){

      if(files.length < 1){
        drawEmptyContent();
        return;
      }

      let totalFilesSize = 0;
      for (let i = 0; i < files.length; i++) {
        totalFilesSize += byteToMB(files[i].size);
      }

      // 기존 파일들이 있을경우 사이즈 합산
      if(curFileList.length > 0)
        totalFilesSize += byteToMB(curFileList.reduce((tot, file) => { return tot + file.size}, 0));

      // 최대파일 사이즈 체크
      if(fileSizeCheck(totalFilesSize, config.totalMaxSize)){
        alertFunc(`첨부된 파일의 용량이 ${config.totalMaxSize}MB를 넘어 첨부가 불가합니다.`);
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const checkFile = files[i];
        if(fileSizeCheck(byteToMB(checkFile.size), config.fileMaxSize)){
          alertFunc(`${checkFile.name} 파일의 용량이 ${config.fileMaxSize}MB를 넘어 첨부가 불가합니다.`);
          return;
        }
      }

      // draw file list html
      const fileList = files;
      const ulContent = document.querySelector(`#${id} .fileUploadMultiple__list`);
      const fileSizeSpan = document.querySelector(`#${id} .file__size`);

      if(fileList.length > 0){
        // 비어 있는 li 삭제
        if(checkEmptyFile()) ulContent.textContent = "";

        for(let i = 0; i < fileList.length; i++){
          const file = fileList[i];
          if(!fileCheckDuplicates(file.name)){
            ulContent.innerHTML += drawFileListContent(file);
            curFileList.push(file);
          }else{
            alert(`${file.name}이 중복되었습니다!`);
            return;
          }
        }
        fileSizeSpan.innerHTML = `${Number(curFileSize.toFixed(2))}MB / ${config.totalMaxSize} MB`;

        syncInputFileList(curFileList);
      }
    }

    function removeFiles(){
      const btn = document.querySelectorAll('.fileUploadMultiple__delete .btn');

      btn.forEach((el) => {
        el.addEventListener('click', e => {
          const isEmpty = checkEmptyFile();
          if(isEmpty) return;

          const li = e.target.closest('li');
          const fileName = li.childNodes[3].textContent;
          const fileSize = li.childNodes[5].textContent;

          if(curFileList.length > 0){
            curFileList.forEach((item, index) => {
              if(item.name === fileName){
                curFileSize -= Number(fileSize.split('MB')[0]);
                curFileList.splice(index, 1);
              }
            })
          }

          li.remove();

          const resultCheckList = document.querySelectorAll(`#${id} .fileUploadMultiple__item`);
          if(resultCheckList.length === 0){
            const ulContent = document.querySelector(`#${id} .fileUploadMultiple__list`);

            ulContent.innerHTML = `
              <li class="fileUploadMultiple__item is-empty">
                파일을 마우스로 끌어 오세요
              </li>
            `;

            curFileSize = byteToMB(config.asisFileSize);
          }

          syncInputFileList(curFileList);

          const fileSizeSpan = document.querySelector(`#${id} .file__size`);
          fileSizeSpan.innerHTML = `${Number(curFileSize.toFixed(2))}MB / ${config.totalMaxSize} MB`;
        });
      })
    }

    // draw empty content
    function drawEmptyContent(){
      const ulContent = document.querySelector(`#${id} .fileUploadMultiple__list`);
      ulContent.innerHTML = `
        <li class="fileUploadMultiple__item is-empty">
          파일을 끌어 업로드 해주세요.
        </li>
      `;
      return;
    }

    // input files에 curFileList sync 맞춰줌
    function syncInputFileList(files){
        var fileInput = document.querySelector(`#${id} .file__input`);

        const dataTranster = new DataTransfer();
        files.forEach(file => {
            dataTranster.items.add(file);
        });
        fileInput.files = dataTranster.files;
    }

    // file list가 비어있는지 체크
    function checkEmptyFile(){
      // empty file check
      const firstLi = document.querySelectorAll(`#${id} .fileUploadMultiple__item`)[0];
      if(!firstLi) return;
      return firstLi.classList.contains('is-empty');
    }

    // 파일이름 중복체크
    function fileCheckDuplicates(fileName) {
      const result = curFileList.find(file => file.name === fileName);
      return result ? true : false;
    }

    // 파일 사이즈 체크
    function fileSizeCheck(size, maxSize){
      return (size > maxSize) ? true : false;
    }

    // file byte size to mb
    function byteToMB(size){
      let mSize = size / (1024 ** 2);
      //mSize = (mSize < 1) ? Number(mSize.toFixed(1)) : Number(mSize.toFixed(0));
      mSize = Number(mSize.toFixed(2));
      return mSize;
    }

    // draw file list li content
    function drawFileListContent(file){
      const fileName = file.name;
      const fileSize = byteToMB(file.size);
      curFileSize += fileSize;
      const li = `
          <li class="fileUploadMultiple__item">
          <div class="fileUploadMultiple__itemCheck is-item">
            <div class="checkGroup">
              <label class="check__label">
                <input type="checkbox" class="check__input">
                <span class="check__style"></span>
              </label>
            </div>
          </div>
          <div class="is-item is-flex-grow"><label>${fileName}</label></div>
          <div class="is-item is-file">${fileSize}MB</div>
          <div class="is-item is-delete fileUploadMultiple__delete"><button class="btn has-icon"><i class="icon is-24 is-wastebasket-24"></i></button></div>
        </li>
      `
      return li;
    }

    // draw multiupload html
    function drawMultiUploader(){
      const mainContentEl = `
        <div class="fileUploadMultiple__top">
          <div class="fileUploadMultiple__topLeft">
            <input type="file" style="display:none" class="file__input" multiple/>
            <div class="btnGroup gap-5">
              <button type="button" class="btn is-secondary is-small file__search">파일찾기</button>
              <button type="button" class="btn is-secondary is-small file__remove">파일삭제</button>
            </div>
          </div>
          <div class="fileUploadMultiple__topRight">
            <div class="description"><i class="icon is-24 is-system-info"></i>최대 ${config.fileMaxSize}MB 까지 첨부 가능합니다. (xlsx, 텍스트 파일)</div>
            <span class="file__size">${curFileSize} MB / ${config.totalMaxSize} MB</span>
          </div>
        </div>
        <div class="fileUploadMultiple__box">
          <div class="fileUploadMultiple__header">
            <div class="is-title has-checkGroup">
              <div class="checkGroup">
                <label class="check__label">
                  <input type="checkbox" class="check__input check__all">
                  <span class="check__style"></span>
                </label>
              </div>
            </div>
            <div class="is-title is-flex-grow">파일명</div>
            <div class="is-title is-file">파일크기</div>
            <div class="is-title is-delete">파일삭제</div>
          </div>
          <div class="fileUploadMultiple__body has-scrollbars is-small">
            <ul class="fileUploadMultiple__list">
            </ul>
          </div>
        </div>
      `;

      return mainContentEl;
    };

    // ------------------- 외부로 노출시킬 함수들 --------------------
    function getFileList(){
      const fileInput = document.querySelector(`#${id} .file__input`);
      return fileInput.files;
    }

    function setFileList(_files){

      if(typeof _files !== 'object' || _files.length === undefined){
        return;
      }

      const ulContent = document.querySelector(`#${id} .fileUploadMultiple__list`);
      if(ulContent.children.length > 0){
         ulContent.innerHTML = "";
      }

      curFileList = [];
      var newFileList = [];
      for (let i = 0; i < _files.length; i++) {
        newFileList.push(_files[i]);
      }

      addFiles(newFileList);
      removeFiles();
    }

    function setAsisFileSize(asisFileSize) {
      if (typeof asisFileSize === "number" && asisFileSize >= 0) {
        config.asisFileSize = asisFileSize;

        curFileSize = byteToMB(config.asisFileSize);
        const fileSizeSpan = document.querySelector(`#${id} .file__size`);
        fileSizeSpan.innerHTML = `${Number(curFileSize.toFixed(2))}MB / ${config.totalMaxSize} MB`;
      } else {
        console.warn("asisFileSize는 0보다 큰 숫자여야 합니다.");
      }
    }

    function deleteAsisFile(fileSize) {
      if (typeof fileSize === "number" && fileSize >= 0) {
        config.asisFileSize -= fileSize;

        curFileSize -= byteToMB(fileSize);
        const fileSizeSpan = document.querySelector(`#${id} .file__size`);
        fileSizeSpan.innerHTML = `${Number(curFileSize.toFixed(2))}MB / ${config.totalMaxSize} MB`;
      } else {
        console.warn("MBFileSize는 0보다 큰 숫자여야 합니다.");
      }
    }

    return {
      id,
      getFileList,
      setFileList,
      setAsisFileSize,
      deleteAsisFile,
    }
  }

  window.dsMultiUpload = dsMultiUpload;

})(window);