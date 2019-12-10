package com.example.bbs.service;

import com.example.bbs.entity.Category;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class CategoryServiceTest {
    @Autowired
    private  CategoryService categoryService;

    @Test
    public void findAll() {
        List<Category> list=categoryService.findAll();
        for (int i=0;i<list.size();i++){
            System.out.println(list.get(i).toString());
        }
    }

    @Test
    public void getCategoryName() {
        String categoryName=categoryService.getCategoryName(1);
        System.out.println(categoryName);
    }

    @Test
    public void deleteCategory() {
        categoryService.deleteCategory(3);
    }

    @Test
    public void getCategoryUserId() {
        int categoryUserId=categoryService.getCategoryUserId(3);
        System.out.println(categoryUserId);
    }
}