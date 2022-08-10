package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.entity.Question;
import org.springframework.stereotype.Service;

public interface QuestionService {

    /**
     * 发布问题
     * 用户发起问题
     * @param question //发布的问题
     * @return
     */
    boolean publishQuestion(String account, Question question);
}
