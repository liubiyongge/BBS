package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Category;
import com.example.bbs.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.sound.midi.SysexMessage;
import java.util.List;

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
    @RequestMapping("/findAll")
    public List<Category> findAll(){
        //System.out.println(categoryService.findAll().get(0).toString());
        return categoryService.findAll();
    }
    @RequestMapping("/getCategoryUserId")
    public String getCategoryUserId(@RequestParam(value = "categoryId")int categoryId){
        JSONObject result=new JSONObject();
        result.put("categoryUserId",categoryService.getCategoryUserId(categoryId));
        return result.toJSONString();
    }
//    @RequestMapping("/hh")
//    public void addCategory(@RequestBody Category category){
//        System.out.println(category.toString());
//    }
}
