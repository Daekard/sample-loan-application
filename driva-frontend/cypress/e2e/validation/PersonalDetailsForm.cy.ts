/// <reference types='cypress' />

import {faker} from '@faker-js/faker';

describe('Personal Details Form Validation', () => {
    beforeEach(() => {
        cy.visitApp()
    })

    const nextButtonTestId = 'personalDetails-footer-next';

    it('should display an error message when the first name input is empty on next', () => {
        const firstNameField = cy.getByTestId('personalDetails-firstName-input')
        const nextButton = cy.getByTestId(nextButtonTestId)

        firstNameField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('personalDetails-firstName-errorMessage')
        errorMessage.should('contain', 'First name is required')
    })

    it('should display an error message when the last name input is empty on next', () => {
        const lastNameField = cy.getByTestId('personalDetails-lastName-input')
        const nextButton = cy.getByTestId('personalDetails-footer-next')

        lastNameField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('personalDetails-lastName-errorMessage')
        errorMessage.should('contain', 'Last name is required')
    })

    it('should display an error message when the email input is empty on next', () => {
        const emailField = cy.getByTestId('personalDetails-email-input')
        const nextButton = cy.getByTestId('personalDetails-footer-next')

        emailField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('personalDetails-email-errorMessage')
        errorMessage.should('contain', 'Email is required')
    })

    it('should display an error message when the email input is invalid on next', () => {
        const emailField = cy.getByTestId('personalDetails-email-input')
        const nextButton = cy.getByTestId('personalDetails-footer-next')

        emailField.clear().type(faker.word.words())
        nextButton.click()

        const errorMessage = cy.getByTestId('personalDetails-email-errorMessage')
        errorMessage.should('contain', 'Invalid email address')
    })

    it('should include all options for employment status', () => {
        const employmentStatusField = cy.getByTestId('personalDetails-employmentStatus-select')

        employmentStatusField.get('option[value="EMPLOYED"').should('contain', 'Employed')
        employmentStatusField.get('option[value="UNEMPLOYED"').should('contain', 'Unemployed')
        employmentStatusField.get('option[value="SELF_EMPLOYED"').should('contain', 'Self Employed')

    })

    it('should display an error message when the employment status is `employed` and employer name is empty on next', () => {
        const employmentStatusField = cy.getByTestId('personalDetails-employmentStatus-select')
        const employerNameField = cy.getByTestId('personalDetails-employerName-input')
        const nextButton = cy.getByTestId('personalDetails-footer-next')

        employmentStatusField.select('EMPLOYED')
        employerNameField.clear()
        nextButton.click()

        const errorMessage = cy.getByTestId('personalDetails-employerName-errorMessage')
        errorMessage.should('contain', 'Employer name is required')
    })

    it('should remove the employer name field when the employment status is `unemployed`', () => {
        const employmentStatusField = cy.getByTestId('personalDetails-employmentStatus-select')

        employmentStatusField.select('EMPLOYED')
        cy.getByTestId('personalDetails-employerName-input').should('exist')

        employmentStatusField.select('UNEMPLOYED')
        cy.getByTestId('personalDetails-employerName-input').should('not.exist')
    })

    it('should proceed to the next step when all fields are valid', () => {
        const firstNameField = cy.getByTestId('personalDetails-firstName-input')
        const lastNameField = cy.getByTestId('personalDetails-lastName-input')
        const emailField = cy.getByTestId('personalDetails-email-input')
        const employmentStatusField = cy.getByTestId('personalDetails-employmentStatus-select')
        const employerNameField = cy.getByTestId('personalDetails-employerName-input')
        const nextButton = cy.getByTestId('personalDetails-footer-next')

        firstNameField.type(faker.person.firstName())
        lastNameField.type(faker.person.lastName())
        emailField.type(faker.internet.email())

        const randomEmploymentStatus = ['EMPLOYED', 'UNEMPLOYED', 'SELF_EMPLOYED'][Math.floor(Math.random() * 3)]
        employmentStatusField.select(randomEmploymentStatus)

        if (randomEmploymentStatus === 'EMPLOYED') {
            employerNameField.type(faker.company.name())
        }

        nextButton.click()

        cy.getByTestId('loanDetails').should('exist')
    })
})