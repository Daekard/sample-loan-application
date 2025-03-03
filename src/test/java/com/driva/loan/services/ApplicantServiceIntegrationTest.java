package com.driva.loan.services;

import com.driva.loan.model.Applicant;
import com.driva.loan.model.LoanDetails;
import com.driva.loan.repositories.ApplicantRepository;
import org.instancio.Instancio;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;
import static org.instancio.Select.field;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class ApplicantServiceIntegrationTest {

    @Autowired
    private ApplicantService applicantService;

    @Autowired
    private ApplicantRepository applicantRepository;

    @Test
    public void testSavePersistsApplicantDetails() {
        Applicant applicant = Instancio.of(Applicant.class)
                .ignore(field(Applicant::getId))
                .ignore(field(Applicant::getLoanDetails))
                .generate(field(Applicant::getEmail), gen -> gen.net().email())
                .create();

        applicantService.save(applicant);

        Applicant savedApplicant = applicantRepository.findById(applicant.getId()).orElse(null);

        // Verify that the applicant is saved and has the same details
        assertThat(savedApplicant).isNotNull();
        assertThat(savedApplicant.getId()).isNotNull();
        assertThat(savedApplicant.getFirstName()).isEqualTo(applicant.getFirstName());
        assertThat(savedApplicant.getLastName()).isEqualTo(applicant.getLastName());
        assertThat(savedApplicant.getEmail()).isEqualTo(applicant.getEmail());
        assertThat(savedApplicant.getEmployerName()).isEqualTo(applicant.getEmployerName());
        assertThat(savedApplicant.getEmploymentStatus()).isEqualTo(applicant.getEmploymentStatus());

        // Clean up
        applicantRepository.delete(savedApplicant);
    }

    @Test
    public void testSavePersistsApplicantAndIncludedLoanDetails() {
        Applicant applicant = Instancio.of(Applicant.class)
                .ignore(field(Applicant::getId))
                .ignore(field(Applicant::getLoanDetails))
                .generate(field(Applicant::getEmail), gen -> gen.net().email())
                .create();

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

        // Verify that the applicant and loan details are saved and have the same details
        assertThat(savedApplicant).isNotNull();
        assertThat(savedApplicant.getId()).isNotNull();
        assertThat(savedApplicant.getFirstName()).isEqualTo(applicant.getFirstName());
        assertThat(savedApplicant.getLastName()).isEqualTo(applicant.getLastName());
        assertThat(savedApplicant.getEmail()).isEqualTo(applicant.getEmail());
        assertThat(savedApplicant.getEmployerName()).isEqualTo(applicant.getEmployerName());
        assertThat(savedApplicant.getEmploymentStatus()).isEqualTo(applicant.getEmploymentStatus());

        LoanDetails savedLoanDetails = savedApplicant.getLoanDetails();
        assertThat(savedLoanDetails).isNotNull();
        assertThat(savedLoanDetails.getId()).isNotNull();
        assertThat(savedLoanDetails.getAmount()).isEqualTo(loanDetails.getAmount());
        assertThat(savedLoanDetails.getDeposit()).isEqualTo(loanDetails.getDeposit());
        assertThat(savedLoanDetails.getLoanTerm()).isEqualTo(loanDetails.getLoanTerm());
        assertThat(savedLoanDetails.getLoanType()).isEqualTo(loanDetails.getLoanType());

        // Clean up
        applicantRepository.delete(savedApplicant);
    }
}