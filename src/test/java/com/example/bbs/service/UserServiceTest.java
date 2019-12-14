package com.example.bbs.service;

import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.xml.ws.soap.Addressing;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserDao userDao;

    @Test
    public void findByUserName() {
        User user=userDao.findByUsername("user1");
        System.out.println(user.getUserId()+" "+user.getPassword());
    }

    @Test
    public void addCredit(){
        userDao.addCredit(1);
    }
}