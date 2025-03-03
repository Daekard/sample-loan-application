package com.driva.loan.controllers;

import com.driva.loan.controllers.dto.LenderOfferRequestDto;
import com.driva.loan.model.Applicant;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.hamcrest.MatcherAssert;
import org.instancio.Instancio;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.test.annotation.DirtiesContext;

import java.math.BigDecimal;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.hasSize;
import static org.instancio.Select.field;

@DirtiesContext
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class LenderOfferControllerIntegrationTests {

    @LocalServerPort
    private int port;

    private static final String API_URL = "/api/lender-offers";

    @BeforeEach
    void setUp() {
        RestAssured.port = port;
    }

    // The following test is for the successful submission of a valid request including the applicant and loan details
    @Test
    void testSubmitWithValidDataSucceeds() {
        LenderOfferRequestDto validRequestDto = generateValidRequestDto();

        Response response = given()
                .contentType(ContentType.JSON)
                .body(validRequestDto)
                .when()
                .post(API_URL)
                .thenReturn();

        response.then()
                .statusCode(HttpStatus.OK.value())
                .contentType(ContentType.JSON);

        // Extract the response body as a list of LenderOffer instances
        List<LenderOffer> lenderOffers = response.getBody().jsonPath().getList(".", LenderOffer.class);

        // There should be 7 lender offers, one for each lender in the database (see data.sql)
        MatcherAssert.assertThat(lenderOffers, hasSize(7));

        lenderOffers.forEach(lenderOffer -> {
            assert (lenderOffer.getLenderName() != null);
            assert (lenderOffer.getInterestRate() != null);
            assert (lenderOffer.getMonthlyPayment() != null);
        });
    }

    private static void validateBadRequestOnInvalidData(LenderOfferRequestDto invalidRequestDto) {
        given()
                .contentType(ContentType.JSON)
                .body(invalidRequestDto)
                .when()
                .post(API_URL)
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    // The following tests are for the validation of the request body
    @Test
    void testSubmitWithApplicantFirstNameMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getApplicant().setFirstName(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithApplicantLastNameMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getApplicant().setLastName(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithApplicantEmploymentStatusMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getApplicant().setEmploymentStatus(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithApplicantEmailMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getApplicant().setEmail(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithApplicantEmailInvalidReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getApplicant().setEmail("invalid-email");

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsAmountMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getLoanDetails().setAmount(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsAmountBelowMinimumReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        BigDecimal amount = Instancio.gen().math().bigDecimal().max(new BigDecimal(1999)).get();
        invalidRequestDto.getLoanDetails().setAmount(amount);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsAmountAboveMaximumReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        BigDecimal amount = Instancio.gen().math().bigDecimal().min(new BigDecimal(500001)).get();
        invalidRequestDto.getLoanDetails().setAmount(amount);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsDepositMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getLoanDetails().setDeposit(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsDepositBelowMinimumReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        BigDecimal deposit = Instancio.gen().math().bigDecimal().max(new BigDecimal(-1)).get();
        invalidRequestDto.getLoanDetails().setDeposit(deposit);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsLoanTermMissingReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getLoanDetails().setLoanTerm(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsLoanTermBelowMinimumReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        int loanTerm = Instancio.gen().ints().max(0).get();
        invalidRequestDto.getLoanDetails().setLoanTerm(loanTerm);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithLoanDetailsLoanTermAboveMaximumReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        int loanTerm = Instancio.gen().ints().min(8).get();
        invalidRequestDto.getLoanDetails().setLoanTerm(loanTerm);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithNoLoanDetailsLoanTypeReturnsBadRequest() {
        LenderOfferRequestDto invalidRequestDto = generateValidRequestDto();
        invalidRequestDto.getLoanDetails().setLoanType(null);

        validateBadRequestOnInvalidData(invalidRequestDto);
    }

    @Test
    void testSubmitWithNoApplicantOrLoanDetailsReturnsBadRequest() {
        validateBadRequestOnInvalidData(new LenderOfferRequestDto());
    }

    /**
     * Generates a valid {@link LenderOfferRequestDto} instance using Instancio.
     * The generated instance will have a valid {@link Applicant} and {@link LoanDetails} instance.
     *
     * @return A valid {@link LenderOfferRequestDto} instance
     */
    private static LenderOfferRequestDto generateValidRequestDto() {
        LenderOfferRequestDto validRequestDto = new LenderOfferRequestDto();

        Applicant applicant = Instancio.of(Applicant.class)
                .ignore(field(Applicant::getId))
                .ignore(field(Applicant::getLoanDetails))
                .generate(field(Applicant::getEmail), gen -> gen.net().email())
                .create();

        LoanDetails loanDetails = Instancio.of(LoanDetails.class)
                .ignore(field(LoanDetails::getId))
                .ignore(field(LoanDetails::getLenderOffers))
                .generate(field(LoanDetails::getAmount), gen -> gen.math().bigDecimal()
                        .min(new BigDecimal(4000))
                        .max(new BigDecimal(50000)))
                .generate(field(LoanDetails::getDeposit), gen -> gen.math().bigDecimal()
                        .min(BigDecimal.ZERO)
                        .max(new BigDecimal(2000)))
                .generate(field(LoanDetails::getLoanTerm), gen -> gen.ints().min(1).max(7))
                .create();

        validRequestDto
                .setApplicant(applicant)
                .setLoanDetails(loanDetails);

        return validRequestDto;
    }

}