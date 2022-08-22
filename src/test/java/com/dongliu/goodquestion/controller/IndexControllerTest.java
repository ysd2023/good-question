package com.dongliu.goodquestion.controller;

import com.dongliu.goodquestion.entity.Question;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest
class IndexControllerTest {
    @Autowired
    private ElasticsearchRestTemplate elasticsearchRestTemplate;

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mvc;

    @BeforeEach
    public void setupMockMvc(){
        mvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    void getQuestions() throws Exception {
    }

    @Test
    void detail() throws Exception {
    }

    @Test
    void getSolution() throws Exception {
    }

    @Test
    void getComment() throws Exception {
    }

    @Test
    void publishSolution() throws Exception {
    }

    @Test
    void uploadImage() throws Exception {
    }

    @Test
    void comment() throws Exception {
    }

    @Test
    void indicateAttitude() throws Exception {
    }

    @Test
    void suggest() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/suggest")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(""))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void getTab() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/api/getTab")
                .contentType(MediaType.APPLICATION_JSON_UTF8)
                .accept(MediaType.APPLICATION_JSON_UTF8)
                .content(""))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void createIndex(){
        log.info("创建索引");
    }

    @Test
    void deleteIndex(){
    }
}