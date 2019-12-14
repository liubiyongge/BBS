package com.example.bbs.service;

import com.example.bbs.dao.PostDao;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.Comment;
import com.example.bbs.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostDao postDao;
   /* @Autowired
    private UserDao userDao;*/

    /*1-查找全部帖子*/
    public List<Post> findAll(){
        return postDao.findAll();
    }

    /*2-查找某个栏目下的帖子*/
    public List<Post> findByCategoryId(int postCategoryId){
        return postDao.findByCategoryId(postCategoryId);
    }

    /*3-通过postId获取帖子*/
    public Post findPostByPostId(int postId){
        return postDao.findPostByPostId(postId);
    }

//    通过postUserId获取帖子
    public List<Post> findByPostUserId(int postUserId){return postDao.findByPostUserId(postUserId);}

    /*4-根据postId删除一条帖子*/
    public void deletePostByPostId(int postId){
        postDao.deletePostByPostId(postId);
    }

    /*5-置顶一条帖子*/
    public void toTop(int postId){
        postDao.toTop(postId);
    }

    /*6-给帖子加精*/
    public void toHighlight(int postId){
        postDao.toHighlight(postId);
    }

    /*7-通过帖子id查询该帖子的回复数*/
    public int countCommentsNum(int postId){
        return postDao.countCommentsNum(postId);
    }

    /*8-通过userId获取帖子所属的用户名*/
    public String getUserName(int userId){
        return postDao.getUserName(userId);
    }
//    通过postUserId来查找帖子

    /*9-通过帖子id获取帖子所属用户的头像*/
    public String getPostUserHeader(int userId){
        return postDao.getPostUserHeader(userId);
    }

    //10-统计置顶帖数目
    public int countTopPost(){
        return postDao.countTopPost();
    }

    //11-加精帖数目
    public int countHightlightPost(){
        return postDao.countHightlightPost();
    }

    //12-需求贴数目
    public int countDemandPost(){
        return postDao.countDemandPost();
    }

    //13-普通贴数目
    public int countNormalPost(){
        return postDao.countNormalPost();
    }

    //14-根据postId返回当前帖子的回复列表
    public List<Comment> getAllComments(int postId){
        return postDao.getAllComments(postId);
    }

    /*15-创建帖子*/
    public void createPost(@Param("postTitle")String postTitle, @Param("postContent")String postContent,
                           @Param("postScore")int postScore, @Param("postUserId")int postUserId,
                           @Param("postPhoto")String postPhoto, @Param("highlight")int highlight,
                           @Param("postTime")String postTime, @Param("postType")int postType,
                           @Param("postCategoryId")int postCategoryId, @Param("top")int top){
        postDao.createPost(postTitle,postContent, postScore,postUserId, postPhoto, highlight, postTime,postType, postCategoryId,top);
    }

    //16-修改帖子信息
    public void updatePost(@Param("postId") int postId, @Param("postTitle") String postTitle,
                           @Param("postContent") String postContent, @Param("postPhoto") String postPhoto,
                           @Param("highlight") int highlight, @Param("postType")int postType, @Param("top") int top){
        postDao.updatePost(postId, postTitle,postContent,postPhoto,highlight,postType,top);
    }

    //17-需求贴完成需求->postType=2
    public void changeDemandPostType(int postId){
        postDao.changeDemandPostType(postId);
    }
}
