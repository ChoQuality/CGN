package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dto.TblComFileDto;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.FileDirType;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileUtils {

    private static String fileUploadPath;

    private static String fileMaxSize;

    private static List<String> fileAllowedExtensions;

    @Value("${file.common.rootPath}")
    public void setFileUploadPath(String fileUploadPath) {
        FileUtils.fileUploadPath = fileUploadPath;
    }

    @Value("${file.common.maxSize}")
    public void setFileMaxSize(String fileMaxSize) {
        FileUtils.fileMaxSize = fileMaxSize;
    }

    @Value("${file.common.allowedExtensions}")
    public void setAllowedExtensions(List<String> fileAllowedExtensions) {
        FileUtils.fileAllowedExtensions = fileAllowedExtensions;
    }

    public static String normalizeFileName(String fileName) {
        if (fileName == null) {
            return null;
        }
        return Normalizer.normalize(fileName, Normalizer.Form.NFC);
    }

    // fileDirType : 유형
    public static TblComFileDto upload(String corpCd, FileDirType fileDirType, List<String> savePath, MultipartFile file) {
        try {
            TblComFileDto result = new TblComFileDto();

            List<String> savePathList = new ArrayList<>(savePath);

            result.setFileType(validateFile(file));
            savePathList.addFirst(fileDirType.getDirName());
            savePathList.addFirst(corpCd);
            savePathList.addFirst(fileUploadPath);

            String dirPath = String.join(File.separator, savePathList);
            result.setFileUuid(String.valueOf(UUID.randomUUID()));

            String normalizedFileName = normalizeFileName(file.getOriginalFilename());
            result.setFileNm(normalizedFileName);
            result.setFileSize((int) file.getSize());
            result.setUseFlag(1);

            Files.createDirectories(Path.of(dirPath));

            // Validate file extension
            String saveFileName = normalizedFileName;
            saveFileName = saveFileName.substring( 0, saveFileName.lastIndexOf('.') );
            int fileSeq = 0;
            while(true) {
                Path targetLocation = Paths.get(dirPath).resolve(StringUtils.deleteWhitespace(saveFileName) + "_" + fileSeq + "." + result.getFileType() );
                if(!Files.exists(targetLocation)) {
                    Files.copy(file.getInputStream(), targetLocation);
                    result.setFilePath(targetLocation.toAbsolutePath().toString());
                    result.setSavedFileNm(StringUtils.deleteWhitespace(saveFileName) + "_" + fileSeq);
                    break;
                } else {
                    fileSeq ++;
                }
            }

            return result;
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FILE_UPLOAD_FAIL, e.toString());
        }
    }

    public static String uniqueUUIDString(Integer digit) {
        String random = UUID.randomUUID().toString();

        if(digit == null) return random;
        if(digit < 1) return random;

        random = random.replaceAll("-", "");
        random = random.substring(0, digit);
        return random;
    }

    // fileDirType : 유형
    public static TblComFileDto uploadImage(String corpCd, FileDirType fileDirType, String fileId, List<String> savePath, MultipartFile file) {
        try {
            TblComFileDto result = new TblComFileDto();

            List<String> savePathList = new ArrayList<>(savePath);

            result.setFileType(validateFile(file));
            savePathList.addFirst(fileDirType.getDirName());
            savePathList.addFirst(corpCd);
            savePathList.addFirst(fileUploadPath);

            String dirPath = String.join(File.separator, savePathList);
            result.setFileUuid(uniqueUUIDString(16));
            result.setFileNm(file.getOriginalFilename());
            result.setFileSize((int) file.getSize());
            result.setUseFlag(1);

            Files.createDirectories(Path.of(dirPath));
            // Validate file extension
            String saveFileName = file.getOriginalFilename();
            saveFileName = saveFileName.substring( 0, saveFileName.lastIndexOf('.') );
            int fileSeq = 0;
            while(true) {
                Path targetLocation = Paths.get(dirPath).resolve(StringUtils.deleteWhitespace(saveFileName) + "_" + fileSeq + "." + result.getFileType() );
                if(!Files.exists(targetLocation)) {
                    Files.copy(file.getInputStream(), targetLocation);
                    result.setFilePath(targetLocation.toAbsolutePath().toString());

                    break;
                } else {
                    fileSeq ++;
                }
            }

            return result;
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FILE_UPLOAD_FAIL, e.toString());
        }
    }

    private static String validateFile(MultipartFile file) {
        // Check file size
        long maxSizeBytes = parseSize(fileMaxSize);
        if (file.getSize() > maxSizeBytes) {
            throw new SDKException(SDKSpec.FILE_CAPACITY_EXCEEDED, String.format("File size exceeds the maximum limit of %s", fileMaxSize));
        }

        // Validate file extension
        String originalFilename = file.getOriginalFilename();
        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new SDKException(SDKSpec.FILE_NOT_ALLOWED, "Invalid file name or missing extension.");
        }

        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
        if (!fileAllowedExtensions.contains(fileExtension)) {
            throw new SDKException(SDKSpec.FILE_NOT_ALLOWED, String.format("File type not allowed. Allowed types: %s", fileAllowedExtensions));
        }

        return fileExtension;
    }

    private static long parseSize(String size) {
        if (size.endsWith("MB")) {
            return Long.parseLong(size.replace("MB", "")) * 1024 * 1024;
        } else if (size.endsWith("KB")) {
            return Long.parseLong(size.replace("KB", "")) * 1024;
        } else {
            throw new IllegalArgumentException("Invalid size format: " + size);
        }
    }

    public static Resource download(String downloadPath) {
        try {
            Path filePath = Paths.get(downloadPath);
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new SDKException(SDKSpec.FILE_NOT_FOUND, "File not found: " + downloadPath);
            }
            return resource;
        } catch (Exception e) {
            throw new SDKException(SDKSpec.FILE_NOT_FOUND, "File not found: " + downloadPath);
        }
    }

    // 이미지 다운로드를 위해 사용.
    public static Resource download(String corpCd, FileDirType fileDirType, List<String> savePath, String fileName) {
        try {
            List<String> savePathList = new ArrayList<>(savePath);

            savePathList.addFirst(fileDirType.getDirName());
            savePathList.addFirst(corpCd);
            savePathList.addFirst(fileUploadPath);

            String dirPath = String.join(File.separator, savePathList);
            Path fileLocation = Paths.get(dirPath).resolve(fileName);

            Resource resource = new UrlResource(fileLocation.toUri());
            if (!resource.exists()) {
                resource = null;
                // throw new SDKException(SDKSpec.FILE_NOT_FOUND, "File not found: " + fileName);
            }
            return resource;
        } catch (Exception e) {
            return null;
//             throw new SDKException(SDKSpec.FILE_NOT_FOUND, "File not found: " + fileName);
        }
    }
}