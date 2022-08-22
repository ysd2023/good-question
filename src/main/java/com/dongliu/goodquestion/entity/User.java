package com.dongliu.goodquestion.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class User implements Serializable {
    private static final long serialVersionUID = -4672954363391918351L;

    private String account; //用户账号
    @JsonIgnore
    private String password; //用户密码
    private String nickName;    //昵称
    private String avatar;  //头像链接
    private String email;   //邮箱
    private Integer likes; //获赞总数
    private Integer questions; //提出问题总数
    private Integer solutions; //发布解决方案总数

    public User(String account){
        this.account = account;
    }
}
