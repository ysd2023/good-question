package com.dongliu.goodquestion.mapper;

import com.dongliu.goodquestion.entity.Solution;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SolutionMapper {
    List<Solution> selectSolution(Solution solution);
    boolean insertSolution(Solution solution);
    boolean deleteSolution(Solution solution);
    boolean updateSolution(Solution solution);
}
