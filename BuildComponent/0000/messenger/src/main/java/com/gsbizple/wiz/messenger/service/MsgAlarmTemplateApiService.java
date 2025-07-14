package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.AlarmTemplateDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MsgAlarmTemplateApiService {

    private final MessengerDao messengerDao;

    /**
     * 알림 템플릿 정보 조회
     *
     * @param alarmTemplateDto AlarmTemplateDto
     * @return AlarmTemplateDto
     */
    @SuppressWarnings("unchecked")
    public AlarmTemplateDto getAlarmTemplateInfo(AlarmTemplateDto alarmTemplateDto) {
        return (AlarmTemplateDto) messengerDao.selectOne("AlarmTemplateMapper.getAlarmTemplateInfo", alarmTemplateDto);
    }

}
