package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import com.dongliu.goodquestion.entity.User;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MyInfoService {
    /**
     * 获取个人信息
     * 获取用户的个人信息
     * @param account 账号
     * @return 用户信息
     */
    User getUserInfo(String account);

    /**
     * 修改用户信息
     * 修改用户的头像，昵称
     * @param account 账号
     * @param avatar 头像
     * @param nickName 昵称
     * @return
     */
    boolean setUsetInfo(String account, MultipartFile avatar, String nickName);

    /**
     * 获取提出问题
     * 获取用户提出的问题
     * @param user 用户信息
     * @return
     */
    List<Question> getQuestions(User user);

    /**
     * 获取发布方案
     * 获取用户发布的解决方案
     * @param user 用户信息
     * @return
     */
    List<Solution> getSolutions(User user);

    /**
     * 登陆
     * 判断用户是否能登陆
     * @param account 账号
     * @param password 密码
     * @return 是否登陆
     */
    boolean isLogin(String account, String password);

    /**
     * 重设密码
     * 更改密码
     * @param account 账号
     * @param newPassword 新密码
     * @return 是否更改成功
     */
    boolean rePwd(@RequestBody String account, @RequestBody String newPassword);
}
