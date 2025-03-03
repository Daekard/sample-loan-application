/// <reference types='cypress' />

import {faker} from '@faker-js/faker';

describe('User Journey Test', () => {
    beforeEach(() => {
        cy.visitApp()
    })

    it('a user can enter their personal details and loan details and review the lender offers', () => {
        // Personal Details Form
        cy.getByTestId('formHeading').should('contain', 'Personal Details')

        const firstNameField = cy.getByTestId('personalDetails-firstName-input')
        const lastNameField = cy.getByTestId('personalDetails-lastName-input')
        const emailField = cy.getByTestId('personalDetails-email-input')
        const employmentStatusField = cy.getByTestId('personalDetails-employmentStatus-select')
        const employerNameField = cy.getByTestId('personalDetails-employerName-input')
        const personalDetailsNextButton = cy.getByTestId('personalDetails-footer-next')

        firstNameField.type(faker.person.firstName())
        lastNameField.type(faker.person.lastName())
        emailField.type(faker.internet.email())

        const randomEmploymentStatus = ['EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED'][Math.floor(Math.random() * 3)]
        employmentStatusField.select(randomEmploymentStatus)

        if (randomEmploymentStatus === 'EMPLOYED') {
            employerNameField.type(faker.company.name())
        }

        personalDetailsNextButton.click()

        // Loan Details Form
        cy.getByTestId('formHeading').should('contain', 'Loan Details')

        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const depositField = cy.getByTestId('loanDetails-deposit-input')
        const loanPurposeField = cy.getByTestId('loanDetails-loanType-select')
        const loanTermField = cy.getByTestId('loanDetails-loanTerm-select')
        const loanDetailsNextButton = cy.getByTestId('loanDetails-footer-next')

        loanAmountField.clear().type(faker.number.int({min: 2000, max: 50000}).toString())
        depositField.clear().type("0")

        const randomLoanPurpose = ['HOME_IMPROVEMENT', 'VEHICLE', 'PERSONAL', 'DEBT_CONSOLIDATION'][Math.floor(Math.random() * 4)]
        loanPurposeField.select(randomLoanPurpose)

        const randomLoanTerm = faker.number.int({min: 1, max: 7}).toString()
        loanTermField.select(randomLoanTerm)
        loanDetailsNextButton.click()

        // Verify that the user is on the review offers step and the success message is displayed
        cy.getByTestId('formHeading').should('contain', 'Review Offers')
        cy.getByTestId('reviewOffers-successMessage').should("exist")

        // Verify that the user sees 1 or more lender offers
        const lenderOffers = cy.get('*[data-testid^="lenderOffer-"]')
        lenderOffers.should('have.length.greaterThan', 0)
    })
})