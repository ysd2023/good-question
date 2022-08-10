package main.java.com.dongliu.goodquestion.entity;

import java.util.Date;

public class Solution {
    Integer questionID; //问题索引
    Integer solutionID; //解决方案索引
    User resolver; //提出解决方案的用户信息
    String content; //解决方案内容
    Integer comment; //评论数量
    Integer favor; //同意数量
    String opposition; //反对数量
    Solution citeSolution; //引用的解决方案的索引
    Date date;  //解决方案提出时间
    boolean statu; //发布状态
    String reason; //理由
}
