package com.dongliu.goodquestion.Util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.util.Assert;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
public class VaildCodeUtil implements VaildCode{

    @Value("${spring.mail.username}")
    private String mailForm;
    @Value("${vaildCodeNum}")
    private int vaildCodeNum; //验证码长度

    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    JavaMailSender javaMailSender;

    protected String createValidCode(){
        Random random = new Random();
        String vaildCode = "";
        for(int i = 0; i < vaildCodeNum; i++){
            int position = random.nextInt(keyword.length());
            vaildCode += keyword.charAt(position);
        }
        return vaildCode;
    }


    @Override
    public boolean sentVaildCode(String email) {
        Assert.notNull(email,"邮箱收件人为空");
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom(mailForm);
//        message.setTo(email);
//        message.setSubject("good-queston");
//        String vaildCode = createValidCode();
//        log.info("email:"+email+",vC:"+vaildCode);
//        redisTemplate.opsForValue().set("email:"+email,vaildCode,5, TimeUnit.MINUTES);
//        message.setText("【好问题】您的验证码"+ vaildCode +",该验证码5分钟内有效，请勿泄露于他人！");
//        message.setSentDate(new Date());
//        javaMailSender.send(message);
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            //邮件发件人
            helper.setFrom(mailForm);
            //邮件收件人 1或多个
            helper.setTo(email);
            //邮件主题
            helper.setSubject("good-queston");
            String vaildCode = createValidCode();
            log.info("email:"+email+",vC:"+vaildCode);
            redisTemplate.opsForValue().set("email:"+email,vaildCode,5, TimeUnit.MINUTES);
            Context context = new Context();
            context.setVariable("operation","注册账号");
            context.setVariable("verifyCode",vaildCode.toCharArray());
            helper.setText(templateEngine.process("email",context),true);
            helper.setSentDate(new Date());
            javaMailSender.send(message);
        } catch (MessagingException e) {
        }
        return true;
    }

    @Override
    public boolean isVaildCode(String email,String validCode) {
        log.info("email:"+email+",vC2:"+validCode);
        String vCode = (String)redisTemplate.opsForValue().get("email:"+email);
        return vCode != null && vCode.equalsIgnoreCase(validCode);
    }
}
