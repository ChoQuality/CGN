package com.gsbizple.wiz.messenger.dao;

import java.util.List;

public interface MessengerDao<P, E> {

    int total(String mapperId, P param);

    E selectOne(String mapperId, P param);

    List<E> selectList(String mapperId, P param);

    int insert(String mapperId, P param);

    int update(String mapperId, P param);

    int delete(String mapperId, P param);
}
