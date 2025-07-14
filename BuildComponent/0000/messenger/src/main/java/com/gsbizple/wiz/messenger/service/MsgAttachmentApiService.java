package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.dto.TblComFileDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.common.service.FileUtils;
import com.gsbizple.wiz.common.spec.FileDirType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.AttachmentDto;
import com.gsbizple.wiz.messenger.dto.MessageDto;
import com.gsbizple.wiz.messenger.dto.PaginationData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MsgAttachmentApiService {

    private static final String ATTACHMENT_HISTORY = "AttachmentMapper.getAttachmentHistory";
    private static final String ATTACHMENT_HISTORY_COUNT = "AttachmentMapper.getAttachmentHistoryCount";
    private static final String ATTACHMENT_SAVE = "AttachmentMapper.saveAttachment";
    private static final String ATTACHEMNT_DOWNLOAD = "AttachmentMapper.downloadAttachment";
    private static final String ATTACHMENT_DELETE = "AttachmentMapper.deleteAttachment";
    private static final String ATTACHMENT_MESSAGE_LIST = "AttachmentMapper.getMessageAttachmentList";
    private static final String ATTACHMENT_UPDATE_MESSAGE_ID = "AttachmentMapper.updateAttachmentsMessageId";
    private static final String ATTACHMENT_UPDATE_DELETED_YN = "AttachmentMapper.updateAttachmentDeletedYn";

    private final MessengerDao messengerDao;

    @SuppressWarnings("unchecked")
    public PaginationData getAttachmentHistory(String roomId, Integer pageNum, Integer pageSize) {
        Map<String, Object> params = new HashMap<>();

        params.put("roomId", roomId);
        params.put("offset", (pageNum - 1) * pageSize);  // page * size
        params.put("limit", pageSize); // size

        List<AttachmentDto> attachmentList = messengerDao.selectList(ATTACHMENT_HISTORY, params);
        int totalCount = messengerDao.total(ATTACHMENT_HISTORY_COUNT, params);

        return new PaginationData(attachmentList, totalCount);
    }

    /**
     * 첨부파일 업로드 처리
     * @param multipartFile MultipartFile
     * @param roomId String
     * @return AttachmentDto
     */
    @SuppressWarnings("unchecked")
    public AttachmentDto attachmentUpload(MultipartFile multipartFile, String roomId) {
        String savePath = getSavePath(LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE));
        String originFileName = multipartFile.getOriginalFilename();
        AttachmentDto attachmentDto = getAttachmentDto(roomId, originFileName, FileUtils.upload(SecurityUtils.getSelectedDB(), FileDirType.MSG, List.of(savePath), multipartFile));
        messengerDao.insert(ATTACHMENT_SAVE, attachmentDto);
        return attachmentDto;
    }

    /**
     * 멀티파일 업로드 처리
     * @param files List<MultipartFile>
     * @param roomId String
     * @return List<AttachmentDto>
     */
    @SuppressWarnings("unchecked")
    public List<AttachmentDto> attachmentUploads(List<MultipartFile> files, String roomId) {
        List<AttachmentDto> updateList = new ArrayList<>();
        String savePath = getSavePath(LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE));
        for (MultipartFile file : files) {
            String originFileName = file.getOriginalFilename();
            AttachmentDto attachmentDto = getAttachmentDto(roomId, originFileName, FileUtils.upload(SecurityUtils.getSelectedDB(), FileDirType.MSG, List.of(savePath), file));
            messengerDao.insert(ATTACHMENT_SAVE, attachmentDto);
            updateList.add(attachmentDto);
        }
        return updateList;
    }

    /**
     * 첨부파일 삭제 처리(멀티)
     * @param attachmentDtoList List<AttachmentDto>
     * @return List<AttachmentDto>
     */
    @SuppressWarnings("unchecked")
    public List<AttachmentDto> attachmentDeletes(List<AttachmentDto> attachmentDtoList) {
        messengerDao.delete(ATTACHMENT_DELETE, attachmentDtoList);
        return attachmentDtoList;
    }

    private static String getSavePath(String currentDate) {
        return String.format("%s/%s/%s/"
                , currentDate.substring(0, 4)
                , currentDate.substring(4, 6)
                , currentDate.substring(6, 8)
        );
    }

    /**
     * 메시지별 첨부파일 리스트 조회
     * @param messageDto MessageDto
     * @return List<AttachmentDto>
     */
    @SuppressWarnings("unchecked")
    public List<AttachmentDto> getMessageAttachmentList(MessageDto messageDto){
        return messengerDao.selectList(ATTACHMENT_MESSAGE_LIST, messageDto);
    }

    /**
     * 파일 업로드 후 messageId 값 세팅
     * @param messageDto MessageDto
     * @return int
     */
    @SuppressWarnings("unchecked")
    public int updateAttachmentsMessageId(MessageDto messageDto){
        return messengerDao.update(ATTACHMENT_UPDATE_MESSAGE_ID, messageDto);
    }

    /**
     * 편집에서 삭제된 점부파일을 삭제 처리
     * @param attachmentDto AttachmentDto
     * @return int
     */
    @SuppressWarnings("unchecked")
    public int updateAttachmentDeletedYn(AttachmentDto attachmentDto){
        return messengerDao.update(ATTACHMENT_UPDATE_DELETED_YN, attachmentDto);
    }


    private static AttachmentDto getAttachmentDto(String roomId, String originFileName, TblComFileDto file) {
        AttachmentDto attachmentDto = new AttachmentDto();
        attachmentDto.setRoomId(roomId); // parameter값 현재는 던지지 못해서 하드코딩
        attachmentDto.setSendUserKey(SecurityUtils.getUserKey()); // 인증(로그인) 완료 후 데이터 세팅
        attachmentDto.setOriginFileName(originFileName);
        attachmentDto.setSavedFilePath(file.getFilePath());
        attachmentDto.setFileSize(file.getFileSize());
        attachmentDto.setFileExtension(file.getFileType());
        attachmentDto.setDeletedYn("N");
        return attachmentDto;
    }

    // 첨부파일 다운로드
    @SuppressWarnings("unchecked")
    public AttachmentDto attachmentDownload(Integer attachmentId) {
        AttachmentDto attachmentDto = (AttachmentDto) messengerDao.selectOne(ATTACHEMNT_DOWNLOAD, attachmentId);
        if (attachmentDto == null) {
            throw new SDKException(SDKSpec.ATTACHMENT_EMPTY, "Attachment not found for ID: " + attachmentId);
        }
        attachmentDto.setResource(FileUtils.download(attachmentDto.getSavedFilePath()));
        return attachmentDto;
    }

}
