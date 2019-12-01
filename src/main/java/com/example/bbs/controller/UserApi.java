package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.LoginUser;
import com.example.bbs.entity.User;
import com.example.bbs.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class UserApi {
    @Autowired
    private UserDao userDao;

    @Autowired
    private TokenService tokenService;

    @RequestMapping("/login")
    public Object login(@RequestBody LoginUser loginUser){
        JSONObject jsonObject = new JSONObject();
        System.out.println(loginUser.getUserName());
        System.out.println(loginUser.getPassword());
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        User userForBase =userDao.findByUsername(loginUser.getUserName());
        if(userForBase == null){
            jsonObject.put("message","登录失败,用户不存在");
            return jsonObject;
        }else {
            if (!userForBase.getPassword().equals(loginUser.getPassword())){
                jsonObject.put("message","登录失败,密码错误");
                return jsonObject;
            }else {
                String token = tokenService.getToken(userForBase);
                jsonObject.put("token", token);
                return jsonObject;
            }
        }
    }

    @RequestMapping("/register")
    public Object register(@RequestBody LoginUser loginUser){
        JSONObject jsonObject=new JSONObject();
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        int addNumber = userDao.addUser(loginUser.getUserName(), loginUser.getPassword());
        if(addNumber>0){
            String token=tokenService.getToken(addNumber);
            jsonObject.put("token",token);
            return jsonObject;
        }else{
            jsonObject.put("message","注册失败");
            return jsonObject;
        }
    }
}
