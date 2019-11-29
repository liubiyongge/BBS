package com.example.bbs.service;

import com.example.bbs.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service("TokenService")
public class TokenService {
    private static final String SECRET = "asfdsfadsfLMNQNQJQKdfkjsdrow32234545fdffdhgdhfgdhgfdhgfdhfgdhfgdh";
    private static final SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
    private static int expiration = 3600 * 2;

    public String getToken(User user){
        String token = "";
        token = Jwts.builder()
                .claim("timeExpiration", new Date(System.currentTimeMillis() + expiration * 1000))
                .claim("userName", user.getUserName())
                .claim("type", user.getType())
                .signWith(signatureAlgorithm, SECRET)
                .compact();
        return token;
    }

    public Claims parseToken(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
//        Date timeExpiration = new Date((long)claims.get("time"));
//        String userName = (String) claims.get("userName");
//        int type = (int) claims.get("type");
        return claims;
    }

}
