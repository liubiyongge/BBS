package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.LoginUser;
import com.example.bbs.entity.User;
import com.example.bbs.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserApi {
    @Autowired
    private UserDao userDao;
    @Autowired
    private TokenService tokenService;

    @RequestMapping("/login")
    public Object login(@RequestBody LoginUser loginUser){
        JSONObject jsonObject = new JSONObject();
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
}
