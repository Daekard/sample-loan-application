package com.driva.loan.controllers;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class LenderControllerIntegrationTests {

    @LocalServerPort
    private int port;

    private static final String API_URL = "/api/lenders";

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    @Test
    void testGetAllLendersReturnsAllLenders() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get(API_URL)
                .then()
                .statusCode(200)
                .body("size()", equalTo(7)); // There should be 7 lenders in the database (see data.sql)
    }
}
