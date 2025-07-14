package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dao.CommonDao;
import com.gsbizple.wiz.common.dto.*;
import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.FileDirType;
import com.gsbizple.wiz.common.spec.LoginStatus;
import com.gsbizple.wiz.common.spec.SDKSpec;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ComUserService {

    @SuppressWarnings("rawtypes")
    private final CommonDao commonDao;

    @SuppressWarnings("unchecked")
    public List<TblComUserDto> findUserList(TblComUserDto userDto) {
        return commonDao.selectList("CommonUserMapper.getComUserList", userDto);
    }

    @SuppressWarnings("unchecked")
    public TblComUserDto findUser(TblComUserDto userDto) {
        TblComUserDto resultDto = (TblComUserDto) commonDao.selectOne("CommonUserMapper.findComUser", userDto);
        if(resultDto.getPluralJobCnt() > 0) {
            List<TblComPluralJobDto> pluralList = (List<TblComPluralJobDto>) commonDao.selectList("CommonUserMapper.getPluralJobList", userDto);
            resultDto.setPluralJobList(pluralList);
        }
        return resultDto;
    }

    @SuppressWarnings("unchecked")
    public int insertUser(TblComUserDto userDto) {
        return commonDao.insert("CommonUserMapper.insertComUser", userDto);
    }

    @SuppressWarnings("unchecked")
    public int updateUserInfo(TblComUserDto userDto) {
        return commonDao.update("CommonUserMapper.updateUserInfo", userDto);
    }

    @SuppressWarnings("unchecked")
    public void updateMyInfo(TblComUserDto userDto) {
        commonDao.update("CommonUserMapper.updateMyInfo", userDto);
    }

    @SuppressWarnings("unchecked")
    public String updateMyInfoReturnPath(TblComUserDto userDto, MultipartFile file, String fileCorpCd) {
        // 파일 저장 경로 설정
        List<String> savePath = List.of(String.valueOf(userDto.getUserKey()));

        // 파일 업로드
        TblComFileDto resultFile = FileUtils.upload(fileCorpCd, FileDirType.USER, savePath, file);
        resultFile.setFileUseFlag(FileDirType.USER.getCode());
        resultFile.setCreateUserKey(userDto.getCreateUserKey());

        // 파일 정보 저장
        commonDao.insert("todo.CommonFileMapper.saveFile", resultFile);

        // 이미지 경로 설정
        String imagePath = String.format("/image/user/%s/%s.%s",
                userDto.getUserKey(),
                resultFile.getSavedFileNm(),
                resultFile.getFileType()
        );

        // 사용자 DTO 업데이트
        userDto.setThumbImgType(resultFile.getFileType());
        userDto.setThumbImgPath(imagePath);
        commonDao.update("CommonUserMapper.updateMyInfo", userDto);

        return imagePath;
    }

    @SuppressWarnings("unchecked")
    public int updateUserPassword(TblComUserDto userDto) {
        return commonDao.insert("CommonUserMapper.updateUserPassword", userDto);
    }

    @SuppressWarnings("unchecked")
    public TblComUserDto updateUserLoginStatus(TblComUserDto userDto) {
        if(userDto.getUserKey() == null) {
            throw new SDKException(SDKSpec.USER_EMPTY, "User Info Empty ! ");
        }
        int updateCnt = switch (LoginStatus.valueOf(userDto.getLoginStatus())) {
            case LOGIN -> commonDao.update("CommonUserMapper.updateLogin", userDto);
            case LOGOFF -> commonDao.update("CommonUserMapper.updateLogoff", userDto);
            default -> commonDao.update("CommonUserMapper.updateLoginStatus", userDto);
        };
        return (TblComUserDto) commonDao.selectOne("CommonUserMapper.findComUser", userDto);
    }


    @SuppressWarnings("unchecked")
    public List<TblComOrgTreeDto> findOrgTree(int corpId) {
        List<TblComOrgTreeDto> resultList = (List<TblComOrgTreeDto>) commonDao.selectList("CommonOrgMapper.getOrgTree", corpId);
        List<TblComOrgTreeDto> comOrgTreeList = new ArrayList<>();

        for(TblComOrgTreeDto source : resultList) {
            if(source.getUpperOrgCd() == null  || source.getUpperOrgCd().isEmpty()) {
                source.setChildren(makeTreeItem(resultList, source.getOrgCd()));
                source.setText(source.getText());
                comOrgTreeList.add(source);
            }
        }

        return comOrgTreeList;
    }

    private List<TblComOrgTreeDto> makeTreeItem(List<TblComOrgTreeDto> sourceList, String orgCd) {
        List<TblComOrgTreeDto> resultList = new ArrayList<>();
        for(TblComOrgTreeDto source : sourceList) {
            if(orgCd.equals(source.getUpperOrgCd())) {
                source.setText(source.getText());
                source.setChildren(makeTreeItem(sourceList, source.getOrgCd()));
                resultList.add(source);
            }
        }
        return resultList;
    }

    @SuppressWarnings("unchecked")
    public List<TblComOrgDto> findByOrgNm(String keyword) {
        return commonDao.selectList("CommonOrgMapper.getComOrgList", keyword);
    }


}