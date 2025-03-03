/// <reference types='cypress' />

import {faker} from '@faker-js/faker';

describe('Loan Details Form Validation', () => {

    const completedPersonalDetailsState = {
        stepNumber: 1,
        formData: {
            personalDetails: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                employmentStatus: 'EMPLOYED',
                employerName: faker.company.name()
            }
        }
    }

    beforeEach(() => {
        cy.visit(Cypress.env('applicationUrl'), {
            onBeforeLoad: (window) => {
                // Set the state in sessionStorage to simulate a completed Personal Details step
                window.sessionStorage.setItem('driva-application-state', JSON.stringify(completedPersonalDetailsState))
            }
        })
    })

    const nextButtonTestId = 'loanDetails-footer-next';

    it('should display an error message when the purchase price input is empty on next', () => {
        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        loanAmountField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('loanDetails-amount-errorMessage')
        errorMessage.should('contain', 'Purchase price must be at least $2000')
    })

    it('should display an error message when the purchase price input is less than 2000', () => {
        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        loanAmountField.clear().type(faker.number.int({min: 0, max: 1999}).toString())
        nextButton.click()

        const errorMessage = cy.getByTestId('loanDetails-amount-errorMessage')
        errorMessage.should('contain', 'Purchase price must be at least $2000')
    })

    it('should display an error message when the purchase price input is greater than 50000', () => {
        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        loanAmountField.clear().type(faker.number.int({min: 50001}).toString())
        nextButton.click()

        const errorMessage = cy.getByTestId('loanDetails-amount-errorMessage')
        errorMessage.should('contain', 'Purchase price must be at most $50000')
    })

    it('should display an error message when the deposit input is empty on next', () => {
        const depositField = cy.getByTestId('loanDetails-deposit-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        depositField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('loanDetails-deposit-errorMessage')
        errorMessage.should('contain', 'Deposit must be at least $0')
    })

    it('should display an error message when the difference between the purchase price and deposit is less than 2000', () => {
        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const depositField = cy.getByTestId('loanDetails-deposit-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        const loanAmount = faker.number.int({min: 2000, max: 50000})
        const deposit = loanAmount - faker.number.int({min: 0, max: 1999})

        loanAmountField.clear().type(loanAmount.toString())
        depositField.clear().type(deposit.toString())
        nextButton.click()

        const errorMessage = cy.getByTestId('loanDetails-deposit-errorMessage')
        errorMessage.should('contain', 'The minimum loan amount is $2000. Adjust purchase price or deposit.')
    })

    it('should include all options for loan type', () => {
        const loanPurposeField = cy.getByTestId('loanDetails-loanType-select')

        loanPurposeField.get('option[value="HOME_IMPROVEMENT"').should('contain', 'Home Improvement')
        loanPurposeField.get('option[value="VEHICLE"').should('contain', 'Vehicle')
        loanPurposeField.get('option[value="PERSONAL"').should('contain', 'Personal Loan')
        loanPurposeField.get('option[value="DEBT_CONSOLIDATION"').should('contain', 'Debt Consolidation')
    })

    it('should proceed to the next step when all fields are valid', () => {
        const loanAmountField = cy.getByTestId('loanDetails-amount-input')
        const depositField = cy.getByTestId('loanDetails-deposit-input')
        const loanPurposeField = cy.getByTestId('loanDetails-loanType-select')
        const loanTermField = cy.getByTestId('loanDetails-loanTerm-select')
        const nextButton = cy.getByTestId(nextButtonTestId)

        loanAmountField.clear().type(faker.number.int({min: 2000, max: 50000}).toString())
        depositField.clear().type("0")

        const randomLoanPurpose = ['HOME_IMPROVEMENT', 'VEHICLE', 'PERSONAL', 'DEBT_CONSOLIDATION'][Math.floor(Math.random() * 4)]
        loanPurposeField.select(randomLoanPurpose)

        const randomLoanTerm = faker.number.int({min: 1, max: 7}).toString()
        loanTermField.select(randomLoanTerm)
        nextButton.click()

        cy.getByTestId('reviewOffers').should('exist')
    })

})