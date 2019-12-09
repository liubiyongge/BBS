package com.example.bbs.controller;

import com.example.bbs.entity.Post;
import com.example.bbs.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController(value = "/post")
public class PostApi {
    @Autowired
    private PostService postService;
    @RequestMapping(value = "/findAll",method = RequestMethod.POST)
    public List<Post> findAll(){
        return postService.findAll();
    }
}
