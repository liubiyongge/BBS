package com.example.bbs;

import com.example.bbs.dao.PostDao;
import com.example.bbs.service.TokenService;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class BbsApplicationTests {

    @Autowired
    private TokenService tokenService;
    @Autowired
    PostDao postDao;
    @Test
    void testparseToken(){
        System.out.println(postDao.countDemandPost());
    }

}
