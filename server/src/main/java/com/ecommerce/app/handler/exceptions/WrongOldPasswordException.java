package com.ecommerce.app.handler.exceptions;

public class WrongOldPasswordException extends RuntimeException {

    public WrongOldPasswordException(String message) {
        super(message);
    }
}
