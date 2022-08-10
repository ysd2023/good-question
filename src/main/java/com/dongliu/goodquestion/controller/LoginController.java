package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.service.LoginService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.HttpCookie;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@CrossOrigin
@RestController
public class LoginController{
    @Autowired
    LoginService loginService;

    /**
     * 登录
     * 用户进行登录
     * url: /api/login
     * @param map account-账号，password-密码
     * @return
     */
    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String,String> map, HttpSession session){
        String account = map.get(("account"));
        String password = map.get(("password"));
        boolean statu = loginService.isLogin(account,password);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            User user = new User();
            user.setAccount(account);
            session.setAttribute("persionalInfo",user);
            session.setMaxInactiveInterval(600);
            result.put("reason","设置成功。");
        } else {
            result.put("reason","账号密码错误，请重新输入。");
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 验证登录状态
     * 验证用户登录转台是否过期
     * url: '/api/auth'
     * @return
     */
    @GetMapping("/auth")
    public Map<String,Object> auth(HttpSession session){
        User user = (User)session.getAttribute("persionalInfo");
        boolean statu = user != null && user.getAccount() != null;
        log.info("auth:");
        Map<String,Object> result = new HashMap<>();
        if(statu){
            log.info("statu:"+user.getAccount());
            result.put("reason","已登陆。");
        } else {
            result.put("reason","账号未登陆或登陆已过期。");
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 注册
     * 新用户进行注册
     * url: '/api/register'
     * @param map email-邮件、password-密码、vaildCode-验证码
     * @return
     */
    @PostMapping("/register")
    public Map<String,Object> register(@RequestBody Map map){
        log.info("map:"+map.toString());
        String email = (String)map.get("email");
        String password = (String)map.get("password");
        String vaildCode = (String)map.get("validCode");
        boolean statu = loginService.isVaildCode(email,vaildCode);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            statu = loginService.isRegister(email,password);
            if(statu) {
                result.put("reason", "注册成功。");
            } else {
                result.put("reason","注册失败，请重新注册。");
            }
        } else {
            result.put("reason","验证码错误，请重新注册。");
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 获取验证码
     * 获取用户用于注册账号需要的验证码
     * url: 'api/getCode'
     * @param email //邮箱
     * @return
     */
    @GetMapping("/getCode")
    public Map<String,Object> getCode(String email){
        log.info("email:"+email);
        boolean statu = loginService.getVaildCode(email);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason","好像不需要给前端查看。");
            result.put("vaildCode","******");
        } else {
            result.put("reason","获取验证码失败，请重新获取。");
            result.put("vaildCode",null);
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 退出登录
     * 用户退出系统
     * url: 'api/quit'
     * @return
     */
    @GetMapping("/quit")
    public Map<String,Object> quit(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();
        Map<String,Object> result = new HashMap<>();
        result.put("statu",true);
        result.put("reason","注销成功。");
        return result;
    }

    /**
     * 找回密码
     * 用户重新设置密码
     * url: 'api/reset'
     * @param map account,newPassword,validateCode
     * @return
     */
    @PostMapping("/reset")
    public Map<String,Object> reset(@RequestBody Map<String,String> map){
        log.info(map.toString());
        String account = map.get("account");
        String newPassword = map.get("newPassword");
        String validateCode = map.get("validateCode");
        String email = loginService.getEmail(account);
        boolean status = loginService.isVaildCode(email,validateCode);
        Map<String,Object> result = new HashMap<>();
        if(status){
            status = loginService.rePwd(account,newPassword);
            if(status){
                result.put("reason","密码更改成功。");
            } else {
                result.put("reason","密码修改失败。");
            }
        } else {
            result.put("reason","验证码错误，请重新输入。");
        }
        result.put("statu",status);
        return result;
    }


}
