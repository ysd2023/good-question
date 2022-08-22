package com.dongliu.goodquestion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Comment implements Serializable {
    private static final long serialVersionUID = 2738622693740092672L;

    private String solutionID; //解决方案索引
    private Integer commentID; //评论索引
    private User commentor; //评论者相关信息
    private String content; //评论内容
    private String replyTarget; //回复对象名字
    private Date date;  //评论时间
    private boolean statu; //发布状态
    private String reason; //理由

}
