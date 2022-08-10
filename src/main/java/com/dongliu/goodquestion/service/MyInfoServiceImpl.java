package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.mapper.QuestionMapper;
import com.dongliu.goodquestion.mapper.SolutionMapper;
import com.dongliu.goodquestion.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
public class MyInfoServiceImpl implements MyInfoService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserMapper userMapper;
    @Autowired
    QuestionMapper questionMapper;
    @Autowired
    SolutionMapper solutionMapper;

    @Override
    public User getUserInfo(String account) {
        User user = new User();
        List<User> userList = userMapper.selectUser(user);
        if(userList.size()>0) {
            return userList.get(0);
        }
        return null;
    }

    @Override
    public boolean setUsetInfo(String account, MultipartFile avatar, String nickName) {
        User user = new User();
        user.setAccount(account);

        user.setNickName(nickName);
        return userMapper.updateUser(user);
    }

    @Override
    public List<Question> getQuestions(User user) {
        Question question = new Question();
        question.setPublisher(user);
        return questionMapper.selectQuestion(question);
    }

    @Override
    public List<Solution> getSolutions(User user) {
        Solution solution = new Solution();
        solution.setResolver(user);
        return solutionMapper.selectSolution(solution);
    }

    @Override
    public boolean isLogin(String account, String password) {
        String pwd = userMapper.selectPasssword(account);
        return pwd != null && passwordEncoder.matches(password,pwd);
    }

    @Override
    public boolean rePwd(String account, String newPassword) {
        User user = new User();
        user.setAccount(account);
        user.setPassword(passwordEncoder.encode(newPassword));
        return userMapper.updateUser(user);
    }
}
