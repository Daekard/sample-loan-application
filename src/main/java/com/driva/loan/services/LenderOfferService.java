package com.driva.loan.services;

import com.driva.loan.model.*;
import com.driva.loan.repositories.LenderOfferRepository;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LenderOfferService {

    private final LenderOfferRepository lenderOfferRepository;
    private final LenderService lenderService;

    public LenderOfferService(
            LenderOfferRepository lenderOfferRepository,
            LenderService lenderService) {
        this.lenderOfferRepository = lenderOfferRepository;
        this.lenderService = lenderService;
    }

    /**
     * Find all lender offers for a given loan details ID.
     *
     * @param loanDetailsId th id of the parent loan details entity
     * @return a list of lender offers for the given loan details ID
     */
    public Iterable<LenderOffer> findByLoanDetailsId(Long loanDetailsId) {
        QLoanDetails loanDetails = QLoanDetails.loanDetails;
        JPQLQuery<LenderOffer> query = JPAExpressions.selectFrom(QLenderOffer.lenderOffer)
                .leftJoin(loanDetails)
                .on(loanDetails.lenderOffers.contains(QLenderOffer.lenderOffer))
                .where(QLoanDetails.loanDetails.id.eq(loanDetailsId));

        return lenderOfferRepository.findAll(QLenderOffer.lenderOffer.in(query));
    }

    public List<LenderOffer> createLenderOffersFor(LoanDetails loanDetails) {
        List<Lender> lenders = lenderService.findAll();
        return lenders.stream()
                .map(lender -> createLenderOffer(lender, loanDetails))
                .collect(Collectors.toList());
    }

    private LenderOffer createLenderOffer(
            Lender lender,
            LoanDetails loanDetails) {

        BigDecimal monthlyPayment = calculateMonthlyPayments(
                lender.getInterestRate(),
                loanDetails.getAmount(),
                loanDetails.getDeposit(),
                loanDetails.getLoanTerm()
        );

        return new LenderOffer()
                .setLenderName(lender.getLenderName())
                .setFee(lender.getFee())
                .setFeeType(lender.getFeeType())
                .setMonthlyPayment(monthlyPayment)
                .setInterestRate(lender.getInterestRate());
    }

    /**
     * Calculate monthly payments for the loan application based on the amount, deposit, loan term and interest
     * rate.
     * <p>
     * The formula used to calculate the monthly payment is:
     * <pre>
     *     MP = P * (r/n) / (1 - (1 + r)^-nY)
     *     where:
     *     MP = monthly payment
     *     P = principal loan amount (amount - deposit)
     *     r = monthly interest rate (annual interest rate / 12)
     *     n = number of payments per year (12)
     *     Y = number of years
     * </pre>
     *
     * @param interestRate the interest rate of the lon defined as a percentage APR
     * @param loanAmount   the total amount of the loan
     * @param deposit      the deposit amount
     * @param loanTerm     the term of the loan in years
     * @return the monthly payment amount
     */
    private BigDecimal calculateMonthlyPayments(
            BigDecimal interestRate,
            BigDecimal loanAmount,
            BigDecimal deposit,
            Integer loanTerm) {

        final BigDecimal MONTHS_IN_YEAR = BigDecimal.valueOf(12);
        final int totalPayments = loanTerm * 12;

        BigDecimal annualInterestRateDecimal = convertInterestRate(interestRate);
        BigDecimal monthlyInterestRate = annualInterestRateDecimal.divide(MONTHS_IN_YEAR, 10, RoundingMode.HALF_UP);
        BigDecimal principal = loanAmount.subtract(deposit);

        // Calculate numerator (P * (r / n))
        BigDecimal numerator = principal.multiply(monthlyInterestRate);

        // Calculate denominator (1 - (1 + r)^-nY)
        BigDecimal denominator = BigDecimal.valueOf(
                1 - Math.pow(1 + monthlyInterestRate.doubleValue(), -totalPayments));

        // Monthly payment = numerator / denominator
        BigDecimal monthlyPayment = numerator.divide(denominator, 10, RoundingMode.HALF_UP);

        // Return with two-decimal precision
        return monthlyPayment.setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal convertInterestRate(BigDecimal interestRate) {
        return interestRate.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP);
    }

}
