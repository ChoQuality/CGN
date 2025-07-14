package com.gsbizple.wiz.common.service;

import java.util.List;
import java.util.Map;

public interface MybatisService<P,E> {
    int total(String mapperId,P param);
    E selectOne(String mapperId, Map<String,P> id);
    List<E> selectList(String mapperId, P param);
    int insert(String mapperId, P param);
    int update(String mapperId, P param);
    int delete(String mapperId, P param);
}
