package com.driva.loan.services;

import com.driva.loan.model.LoanDetails;
import com.driva.loan.repositories.LoanDetailsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class LoanDetailsService {

    private final LoanDetailsRepository loanDetailsRepository;

    public LoanDetailsService(LoanDetailsRepository loanDetailsRepository) {
        this.loanDetailsRepository = loanDetailsRepository;
    }

    @Transactional
    public LoanDetails save(LoanDetails loanDetails) {
        loanDetailsRepository.save(loanDetails);
        return loanDetails;
    }
}
