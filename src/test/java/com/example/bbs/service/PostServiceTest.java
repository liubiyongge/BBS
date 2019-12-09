package com.example.bbs.service;

import com.example.bbs.dao.PostDao;
import com.example.bbs.entity.Post;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest

public class PostServiceTest {
    @Autowired
    private PostDao postDao;
    @Test
    public void findAll() {
        List<Post> list=postDao.findAll();
        for (int i=0;i<list.size();i++){
            System.out.println("在这里:"+list.get(i).toString());
        }
    }

    @Test
    public void findByCategoryId() {
        List<Post> list=postDao.findByCategoryId(2);
        for (int i=0;i<list.size();i++){
            System.out.println("在这里:"+list.get(i).toString());
        }
    }

    @Test
    public void findPostByPostId() {
        Post post=postDao.findPostByPostId(2);
        System.out.println("在这里:"+post.toString());
    }

    @Test
    public void deletePostByPostId() {
        postDao.deletePostByPostId(1);
    }

    @Test
    public void toTop(){
        postDao.toTop(5);
    }

    @Test
    public void toHighlight() {
        postDao.toHighlight(5);
    }


}