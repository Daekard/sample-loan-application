package com.driva.loan.services;

import com.driva.loan.model.Applicant;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ApplicationServiceUnitTest {

    @Mock
    private ApplicantService applicantService;

    @Mock
    private LoanDetailsService loanDetailsService;

    @Mock
    private LenderOfferService lenderOfferService;

    @InjectMocks
    private ApplicationService applicationService;

    @Test
    void testSaveAndCreateOffersForInvokesSave() {
        Applicant applicant = Instancio.of(Applicant.class).create();
        LoanDetails loanDetails = Instancio.of(LoanDetails.class).create();

        LenderOffer lenderOffer = Instancio.of(LenderOffer.class).create();
        List<LenderOffer> lenderOffers = Collections.singletonList(lenderOffer);

        when(lenderOfferService.createLenderOffersFor(loanDetails)).thenReturn(lenderOffers);

        applicationService.saveAndCreateOffersFor(applicant, loanDetails);

        // Verify that the applicant and loan details are saved
        verify(applicantService).save(applicant);
        verify(loanDetailsService).save(loanDetails);
    }
}