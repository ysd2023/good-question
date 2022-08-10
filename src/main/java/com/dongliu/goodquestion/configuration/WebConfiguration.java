package com.dongliu.goodquestion.configuration;

import com.dongliu.goodquestion.Util.UploagFile;
import com.dongliu.goodquestion.Util.UploagFileUtil;
import com.dongliu.goodquestion.Util.VaildCode;
import com.dongliu.goodquestion.Util.VaildCodeUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.system.ApplicationHome;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Slf4j
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

//    @Autowired
//    private String fileSavePath;
    @Value("${pathProperties}")
    private String pathProperties;

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer
                .addPathPrefix(pathProperties,c -> c.isAnnotationPresent(RestController.class));
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/res/uploadFile/**")
                .addResourceLocations("file:"+FileSavePath());
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

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UploagFile uploagFile(){
        return new UploagFileUtil();
    }

    @Bean
    public VaildCode vaildCode(){
        return new VaildCodeUtil();
    }


}
