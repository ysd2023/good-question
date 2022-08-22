package com.dongliu.goodquestion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Tag implements Serializable {
    private static final long serialVersionUID = 9196790784384959459L;
    Integer id; //标签索引
    String context; //标签内容

}
