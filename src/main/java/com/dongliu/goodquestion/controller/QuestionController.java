package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttribute;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class QuestionController {
    @Autowired
    QuestionService questionService;

    /**
     * 发布问题
     * 用户发起问题
     * @param question //发布的问题
     * @return
     */
    @PostMapping("/publishQuestion")
    public Map<String,Object> publishQuestion(@SessionAttribute("persionalInfo") User user, Question question){
        boolean statu = questionService.publishQuestion(user.getAccount(),question);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason", "发布成功。");
        } else {
            result.put("reason", "发布失败");
        }
        result.put("statu",statu);
        return result;
    }
}
