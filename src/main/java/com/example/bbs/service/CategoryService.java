package com.example.bbs.service;

import com.example.bbs.dao.CategoryDao;
import com.example.bbs.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryDao categoryDao;

    public List<Category> findAll(){
        return categoryDao.findAll();
    }
    public String getCategoryName(int categoryId){
        return categoryDao.getCategoryName(categoryId);
    }
    public void deleteCategory(int categoryId){
        categoryDao.deleteCategory(categoryId);
    }
    public int getCategoryUserId(int categoryId){
        return  categoryDao.getCategoryUserId(categoryId);
    }
    public int addCategory(String categoryName,int categoryUserId){return categoryDao.addCategory(categoryName,categoryUserId);};
    public int setCategory(String categoryName, int categoryUserId, int categoryId){
        return categoryDao.setCategory(categoryName,categoryUserId,categoryId);
    }
}
