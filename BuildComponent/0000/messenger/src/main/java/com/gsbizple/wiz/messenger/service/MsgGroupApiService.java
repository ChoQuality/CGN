package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.common.security.SecurityUtils;
import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.GroupDto;
import com.gsbizple.wiz.messenger.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MsgGroupApiService {

    private final MessengerDao messengerDao;

    /**
     * 전체 조직정보 조회
     *
     * @return List<GroupDto>
     */
    @SuppressWarnings("unchecked")
    public List<GroupDto> getOrgList() {
        GroupDto groupDto = GroupDto.builder()
                .corporateId(SecurityUtils.getCorporateId())
                .build();
        return (List<GroupDto>) messengerDao.selectList("GroupMapper.getOrgList", groupDto);
    }

    /**
     * 조직명 조회
     *
     * @param groupDto GroupDto
     * @return List<GroupDto>
     */
    @SuppressWarnings("unchecked")
    public List<GroupDto> getGroupSearchList(GroupDto groupDto) {
        groupDto.setCorporateId(SecurityUtils.getCorporateId());
        return messengerDao.selectList("GroupMapper.getGroupSearchList", groupDto);
    }

    /**
     * 그룹의 사용자 목록 조회
     *
     * @param groupDto GroupDto
     * @return List<UserDto>
     */
    @SuppressWarnings("unchecked")
    public List<UserDto> getGroupUserList(GroupDto groupDto) {
        groupDto.setCorporateId(SecurityUtils.getCorporateId());
        return (List<UserDto>) messengerDao.selectList("GroupMapper.getGroupUserList", groupDto);
    }

}
