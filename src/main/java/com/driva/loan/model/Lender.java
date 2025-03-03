package com.driva.loan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.math.BigDecimal;

/**
 * Represents a lender including the interest rate and fee.
 */
@Entity
@Table(name = "lenders")
public class Lender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lender_name", nullable = false)
    @NotBlank(message = "Lender name is mandatory")
    private String lenderName;

    @Column(name = "interest_rate", nullable = false, precision = 4, scale = 2)
    private BigDecimal interestRate;

    @Column(name = "fee", precision = 5, scale = 2)
    private BigDecimal fee;

    @Enumerated(EnumType.STRING)
    @Column(name = "fee_type")
    private FeeType feeType;

    public Long getId() {
        return id;
    }

    public Lender setId(Long id) {
        this.id = id;
        return this;
    }

    public String getLenderName() {
        return lenderName;
    }

    public Lender setLenderName(String lenderName) {
        this.lenderName = lenderName;
        return this;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public Lender setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
        return this;
    }

    public BigDecimal getFee() {
        return fee;
    }

    public Lender setFee(BigDecimal fee) {
        this.fee = fee;
        return this;
    }

    public FeeType getFeeType() {
        return feeType;
    }

    public Lender setFeeType(FeeType feeType) {
        this.feeType = feeType;
        return this;
    }
}
