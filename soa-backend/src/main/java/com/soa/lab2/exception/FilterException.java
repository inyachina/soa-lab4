package com.soa.lab2.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class FilterException extends ApiException {
    public FilterException() {
        super(HttpStatus.UNPROCESSABLE_ENTITY, "This value is not supported for filtering");
    }

    public FilterException(String message) {
        this();
        super.message = message;
    }
}
