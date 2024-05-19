package com.ecommerce.app.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCodes {

    NO_CODE(0, "No code", NOT_IMPLEMENTED),
    BAD_CREDENTIALS(1, "Username or password is incorrect", UNAUTHORIZED),
    INCORRECT_USERNAME(2, "Incorrect username. This username does not exist.", UNAUTHORIZED),
    INCORRECT_PASSWORD(3, "Incorrect password.", UNAUTHORIZED),
    NOT_MATCHING_PASSWORDS(4, "Provided passwords do not match.", UNAUTHORIZED),
    INCORRECT_CURRENT_PASSWORD(5, "Incorrect current password.", UNAUTHORIZED),
    NEW_PASSWORD_DOES_NOT_MATCH(6, "The new password does not match.", UNAUTHORIZED),
    ACCOUNT_LOCKED(7, "User account is locked.", FORBIDDEN),
    ACCOUNT_DISABLED(8, "User account is not activated. Check your email.", FORBIDDEN),
    INVALID_DATA(9, "Data is invalid.", BAD_REQUEST),
    INVALID_TOKEN(10, "Invalid token.", UNAUTHORIZED),
    WRONG_OLD_PASSWORD(11, "Provided old password is not correct.", UNAUTHORIZED),;

     private final int code;
     private final String description;
     private final HttpStatus httpStatus;
}
