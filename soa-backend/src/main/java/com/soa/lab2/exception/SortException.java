package com.soa.lab2.exception;

import org.springframework.http.HttpStatus;

public class SortException extends ApiException {
    public SortException() {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "This value is not supported for sorting");
    }

    public SortException(String message) {
        this();
        super.message = message;
    }
}
