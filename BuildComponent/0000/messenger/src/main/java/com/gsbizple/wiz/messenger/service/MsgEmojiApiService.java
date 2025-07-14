package com.gsbizple.wiz.messenger.service;

import com.gsbizple.wiz.messenger.dao.MessengerDao;
import com.gsbizple.wiz.messenger.dto.EmojiDto;
import com.gsbizple.wiz.messenger.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MsgEmojiApiService {

    private final MessengerDao messengerDao;

    public List<EmojiDto> insertOrUpdateEmoji(EmojiDto emojiDto) {
        if (isNotEmpty(emojiDto)) {
            messengerDao.update("EmojiMapper.updateEmoji", emojiDto);
        } else {
            messengerDao.insert("EmojiMapper.insertEmoji", emojiDto);
        }
        messengerDao.update("EmojiMapper.setEmojiActive", emojiDto.getMessageId());
        return findGroupByEmoji(emojiDto);
    }

    private boolean isNotEmpty(EmojiDto emojiDto) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("messageId", emojiDto.getMessageId());
        paramMap.put("userKey", emojiDto.getUserKey());
        List<EmojiDto> emojiDtoList = messengerDao.selectList("EmojiMapper.selectEmojiByMessageIdAndUserKey", paramMap);
        return emojiDtoList != null && !emojiDtoList.isEmpty();
    }

    public List<EmojiDto> findGroupByEmoji(EmojiDto emojiDto) {
        Long messageId = emojiDto.getMessageId();
        List<EmojiDto> emojiDtoList = messengerDao.selectList("EmojiMapper.selectEmojiByMessageId", messageId);
        return groupByEmojiType(emojiDtoList, messageId);
    }

    public Map<Long, List<EmojiDto>> findGroupByEmojiIn(List<Long> messageIds) {
        if (messageIds == null || messageIds.isEmpty()) {
            return Collections.emptyMap();
        }

        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("messageIds", messageIds);

        List<EmojiDto> rawEmojiList = messengerDao.selectList("EmojiMapper.selectEmojiIn", paramMap);

        // messageId 기준으로 분리해서 groupByEmojiType 실행
        Map<Long, List<EmojiDto>> result = new HashMap<>();

        Map<Long, List<EmojiDto>> groupedByMessageId = rawEmojiList.stream()
                .collect(Collectors.groupingBy(EmojiDto::getMessageId));

        for (Map.Entry<Long, List<EmojiDto>> entry : groupedByMessageId.entrySet()) {
            Long messageId = entry.getKey();
            List<EmojiDto> emojiList = entry.getValue();

            List<EmojiDto> grouped = groupByEmojiType(emojiList, messageId);
            result.put(messageId, grouped);
        }

        return result;
    }


    public List<EmojiDto> deleteEmoji(EmojiDto emojiDto) {
        messengerDao.update("EmojiMapper.deleteEmoji", emojiDto);
        return findGroupByEmoji(emojiDto);
    }


    public List<EmojiDto> groupByEmojiType(List<EmojiDto> rawList, Long messageId) {
        Map<String, List<EmojiDto>> grouped = new HashMap<>();
        Map<String, LocalDateTime> latestModifyMap = new HashMap<>();

        for (EmojiDto e : rawList) {
            String emojiType = e.getEmojiType();
            LocalDateTime modifyDt = e.getModifyDt();

            // 전체 이모지에 대해 최신 modifyDt 계산 (deleteYn 관계없음)
            latestModifyMap.merge(emojiType, modifyDt, (oldVal, newVal) ->
                    newVal.isAfter(oldVal) ? newVal : oldVal
            );

            // deleteYn == 'N'인 경우에만 사용자 그룹핑
            if ("N".equals(e.getDeleteYn())) {
                grouped.computeIfAbsent(emojiType, k -> new ArrayList<>()).add(e);
            }
        }

        return grouped.entrySet().stream()
                .map(entry -> {
                    String emojiType = entry.getKey();
                    List<UserDto> users = entry.getValue().stream()
                            .map(e -> new UserDto(e.getUserKey(), e.getUserNm(), e.getOrgNm()))
                            .toList();

                    LocalDateTime latestModifyDt = latestModifyMap.get(emojiType);
                    return EmojiDto.builder()
                            .messageId(messageId)
                            .emojiType(emojiType)
                            .userList(users)
                            .count(users.size())
                            .modifyDt(latestModifyDt).build();
                })
                .sorted(Comparator.comparing(EmojiDto::getModifyDt).reversed())
                .toList();
    }

}