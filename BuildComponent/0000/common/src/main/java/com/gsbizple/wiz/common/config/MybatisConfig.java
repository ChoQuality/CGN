package com.gsbizple.wiz.common.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import javax.sql.DataSource;
import java.util.Map;

@Slf4j
@Configuration
public class MybatisConfig {

    private final DataSource dataSource;
    private final Map<String, String> properties;
    private final String[] mapperXml;

    public MybatisConfig(
            @Qualifier("RouteDatasource") DataSource dataSource
            ,@Qualifier("ComponentProperties") Map<String, String> properties
            ,@Qualifier("MapperXml") String[] mapperXml) {
        this.dataSource = dataSource;
        this.properties = properties;
        this.mapperXml = mapperXml;
    }
    @Primary
    @Bean("AWPSessionFactory")
    public SqlSessionFactory sqlSessionFactory() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        Resource mybatisConf = new ClassPathResource(properties.get("component.mybatis.config"));
        Resource[] mybatisMapper = new Resource[mapperXml.length];

        int cnt = 0;
        for( String resource: mapperXml){
            log.info("load mybatis mapper: {}", resource);
            mybatisMapper[cnt] = new ClassPathResource(resource);
            cnt++;
        }
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setConfigLocation(mybatisConf);
        sqlSessionFactoryBean.setMapperLocations(mybatisMapper);
        return sqlSessionFactoryBean.getObject();
    }

    @Primary
    @Bean("AWPSession")
    public SqlSession sqlSession(SqlSessionFactory sqlSessionFactory){
        return new SqlSessionTemplate(sqlSessionFactory, ExecutorType.SIMPLE);
    }
}
