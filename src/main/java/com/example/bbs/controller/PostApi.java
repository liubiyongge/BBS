package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Comment;
import com.example.bbs.entity.Post;
import com.example.bbs.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/post")
public class PostApi {
    @Autowired
    private PostService postService;

    /*1-查找全部帖子*/
    @RequestMapping(value = "/findAll")
    public List<Post> findAll(){
        return postService.findAll();
    }

    /*2-查找某个栏目下的帖子*/
    @RequestMapping("/postInCategory")
    public List<Post> findByCategoryId(@RequestParam(value = "categoryId")int categoryId){
        return postService.findByCategoryId(categoryId);
    }

    /*3-通过postId获取帖子*/
    @RequestMapping("/getPost")
    public Post findPostByPostId(@RequestParam(value="postId") int postId){
        return postService.findPostByPostId(postId);
    }

    /*7-通过帖子id查询该帖子的回复数*/
    @RequestMapping("/countCommentsNum")
    public String countCommentsNum(@RequestParam(value = "postId")int postId){
        JSONObject result = new JSONObject();
        result.put("commentsNum",postService.countCommentsNum(postId));
        //System.out.println(postService.countCommentsNum(postId));
        return result.toJSONString();
    }

    /*8-通过userId获取帖子所属的用户名*/
    @RequestMapping("/getPostUserName")
    public String getUserName(@RequestParam(value ="userId")int userId){
       // System.out.println("222:"+userId);
        JSONObject result=new JSONObject();
        result.put("userName",postService.getUserName(userId));
        return result.toJSONString();
    }

    /*9-通过帖子id获取帖子所属用户的头像*/
    @RequestMapping("/getHeader")
    public  String getHeader(@RequestParam(value = "userId")int userId){
        JSONObject result=new JSONObject();
        result.put("profilePhoto",postService.getPostUserHeader(userId));
        return result.toJSONString();
    }

    //14-根据postId返回当前帖子的回复列表
    @RequestMapping("/getComments")
    List<Comment> getAllComments(@RequestParam(value="postId") int postId){
        return postService.getAllComments(postId);
    }

}