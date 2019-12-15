package com.example.bbs.service;

import com.example.bbs.dao.CategoryDao;
import com.example.bbs.dao.CommentDao;
import com.example.bbs.dao.PostDao;
import com.example.bbs.entity.Category;
import com.example.bbs.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryDao categoryDao;

    @Autowired
    private PostDao postDao;

    @Autowired
    private CommentDao commentDao;
    public List<Category> findAll(){
        return categoryDao.findAll();
    }
    public String getCategoryName(int categoryId){
        return categoryDao.getCategoryName(categoryId);
    }
    public void deleteCategory(int categoryId){
        commentDao.deleteCommentByCategoryId(categoryId);
        postDao.deleteByCategoryId(categoryId);
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
