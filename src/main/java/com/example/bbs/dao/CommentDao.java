package com.example.bbs.dao;

import com.example.bbs.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
@Mapper
public interface CommentDao {

    //1-查询所有的回复
    List<Comment> listComments();

    //2-创建一条comment
//    void createComment(@Param("commentUserId")int commentUserId, @Param("commentToId")int commentToId,
//                       @Param("commentToUserId")int commentToUserId, @Param("commentContent")String commentContent,
//                       @Param("commentTime")Date commentTime);

    void addComment(@Param("commentUserId")int commentUserId, @Param("commentToId")int commentToId,
                    @Param("commentToUserId")int commentToUserId, @Param("commentContent")String commentContent,
                    @Param("commentPostId")int commentPostId, @Param("commentTime")String commentTime);

    //3-返回当前回复的被回复数
    int countCommentNumToThisComment(@Param("commentId") int commentId);

    //4-删除评论
    void deleteComment(@Param("commentId")int commentId);

    //5-列出所有comment给admin
    List<CommentForAdmin> getAllCommentsForAdmin();
    Comment findCommentByToUserId(@Param("toUserId") int toUserId);
    void deleteCommentByCategoryId(@Param("categoryId") int categoryId);
}