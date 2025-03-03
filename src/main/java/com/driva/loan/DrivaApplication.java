package com.driva.loan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.driva.loan.model")
public class DrivaApplication {

    public static void main(String[] args) {
        SpringApplication.run(DrivaApplication.class, args);
    }

}
