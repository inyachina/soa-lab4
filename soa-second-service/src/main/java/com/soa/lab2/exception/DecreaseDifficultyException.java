package com.soa.lab2.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public class DecreaseDifficultyException extends ApiException {
    public DecreaseDifficultyException() {
        super(HttpStatus.NOT_ACCEPTABLE, "Impossible to decrease");
    }

    public DecreaseDifficultyException(String message) {
        this();
        super.message = message;
    }
}