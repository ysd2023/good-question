package com.dongliu.goodquestion.Util;

import jdk.jshell.execution.LoaderDelegate;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.ThumbnailParameter;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.name.Rename;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLOutput;

@Slf4j
public class UploagFileUtil implements UploagFile{

    @Autowired
    private String fileSavePath;
//    "-compressed"


    @Override
    public void createThumbnailator(String filePath) throws IOException {
        String path = fileSavePath + "compressed" + File.separator + filePath.substring(0,filePath.lastIndexOf(File.separator));
        filePath = fileSavePath + filePath;
        log.info(filePath.substring(0,filePath.lastIndexOf(File.separator)));
        File file = new File(path);
        if(!file.exists())
            file.mkdirs();
        Thumbnails.of(filePath)
                // 图片缩放率，不能和size()一起使用
                .scale(0.1)
                // 缩略图保存目录,该目录需存在，否则报错
                .toFiles(new File(path), new Rename() {
                    public String apply(String var1, ThumbnailParameter var2) {
                        return this.appendSuffix(var1, "");
                    }
                });
    }

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
