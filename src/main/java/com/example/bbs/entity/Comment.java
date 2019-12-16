package com.example.bbs.entity;


public class Comment {
    private int commentId;//回复ID
    private int commentUserId;//回复用户ID
    private int commentToId;//被回复评论ID
    private int commentToUserId;//被回复评论ID
    private String commentContent;
    private int commentPostId;
    private String commentTime;
    private  int adopt;

    public int getAdopt() {
        return adopt;
    }

    public void setAdopt(int adopt) {
        this.adopt = adopt;
    }

    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    public int getCommentUserId() {
        return commentUserId;
    }

    public void setCommentUserId(int commentUserId) {
        this.commentUserId = commentUserId;
    }

    public int getCommentToId() {
        return commentToId;
    }

    public void setCommentToId(int commentToId) {
        this.commentToId = commentToId;
    }

    public int getCommentToUserId() {
        return commentToUserId;
    }

    public void setCommentToUserId(int commentToUserId) {
        this.commentToUserId = commentToUserId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public int getCommentPostId() {
        return commentPostId;
    }

    public void setCommentPostId(int commentPostId) {
        this.commentPostId = commentPostId;
    }

    public String getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(String commentTime) {
        this.commentTime = commentTime;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", commentUserId=" + commentUserId +
                ", commentToId=" + commentToId +
                ", commentToUserId=" + commentToUserId +
                ", commentContent='" + commentContent + '\'' +
                ", commentPostId=" + commentPostId +
                ", commentTime=" + commentTime +
                '}';
    }
}
