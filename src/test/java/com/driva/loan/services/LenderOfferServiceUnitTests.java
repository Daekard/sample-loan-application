package com.driva.loan.services;

import com.driva.loan.model.Lender;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import com.driva.loan.repositories.LenderOfferRepository;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.stream.IntStream;

import static org.instancio.Select.field;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LenderOfferServiceUnitTests {

    @Mock
    private LenderOfferRepository lenderOfferRepository;

    @Mock
    private LenderService lenderService;

    @InjectMocks
    private LenderOfferService lenderOfferService;

    @Test
    void testCreateLenderOffersIncludesLenderDetails() {
        LoanDetails loanDetails = Instancio.create(LoanDetails.class);
        List<Lender> lenders = Instancio.ofList(Lender.class).create();

        when(lenderService.findAll()).thenReturn(lenders);

        List<LenderOffer> lenderOffers = lenderOfferService.createLenderOffersFor(loanDetails);

        assertNotNull(lenderOffers, "Lender offers should not be null");
        assertEquals(lenders.size(), lenderOffers.size(), "The number of lender offers should match the number of " +
                "lenders");

        IntStream.range(0, lenders.size()).forEach(i -> {
            Lender lender = lenders.get(i);
            LenderOffer lenderOffer = lenderOffers.get(i);

            assertEquals(lender.getLenderName(), lenderOffer.getLenderName(), "The lender name should match");
            assertEquals(lender.getFee(), lenderOffer.getFee(), "The fee should match");
            assertEquals(lender.getFeeType(), lenderOffer.getFeeType(), "The fee type should match");
            assertEquals(lender.getInterestRate(), lenderOffer.getInterestRate(), "The interest rate should match");
        });
    }

    @Test
    void testCreateLenderOffersCalculatesTheCorrectMonthlyPayment() {
        // Set up known values for LoanDetails
        LoanDetails loanDetails = Instancio.of(LoanDetails.class)
                .set(field(LoanDetails::getAmount), new BigDecimal("10000"))
                .set(field(LoanDetails::getDeposit), new BigDecimal("1000"))
                .set(field(LoanDetails::getLoanTerm), 5)
                .create();

        // Set up known values for Lender
        Lender lender = Instancio.of(Lender.class)
                .set(field(Lender::getInterestRate), new BigDecimal("5.0"))
                .set(field(Lender::getFee), new BigDecimal("100"))
                .create();

        when(lenderService.findAll()).thenReturn(Collections.singletonList(lender));

        List<LenderOffer> lenderOffers = lenderOfferService.createLenderOffersFor(loanDetails);

        assertEquals(1, lenderOffers.size());
        LenderOffer lenderOffer = lenderOffers.get(0);

        BigDecimal expectedMonthlyPayment = new BigDecimal("169.84");
        assertEquals(expectedMonthlyPayment, lenderOffer.getMonthlyPayment());
    }

    @Test
    void testCreateLenderOffersWithZeroDepositCalculatesTheCorrectMonthlyPayment() {
        LoanDetails loanDetails = Instancio.of(LoanDetails.class)
                .set(field(LoanDetails::getAmount), new BigDecimal("10000"))
                .set(field(LoanDetails::getDeposit), BigDecimal.ZERO)
                .set(field(LoanDetails::getLoanTerm), 5)
                .create();

        Lender lender = Instancio.of(Lender.class)
                .set(field(Lender::getInterestRate), new BigDecimal("5.0"))
                .set(field(Lender::getFee), new BigDecimal("100"))
                .create();

        when(lenderService.findAll()).thenReturn(Collections.singletonList(lender));

        List<LenderOffer> lenderOffers = lenderOfferService.createLenderOffersFor(loanDetails);

        assertEquals(1, lenderOffers.size());
        LenderOffer lenderOffer = lenderOffers.get(0);

        BigDecimal expectedMonthlyPayment = new BigDecimal("188.71");
        assertEquals(expectedMonthlyPayment, lenderOffer.getMonthlyPayment());
    }


}