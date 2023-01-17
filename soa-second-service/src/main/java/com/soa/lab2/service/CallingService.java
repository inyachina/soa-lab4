package com.soa.lab2.service;

import org.springframework.stereotype.Service;

@Service
public interface CallingService {
    <T> T get(String uri, Class<T> clazz);

    <T> T put(String uri, T object);
}
