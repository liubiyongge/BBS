package com.example.bbs.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.example.bbs.dao.UserDao;
import com.example.bbs.entity.*;
import com.example.bbs.service.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/User")
public class UserApi {
    @Autowired
    private UserDao userDao;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UploadImgService uploadImgService;

    @RequestMapping("/login")
    public Object login(@RequestBody LoginUser loginUser){
        JSONObject jsonObject = new JSONObject();
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        User userForBase =userDao.findByUsername(loginUser.getUserName());
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

    @RequestMapping("/register")
    public Object register(@RequestBody LoginUser loginUser){
        JSONObject jsonObject=new JSONObject();
        if(loginUser.getUserName() == null || loginUser.getPassword() == null){
            jsonObject.put("message","表单错误");
            return jsonObject;
        }
        int addNumber = userDao.addUser(loginUser.getUserName(), loginUser.getPassword());
        if(addNumber>0){
            String token=tokenService.getToken(addNumber);
            jsonObject.put("token",token);
            return jsonObject;
        }else{
            jsonObject.put("message","注册失败");
            return jsonObject;
        }
    }

    @RequestMapping("/getByUserName")
    public  User getByUserName(@RequestParam(value="userName")String userName){
        //JSONObject result=new JSONObject();
       // System.out.println(userName);
        return userService.findByUserName(userName);
    }

    /*权限操作：删除帖子，参数：postId*/
    @RequestMapping("/deletePost")
    public String deletePostByPostId(@RequestParam(value = "postId")int postId){
        postService.deletePostByPostId(postId);
        JSONObject result=new JSONObject();
        result.put("state","delete successfully");
        System.out.println(postId+": delete successfully");
        return  result.toJSONString();
    }
    /*帖子加精*/
    @RequestMapping("/toHighlight")
    public String toHighlight(@RequestParam(value = "postId")int postId){
        postService.toHighlight(postId);
        JSONObject result=new JSONObject();
        result.put("state","Highlight successfully");
        return result.toJSONString();
    }
    /*置顶*/
    @RequestMapping("/toTop")
    public String toTop(@RequestParam(value = "postId")int postId){
        postService.toTop(postId);
        JSONObject result=new JSONObject();
        result.put("state","toTop successfully");
        return result.toJSONString();
    }
    /*发表帖子*/
    @RequestMapping("/creatPost")
    public  String createPost(@RequestBody Post post){
        /*
        @RequestParam("postTitle")String postTitle,@RequestParam("postContent")String postContent,
                              @RequestParam("postScore")int postScore,@RequestParam("postUserId")int postUserId,
                              @RequestParam("postPhoto")String postPhoto, @RequestParam("highlight")int highlight,
                              @RequestParam("postTime")String postTime,@RequestParam("postType")int postType,
                              @RequestParam("postCategoryId")int postCategoryId, @RequestParam("top")int top
        */
        //System.out.print("在这里.....");
        //System.out.println(post.toString());
        postService.createPost(post.getPostTitle(),post.getPostContent(),post.getPostScore(),post.getPostUserId(),post.getPostPhoto(),
                post.getHighlight(),post.getPostTime(),post.getPostType(),post.getPostCategoryId(),post.getTop());
        JSONObject result=new JSONObject();
        result.put("state",1);
        return result.toJSONString();

    }

    @RequestMapping("/findByPostUserId")
    public Object findByPostUserId(@RequestBody HashMap data){
        String userName= (String)data.get("userName");
        int userId=userService.findIdByUserName(userName);
        List<Post> post=postService.findByPostUserId(userId);

        JSONArray jsonArray=new JSONArray();
        for(int i=0;i<post.size();i++){
            String categoryName=categoryService.getCategoryName(post.get(i).getPostCategoryId());
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("postTitle",post.get(i).getPostTitle());
            jsonObject.put("postId",post.get(i).getPostId());
            jsonObject.put("postCategoryName",categoryName);
            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    //给用户加积分
    @RequestMapping("/addCredit")
    public String addCredit(@RequestParam("userId")int userId, @RequestParam("postScore") int postScore){
        userService.addCredit(userId, postScore);
        JSONObject result=new JSONObject();
        result.put("state","add credit successfully!");
        return result.toJSONString();
    }

    @RequestMapping(value = "/uploadImg",method = RequestMethod.POST)
    @ResponseBody
    public Map uploadImg(@RequestParam(value = "file",required = false) MultipartFile file){
        return uploadImgService.uploadImg(file);
    }


}