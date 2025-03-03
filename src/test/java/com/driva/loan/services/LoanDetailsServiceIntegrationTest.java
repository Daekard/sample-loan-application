package com.driva.loan.services;

import com.driva.loan.model.Applicant;
import com.driva.loan.model.LenderOffer;
import com.driva.loan.model.LoanDetails;
import com.driva.loan.repositories.ApplicantRepository;
import com.driva.loan.repositories.LoanDetailsRepository;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.instancio.Select.field;

@SpringBootTest
public class LoanDetailsServiceIntegrationTest {

    @Autowired
    private LoanDetailsService loanDetailsService;

    @Autowired
    private LoanDetailsRepository loanDetailsRepository;

    @Autowired
    private ApplicantService applicantService;

    @Autowired
    private ApplicantRepository applicantRepository;

    @Test
    @Transactional
    public void testSavePersistsIncludedLenderOffers() {
        Applicant applicant = Instancio.of(Applicant.class)
                .ignore(field(Applicant::getId))
                .ignore(field(Applicant::getLoanDetails))
                .generate(field(Applicant::getEmail), gen -> gen.net().email())
                .create();

        applicantService.save(applicant);

        LoanDetails loanDetails = Instancio.of(LoanDetails.class)
                .ignore(field(LoanDetails::getId))
                .ignore(field(LoanDetails::getLenderOffers))
                .generate(field(LoanDetails::getAmount),
                        gen -> gen.math().bigDecimal().range(new BigDecimal(2000), new BigDecimal(50000)))
                .generate(field(LoanDetails::getDeposit),
                        gen -> gen.math().bigDecimal().range(BigDecimal.ZERO, new BigDecimal(2000)))
                .generate(field(LoanDetails::getLoanTerm), gen -> gen.ints().range(1, 7))
                .create();

        applicant.setLoanDetails(loanDetails);
        applicantService.save(applicant);

        Applicant savedApplicant = applicantRepository.findById(applicant.getId()).orElse(null);
        assertThat(savedApplicant).isNotNull();

        LoanDetails savedLoanDetails = savedApplicant.getLoanDetails();
        List<LenderOffer> lenderOffers = buildLenderOffers();

        savedLoanDetails.addLenderOffers(lenderOffers);
        loanDetailsService.save(savedLoanDetails);

        List<LenderOffer> savedLenderOffers = savedLoanDetails.getLenderOffers();
        assertThat(savedLenderOffers).isNotNull();
        assertThat(savedLenderOffers).hasSize(lenderOffers.size());

        // Verify that the lender offers are saved and have IDs
        savedLenderOffers.forEach(lenderOffer -> {
            assertThat(lenderOffer.getId()).isNotNull();
        });

        // Clean up
        loanDetailsRepository.delete(savedLoanDetails);
        applicantRepository.delete(applicant);
    }

    private List<LenderOffer> buildLenderOffers() {
        List<LenderOffer> lenderOffers = Instancio.ofList(LenderOffer.class)
                .generate(field(LenderOffer::getInterestRate), gen -> gen.math().bigDecimal().range(BigDecimal.ZERO,
                        new BigDecimal(10)))
                .generate(field(LenderOffer::getFee), gen -> gen.math().bigDecimal().range(BigDecimal.ZERO,
                        new BigDecimal(100)))
                .generate(field(LenderOffer::getMonthlyPayment), gen -> gen.math().bigDecimal().range(BigDecimal.ZERO
                        , new BigDecimal(1000)))
                .ignore(field(LenderOffer::getId))
                .create();
        return lenderOffers;
    }
}
