package com.playwithcode.businessbridge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BusinessBridgeApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(BusinessBridgeApiApplication.class, args);
    }

}
