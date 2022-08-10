package main.java.com.dongliu.goodquestion.entity;

import java.util.Date;

public class Comment {
    Integer solutionID; //解决方案索引
    Integer commentID; //评论索引
    User commentor; //评论者相关信息
    String content; //评论内容
    String replyTarget; //回复对象名字
    Date date;  //评论时间
    boolean statu; //发布状态
    String reason; //理由

}
