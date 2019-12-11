package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Post;
import com.example.bbs.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/post")
public class PostApi {
    @Autowired
    private PostService postService;
    @RequestMapping(value = "/findAll")
    public List<Post> findAll(){
        return postService.findAll();
    }

    @RequestMapping("/countCommentsNum")
    public String countCommentsNum(@RequestParam(value = "postId")int postId){
        JSONObject result = new JSONObject();
        result.put("commentsNum",postService.countCommentsNum(postId));
        //System.out.println(postService.countCommentsNum(postId));
        return result.toJSONString();
    }
    @RequestMapping("/getPostUserName")
    public String getUserName(@RequestParam(value ="userId")int userId){
       // System.out.println("222:"+userId);
        JSONObject result=new JSONObject();
        result.put("userName",postService.getUserName(userId));
        return result.toJSONString();
    }
    @RequestMapping("/getHeader")
    public  String getHeader(@RequestParam(value = "userId")int userId){
        JSONObject result=new JSONObject();
        result.put("profilePhoto",postService.getPostUserHeader(userId));
        return result.toJSONString();
    }
}
