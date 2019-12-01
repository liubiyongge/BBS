package com.example.bbs.dao;

import com.example.bbs.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

//原来这里没有加@Component，自动注入时报错
@Component
@Mapper
public interface UserDao {
    List<User> listUser();
    User findByUsername(@Param("userName") String userName);
    int addUser(@Param("userName") String userName,@Param("password") String password);
}
