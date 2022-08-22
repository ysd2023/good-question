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

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Document(indexName = "solution")
public class Solution implements Serializable {
    private static final long serialVersionUID = -7408866531768769592L;

    @Field(type = FieldType.Text)
    private String questionID; //问题索引
    @Id
    private String solutionID; //解决方案索引
    @Field(type = FieldType.Object)
    private User resolver; //提出解决方案的用户信息
    @Field(type = FieldType.Text)
    private String content; //解决方案内容
    @Field(type = FieldType.Integer)
    private Integer comment; //评论数量
    @Field(type = FieldType.Integer)
    private Integer favor; //同意数量
    @Field(type = FieldType.Integer)
    private Integer opposition; //反对数量
    @Field(type = FieldType.Text)
    private String citeSolution; //引用的解决方案的索引
    @Field(type = FieldType.Date)
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;  //解决方案提出时间
    @Field(type = FieldType.Boolean)
    private boolean statu; //发布状态
    @Field(type = FieldType.Text)
    private String reason; //理由
}
