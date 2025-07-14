package com.gsbizple.wiz.common.service;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@UtilityClass
public class DateUtils {
    // 날짜 형식 변환 메서드
    public static String formatDateBasedOnToday(String dateTimeString) {
        if (dateTimeString == null || dateTimeString.trim().isEmpty()) {
            return null;
        }

        LocalDateTime dateTime;
        try {
            // 지정된 패턴("yyyy-MM-dd HH:mm")으로 파싱 시도
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            dateTime = LocalDateTime.parse(dateTimeString, formatter);
        } catch (DateTimeParseException e) {
            // **패턴이 맞지 않으면 원본 문자열 그대로 반환**
            return dateTimeString;
        }

        LocalDate today = LocalDate.now();
        LocalDate date = dateTime.toLocalDate();

        // 오늘이면 HH:mm, 아니면 MM.dd
        DateTimeFormatter outputFormatter = date.isEqual(today)
                ? DateTimeFormatter.ofPattern("HH:mm")
                : DateTimeFormatter.ofPattern("MM.dd");

        return dateTime.format(outputFormatter);
    }

}