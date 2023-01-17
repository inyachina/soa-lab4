package com.soa.lab2.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class NotFoundException extends ApiException {

    public NotFoundException() {
        super(HttpStatus.NOT_FOUND, "Not Found");
    }

    public NotFoundException(String message) {
        this();
        super.message = message;
    }

}