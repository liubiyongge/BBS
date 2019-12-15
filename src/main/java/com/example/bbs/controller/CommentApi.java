package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Comment;
import com.example.bbs.service.CommentService;
import java.sql.Timestamp;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value="/comment")
public class CommentApi {

    @Resource
    private CommentService commentService;

    //1-查询所有的回复
    @RequestMapping("/allComments")
    public List<Comment> listComments(){
        return commentService.listComments();
    }

    //2-创建一条comment
    @RequestMapping("/addComment")
    public String createComment(@RequestBody Comment comment){
        System.out.println(comment.toString());
        JSONObject result=new JSONObject();
        result.put("state",1);
        commentService.addComment(comment.getCommentUserId(),comment.getCommentToId(),comment.getCommentToUserId(),
                comment.getCommentContent(),comment.getCommentPostId(),comment.getCommentTime());
        return result.toJSONString();
    }

    //3-返回当前回复的被回复数
    @RequestMapping("/countComments")
    public String countCommentNumToThisComment(@RequestParam("commentId") int commentId){
        System.out.println("commentId:"+commentId);
        JSONObject result=new JSONObject();
        result.put("CommentNumToThisComment", commentService.countCommentNumToThisComment(commentId));
        return result.toJSONString();
    }

    //4-删除评论
    @RequestMapping("/delete")
    public String deleteComment(@RequestParam("commentId") int commentId){
        commentService.deleteComment(commentId);
        JSONObject result=new JSONObject();
        result.put("state",1);
        return result.toJSONString();
    }
    //根据用户名返回回复该用户的评论
    @RequestMapping("/findCommentByUserName")
    public Object findCommentByUserName(@RequestBody HashMap data){
        String userName= (String)data.get("userName");
        return 1;
    }
}