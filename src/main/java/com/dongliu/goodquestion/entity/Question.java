package com.dongliu.goodquestion.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Question implements Serializable {
    Integer questionID; //问题索引
    String title; //问题的标题
    String summary; //对问题的简单描述
    String cover; //问题的图像封面链接
    User publisher; //发起问题的人的信息
    String type; //问题分类
    Tag tag; //问题所属标签
    Integer solutionNum; //该解决方案的个数
    List<String> imageDescription; //问题的图像描述
    Date date; //提出问题的时间
    boolean statu; //发布状态
    String reason; //理由
}
