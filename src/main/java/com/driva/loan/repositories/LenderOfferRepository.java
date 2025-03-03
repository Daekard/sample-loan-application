package com.driva.loan.repositories;

import com.driva.loan.model.LenderOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface LenderOfferRepository extends JpaRepository<LenderOffer, Long>,
                                               QuerydslPredicateExecutor<LenderOffer> {
}

