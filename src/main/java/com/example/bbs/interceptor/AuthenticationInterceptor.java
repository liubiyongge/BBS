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
        if(request.getRequestURI().equals("/bbs_war/login")){
            return true;
        }else {
            if(token == null){
                return false;
            }
            Claims claims = tokenService.parseToken(token);
            Date timeExpiration = new Date((long)claims.get("timeExpiration"));
            if( new Date().after(timeExpiration)){
                return false;
            }
            int type = (int) claims.get("type");
            if(request.getRequestURI().substring(0, 18).equals("/bbs_war/customer/")){
                if(type >= 0){
                    return true;
                }else {
                    return false;
                }

            }else if(request.getRequestURI().substring(0, 19).equals("/bbs_war/webmaster/")){
                if(type >= 1){
                    return true;
                }else {
                    return false;
                }
            }else if(request.getRequestURI().substring(0, 15).equals("/bbs_war/admin/")){
                if(type >= 2){
                    return true;
                }else {
                    return false;
                }

            }
        }




        return false;
    }


}
