package com.ecommerce.app.cta;

import com.ecommerce.app.email.EmailService;
import com.ecommerce.app.email.EmailTemplateName;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CTAService {

    private final CTARepository ctaRepository;
    private final EmailService emailService;

    public CTA postCTA(CTA cta) throws MessagingException {
        emailService.sendCTAEmail(cta.getEmail(), EmailTemplateName.CTA_CONFIRMATION,
                cta.getFirstName(), cta.getLastName(), "Thank you for submitting the form!");
        return ctaRepository.save(cta);
    }

}
