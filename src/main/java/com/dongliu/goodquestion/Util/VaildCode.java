package com.dongliu.goodquestion.Util;

public interface VaildCode {
    String keyword = "1234567890qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM1234567890"; //验证码随机取值范围

    /**
     * 发送验证码
     * @param email 邮箱
     * @return
     */
    boolean sentVaildCode(String email);

    /**
     * 判断验证码是否正确
     * @param email 邮箱
     * @param validCode 输入的验证码
     * @return
     */
    boolean isVaildCode(String email,String validCode);

}
