package com.driva.loan.controllers;

import com.driva.loan.controllers.dto.LenderOfferRequestDto;
import com.driva.loan.model.Applicant;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import com.driva.loan.services.ApplicationService;
import com.driva.loan.services.LenderOfferService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LenderOfferController {

    private final ApplicationService applicationService;

    private final LenderOfferService lenderOfferService;

    public LenderOfferController(
            ApplicationService applicationService,
            LenderOfferService lenderOfferService) {
        this.applicationService = applicationService;
        this.lenderOfferService = lenderOfferService;
    }

    /**
     * Processes the loan application request and generates lender offers based on the provided applicant
     * and loan details. The generated offers are saved and returned as a list.
     *
     * @param requestDto the applicant's information and loan details
     * @return a list of lender offers created based on the applicant's information and loan details
     */
    @PostMapping(value = "/lender-offers", produces = MediaType.APPLICATION_JSON_VALUE)
    Iterable<LenderOffer> submitApplication(@Valid @RequestBody LenderOfferRequestDto requestDto) {
        Applicant applicant = requestDto.getApplicant();
        LoanDetails loanDetails = requestDto.getLoanDetails();
        return applicationService.saveAndCreateOffersFor(applicant, loanDetails);
    }

    /**
     * Retrieves all lender offers for a given application (not used, just for demonstration purposes).
     * @param applicationId the application ID
     * @return a list of lender offers for the given application
     */
    @GetMapping(value = "/lender-offers/{applicationId}", produces = MediaType.APPLICATION_JSON_VALUE)
    Iterable<LenderOffer> getLenderOffersForApplication(@PathVariable Long applicationId) {
        return lenderOfferService.findByLoanDetailsId(applicationId);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }
}
