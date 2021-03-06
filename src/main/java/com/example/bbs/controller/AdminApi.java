package com.example.bbs.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.CommentDao;
import com.example.bbs.dao.PostDao;
import com.example.bbs.entity.*;
import com.example.bbs.dao.AdminDao;
import com.example.bbs.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;
import com.example.bbs.dao.UserDao;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminApi {
    @Autowired
    private AdminDao adminDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private PostDao postDao;

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    @Autowired
    AdminService adminService;

    @Autowired
    private PostService postService;

    @Autowired
    private CommentService commentService;



    @RequestMapping("/adminLogin")
    public Object login(@RequestBody LoginUser loginUser){
        JSONObject jsonObject = new JSONObject();
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        User userForBase =adminDao.findByAdminName(loginUser.getUserName());
        if(userForBase == null){
            jsonObject.put("message","登录失败,用户不存在");
            return jsonObject;
        }else {
            if (!userForBase.getPassword().equals(loginUser.getPassword())){
                jsonObject.put("message","登录失败,密码错误");
                return jsonObject;
            }else {
                String token = tokenService.getToken(userForBase);
                jsonObject.put("token", token);
                return jsonObject;
            }
        }
    }

    @RequestMapping("/categoryManage")
    public Object columnArrange(){

        List<Category> allCategory=categoryService.findAll();
        JSONArray jsonArray=new JSONArray();
        for(int i=0;i<allCategory.size();i++) {
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("categoryId",allCategory.get(i).getCategoryId());
//            System.out.println(allCategory.get(i).getCategoryId());
            jsonObject.put("categoryName",allCategory.get(i).getCategoryName());
            jsonObject.put("categoryUserId",allCategory.get(i).getCategoryUserId());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    @RequestMapping("/findAllUser")
    public Object findAllUser(){
        List<User> allUser= userService.findAllUser();
        JSONArray jsonArray=new JSONArray();
        for(int i=0;i<allUser.size();i++){
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("UserId",allUser.get(i).getUserId());
            jsonObject.put("UserName",allUser.get(i).getUserName());
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }
    @RequestMapping("/addCategory")
    public Object addCategory(@RequestBody Category category){
        int i=categoryService.addCategory(category.getCategoryName(),category.getCategoryUserId());
        return i;
    }

    @RequestMapping("/setCategory")
    public Object setCategory(@RequestBody Category category){
        int i=categoryService.setCategory(category.getCategoryName(),category.getCategoryUserId(),category.getCategoryId());
        return i;
    }

    @RequestMapping("/deleteCategory")
    public Object deleteCategory(@RequestBody Category category){
        categoryService.deleteCategory(category.getCategoryId());
        return true;
    }

    @RequestMapping("getCategory")
    public  Object getCategory(@RequestBody Category category){
        String name=categoryService.getCategoryName(category.getCategoryId());
        int UserId=categoryService.getCategoryUserId(category.getCategoryId());
        User user=userDao.findByUserId(UserId);
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("categoryName",name);
        jsonObject.put("categoryUserId",UserId);
        jsonObject.put("userName",user.getUserName());
        return jsonObject;
    }



    @RequestMapping("/getsummary")
    public Object getsummary(){
        return adminService.getsummary();

    }

    @RequestMapping("/getAllUser")
    public List<User> getAllUser(){
        return userDao.listUser();
    }

    @RequestMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable int id){
        userDao.deleteUserById(id);
    }
    @RequestMapping("/getUserById/{id}")
    @ResponseBody
    public User getUserById(@PathVariable int id){
        return  userDao.findByUserId(id);
    }

    @RequestMapping("/modifyUser")
    public void modifyUser(@RequestBody User newUser, HttpServletResponse response){
        try{
            adminService.modifyUserService(newUser);
        }catch (DataAccessException e){
            response.setStatus(403);
            return;
        }
    }

    @RequestMapping("/getAllPost")
    public List<PostForAdmin> getAllPost(){
        return postDao.getAllPost();
    }

    @RequestMapping("/deletePost/{id}")
    public void deletePost(@PathVariable int id){
        Post post=postService.findPostByPostId(id);
        /*未采纳答案，退还积分*/
        if (post.getPostType()==1){
            userService.addCredit(post.getPostUserId(),post.getPostScore());
        }
        postDao.deletePostByPostId(id);
    }

    @RequestMapping("/getAllComment")
    public List<CommentForAdmin> getAllComment(){
        return commentDao.getAllCommentsForAdmin();
    }

    @RequestMapping("/deleteComment/{commentId}")
    public void deleteComment(@PathVariable int commentId){
        commentDao.deleteComment(commentId);
    }

    @RequestMapping("/changeUserTypeToMaster")
    public int changeUserTypeToMaster(@RequestBody User user){
        userService.changeUserTypeToMaster(user.getUserId());
        return user.getUserId();
    }

}

