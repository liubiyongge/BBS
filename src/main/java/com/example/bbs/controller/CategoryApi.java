package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.CategoryDao;
import com.example.bbs.service.CategoryService;
import com.sun.deploy.net.HttpRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;

@RestController
@RequestMapping("/category")
public class CategoryApi {
    @Autowired
    private CategoryService categoryService;
    @RequestMapping("/getCategoryName")
    public String getCategoryName(@RequestParam(value="categoryId") String categoryId){
        //System.out.println("categoryId:"+categoryId);
        //System.out.println(categoryService.getCategoryName(Integer.parseInt(categoryId)));
        JSONObject result = new JSONObject();
        result.put("categoryName", categoryService.getCategoryName(Integer.parseInt(categoryId)));
        return result.toJSONString();
    }
}
