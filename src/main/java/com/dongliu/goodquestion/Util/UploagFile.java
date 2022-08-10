package com.dongliu.goodquestion.Util;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploagFile {
    String uploadFile(MultipartFile file, String filePath) throws IOException;
}
