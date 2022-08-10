package com.dongliu.goodquestion.configuration;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Slf4j
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Autowired
    private String fileSavePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/res/uploadFile/**")
                .addResourceLocations("file:"+fileSavePath);
    }

    @Bean
    public String FileSavePath(){
        File jarF = new ApplicationHome(getClass()).getSource();
        String fileSavePath;
        if(jarF!=null){
            fileSavePath = jarF.getParentFile().toString() + File.separator + "file" + File.separator + "static"+ File.separator;
        }else {
            fileSavePath = System.getProperty("user.dir") + File.separator + "target" + File.separator+"file" + File.separator + "static"+ File.separator;
        }
        return  fileSavePath;
    }

}
