package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import com.dongliu.goodquestion.entity.User;
import com.dongliu.goodquestion.service.MyInfoService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class MyInfoController {

    @Value("${page.size}")
    int pageSize;
    @Value("${page.navigatePages}")
    int navigatePages;

    @Autowired
    MyInfoService myInfoService;


    /**
     * 获取个人信息
     * 获取用户的个人信息
     * url: '/api/userInfo'
     * @param user
     * @return
     */
    @GetMapping("/userInfo")
    public User userInfo(@SessionAttribute("persionalInfo") User user){
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
        if(user.getLikes()==null||user.getQuestions()==null||user.getSolutions()==null){
            user = myInfoService.getUserInfo(user.getAccount());
        }
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
    public Map<String,Object> updateUser(@SessionAttribute("persionalInfo") User user,@RequestBody MultipartFile avatar, @RequestBody String nickName){
        boolean statu = myInfoService.setUsetInfo(user.getAccount(),avatar,nickName);
        Map<String,Object> result = new HashMap<>();
        if(statu) {
            result.put("reason", "修改成功");
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
    public List<Question> myQuestion(@SessionAttribute("persionalInfo") User user,@RequestParam(defaultValue = "1") Integer pageNum){
        PageHelper.startPage(pageNum, pageSize);
        List<Question> questionList = myInfoService.getQuestions(user);
        PageInfo page = new PageInfo<>(questionList,navigatePages);
        return questionList;
    }

    /**
     * 获取发布方案
     * 获取用户发布的解决方案，分页获取
     * url: '/api/mySolution'
     * @param pageNum 请求页码
     * @return
     */
    @GetMapping("/mySolution")
    public List<Solution> mySolution(@SessionAttribute("persionalInfo") User user, @RequestParam(defaultValue = "1") Integer pageNum){
        PageHelper.startPage(pageNum, pageSize);
        List<Solution> solutionList = myInfoService.getSolutions(user);
        PageInfo page = new PageInfo<>(solutionList,navigatePages);
        return solutionList;
    }

    /**
     * 修改密码
     * 用户修改密码
     * url: '/api/updatePassword'
     * @param oldPassword
     * @param newPassword
     * @return
     */
    @PostMapping("/updatePassword")
    public Map<String,Object> updatePassword(@SessionAttribute("persionalInfo") User user, @RequestBody String oldPassword, @RequestBody String newPassword){
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
