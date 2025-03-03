package com.driva.loan.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

/**
 * Represents a lender offer associated with a loan application.
 * Could be modelled as an association between a lender and a loan application.
 */
@Entity
@Table(name = "lender_offers")
public class LenderOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lender_name", nullable = false)
    private String lenderName;

    @Column(name = "monthly_payment", nullable = false, precision = 10, scale = 2)
    private BigDecimal monthlyPayment;

    @Column(name = "interest_rate", nullable = false, precision = 4, scale = 2)
    private BigDecimal interestRate;

    @Column(name = "fee", precision = 5, scale = 2)
    private BigDecimal fee;

    @Column(name = "fee_type")
    @Enumerated(EnumType.STRING)
    private FeeType feeType;

    public Long getId() {
        return id;
    }

    public LenderOffer setId(Long id) {
        this.id = id;
        return this;
    }

    public String getLenderName() {
        return lenderName;
    }

    public LenderOffer setLenderName(String lenderName) {
        this.lenderName = lenderName;
        return this;
    }

    public BigDecimal getMonthlyPayment() {
        return monthlyPayment;
    }

    public LenderOffer setMonthlyPayment(BigDecimal monthlyPayment) {
        this.monthlyPayment = monthlyPayment;
        return this;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public LenderOffer setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
        return this;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public LenderOffer setFee(BigDecimal fee) {
        this.fee = fee;
        return this;
    }

    public FeeType getFeeType() {
        return feeType;
    }

    public LenderOffer setFeeType(FeeType feeType) {
        this.feeType = feeType;
        return this;
    }
}
