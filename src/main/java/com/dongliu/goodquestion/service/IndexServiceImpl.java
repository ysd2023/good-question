package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.Util.UploagFile;
import com.dongliu.goodquestion.entity.*;
import com.dongliu.goodquestion.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Time;
import java.util.*;

@Service
public class IndexServiceImpl implements IndexService{

    @Value("${suggestNum}")
    private int suggestNum;

    @Autowired
    UploagFile uploagFile;

    @Autowired
    QuestionMapper questionMapper;
    @Autowired
    SolutionMapper solutionMapper;
    @Autowired
    CommentMapper commentMapper;
    @Autowired
    TagMapper tagMapper;
    @Autowired
    UserMapper userMapper;


    @Override
    public List<Question> getQuestions(String summary, Tag tag) {
        Question question = new Question();
        question.setSummary(summary);
        question.setTag(tag);
//        return questionMapper.selectQuestion(question);
        List<Question> questionList = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            Question question1 = new Question();
            Random random = new Random();
            question1.setQuestionID(random.nextInt(1000000000));
            User user = new User();
            user.setAccount("shun2019@qq.com");
            question1.setPublisher(userMapper.selectUser(user).get(0));
            question1.setTag(tag);
            question1.setSummary(summary+"概要:"+i);
            question1.setDate(new Date());
            question1.setTitle("标题"+i);
            questionList.add(question1);
        }
        return questionList;
    }

    @Override
    public Question detail(Integer questionID) {
        Question question = new Question();
        question.setQuestionID(questionID);
        List<Question> questionList = questionMapper.selectQuestion(question);
        if(questionList.size()>0){
            return questionList.get(0);
        }
        return null;
    }

    @Override
    public List<Solution> getSolution(Integer questionID) {
        Solution solution = new Solution();
        solution.setQuestionID(questionID);
        return solutionMapper.selectSolution(solution);
    }

    @Override
    public List<Comment> getComment(Integer solutionID) {
        Comment comment = new Comment();
        comment.setSolutionID(solutionID);
        return commentMapper.selectComment(comment);
    }

    @Override
    public boolean publishSolution(String account, Integer citeSolutionID, String content) {
        Solution solution = new Solution();
        User resolver = new User();
        resolver.setAccount(account);
        solution.setResolver(resolver);
        solution.setCiteSolution(citeSolutionID);
        solution.setContent(content);
        solution.setResolver(resolver);
        return solutionMapper.insertSolution(solution);
    }

    @Override
    public String uploadImage(String account, MultipartFile file){
        if(!file.isEmpty()){
            String filePath = null;
            try {
                filePath = uploagFile.uploadFile(file,account + File.separator + UUID.randomUUID().toString().replace("-",""));
            }catch (IOException e) {
                e.printStackTrace();
            }
            return filePath;
        }
        return null;
    }

    @Override
    public boolean Comment(Comment comment) {
        return commentMapper.insertComment(comment);
    }

    @Override
    public boolean indicateAttitude(String account, Integer solutionID, boolean attitude) {
        Solution solution = new Solution();
        solution.setSolutionID(solutionID);
        List<Solution> solutionList = solutionMapper.selectSolution(solution);
        if(solutionList.size()>0){
            solution = solutionList.get(0);
            if(attitude){
                solution.setFavor(solution.getFavor()+1);
            } else {
                solution.setOpposition(solution.getOpposition()+1);
            }
            return solutionMapper.updateSolution(solution);
        } else {
            return false;
        }
    }

    @Override
    public List<String> suggest(String keyword) {
        return questionMapper.selectQuestionByKeyWork(keyword,suggestNum);
    }

    @Override
    public List<String> getTab() {
        return tagMapper.selectTagToString();
    }
}
