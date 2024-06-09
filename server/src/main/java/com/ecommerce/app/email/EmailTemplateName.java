package com.ecommerce.app.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    ORDER_CONFIRMATION("order_confirmation"),
    CTA_CONFIRMATION("cta_confirmation"),;

    private final String name;

    EmailTemplateName(String name) {
        this.name = name;
    }
}
