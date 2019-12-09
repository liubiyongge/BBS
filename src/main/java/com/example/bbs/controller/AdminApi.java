package com.example.bbs.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Column;
import com.example.bbs.entity.LoginUser;
import com.example.bbs.entity.User;
import com.example.bbs.dao.AdminDao;
import com.example.bbs.service.ColumnService;
import com.example.bbs.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminApi {
    @Autowired
    private AdminDao adminDao;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private ColumnService columnService;

    @RequestMapping("/test")
    public Object test(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("admintest", "you can get customer");
        return jsonObject;
    }

    @RequestMapping("/adminLogin")
    public Object login(@RequestBody LoginUser loginUser){
        JSONObject jsonObject = new JSONObject();
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        User userForBase =adminDao.findByAdminName(loginUser.getUserName());
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

    @RequestMapping("/categoryArrange")
    public Object columnArrange(){
        JSONObject jsonObject=new JSONObject();
        List<Column> allColumn=columnService.findAllColumn();
        JSONArray jsonArray=new JSONArray();
        System.out.println(allColumn.get(0).getColumnId());
        List<String> tokenList=tokenService.getToken(allColumn);
        for(int i=0;i<allColumn.size();i++) {
            jsonObject.put("columnId"+i,allColumn.get(i));
        }
        return jsonObject;
    }
}
