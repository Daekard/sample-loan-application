package com.driva.loan.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Represents an applicant with personal and employment information along with their associated loan details.
 */
@Entity(name = "applicants")
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @Column(name = "last_name", nullable = false)
    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Column(name = "email", nullable = false)
    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @Column(name = "employment_status", nullable = false)
    @NotNull(message = "Employment status is mandatory")
    @Enumerated(EnumType.STRING)
    private EmploymentStatus employmentStatus;

    @Column(name = "employer_name")
    private String employerName;

    @OneToOne(cascade = CascadeType.ALL)
    private LoanDetails loanDetails;

    public Long getId() {
        return id;
    }

    public Applicant setId(Long id) {
        this.id = id;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public Applicant setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public Applicant setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public Applicant setEmail(String email) {
        this.email = email;
        return this;
    }

    public EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public Applicant setEmploymentStatus(EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
        return this;
    }

    public String getEmployerName() {
        return employerName;
    }

    public Applicant setEmployerName(String employerName) {
        this.employerName = employerName;
        return this;
    }

    public LoanDetails getLoanDetails() {
        return loanDetails;
    }

    public Applicant setLoanDetails(LoanDetails loanDetails) {
        this.loanDetails = loanDetails;
        return this;
    }
}
