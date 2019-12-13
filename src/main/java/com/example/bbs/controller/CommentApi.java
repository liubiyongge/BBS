package com.example.bbs.controller;

import com.example.bbs.entity.Comment;
import com.example.bbs.service.CommentService;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class CommentApi {

    @Resource
    private CommentService commentService;

    public List<Comment> listComments(){
        return commentService.listComments();
    }
}
