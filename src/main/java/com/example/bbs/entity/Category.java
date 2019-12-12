package com.example.bbs.entity;

public class Category {
    private int categoryId;
    private String cateGoryName;
    private int cateGoryUserId;

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", cateGoryName='" + cateGoryName + '\'' +
                ", cateGoryUserId=" + cateGoryUserId +
                '}';
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return cateGoryName;
    }

    public void setCateGoryName(String cateGoryName) {
        this.cateGoryName = cateGoryName;
    }

    public int getCategoryUserId() {
        return cateGoryUserId;
    }

    public void setCategoryUserId(int cateGoryUserId) {
        this.cateGoryUserId = cateGoryUserId;
    }
}
