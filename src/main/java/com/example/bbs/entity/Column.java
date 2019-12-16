package com.example.bbs.entity;

public class Column {
    int columnId;
    String columnName;
    int columnUserId;
    public int getColumnId() {
        return columnId;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnId(int columnId) {
        this.columnId = columnId;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public int getColumnUserId() {
        return columnUserId;
    }

    public void setColumnUserId(int columnUserId) {
        this.columnUserId = columnUserId;
    }
}
