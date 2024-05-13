package com.ecommerce.app.handler;

public class InvalidToken extends RuntimeException{

    public InvalidToken(String message) {
        super(message);
    }
}
