package com.example.bbs.dao;

import com.example.bbs.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface PostDao {
    /*查找全部帖子*/
    List<Post> findAll();
    /*查找某个栏目下的帖子*/
    List<Post> findByCategoryId(@Param("postCategoryId")int postCategoryId);
    /*查询一条帖子的信息*/
    Post findPostByPostId(@Param("postId")int postId);
    /*根据postId删除一条帖子*/
    void deletePostByPostId(@Param("postId")int postID);
    /*置顶一条帖子*/
    void toTop(@Param("postId")int postId);
    /*给帖子加精*/
    void toHighlight(@Param("postId")int postId);
    /*通过帖子id查询该帖子的回复数*/
    int countCommentsNum(@Param("postId")int postId);
    /*通过userId获取帖子所属的用户名*/
    String getUserName(@Param("userId")int userId);
    /*通过帖子id获取帖子所属用户的头像*/
    String getPostUserHeader(@Param("userId")int userId);
}
