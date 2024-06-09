package com.ecommerce.app.handler;

import com.ecommerce.app.handler.exceptions.InvalidTokenException;
import com.ecommerce.app.handler.exceptions.NotMatchingPasswordsException;
import com.ecommerce.app.handler.exceptions.WrongOldPasswordException;
import jakarta.mail.MessagingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.ACCOUNT_LOCKED.getCode())
                        .errorMessage(ErrorCodes.ACCOUNT_LOCKED.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.ACCOUNT_DISABLED.getCode())
                        .errorMessage(ErrorCodes.ACCOUNT_DISABLED.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.BAD_CREDENTIALS.getCode())
                        .errorMessage(ErrorCodes.BAD_CREDENTIALS.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException e) {
        Set<String> errors = new HashSet<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String internalErrorCode = error.getDefaultMessage();
            errors.add(internalErrorCode);
        });

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.builder()
                        .validationError(errors)
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponse> handleException(DataIntegrityViolationException e) {
        String errorMessage = extractErrorMessage(e);
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.INVALID_DATA.getCode())
                        .errorMessage(errorMessage)
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ExceptionResponse> handleException(InvalidTokenException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.INVALID_TOKEN.getCode())
                        .errorMessage(ErrorCodes.INVALID_TOKEN.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    private String extractErrorMessage(DataIntegrityViolationException e) {
        String cause = Objects.requireNonNull(e.getRootCause()).getMessage();
        if (cause.contains("username")) {
            return "The username you provided is already in use.";
        }
        if (cause.contains("email")) {
            return "The email address you provided is already registered.";
        }
        return "Error occurred. Contact someone :)";
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ExceptionResponse> handleException(Exception e) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(ExceptionResponse.builder()
//                        .error(e.getMessage())
//                        .errorMessage("Internal error message. Contact someone :)")
//                        .timestamp(LocalDateTime.now())
//                        .build());
//    }

    @ExceptionHandler(NotMatchingPasswordsException.class)
    public ResponseEntity<ExceptionResponse> handleException(NotMatchingPasswordsException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.NOT_MATCHING_PASSWORDS.getCode())
                        .errorMessage(ErrorCodes.NOT_MATCHING_PASSWORDS.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @ExceptionHandler(WrongOldPasswordException.class)
    public ResponseEntity<ExceptionResponse> handleException(WrongOldPasswordException e) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .internalErrorCode(ErrorCodes.WRONG_OLD_PASSWORD.getCode())
                        .errorMessage(ErrorCodes.WRONG_OLD_PASSWORD.getDescription())
                        .error(e.getMessage())
                        .timestamp(LocalDateTime.now())
                        .build());
    }
}
