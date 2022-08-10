package com.dongliu.goodquestion.service;

import com.dongliu.goodquestion.entity.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IndexService {

    /**
     * 获取问题列表
     * 根据标签页，分页获取问题
     * 根据搜索关键字，分页获取问题
     * url： /api/getQuestions
     * @param summary 对问题的简单描述
     * @param tag 问题所属标签
     * @return
     */
    List<Question> getQuestions(String summary, Tag tag);

    /**
     * 获取问题的相关信息
     * @param questionID 问题索引
     * @return
     */
    Question detail(Integer questionID);


    /**
     * 获取解决方案
     * 获取对应问题下的解决方案
     * 获取单个解决方案，根据唯一标识
     * @param questionID //问题索引
     * @return
     */
    List<Solution> getSolution(Integer questionID);

    /**
     * 获取评论
     * 获取解决方案的评论
     * @param solutionID //解决方案索引
     * @return
     */
    List<Comment> getComment(Integer solutionID);

    /**
     * 发布解决方案
     * 对问题提出解决方案
     * @param account 账号
     * @param citeSolutionID
     * @param content
     * @return
     */
    boolean publishSolution(String account, Integer citeSolutionID, String content);

    /**
     * 上传图片
     * 上传问题、解决方案里面用到的图片
     * @param account 账号
     * @param File 上传的图片
     * @return
     */
    String uploadImage(String account, MultipartFile File);

    /**
     *
     /**
     * 评论
     * 对解决方案进行评论
     * 对用户的评论进行评论
     * @param comment 评论信息
     * @return
     */
    boolean Comment(Comment comment);

    /**
     * 方案表态
     * 对已发表的解决方案表明自己态度，如赞成、反对
     * 对已发表的评论表明自己态度
     * @param account 账号
     * @param solutionID //解决方案索引
     * @param attitude //态度。true: 赞成; false: 反对
     * @return
     */
    boolean indicateAttitude(String account, Integer solutionID, boolean attitude);

    /**
     * 搜索词联想
     * 根据用户输入的关键字，给出相关的搜索建议
     * @param keyword //用户输入的关键字
     * @return
     */
    List<String> suggest(String keyword);

    /**
     * 获取标签页
     * 获取首页的分类标签
     * @return
     */
    List<String> getTab();
}
