package com.example.bbs.service;

import com.example.bbs.dao.CommentDao;
import com.example.bbs.entity.Comment;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class CommentService {

    @Resource
    private CommentDao commentDao;

    //1-查询所有的回复
    public List<Comment> listComments(){
        return commentDao.listComments();
    }

    //2-创建一条comment
    public void addComment(Comment comment){
        commentDao.addComment(comment);
    }

    //3-返回当前回复的被回复数
    public int countCommentNumToThisComment(int commentId){
        return commentDao.countCommentNumToThisComment(commentId);
    }
    //4-删除评论
    public void deleteComment(int commentId){
        commentDao.deleteComment(commentId);
    }
}
