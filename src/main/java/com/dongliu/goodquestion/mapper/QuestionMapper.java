package com.dongliu.goodquestion.mapper;

import com.dongliu.goodquestion.entity.Question;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QuestionMapper {
    List<Question> selectQuestion(Question question);
    List<String> selectQuestionByKeyWork(@Param("keyWork") String keyWork, @Param("suggestNum") int suggestNum);
    boolean insertQuestion(Question question);
    boolean deleteQuestion(Question question);
    boolean updateQuestion(Question question);
}
