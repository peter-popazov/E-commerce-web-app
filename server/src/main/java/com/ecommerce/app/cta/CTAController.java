package com.ecommerce.app.cta;

import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cta")
public class CTAController {

    private final CTAService ctaService;

    @Autowired
    public CTAController(CTAService ctaService) {
        this.ctaService = ctaService;
    }

    @PostMapping
    public ResponseEntity<CTA> postCTA(@RequestBody CTA cta) throws MessagingException {
        return ResponseEntity.ok(ctaService.postCTA(cta));
    }
}
