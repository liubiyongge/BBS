package com.example.bbs.dao;

import com.example.bbs.entity.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface CommentDao {
    List<Comment> listComments();
}
