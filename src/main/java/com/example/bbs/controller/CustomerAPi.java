package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
public class CustomerAPi {
    @RequestMapping("/test")
    public Object test(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("customertest", "you can get customer");
        return jsonObject;
    }
}
