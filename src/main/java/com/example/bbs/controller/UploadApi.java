package com.example.bbs.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/upload")
public class UploadApi {

    @PostMapping("/images")
    public int singleFileUpload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return 0;
        }
        try {
            System.out.print("file:"+file);
            byte[] bytes = file.getBytes();
            Path path = Paths.get("src/main/resources/static/buildTemplate/images/"+file.getOriginalFilename());
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return 1;
    }
}
