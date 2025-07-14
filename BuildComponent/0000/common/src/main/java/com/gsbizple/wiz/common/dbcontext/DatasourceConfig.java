package com.gsbizple.wiz.common.dbcontext;

import com.gsbizple.wiz.common.constant.CommonConstant;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Configuration
public class DatasourceConfig {
    private final Environment environment;
    private final Map<String, Integer> corporateId;
    private final Map<String, String> corporateAIKey;
    private final Map<String, Map<String,Integer>> corporateMenu;

    public DatasourceConfig(Environment environment) {
        this.environment = environment;
        this.corporateId = new HashMap<>();
        this.corporateAIKey = new HashMap<>();
        this.corporateMenu = new HashMap<>();
    }

    @Bean("CorporateAIKey")
    public Map<String, String> corporateAIKey() {
        corporateAIKey.put(CommonConstant.company0001,Objects.requireNonNull(environment.getProperty("company0001.open-ai.key")));
        corporateAIKey.put(CommonConstant.company0002,Objects.requireNonNull(environment.getProperty("company0002.open-ai.key")));
        return corporateAIKey;
    }


    @Bean("CorporateId")
    public Map<String, Integer> corporateId() {
        corporateId.put(CommonConstant.company0001,Integer.valueOf(Objects.requireNonNull(environment.getProperty("company0001.portal.key"))));
        corporateId.put(CommonConstant.company0002,Integer.valueOf(Objects.requireNonNull(environment.getProperty("company0002.portal.key"))));
        return corporateId;
    }

    @Bean("RouteDatasource")
    public DataSource dataSource() {
        Map<Object, Object> dataSources = new HashMap<>();
        // 각각의 데이터 소스 설정
        DataSource company0001 = DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .url(environment.getProperty("company0001.portal.datasource.url"))
                .username(environment.getProperty("company0001.portal.datasource.user"))
                .password(environment.getProperty("company0001.portal.datasource.pw"))
                .build();

        DataSource company0002 = DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .url(environment.getProperty("company0002.portal.datasource.url"))
                .username(environment.getProperty("company0002.portal.datasource.user"))
                .password(environment.getProperty("company0002.portal.datasource.pw"))
                .build();

        dataSources.put(CommonConstant.company0001, company0001);
        dataSources.put(CommonConstant.company0002, company0002);

        RoutingDatasource routingDataSource = new RoutingDatasource();
        routingDataSource.setTargetDataSources(dataSources);

        routingDataSource.setDefaultTargetDataSource(company0001);
        return routingDataSource;
    }
}
