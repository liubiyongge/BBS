package com.example.bbs.entity;

public class Category {
    private int categoryId;
    private String categoryName;
    private int categoryUserId;

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                ", categoryUserId=" + categoryUserId +
                '}';
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public int getCategoryUserId() {
        return categoryUserId;
    }

    public void setCategoryUserId(int categoryUserId) {
        this.categoryUserId = categoryUserId;
    }
}
