package com.driva.loan.services;

import com.driva.loan.model.Applicant;
import com.driva.loan.repositories.ApplicantRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class ApplicantService {

    private final ApplicantRepository applicantRepository;

    public ApplicantService(ApplicantRepository applicantRepository) {
        this.applicantRepository = applicantRepository;
    }

    @Transactional
    public Applicant save(Applicant applicant) {
        applicantRepository.save(applicant);
        return applicant;
    }
}
