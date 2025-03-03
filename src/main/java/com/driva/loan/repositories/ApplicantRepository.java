package com.driva.loan.repositories;

import com.driva.loan.model.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long>, QuerydslPredicateExecutor<Applicant> {
}
