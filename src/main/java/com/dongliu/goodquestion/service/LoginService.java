package com.dongliu.goodquestion.service;

import org.springframework.web.bind.annotation.RequestBody;

public interface LoginService {
    /**
     * 登陆
     * 判断用户是否能登陆
     * @param account 账号
     * @param password 密码
     * @return 是否登陆
     */
    boolean isLogin(String account, String password);

    /**
     * 检验验证码
     * 判断验证码是否正确
     * @param vaildCode 验证码
     * @return
     */
    boolean isVaildCode(String email,String vaildCode);

    /**
     * 获取验证码
     * @param email 邮箱
     * @return
     */
    boolean getVaildCode(String email);

    /**
     * 注册
     * 判断将用户信息贮存到数据库中
     * @param email 邮箱
     * @param password 密码
     * @return 注册是否成功
     */
    boolean isRegister(String email, String password);

    /**
     * 获取邮箱
     * 获取该账号的邮箱
     * @param account
     * @return
     */
    String getEmail(String account);

    /**
     * 重设密码
     * 更改密码
     * @param account 账号
     * @param newPassword 新密码
     * @return 是否更改成功
     */
    boolean rePwd(@RequestBody String account, @RequestBody String newPassword);

}
