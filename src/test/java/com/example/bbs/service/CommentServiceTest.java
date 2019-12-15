package com.example.bbs.service;

import com.example.bbs.dao.CommentDao;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest

class CommentServiceTest {

    @Resource
    CommentDao commentDao;
    @Test
    void addComment() {
        commentDao.addComment(4,2,3,"new reply",2,"2019-12-23 12:12:12");
    }
}