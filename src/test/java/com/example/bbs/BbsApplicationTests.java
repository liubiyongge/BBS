package com.example.bbs;

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
    @Test
    void testparseToken(){
        Claims claims = tokenService.parseToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aW1lRXhwaXJhdGlvbiI6MTU3NTA4MjI2NzExMiwidXNlck5hbWUiOiJsaXViaXlvbmdnZSIsInR5cGUiOjJ9.kfieULwaHa0Al1PYr89Uuhi9csyffU-T4JqU_ZVj_JM");
        System.out.println(new Date((long)claims.get("timeExpiration")));
    }

}
