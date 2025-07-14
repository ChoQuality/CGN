package com.gsbizple.wiz.messenger.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.core.io.Resource;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AttachmentDto {
    private Integer corporateId;
    private Integer attachmentId;
    private Integer messageId;
    private String roomId;
    private String companyId;
    private Integer sendUserKey;
    private String sendUserName;
    private String originFileName;
    private String fileExtension;
    private Integer fileSize;
    private String deletedYn;
    private String savedFilePath;
    private String createDt;
    private Resource resource;
}
