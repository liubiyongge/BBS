package com.example.bbs.dao;
import com.example.bbs.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

@Component
@Mapper
public interface AdminDao {
    User findByAdminName(@Param("userName") String userName);
}
