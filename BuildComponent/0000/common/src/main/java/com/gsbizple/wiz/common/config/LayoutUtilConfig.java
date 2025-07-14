package com.gsbizple.wiz.common.config;

import com.gsbizple.wiz.common.service.view.LayoutUtilService;
import org.jsoup.Jsoup;
import org.jsoup.parser.Parser;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class LayoutUtilConfig {

    @Bean
    public LayoutUtilService layoutUtilService(){
        return message -> {
            if(message != null){
                // 1. HTML 엔티티 디코딩 (예: &lt;br&gt; -> <br>)
                String decodedMessage = Jsoup.parse(message, "", Parser.xmlParser()).text();
                // 2. <br>을 줄바꿈(\n)으로 변환
                decodedMessage = decodedMessage.replaceAll("(?i)<br\\s*/?>", "\n");
                return Jsoup.parse(decodedMessage).text();
            } else {
                return null;
            }
        };
    }
}
