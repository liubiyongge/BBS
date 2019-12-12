package com.example.bbs.service;

import com.example.bbs.dao.PostDao;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.Post;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostDao postDao;
   /* @Autowired
    private UserDao userDao;*/

    public List<Post> findAll(){
        return postDao.findAll();
    }
    public List<Post> findByCategoryId(int postCategoryId){
        return postDao.findByCategoryId(postCategoryId);
    }
    public Post findPostByPostId(int postId){
        return postDao.findPostByPostId(postId);
    }
    public void deletePostByPostId(int postId){
        postDao.deletePostByPostId(postId);
    }
    public void toTop(int postId){
        postDao.toTop(postId);
    }
    public void toHighlight(int postId){
        postDao.toHighlight(postId);
    }
    public void createPost(String postTitle,String postContent,
                           int postScore, int postUserId, String postPhoto,
                           int highlight, String postTime,int postType,
                           int postCategoryId,int top){
        postDao.createPost(postTitle,postContent, postScore, postUserId, postPhoto,
        highlight, postTime,postType, postCategoryId,top);
    }
    public int countCommentsNum(int postId){
        return postDao.countCommentsNum(postId);
    }
    public String getUserName(int userId){
        return postDao.getUserName(userId);
    }
    public String getPostUserHeader(int userId){
        return postDao.getPostUserHeader(userId);
    }
}
