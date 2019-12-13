package com.example.bbs.dao;

import com.example.bbs.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.List;

@Component
@Mapper
public interface PostDao {
    /*1-查找全部帖子*/
    List<Post> findAll();
    /*2-查找某个栏目下的帖子*/
    List<Post> findByCategoryId(@Param("postCategoryId")int postCategoryId);
    /*3-查询一条帖子的信息*/
    Post findPostByPostId(@Param("postId")int postId);
    /*4-根据postId删除一条帖子*/
    void deletePostByPostId(@Param("postId")int postID);
    /*5-置顶一条帖子*/
    void toTop(@Param("postId")int postId);
    /*6-给帖子加精*/
    void toHighlight(@Param("postId")int postId);
    /*创建帖子*/
    void createPost(@Param("postTitle")String postTitle, @Param("postContent")String postContent,
                    @Param("postScore")int postScore, @Param("postUserId")int postUserId, @Param("postPhoto")String postPhoto,
                    @Param("highlight")int highlight, @Param("postTime")String postTime,@Param("postType")int postType,
                    @Param("postCategoryId")int postCategoryId,@Param("top")int top);
    /*7-通过帖子id查询该帖子的回复数*/
    int countCommentsNum(@Param("postId")int postId);
    /*8-通过userId获取帖子所属的用户名*/
    String getUserName(@Param("userId")int userId);
    /*9-通过帖子id获取帖子所属用户的头像*/
    String getPostUserHeader(@Param("userId")int userId);
    //10-统计置顶帖数目
    public int countTopPost();
    //11-加精帖数目
    public int countHightlightPost();
    //12-需求贴数目
    public int countDemandPost();
    //13-普通贴数目
    public int countNormalPost();
}
