package com.dongliu.goodquestion.Util;

import java.util.HashMap;
import java.util.Map;

public class ResultUtil {
    public static  <T> Map result(String param,T t){
        Map<String,Object> map = new HashMap<>();
        map.put(param,t);
        return map;
    }
}
