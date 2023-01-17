package com.soa.lab2.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class BadRequestException extends ApiException{
    public BadRequestException() {
        super(HttpStatus.BAD_REQUEST, "Bad request");
    }

    public BadRequestException(String message) {
        this();
        super.message = message;
    }
}
