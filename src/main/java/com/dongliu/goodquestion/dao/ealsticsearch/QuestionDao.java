package com.dongliu.goodquestion.dao.ealsticsearch;

import com.dongliu.goodquestion.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionDao extends ElasticsearchRepository<Question,String>{

    Page<Question> findByPublisher_Account(String account, Pageable pageable);

    Page<Question> queryBySummaryAndType(String summary, String type, Pageable pageable);

    Page<Question> queryBySummary(String summary, Pageable pageable);

    Page<Question> queryByType(String type, Pageable pageable);

    Page<Question> queryByTitleOrSummary(String Title,String summary, Pageable pageable);

    Integer countByPublisher_Account(String account);
}