package com.example.bbs.entity;

import java.sql.Timestamp;

public class Post {
    private int postId;
    private String postTitle;
    private String postContent;
    private int postScore;
    private int postUserId;
    private String postPhoto;
    private int highlight;
    private String postTime;
    private int postType;
    private int top;
    private int postCategoryId;

    @Override
    public String toString() {
        return "Post{" +
                "postId=" + postId +
                ", postTitle='" + postTitle + '\'' +
                ", postContent='" + postContent + '\'' +
                ", postScore=" + postScore +
                ", postUserId=" + postUserId +
                ", postPhoto='" + postPhoto + '\'' +
                ", highlight=" + highlight +
                ", postTime=" + postTime +
                ", postType=" + postType +
                ", top=" + top +
                ", postCategoryId=" + postCategoryId +
                '}';
    }

    public String getPostTime() {
        return postTime;
    }

    public void setPostTime(String postTime) {
        this.postTime = postTime;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public int getPostScore() {
        return postScore;
    }

    public void setPostScore(int postScore) {
        this.postScore = postScore;
    }

    public int getPostUserId() {
        return postUserId;
    }

    public void setPostUserId(int postUserId) {
        this.postUserId = postUserId;
    }

    public String getPostPhoto() {
        return postPhoto;
    }

    public void setPostPhoto(String postPhoto) {
        this.postPhoto = postPhoto;
    }

    public int getHighlight() {
        return highlight;
    }

    public void setHighlight(int highlight) {
        this.highlight = highlight;
    }

    /*public Timestamp getPostTime() {
        return postTime;
    }

    public void setPostTime(Timestamp postTime) {
        this.postTime = postTime;
    }*/

    public int getPostType() {
        return postType;
    }

    public void setPostType(int postType) {
        this.postType = postType;
    }

    public int getTop() {
        return top;
    }

    public void setTop(int top) {
        this.top = top;
    }

    public int getPostCategoryId() {
        return postCategoryId;
    }

    public void setPostCategoryId(int postCategoryId) {
        this.postCategoryId = postCategoryId;
    }
}
