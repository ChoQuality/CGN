package com.gsbizple.wiz.common.dao;

import com.gsbizple.wiz.common.exception.SDKException;
import com.gsbizple.wiz.common.spec.SDKSpec;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.List;

@Configuration
public class CommonDaoIpl {

    @Primary
    @Bean("CommonDao")
    public <P, E> CommonDao<P, E> CommonDao(@Qualifier("AWPSession") SqlSession sqlSession) {
        return new CommonDao<P, E>() {

            @Override
            public int total(String mapperId, P param) {
                try {
                    return (int) sqlSession.selectOne(mapperId, param);
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }

            @Override
            @SuppressWarnings("unchecked")
            public E selectOne(String mapperId, P param) {
                try {
                    return (E) sqlSession.selectOne(mapperId, param);
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }

            @Override
            @SuppressWarnings("unchecked")
            public List<E> selectList(String mapperId, P param) {
                try {
                    return (List<E>) sqlSession.selectList(mapperId, param);
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }

            @Override
            public int insert(String mapperId, P param) {
                try {
                    int insert = sqlSession.insert(mapperId, param);
                    if (insert < 1) throw new SDKException(SDKSpec.UNSUPPORTED);
                    return insert;
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }

            @Override
            public int update(String mapperId, P param) {
                try {
                    int update = sqlSession.update(mapperId, param);
                    if (update < 1) throw new SDKException(SDKSpec.UNSUPPORTED);
                    return update;
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }

            @Override
            public int delete(String mapperId, P param) {
                try {
                    int delete = sqlSession.delete(mapperId, param);
                    if (delete < 1) throw new SDKException(SDKSpec.UNSUPPORTED);
                    return delete;
                } catch (SqlSessionException e) {
                    throw new SDKException(SDKSpec.FAIL, e.getMessage());
                } catch (Exception e) {
                    throw new SDKException(SDKSpec.ERROR, e.getMessage());
                }
            }
        };
    }
}
