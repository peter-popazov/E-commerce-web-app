package com.ecommerce.app.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Async
public class EmailService {

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(String to, String username, EmailTemplateName emailTemplateName,
                          String confirmationUrl, String activationCode, String subject) throws MessagingException {
        String templateName;
        if (emailTemplateName == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplateName.name();
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(
                message,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        Map<String, Object> model = new HashMap<>();
        model.put("username", username);
        model.put("confirmationUrl", confirmationUrl);
        model.put("activationCode", activationCode);

        Context context = new Context();
        context.setVariables(model);

        messageHelper.setTo(to);
        messageHelper.setFrom("contact@ecommerce.com");
        messageHelper.setSubject(subject);

        String html = templateEngine.process(templateName, context);
        messageHelper.setText(html, true);
        mailSender.send(message);
    }
}
