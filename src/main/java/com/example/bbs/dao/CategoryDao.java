package com.example.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface CategoryDao {
    public int countCategory();
}
