package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.Util.ResultUtil;
import com.dongliu.goodquestion.entity.*;
import com.dongliu.goodquestion.service.IndexService;
import com.github.pagehelper.PageHelper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

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
     * @param type
     * @return Map<String,Object>
     */
    @GetMapping("/getQuestions")
    public Map<String,Object> getQuestions(String summary, String type, @RequestParam(defaultValue = "0") Integer pageNum){
        log.info("summary:"+summary+"page:"+pageNum+",type:"+type);
        Map<String,Object> result = new HashMap<>();
        List<Question> questionList = indexService.getQuestions(summary,type,pageNum);
        result.put("page",pageNum);
        result.put("questionList",questionList);
        return result;
    }

    /**
     * 获取问题的相关信息
     * url: /api/detail
     * @param questionID //问题索引
     * @return
     */
    @GetMapping("/detail")
    public Map<String,Object> detail(String questionID){
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
    public Map getSolution(String questionID, String citeSolutionID, @RequestParam(defaultValue = "0") Integer pageNum){
        log.info("question:"+questionID);
        if(questionID!=null) {
            List<Solution> solutionList = indexService.getSolutions(questionID, pageNum);
            List list = new ArrayList<>();
            for (Solution solution : solutionList){
                if(solution.getCiteSolution()!=null){
                    Map<String,Object> map = new HashMap();
                    map.put("solutionID",solution.getSolutionID());
                    map.put("resolver",solution.getResolver());
                    map.put("content",solution.getContent());
                    map.put("comment",solution.getComment());
                    map.put("favor",solution.getFavor());
                    map.put("opposition",solution.getOpposition());
                    map.put("citeSolution",indexService.getSolution(solution.getCiteSolution()));
                    list.add(map);
                }else {
                    list.add(solution);
                }
            }
            return ResultUtil.result("solutionList", list);
        }else if(citeSolutionID != null){
            return ResultUtil.result("solution", indexService.getSolution(citeSolutionID));
        }
        return null;
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
    public Map<String,Object> getComment(String solutionID, @RequestParam(defaultValue = "0") Integer pageNum){
        log.info("solutionID:"+solutionID+",pageNum:"+pageNum);
        PageHelper.startPage(pageNum,pageSize);
        List<Comment> commentList = indexService.getComment(solutionID);
        return ResultUtil.result("commentList",commentList);
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
        log.info("map:"+map.toString());
        String  questionID = (String) map.get("questionID");
        String citeSolutionID = (String)map.get("citeSolutionID");
        String content = (String)map.get("content");
        boolean statu = indexService.publishSolution(user.getAccount(),questionID,citeSolutionID,content);
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
     * @param uploadImage //上传的图片
     * @return
     */
    @PostMapping("/uploadImage")
    public Map<String,Object> uploadImage(@SessionAttribute("persionalInfo") User user, @RequestBody MultipartFile uploadImage){
        String url = null;
        if(uploadImage!=null) {
            url = indexService.uploadImage(user.getAccount(), uploadImage);
        }
        Map<String,Object> result = new HashMap<>();
        Map<String,Object> data = new HashMap<>();
        if(url != null && !"".equals(url)){
            log.info("file:"+uploadImage.getOriginalFilename());
            result.put("errno",0);
            data.put("url",url);
            data.put("alt","图片");
            data.put("message","上传成功");
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
        String solutionID = (String) map.get("solutionID");
        String content = (String)map.get("content");
        String replyTarget = (String)map.get("replyTarget");
        Comment comment = new Comment();
        comment.setCommentor(user);
        comment.setSolutionID(solutionID);
        comment.setContent(content);
        comment.setReplyTarget(replyTarget);
        comment.setDate(new Date());
        comment.setStatu(true);
        comment.setReason("默认评论成功");
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
    public Map<String,Object> indicateAttitude(@SessionAttribute("persionalInfo") User user, @RequestBody Map<String,Object> map){
        String solutionID = (String)map.get("solutionID");
        boolean attitude = (boolean)map.get("attitude");
        log.info("indicateAttitude:" + solutionID);
        boolean statu = indexService.indicateAttitude(user.getAccount(),solutionID,attitude);
        Map<String,Object> result = new HashMap<>();
        if(statu){
            result.put("reason","成功");
        } else {
            result.put("reason","失败");
        }
        result.put("statu",statu);
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
        log.info("keywork:" + keyword);
        return ResultUtil.result("suggestList",indexService.suggest(keyword));
    }

    /**
     * 获取标签页
     * 获取首页的分类标签
     * url: '/api/getType'
     * @return
     */
    @GetMapping("/getType")
    public Map getType(){
        log.info("getType");
        List<String> list = new ArrayList<>();
        list.add("推荐");
        list.add("全部");
        list.add("日常");
        list.add("教育");
        list.add("知识");
        list.add("运动");
        list.add("美食");
        return ResultUtil.result("types",list);
    }

}
