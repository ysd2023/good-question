package com.dongliu.goodquestion.Util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class UploagFileUtil implements UploagFile{

    @Autowired
    private String fileSavePath;

    public String uploadFile(MultipartFile file, String filePath) throws IOException {
        File saveFile = new File(fileSavePath + filePath);
        if(!saveFile.exists()&&!saveFile.getParentFile().exists()){
            saveFile.getParentFile().mkdirs();
            saveFile.createNewFile();
        }
        try {
            file.transferTo(saveFile);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return filePath;
    }
}
