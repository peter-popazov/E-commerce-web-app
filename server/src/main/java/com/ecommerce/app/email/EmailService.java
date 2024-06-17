package com.ecommerce.app.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Async
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String usernameSender;

    @Async
    public void sendActivationEmail(String to, String username, EmailTemplateName emailTemplateName,
                                    String confirmationUrl, String activationCode, String subject) throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        Map<String, Object> model = new HashMap<>();
        model.put("usernameSender", usernameSender);
        model.put("usernameReceiver", username);
        model.put("confirmationUrl", confirmationUrl);
        model.put("activationCode", activationCode);

        configureEmailContext(to, emailTemplateName, subject, message, messageHelper, model);
    }

    @Async
    public void sendOrderEmail(String to, String username, EmailTemplateName emailTemplateName, List<OrderItem> orderItems,
                               Integer totalPrice, String subject) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        Map<String, Object> model = new HashMap<>();
        model.put("usernameTo", username);
        model.put("orderItems", orderItems);
        model.put("totalPrice", totalPrice);

        configureEmailContext(to, emailTemplateName, subject, message, messageHelper, model);
    }

    @Async
    public void sendCTAEmail(String to, EmailTemplateName emailTemplateName, String fistName, String lastName,
                             String subject) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        Map<String, Object> model = new HashMap<>();
        model.put("firstName", fistName);
        model.put("lastName", lastName);
        model.put("subject", subject);

        configureEmailContext(to, emailTemplateName, subject, message, messageHelper, model);
    }

    private void configureEmailContext(String to, EmailTemplateName emailTemplateName, String subject, MimeMessage message,
                                       MimeMessageHelper messageHelper, Map<String, Object> model) throws MessagingException {
        Context context = new Context();
        context.setVariables(model);

        messageHelper.setTo(to);
        messageHelper.setFrom("contact@ecommerce.com");
        messageHelper.setSubject(subject);

        String html = templateEngine.process(emailTemplateName.getName(), context);
        messageHelper.setText(html, true);
        mailSender.send(message);
    }

}
