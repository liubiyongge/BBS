package com.example.bbs.interceptor;

import com.alibaba.fastjson.JSONObject;
import com.example.bbs.service.TokenService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;
import java.util.Date;


public class AuthenticationInterceptor implements HandlerInterceptor {
    @Autowired
    private TokenService tokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("token");
        if(!(handler instanceof HandlerMethod)){
            return true;
        }
        //accessUri   ==   "/page/1231231.htm"
        //原语句是if(request.getRequestURI.equals("/bbs_war/login")，路径应该有问题
        System.out.println(request.getRequestURI());
        if(request.getRequestURI().equals("/login")||request.getRequestURI().equals("/register")||
                request.getRequestURI().equals("/admin/adminLogin")){
            return true;
        }else {
            if(token == null){
                throw new RuntimeException("无token，请重新登录");
            }
            Claims claims;
            try {
                claims = tokenService.parseToken(token);
            }catch (Exception e){
                throw new RuntimeException("401");
            }


            Date timeExpiration = new Date((long)claims.get("timeExpiration"));
            if( new Date().after(timeExpiration)){
                throw new RuntimeException("token已过期");
            }

            int type = (int) claims.get("type");

            if(request.getRequestURI().substring(0, 18).equals("/bbs_war/customer/")){
                if(type >= 0){
                    return true;
                }else {
                    throw new RuntimeException("权限不够");
                }

            }else if(request.getRequestURI().substring(0, 19).equals("/bbs_war/webmaster/")){
                if(type >= 1){
                    return true;
                }else {
                    throw new RuntimeException("权限不够");
                }
            }else if(request.getRequestURI().substring(0, 15).equals("/bbs_war/admin/")){
                if(type >= 2){
                    return true;
                }else {
                    throw new RuntimeException("权限不够");
                }

            }
        }




        return false;
    }


}
