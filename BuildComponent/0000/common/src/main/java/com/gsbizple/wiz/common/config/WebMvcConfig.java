package com.gsbizple.wiz.common.config;

import lombok.RequiredArgsConstructor;
import nz.net.ultraq.thymeleaf.layoutdialect.LayoutDialect;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.dialect.SpringStandardDialect;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;
import org.thymeleaf.templatemode.TemplateMode;

import java.nio.charset.StandardCharsets;

@Configuration
@EnableWebMvc
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {

    private final ApplicationContext applicationContext;
    private final static String templateResolverPrefix = "classpath:/templates/";
    private final static String templateResolverSuffix = ".html";

    public SpringResourceTemplateResolver templateResolver() {
        SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
        templateResolver.setApplicationContext(this.applicationContext);
        templateResolver.setPrefix(templateResolverPrefix);
        templateResolver.setSuffix(templateResolverSuffix);
        templateResolver.setTemplateMode(TemplateMode.HTML);
        templateResolver.setCharacterEncoding(StandardCharsets.UTF_8.name());
        templateResolver.setCacheable(false);
        return templateResolver;
    }
    @Bean
    public SpringTemplateEngine templateEngine() {
        SpringTemplateEngine templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());
        templateEngine.setEnableSpringELCompiler(true);

        var dialect = new SpringStandardDialect();
        dialect.setEnableSpringELCompiler(true);
        templateEngine.setDialect(dialect);
        templateEngine.addDialect(new LayoutDialect());
        return templateEngine;
    }

    @Bean
    public ThymeleafViewResolver viewResolver() {
        ThymeleafViewResolver viewResolver = new ThymeleafViewResolver();
        viewResolver.setTemplateEngine(templateEngine());
        viewResolver.setCharacterEncoding(StandardCharsets.UTF_8.name());  // 인코딩 설정 추가
        return viewResolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler(
                        "/assets/css/**"
                        ,"/assets/fonts/**"
                        ,"/assets/js/**"
                        ,"/assets/images/**"
                        ,"/assets/vendors/**"
                        ,"/static/js/**"
                        ,"/static/css/**"
                        ,"/static/assets/**"
                )
                .addResourceLocations(
                        "classpath:/assets/css/"
                        ,"classpath:/assets/fonts/"
                        ,"classpath:/assets/js/"
                        ,"classpath:/assets/images/"
                        ,"classpath:/assets/vendors/"
                        ,"classpath:/static/js/"
                        ,"classpath:/static/css/"
                        ,"classpath:/static/assets/"
                )
                .setCachePeriod(31536000);
    }
}
