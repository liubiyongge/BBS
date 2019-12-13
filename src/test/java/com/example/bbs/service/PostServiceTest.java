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

    @Autowired
    private PostService postService;
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
        Post post=postDao.findPostByPostId(3);
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


    @Test
    public void countCommentsNum() {
        int num=postDao.countCommentsNum(5);
        System.out.println(num);
    }

    @Test
    public void getUserName() {
        String userName=postService.getUserName(1);
        System.out.println(userName);
    }

    @Test
    public void getPostUserHeader() {
        String header=postService.getPostUserHeader(1);
        System.out.println(header);
    }

    @Test
    public void createPost() {
        postService.createPost("标题11","这里是11这里是11这里是11这里是11",0,3,"defaultUserHeader.jpg",0,"2019-12-03 11:00:00",0,5,0);
    }
}