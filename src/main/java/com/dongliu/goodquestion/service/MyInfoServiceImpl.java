package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
import com.dongliu.goodquestion.dao.ealsticsearch.SolutionDao;
import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.dao.mapper.QuestionMapper;
import com.dongliu.goodquestion.dao.mapper.SolutionMapper;
import com.dongliu.goodquestion.dao.mapper.UserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@Service
public class MyInfoServiceImpl implements MyInfoService {

    @Value("${page.size}")
    int pageSize;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserMapper userMapper;
    @Autowired
    QuestionMapper questionMapper;
    @Autowired
    SolutionMapper solutionMapper;
    @Autowired
    IndexService indexService;

    @Autowired
    QuestionDao questionDao;
    @Autowired
    SolutionDao solutionDao;

    @Override
    public User getUserInfo(String account) {
        User user = new User(account);
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
        if(avatar!=null)
            user.setAvatar(indexService.uploadImage(account,avatar));
        user.setNickName(nickName);
        log.info("userUpInfo:"+user.toString());
        return userMapper.updateUser(user);
    }

    @Override
    public boolean setUsetInfo(User user) {
        return userMapper.updateUser(user);
    }

    @Override
    public List<Question> getQuestions(String account,Integer pageNum) {
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize);
//        return questionMapper.selectQuestion(question);
        return questionDao.findByPublisher_Account(account,pageRequest).getContent();
    }

    @Override
    public List<Solution> getSolutions(String account, Integer pageNum) {
        PageRequest pageRequest = PageRequest.of(pageNum,pageSize);
        return solutionDao.findByResolver_Account(account,pageRequest).getContent();
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
