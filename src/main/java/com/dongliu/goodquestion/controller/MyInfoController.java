package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.Util.ResultUtil;
import com.dongliu.goodquestion.dao.ealsticsearch.QuestionDao;
import com.dongliu.goodquestion.dao.ealsticsearch.SolutionDao;
import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.service.MyInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin
@RestController
public class MyInfoController {

    @Value("${page.size}")
    int pageSize;
    @Value("${page.navigatePages}")
    int navigatePages;

    @Autowired
    MyInfoService myInfoService;

    @Autowired
    QuestionDao questionDao;
    @Autowired
    SolutionDao solutionDao;


    /**
     * 获取个人信息
     * 获取用户的个人信息
     * url: '/api/userInfo'
     * @param user
     * @return
     */
    @GetMapping("/userInfo")
    public User userInfo(@SessionAttribute("persionalInfo") User user){
        log.info("userInfo:"+user.toString());
        if(user.getNickName()==null||user.getAvatar()==null){
            user = myInfoService.getUserInfo(user.getAccount());
        }
        return user;
    }

    /**
     * 获取相关活跃信息
     * 获取用户的获赞总数、发布问题总数、解决方案总数
     * url: /api/activityInfo
     * @param user
     * @return
     */
    @GetMapping("/activityInfo")
    public User activityInfo(@SessionAttribute("persionalInfo") User user){
        log.info("activityInfo:"+user.toString());
        Integer questions = questionDao.countByPublisher_Account(user.getAccount());
        Integer solutions = solutionDao.countByResolver_Account(user.getAccount());
        user.setLikes(0);
        user.setQuestions(questions);
        user.setSolutions(solutions);
        myInfoService.setUsetInfo(user);
        return user;
    }

    /**
     * 修改用户信息
     * 修改用户的头像，昵称
     * url: '/api/updateUser'
     * @param avatar
     * @param nickName
     * @return
     */
    @PostMapping("/updateUser")
    public Map<String,Object> updateUser(HttpSession session, @RequestBody MultipartFile avatar, String nickName){
        User user = (User)session.getAttribute("persionalInfo");
        log.info("updateUser:"+user.toString()+"，nickName:"+nickName);
        boolean statu = myInfoService.setUsetInfo(user.getAccount(),avatar,nickName);
        log.info("u:"+statu);
        Map<String,Object> result = new HashMap<>();
        if(statu) {
            result.put("reason", "修改成功");;
            session.setAttribute("persionalInfo",user);
            session.setMaxInactiveInterval(600);
        } else {
            result.put("reason", "修改失败");
        }
        result.put("statu", statu);
        return result;
    }

    /**
     * 获取提出问题
     * 获取用户提出的问题，分页获取
     * url: '/api/myQuestion'
     * @param pageNum 请求页码
     * @return
     */
    @GetMapping("/myQuestion")
    public Map<String,Object> myQuestion(@SessionAttribute("persionalInfo") User user,@RequestParam(defaultValue = "0") Integer pageNum){
        List<Question> questionList = myInfoService.getQuestions(user.getAccount(),pageNum);
        return ResultUtil.result("questionList",questionList);
    }

    /**
     * 获取发布方案
     * 获取用户发布的解决方案，分页获取
     * url: '/api/mySolution'
     * @param pageNum 请求页码
     * @return
     */
    @GetMapping("/mySolution")
    public Map<String,Object> mySolution(@SessionAttribute("persionalInfo") User user, @RequestParam(defaultValue = "0") Integer pageNum){
        List<Solution> solutionList = myInfoService.getSolutions(user.getAccount(),pageNum);
        return ResultUtil.result("solutionList",solutionList);
    }

    /**
     * 修改密码
     * 用户修改密码
     * url: '/api/updatePassword'
     * @param map oldPassword-旧密码，newPassword-新密码
     * @return
     */
    @PostMapping("/updatePassword")
    public Map<String,Object> updatePassword(@SessionAttribute("persionalInfo") User user, @RequestBody Map<String, String> map){
        log.info("updatePassword:"+user.getAccount());
        String oldPassword = map.get("oldPassword");
        String newPassword = map.get("newPassword");
        Map<String,Object> result = new HashMap<>();
        boolean statu = myInfoService.isLogin(user.getAccount(),oldPassword);
        if(statu){
            statu = myInfoService.rePwd(user.getAccount(),newPassword);
            if(statu){
                result.put("reason","修改成功。");
            } else {
                result.put("reason","修改密码失败。");
            }
        } else {
            result.put("reason","原密码错误，请重新输入。");
        }
        result.put("statu",statu);
        return result;
    }


}
