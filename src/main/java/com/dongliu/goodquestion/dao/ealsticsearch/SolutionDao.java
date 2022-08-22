package com.dongliu.goodquestion.dao.ealsticsearch;

import com.dongliu.goodquestion.entity.Question;
import com.dongliu.goodquestion.entity.Solution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface SolutionDao extends ElasticsearchRepository<Solution,String> {

    Page<Solution> findByResolver_Account(String account, Pageable pageable);

    Page<Solution> findByQuestionID(String questionID, Pageable pageable);

    Integer countByResolver_Account(String account);
}
