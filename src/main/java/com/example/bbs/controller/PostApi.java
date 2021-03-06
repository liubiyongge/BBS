package com.example.bbs.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.entity.Comment;
import com.example.bbs.entity.CommentInfoForUser;
import com.example.bbs.entity.Post;
import com.example.bbs.service.PostService;

import javafx.geometry.Pos;
import org.apache.ibatis.annotations.Param;
import org.hibernate.validator.constraints.pl.REGON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PreDestroy;
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

    //15-创建帖子
    @RequestMapping("/create")
    public String createPost(@RequestBody Post post){
        System.out.println(post.toString());
        JSONObject result=new JSONObject();
        result.put("state",1);
        postService.createPost(post.getPostTitle(),post.getPostContent(),post.getPostScore(),post.getPostUserId(),
                post.getPostPhoto(),post.getHighlight(),post.getPostTime(),post.getPostType(),post.getPostCategoryId(),post.getTop());
        return result.toJSONString();
    }

    //16-修改帖子信息
    @RequestMapping("/update")
    public String updatePost(@RequestBody Post post){
        System.out.println("hhh");
        postService.updatePost(post.getPostId(), post.getPostTitle(),post.getPostScore(),post.getPostContent(),post.getPostPhoto(),post.getHighlight(),post.getPostCategoryId(),post.getPostType(),post.getTop());
        JSONObject result=new JSONObject();
        result.put("state",1);
        return result.toJSONString();
    }
    //17-需求贴完成需求->postType=2
    @RequestMapping("/changeDemand")
    public String changeDemandPostType(@RequestParam("postId") int postId){
        postService.changeDemandPostType(postId);
        JSONObject result=new JSONObject();
        result.put("state",1);
        return result.toJSONString();
    }

    //18-通过postUserId获取帖子
    @RequestMapping("/getPostById")
    public List<Post> findByPostUserId(@Param("postUserId") int postUserId){
        return postService.findByPostUserId(postUserId);
    }

    //19-个人中心-用户发表的评论
    @RequestMapping("/getPostCommentInfo")
    public List<CommentInfoForUser> centerPostCommentInfo(@Param("userId") int userId){
        return postService.centerPostCommentInfo(userId);
    }

    //20-个人中心-用户收到的评论
    @RequestMapping("/getReceiveCommentInfo")
    public List<CommentInfoForUser> centerReceiveCommentInfo(@Param("userId") int userId){
        return postService.centerReceiveCommentInfo(userId);
    }
}