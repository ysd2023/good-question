package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.service.QuestionService;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@Slf4j
@CrossOrigin
@RestController
public class QuestionController {
    @Autowired
    QuestionService questionService;

    /**
     * 发布问题
     * 用户发起问题
     * @param map //发布的问题
     * @return
     */
    @PostMapping("/publishQuestion")
    public Map<String,Object> publishQuestion(@SessionAttribute("persionalInfo") User user, @RequestBody() Map<String,Object> map){
        log.info("user:"+user.toString()+",question:"+map.toString());
        Map<String,Object> map1 = (Map)map.get("question");
        Question question = new Question();
        question.setTitle((String)map1.get("title"));
        question.setCover((String)map1.get("cover"));
        question.setSolutionNum(0);
        question.setSummary((String)map1.get("summary"));
        question.setImageDescription((List<String>)map1.get("imageDescription"));
        String tag = (String)map1.get("tag");
        if(tag!=null) {
            List<String> list = Arrays.asList(tag.split("\\|"));
            question.setTag(list);
        }
        question.setType((String)map1.get("type"));
        question.setDate(new Date());
        question.setStatu(true);
        question.setReason("默认发布成功");
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
