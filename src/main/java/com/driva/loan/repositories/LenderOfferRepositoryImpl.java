package com.driva.loan.repositories;

import com.driva.loan.model.LenderOffer;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

// This class is used to implement custom query methods for LenderOfferRepository using Querydsl
public class LenderOfferRepositoryImpl extends QuerydslRepositorySupport {
    public LenderOfferRepositoryImpl() {
        super(LenderOffer.class);
    }
}
