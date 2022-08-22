package com.dongliu.goodquestion.dao.mapper;

import com.dongliu.goodquestion.entity.Comment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<Comment> selectComment(Comment comment);
    boolean insertComment(Comment comment);
    boolean deleteQComment(Comment comment);
    boolean updateComment(Comment comment);
}
