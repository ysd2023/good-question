//package com.dongliu.goodquestion.controller;
//
//import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
//import com.dongliu.goodquestion.entity.Question;
//import com.dongliu.goodquestion.entity.User;
//import lombok.extern.slf4j.Slf4j;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import java.util.Date;
//
//@Slf4j
//@SpringBootTest
//class QuestionControllerTest {
//
//    @Autowired
//    private QuestionDao questionDao;
//
//    @Test
//    void saveQuestion(){
//        Question question = new Question();
//        User user = new User();
//        user.setAccount("shun2019@qq.com");
//        question.setPublisher(user);
//        question.setTitle("标题2");
//        question.setCover("");
//        question.setSummary("简单描述2");
//        question.setDate(new Date());
//        question.setStatu(true);
//        question.setReason("默认发布成功");
//        log.info("oh:"+questionDao.save(question));
//    }
//
//}