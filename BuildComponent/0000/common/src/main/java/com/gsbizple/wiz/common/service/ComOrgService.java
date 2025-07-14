package com.gsbizple.wiz.common.service;

import com.gsbizple.wiz.common.dao.CommonDao;
import com.gsbizple.wiz.common.dto.TblComOrgDto;
import com.gsbizple.wiz.common.dto.TblComOrgTreeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ComOrgService {

    @SuppressWarnings("rawtypes")
    private final CommonDao commonDao;

    @SuppressWarnings("unchecked")
    public List<TblComOrgTreeDto> findOrgTree(TblComOrgDto orgDto) {
        List<TblComOrgTreeDto> resultList = (List<TblComOrgTreeDto>) commonDao.selectList("CommonOrgMapper.getOrgTree", orgDto);
        List<TblComOrgTreeDto> comOrgTreeList = new ArrayList<>();

        for(TblComOrgTreeDto source : resultList) {
            if(source.getUpperOrgCd() == null) {
                source.setChildren(makeTreeItem(resultList, source.getOrgCd()));
                comOrgTreeList.add(source);
            }
        }

        return comOrgTreeList;
    }

    private List<TblComOrgTreeDto> makeTreeItem(List<TblComOrgTreeDto> sourceList, String orgCd) {
        List<TblComOrgTreeDto> resultList = new ArrayList<>();
        for(TblComOrgTreeDto source : sourceList) {
            if(orgCd.equals(source.getUpperOrgCd())) {
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