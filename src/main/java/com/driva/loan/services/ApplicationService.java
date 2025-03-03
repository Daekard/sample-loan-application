package com.driva.loan.services;

import com.driva.loan.model.Applicant;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private final ApplicantService applicantService;

    private final LoanDetailsService loanDetailsService;

    private final LenderOfferService lenderOfferService;

    public ApplicationService(
            ApplicantService applicantService,
            LoanDetailsService loanDetailsService,
            LenderOfferService lenderOfferService) {
        this.applicantService = applicantService;
        this.loanDetailsService = loanDetailsService;
        this.lenderOfferService = lenderOfferService;
    }

    /**
     * Persists the applicant and loan application details.
     * Creates a list of lender offers from the available lenders and persists those offers.
     *
     * @param applicant   The details of the applicant
     * @param loanDetails The details of the loan application
     * @return A list of lender offers
     */
    @Transactional
    public List<LenderOffer> saveAndCreateOffersFor(
            Applicant applicant,
            LoanDetails loanDetails
    ) {
        applicant.setLoanDetails(loanDetails);
        applicantService.save(applicant);

        List<LenderOffer> lenderOffers = lenderOfferService.createLenderOffersFor(loanDetails);
        loanDetails.addLenderOffers(lenderOffers);
        loanDetailsService.save(loanDetails);

        return loanDetails.getLenderOffers();
    }

}
