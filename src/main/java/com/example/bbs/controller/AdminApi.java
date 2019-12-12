package com.example.bbs.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Category;
import com.example.bbs.entity.LoginUser;
import com.example.bbs.entity.User;
import com.example.bbs.dao.AdminDao;
import com.example.bbs.service.CategoryService;
import com.example.bbs.service.TokenService;
import com.example.bbs.service.UserService;
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
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

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

    @RequestMapping("/categoryManage")
    public Object columnArrange(){

        List<Category> allCategory=categoryService.findAll();
        JSONArray jsonArray=new JSONArray();
        for(int i=0;i<allCategory.size();i++) {
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("categoryId",allCategory.get(i).getCategoryId());
//            System.out.println(allCategory.get(i).getCategoryId());
            jsonObject.put("categoryName",allCategory.get(i).getCategoryName());
            jsonObject.put("categoryUserId",allCategory.get(i).getCategoryUserId());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    @RequestMapping("/findAllUser")
    public Object findAllUser(){
        List<User> allUser= userService.findAllUser();
        JSONArray jsonArray=new JSONArray();
        for(int i=0;i<allUser.size();i++){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("UserId",allUser.get(i).getUserId());
            jsonObject.put("UserName",allUser.get(i).getUserName());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }
    @RequestMapping("/addCategory")
    public Object addCategory(@RequestBody Category category){
        int i=categoryService.addCategory(category.getCategoryName(),category.getCategoryUserId());
        return i;
    }
}
