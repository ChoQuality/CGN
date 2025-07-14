package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MsgUserApiService {

    private final MessengerDao messengerDao;

    /**
     * 유저정보조회
     * @param userKey int
     * @return UserDto
     */
    @SuppressWarnings("unchecked")
    public UserDto getUserInfo(int userKey) {
        return (UserDto) messengerDao.selectOne("UserMapper.getUserInfo", userKey);
    }

    /**
     * 사용자 조회(사용자명, 전화번호)
     * @param userDto UserDto
     * @return List<UserDto>
     */
    @SuppressWarnings("unchecked")
    public List<UserDto> getSearchUserList(UserDto userDto){
        return (List<UserDto>) messengerDao.selectList("UserMapper.getSearchUserList", userDto);
    }

}