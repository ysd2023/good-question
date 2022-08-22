package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.Util.UploagFile;
import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
import com.dongliu.goodquestion.dao.ealsticsearch.SolutionDao;
import com.dongliu.goodquestion.entity.*;
import com.dongliu.goodquestion.dao.mapper.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Slf4j
@Service
public class IndexServiceImpl implements IndexService{

    @Value("${suggestNum}")
    private int SUGGESTNUM;
    @Value("${page.size}")
    private int PAGESIZE;
    @Value("${image.suffix")
    private String SUFFIX;

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

    @Autowired
    private QuestionDao questionDao;
    @Autowired
    private SolutionDao solutionDao;


    @Override
    public List<Question> getQuestions(String summary, String type, Integer pageNum) {
        PageRequest pageRequest = PageRequest.of(pageNum, PAGESIZE);
        List<Question> questionList = null;
        if(type!=null) {
            if (summary != null) {
                questionList = questionDao.queryBySummaryAndType(summary, type, pageRequest).getContent();
            } else {
                questionList = questionDao.queryByType(type, pageRequest).getContent();
            }
        }else {
            questionList =  questionDao.queryByTitleOrSummary(summary,summary,pageRequest).getContent();
        }
        return questionList;
    }

    @Override
    public Question detail(String questionID) {
        return questionDao.findById(questionID).get();
    }

    @Override
    public List<Solution> getSolutions(String questionID, Integer pageNum) {
        PageRequest pageRequest = PageRequest.of(pageNum, PAGESIZE);
        return solutionDao.findByQuestionID(questionID, pageRequest).getContent();
    }
    @Override
    public Solution getSolution(String solutionID){
        return solutionDao.findById(solutionID).get();
    }


    @Override
    public List<Comment> getComment(String solutionID) {
        Comment comment = new Comment();
        comment.setSolutionID(solutionID);
        log.info(comment.toString());
        return commentMapper.selectComment(comment);
    }

    @Override
    public boolean publishSolution(String account, String questionID, String citeSolutionID, String content) {
        Solution solution = new Solution();
        User user = new User(account);
        List<User> l = userMapper.selectUser(user);
        if(l!=null&&l.get(0)!=null)
            user = l.get(0);
        solution.setResolver(user);
        solution.setDate(new Date());
        solution.setQuestionID(questionID);
        solution.setContent(content);
        solution.setCiteSolution(citeSolutionID);
        solution.setComment(0);
        solution.setFavor(0);
        solution.setOpposition(0);
        solution.setStatu(true);
        solution.setReason("默认发布成功");
        solution =solutionDao.save(solution);
        Question question = questionDao.findById(questionID).get();
        question.setSolutionNum(question.getSolutionNum() + 1);
        question = questionDao.save(question);
        log.info("after:"+solution.toString());
        return solution != null && solution.getSolutionID() != null && question != null;
    }

    @Override
    public String uploadImage(String account, MultipartFile file){
        if(!file.isEmpty()){
            String filePath = null;
            try {
                String fileName = file.getOriginalFilename();
                String path = account;
                filePath = uploagFile.uploadFile(file, path + File.separator + UUID.randomUUID().toString().replace("-","")+ fileName.substring(fileName.lastIndexOf(".")));
                uploagFile.createThumbnailator(filePath);
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
    public boolean indicateAttitude(String account, String solutionID, boolean attitude) {
        Solution solution = solutionDao.findById(solutionID).get();
        if(attitude){
            solution.setFavor(solution.getFavor()+1);
        } else {
            solution.setOpposition(solution.getOpposition()+1);
        }
        solution = solutionDao.save(solution);
        return solution != null && solution.getSolutionID() != null;
    }

    @Override
    public List<String> suggest(String keyword) {
        List<String> suggests = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(0,SUGGESTNUM);
        Iterable<Question> questions = questionDao.queryByTitleOrSummary(keyword,keyword,pageRequest).getContent();
        for (Question question :
                questions) {
            if(question.getTitle().contains(keyword))
                suggests.add(question.getTitle());
            if(question.getSummary().contains(keyword))
                suggests.add(question.getSummary());
        }
        return suggests;
    }

    @Override
    public List<String> getType() {
        return tagMapper.selectTagToString();
    }
}
