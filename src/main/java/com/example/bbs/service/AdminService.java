package com.example.bbs.service;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.CategoryDao;
import com.example.bbs.dao.PostDao;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("AdminService")
public class AdminService {
    @Autowired
    UserDao userDao;

    @Autowired
    CategoryDao categoryDao;

    @Autowired
    PostDao postDao;

    public JSONObject getsummary(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("admin", userDao.countNumUserType(2));
        jsonObject.put("categoryUser", userDao.countNumUserType(1));
        jsonObject.put("normalUser", userDao.countNumUserType(0));
        jsonObject.put("categoryNumber", categoryDao.countCategory());
        jsonObject.put("topPost", postDao.countTopPost());
        jsonObject.put("highlightPost", postDao.countHightlightPost());
        jsonObject.put("demandPost", postDao.countDemandPost());
        jsonObject.put("normalPost", postDao.countNormalPost());
        return jsonObject;
    }

}
