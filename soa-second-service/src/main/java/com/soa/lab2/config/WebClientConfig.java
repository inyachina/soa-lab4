package com.soa.lab2.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Value("${main_server_url}")
    private String url;
    @Bean
    public WebClient webClient() {
        return WebClient.create(url);
    }
}
