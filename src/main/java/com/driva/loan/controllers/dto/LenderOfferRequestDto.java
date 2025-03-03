package com.driva.loan.controllers.dto;

import com.driva.loan.model.Applicant;
import com.driva.loan.model.LoanDetails;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class LenderOfferRequestDto {

    @NotNull
    @Valid
    private Applicant applicant;

    @NotNull
    @Valid
    private LoanDetails loanDetails;

    public Applicant getApplicant() {
        return applicant;
    }

    public LenderOfferRequestDto setApplicant(Applicant applicant) {
        this.applicant = applicant;
        return this;
    }

    public LoanDetails getLoanDetails() {
        return loanDetails;
    }

    public LenderOfferRequestDto setLoanDetails(LoanDetails loanDetails) {
        this.loanDetails = loanDetails;
        return this;
    }
}
