package com.driva.loan.controllers;

import com.driva.loan.model.Lender;
import com.driva.loan.services.LenderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LenderController {

    private final LenderService lenderService;

    public LenderController(LenderService lenderService) {
        this.lenderService = lenderService;
    }

    /**
     * Get all lenders (Not used, just for demonstration purposes).
     * @return all lenders
     */
    @GetMapping("/lenders")
    public Iterable<Lender> findAll() {
        return lenderService.findAll();
    }
}
