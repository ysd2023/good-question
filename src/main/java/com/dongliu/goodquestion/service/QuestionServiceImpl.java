package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
import com.dongliu.goodquestion.dao.mapper.UserMapper;
import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.dao.mapper.QuestionMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private UserMapper userMapper;

    @Override
    public boolean publishQuestion(String account, Question question) {
        User user = new User();
        user.setAccount(account);
        List<User> l = userMapper.selectUser(user);
        if(l!=null&&l.get(0)!=null)
            user = l.get(0);
        question.setPublisher(user);
        question.setDate(new Date());
        question.setStatu(true);
        question.setReason("默认发布成功");
        question =questionDao.save(question);
        return question != null && question.getQuestionID() != null;
    }
}
