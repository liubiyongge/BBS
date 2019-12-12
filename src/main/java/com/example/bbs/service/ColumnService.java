package com.example.bbs.service;

import com.example.bbs.dao.ColumnDao;
import com.example.bbs.entity.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ColumnService")
public class ColumnService {
    @Autowired
    private ColumnDao columnDao;

    public List<Column> findAllColumn(){
        return(columnDao.findAllColumn());
    }
}
