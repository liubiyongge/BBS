package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.User;
import com.example.bbs.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminApi {
    @RequestMapping("/test")
    public Object test(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("admintest", "you can get customer");
        return jsonObject;
    }

    @Autowired
    AdminService adminService;

    @RequestMapping("/getsummary")
    public Object getsummary(){
        return adminService.getsummary();

    }
    @Autowired
    UserDao userDao;
    @RequestMapping("/getAllUser")
    public List<User> getAllUser(){
        return userDao.listUser();
    }

    @RequestMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable int id){
        userDao.deleteUserById(id);
    }
    @RequestMapping("/getUserById/{id}")
    @ResponseBody
    public User getUserById(@PathVariable int id){
        return  userDao.findByUserId(id);
    }

}

