package com.example.bbs.dao;

import com.example.bbs.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserDao {
    List<User> listUser();
    User findByUsername(@Param("userName") String userName);
}
