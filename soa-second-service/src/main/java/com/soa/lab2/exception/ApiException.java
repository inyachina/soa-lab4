package com.soa.lab2.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public abstract class ApiException extends RuntimeException {
    private final HttpStatus status;
    private final String defaultMessage;
    protected String message;


    public ApiException(HttpStatus status, String defaultMessage) {
        this.status = status;
        this.defaultMessage = defaultMessage;
    }

    public ApiException(HttpStatus status, String defaultMessage, String message) {
        this(status, defaultMessage);
        this.message = message;
    }
}
