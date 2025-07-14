package com.gsbizple.wiz.wizportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {
    "com.gsbizple.wiz.common"
    ,"com.gsbizple.wiz.ai"
    ,"com.gsbizple.wiz.messenger"
    ,"com.gsbizple.wiz.wizportal"
})
public class WizPortalApplication {
    public static void main(String[] args) {
        SpringApplication.run(WizPortalApplication.class, args);
    }
}
