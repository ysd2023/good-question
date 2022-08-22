package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.Util.VaildCode;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.dao.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    VaildCode vCode;

    @Autowired
    UserMapper userMapper;
    @Autowired
    MyInfoService myInfoService;

    @Override
    public boolean isLogin(String account, String password) {
        return myInfoService.isLogin(account,password);
    }

    @Override
    public boolean isVaildCode(String email, String vaildCode) {
        return vCode.isVaildCode(email,vaildCode);
    }

    @Override
    public boolean getVaildCode(String email) {
        return vCode.sentVaildCode(email);
    }

    @Override
    public boolean isRegister(String email, String password) {
        User user = new User();
        user.setAccount(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setAvatar("default/default.jpeg");
        user.setNickName(email);
        user.setEmail(email);
        user.setLikes(0);
        user.setQuestions(0);
        user.setSolutions(0);
        return userMapper.insertUser(user);
    }

    @Override
    public String getEmail(String account) {
        User user = new User();
        user.setAccount(account);
        List<User> userList = userMapper.selectUser(user);
        if(userList.size()>0){
            user = userList.get(0);
            return user.getEmail();
        }
        return null;
    }

    @Override
    public boolean rePwd(String account, String newPassword) {
        return myInfoService.rePwd(account,newPassword);
    }
}
