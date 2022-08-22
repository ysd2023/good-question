package com.dongliu.goodquestion.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Document(indexName = "question")
public class Question implements Serializable {
    private static final long serialVersionUID = 5584337375118554641L;

    @Id
    private String questionID; //问题索引
    @Field(type = FieldType.Text)
    private String title; //问题的标题
    @Field(type = FieldType.Text)
    private String summary; //对问题的简单描述
    @Field(type = FieldType.Text, index = false)
    private String cover; //问题的图像封面链接
    @Field(type = FieldType.Object, index = false)
    private User publisher; //发起问题的人的信息
    @Field(type = FieldType.Keyword)
    private String type; //问题分类
    @Field(type = FieldType.Text)
    private List<String> tag; //问题所属标签
    @Field(type = FieldType.Integer)
    private Integer solutionNum; //该解决方案的个数
    @Field(type = FieldType.Text, index = false)
    private List<String> imageDescription; //问题的图像描述
    @Field(type = FieldType.Date)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date; //提出问题的时间
    @Field(type = FieldType.Boolean)
    private boolean statu; //发布状态
    @Field(type = FieldType.Text)
    private String reason; //理由
}
