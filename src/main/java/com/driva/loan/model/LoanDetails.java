package com.driva.loan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents the details of a loan application including the loan amount, deposit, term,
 * purpose, and the associated lender offers.
 */
@Entity
@Table(name = "loan_details")
public class LoanDetails {

    private static final long MIN_AMOUNT = 2000;
    private static final long MAX_AMOUNT = 500000;

    private static final long MIN_DEPOSIT = 0;

    private static final long MIN_LOAN_TERM = 1;
    private static final long MAX_LOAN_TERM = 7;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    @Min(value = MIN_AMOUNT, message = "Amount should be at least 2000")
    @Max(value = MAX_AMOUNT, message = "Amount should not exceed 500000")
    @NotNull
    private BigDecimal amount;

    @Column(name = "deposit", nullable = false, precision = 10, scale = 2)
    @Min(value = MIN_DEPOSIT, message = "Deposit should be at least 0")
    @NotNull
    private BigDecimal deposit;

    @Column(name = "loan_term", nullable = false)
    @Min(value = MIN_LOAN_TERM, message = "Loan term should be at least 1 year")
    @Max(value = MAX_LOAN_TERM, message = "Loan term should not exceed 7 years")
    @NotNull
    private Integer loanTerm;

    @Enumerated(EnumType.STRING)
    @Column(name = "loan_purpose", nullable = false)
    @NotNull
    private LoanType loanType;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "application_id", referencedColumnName = "id")
    private List<LenderOffer> lenderOffers = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getDeposit() {
        return deposit;
    }

    public void setDeposit(BigDecimal deposit) {
        this.deposit = deposit;
    }

    public Integer getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(Integer loanTerm) {
        this.loanTerm = loanTerm;
    }

    public List<LenderOffer> getLenderOffers() {
        return lenderOffers;
    }

    public LoanDetails setLenderOffers(List<LenderOffer> lenderOffers) {
        this.lenderOffers = lenderOffers;
        return this;
    }

    public LoanDetails addLenderOffer(LenderOffer lenderOffer) {
        lenderOffers.add(lenderOffer);
        return this;
    }

    public LoanType getLoanType() {
        return loanType;
    }

    public LoanDetails setLoanType(LoanType loanType) {
        this.loanType = loanType;
        return this;
    }
    
    public LoanDetails addLenderOffers(List<LenderOffer> lenderOffers) {
        this.lenderOffers.addAll(lenderOffers);
        return this;
    }
}
