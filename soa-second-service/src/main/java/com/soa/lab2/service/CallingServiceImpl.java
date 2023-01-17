package com.soa.lab2.service;

import com.soa.lab2.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class CallingServiceImpl implements CallingService {
    private final WebClient client;

    @Override
    public <T> T get(String uri, Class<T> clazz) {
        T result = client.get()
                .uri(uri)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(clazz)
                .block();
        if (result == null) throw new NotFoundException();
        return result;
    }

    @Override
    public <T> T put(String uri, T object) {
        T result = (T) client.put()
                .uri( uri)
                .accept(MediaType.APPLICATION_JSON)
                .body(Mono.just(object), object.getClass())
                .retrieve()
                .bodyToMono(object.getClass())
                .block();
        if (result == null) throw new NotFoundException();
        return result;
    }
}
