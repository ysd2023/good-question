package com.dongliu.goodquestion.Util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploagFile {
    /**
     * 存储文件
     * 存储上传上来的文件
     * @param file 文件
     * @param filePath 存储路径
     * @return String 实际存储路径
     * @throws IOException
     */
    String uploadFile(MultipartFile file, String filePath) throws IOException;
}
