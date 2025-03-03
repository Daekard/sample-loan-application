package com.driva.loan.services;

import com.driva.loan.model.Lender;
import com.driva.loan.repositories.LenderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LenderService {

    private final LenderRepository lenderRepository;

    public LenderService(LenderRepository lenderRepository) {
        this.lenderRepository = lenderRepository;
    }

    public List<Lender> findAll() {
        return lenderRepository.findAll();
    }
}
