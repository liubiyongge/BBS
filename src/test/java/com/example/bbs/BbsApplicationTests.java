package com.example.bbs;

import com.example.bbs.service.TokenService;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class BbsApplicationTests {


    @Test
    void testparseToken(){
        TokenService tokenService = new TokenService();
        Claims claims = tokenService.parseToken("eyJhbGciOiJIUzI1NiJ9.eyJ0aW1lIjoxNTc1MDQzOTcwMDU4LCJ1c2VyTmFtZSI6ImxpdWJpeW9uZ2dlIiwidHlwZSI6Mn0.w26aJ5N0zx2-s7zS1LKciC0ANOsT2h6ORz7n_Gtz5M4");
        System.out.println(new Date((long)claims.get("time")));
    }

}
