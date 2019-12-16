package com.example.bbs.service;

import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public User findByUserName(String userName){
        return  userDao.findByUsername(userName);
    }

    public List<User> findAllUser(){return userDao.findAllUser();}
    public int findIdByUserName(String userName){return userDao.findIdByUserName(userName);}

    public void addCredit(int userId, int postScore){
         userDao.addCredit(userId,postScore);
    }

    public void modifyUserService(User newUser)throws DataAccessException {
        User oldUser = userDao.findByUsername(newUser.getUserName());
        newUser.setUserId(oldUser.getUserId());

        if(newUser.getPassword().equals("")){
            newUser.setPassword(oldUser.getPassword());
        }

        newUser.setCredit(oldUser.getCredit());

        if(newUser.getTelephone().equals("")){
            newUser.setTelephone(oldUser.getTelephone());
        }

        if(newUser.getProfilePhoto().equals("")){
            newUser.setProfilePhoto(oldUser.getProfilePhoto());
        }

        if(newUser.getBriefIntro().equals("")){
            newUser.setBriefIntro(oldUser.getBriefIntro());
        }

        if(newUser.getLocation().equals("")){
            newUser.setLocation(oldUser.getLocation());
        }
        newUser.setType(oldUser.getType());
        userDao.modifyUser(newUser);
    }
}
