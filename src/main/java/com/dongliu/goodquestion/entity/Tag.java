package com.dongliu.goodquestion.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class Tag implements Serializable {
    Integer id; //标签索引
    String context; //标签内容
}
