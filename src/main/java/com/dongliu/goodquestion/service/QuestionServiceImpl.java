package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.mapper.QuestionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionMapper questionMapper;

    @Override
    public boolean publishQuestion(String account, Question question) {
        User user = new User();
        user.setAccount(account);
        question.setPublisher(user);
        return questionMapper.insertQuestion(question);
    }
}
