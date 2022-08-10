package com.dongliu.goodquestion.mapper;

import com.dongliu.goodquestion.entity.Tag;
import com.dongliu.goodquestion.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TagMapper {
    List<String> selectTagToString();
    List<Tag> selectTag(Tag tag);
    boolean insertTag(Tag tag);
    boolean deleteTag(Tag tag);
    boolean updateTag(Tag tag);
}
