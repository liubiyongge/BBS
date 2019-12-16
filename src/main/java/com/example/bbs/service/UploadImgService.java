package com.example.bbs.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.example.bbs.Util.RandomUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("UploadImgService")
public class UploadImgService {
    @Value("${absoluteImgPath}")
    String absoluteImgPath;

    @Value("${sonImgPath}")
    String sonImgPath;

//    @Value("${server.port}")
//    String port;
//
//    @Value("${host}")
//    String host;

    public Map<String, String> uploadImg(MultipartFile file){
        Map<String,String> map = new HashMap<>();
        if(file.isEmpty()){
            map.put("code","500");
            map.put("msg","图片不能为空");
            return map;
        }
        String suffixName = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        if(!suffixName.equalsIgnoreCase(".jpeg") && !suffixName.equalsIgnoreCase(".png") && !suffixName.equalsIgnoreCase(".jpg")){
            map.put("code","500");
            map.put("msg","图片格式不正确");
            return map;
        }
        String originalFilename = file.getOriginalFilename();
        //随机生成文件名
        String fileName = RandomUtils.createRandomString(10) + originalFilename;
        File dest = new File(absoluteImgPath + fileName);
        String imgUrl = sonImgPath +fileName;
        try{
            file.transferTo(dest);
            map.put("code","200");
            map.put("msg","上传成功");
            map.put("imgUrl",imgUrl);
            return map;
        }catch (IllegalStateException e){
            e.printStackTrace();
        }catch (IOException e){
            e.printStackTrace();
        }
        return map;
    }
}

