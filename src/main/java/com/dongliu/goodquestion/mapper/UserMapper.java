package com.dongliu.goodquestion.mapper;

import com.dongliu.goodquestion.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    String selectPasssword(@Param("account") String account);
    List<User> selectUser(User user);
    boolean insertUser(User user);
    boolean deleteUser(User user);
    boolean updateUser(User user);
}
