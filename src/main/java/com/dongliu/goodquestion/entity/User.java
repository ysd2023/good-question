package com.dongliu.goodquestion.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    String account; //用户账号
    String password; //用户密码
    String nickName;    //昵称
    String avatar;  //头像链接
    String email;   //邮箱
    Integer likes; //获赞总数
    Integer questions; //提出问题总数
    Integer solutions; //发布解决方案总数
}
