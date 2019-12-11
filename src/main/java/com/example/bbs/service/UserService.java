package com.example.bbs.service;

import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    public User findByUserName(String userName){
        return  userDao.findByUsername(userName);
    }
}
