package com.gsbizple.wiz.ai.service;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiService {

    private final SqlSession sqlSession;

    public AiService(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public <Request, Response> Response executeOne(String statement, Request request) {
        return sqlSession.selectOne(statement,request);
    }
    public <Response> Response executeOne(String statement) {
        return sqlSession.selectOne(statement);
    }
    public <Request, Response> List<Response> executeList(String statement, Request request) {
        return sqlSession.selectList(statement,request);
    }
    public <Response> List<Response> executeList(String statement) {
        return sqlSession.selectList(statement);
    }
}
