package com.example.bbs.dao;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface PostDao {
    public int countTopPost();
    public int countHightlightPost();
    public int countDemandPost();
    public int countNormalPost();
}
