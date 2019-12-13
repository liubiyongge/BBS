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

    public List<Comment> listComments(){
        return commentDao.listComments();
    }
}
