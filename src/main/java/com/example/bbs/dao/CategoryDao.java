package com.example.bbs.dao;

import com.example.bbs.entity.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper
public interface CategoryDao {
    /*查询所有栏目*/
    List<Category> findAll();
    /*通过栏目id获取栏目名*/
    String getCategoryName(int categoryId);
    /*通过categoryId删除栏目*/
    void deleteCategory(@Param("categoryId") int categoryId);
    /*通过categoryId获取categoryUserId(版主Id)*/
    int getCategoryUserId(int categoryId);
    int addCategory(@Param("categoryName") String categoryName,@Param("categoryUserId") int categoryUserId);
    public int countCategory();
    int setCategory(@Param("categoryName") String categoryName,@Param("categoryUserId") int categoryUserId, @Param("categoryId") int categoryId);
    List<Category> findByCategoryUserId(@Param("categoryUserId") int categoryUserId);

}
