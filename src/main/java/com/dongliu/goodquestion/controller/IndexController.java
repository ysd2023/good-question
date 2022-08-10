package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.Util.ResultUtil;
import com.dongliu.goodquestion.entity.*;
import com.dongliu.goodquestion.service.IndexService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@CrossOrigin
@RestController
public class IndexController {

    @Value("${page.size}")
    int pageSize;
    @Value("${page.navigatePages}")
    int navigatePages;

    @Autowired
    IndexService indexService;

    /**
     * 获取问题列表
     * 根据标签页，分页获取问题
     * 根据搜索关键字，分页获取问题
     * url： /api/getQuestions
     * @param summary
     * @param pageNum
     * @param tagID
     * @return Map<String,Object>
     */
    @GetMapping("/getQuestions")
    public Map<String,Object> getQuestions(String summary,@RequestParam(defaultValue = "1") Integer pageNum,Integer tagID){
        log.info("summary:"+summary+"page:"+pageNum+",tag:"+tagID);
        Map<String,Object> result = new HashMap<>();
        PageHelper.startPage(pageNum,pageSize);
        Tag tag = new Tag();
        tag.setId(tagID);
        List<Question> questionList = indexService.getQuestions(summary,tag);
        PageInfo pageInfo = new PageInfo<>(questionList,5);
//        result.put("page",pageInfo.getPages());
        result.put("page",pageNum);
        result.put("questionList",pageInfo.getList());
        return result;
    }

    /**
     * 获取问题的相关信息
     * url: /api/detail
     * @param questionID //问题索引
     * @return
     */
    @GetMapping("/detail")
    public Map<String,Object> detail(Integer questionID){
        log.info("questionID:"+questionID);
        Map<String,Object> result = new HashMap<>();
        Question question = indexService.detail(questionID);
        result.put("publisher",question.getPublisher());
        result.put("question",question);
        return result;
    }

    /**
     * 获取解决方案
     * 获取对应问题下的解决方案，分页获取
     * 获取单个解决方案，根据唯一标识（pending）
     * rl: '/api/getSolution'
     * @param questionID //问题索引
     * @return
     */
    @GetMapping("/getSolution")
    public Map getSolution(Integer questionID, Integer pageNum){
        log.info("question:");
        PageHelper.startPage(pageNum,pageSize);
        List<Solution> solutionList = indexService.getSolution(questionID);
        PageInfo<Solution> pageInfo = new PageInfo<>(solutionList,5);
        return ResultUtil.result("solutionList",pageInfo.getList());
    }

    /**
     * 获取评论
     * 获取解决方案的评论，分页获取
     * url: '/api/getComment'
     * @param solutionID //解决方案索引
     * @param pageNum
     * @return
     */
    @GetMapping("/getComment")
    public List<Comment> getComment(Integer solutionID, Integer pageNum){
        log.info("solutionID:"+solutionID+",pageNum:"+pageNum);
        PageHelper.startPage(pageNum,pageSize);
        List<Comment> commentList = indexService.getComment(solutionID);
        PageInfo<Comment> pageInfo = new PageInfo<>(commentList,5);
        return pageInfo.getList();
    }

    /**
     * 发布解决方案
     * 对问题提出解决方案
     * url: '/api/publishSolution'
     * @param map citeSolutionID,content
     * @return
     */
    @PostMapping("/publishSolution")
    public Map<String,Object> publishSolution(@SessionAttribute("persionalInfo") User user, @RequestBody Map<String,Object> map){
        log.info("map:");
        Integer citeSolutionID = (Integer)map.get("citeSolutionID");
        String content = (String)map.get("content");
        boolean statu = indexService.publishSolution(user.getAccount(),citeSolutionID,content);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason","发布成功。");
        } else {
            result.put("reason","发布失败。");
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 上传图片
     * 上传问题、解决方案里面用到的图片
     * url: '/api/uploadImage'
     * @param file //上传的图片
     * @return
     */
    @PostMapping("/uploadImage")
    public Map<String,Object> uploadImage(@SessionAttribute("persionalInfo") User user, @RequestBody MultipartFile file){
        log.info("file:"+file.getName());
        String url = indexService.uploadImage(user.getAccount(),file);
        Map<String,Object> result = new HashMap<>();
        Map<String,Object> data = new HashMap<>();
        if(url != null && !"".equals(url)){
            result.put("errno",0);
            data.put("url",url);
            data.put("alt","图片");
        } else {
            result.put("errno",1);
            data.put("url",null);
            data.put("alt",null);
            result.put("message","上传失败。");
        }
        result.put("data",data);
        return result;
    }

    /**
     * 评论
     * 对解决方案进行评论
     * 对用户的评论进行评论
     * url: '/api/Comment'
     * @param map solutionID,content,replyTarget
     * @return
     */
    @PostMapping("/Comment")
    public Map<String,Object> Comment(@SessionAttribute("persionalInfo") User user, @RequestBody Map<String,Object> map){
        log.info(map.toString());
        Integer solutionID = (Integer)map.get("solutionID");
        String content = (String)map.get("content");
        String replyTarget = (String)map.get("replyTarget");
        Comment comment = new Comment();
        comment.setCommentor(user);
        comment.setSolutionID(solutionID);
        comment.setContent(content);
        comment.setReplyTarget(replyTarget);
        boolean statu = indexService.Comment(comment);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason","评论成功。");
        } else {
            result.put("reason","评论失败");
        }
        result.put("statu",statu);
        return result;
    }

    /**
     * 方案表态
     * 对已发表的解决方案表明自己态度，如赞成、反对
     * 对已发表的评论表明自己态度
     * url: '/api/indicateAttitude'
     * @param solutionID //解决方案索引
     * @param attitude //态度。true: 赞成; false: 反对
     * @return
     */
    @PostMapping("/indicateAttitude")
    public Map<String,Object> indicateAttitude(@SessionAttribute("persionalInfo") User user, Integer solutionID, boolean attitude){
        boolean statu = indexService.indicateAttitude(user.getAccount(),solutionID,attitude);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason","成功");
        } else {
            result.put("reason","失败");
        }
        result.put("statu",false);
        return result;
    }

    /**
     * 搜索词联想
     * 根据用户输入的关键字，给出相关的搜索建议
     * url: '/api/suggest'
     * @param keyword //用户输入的关键字
     * @return
     */
    @GetMapping("/suggest")
    public Map suggest(String keyword){
        log.info("keywork");
        return ResultUtil.result("suggestList",indexService.suggest(keyword));
    }

    /**
     * 获取标签页
     * 获取首页的分类标签
     * @return
     */
    @GetMapping("/getTab")
    public Map getTab(){
        log.info("getTab");
        return ResultUtil.result("tabs",indexService.getTab());
    }

}
