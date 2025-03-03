/// <reference types="cypress" />

import ErrorMessage, {ErrorMessageProps} from "./ErrorMessage"
import {faker} from "@faker-js/faker";

describe('<ErrorMessage />', () => {

    const errorMessageProps: ErrorMessageProps = {
        error: {
            message: faker.word.words(),
            type: faker.word.words(),
        },
        testId: 'test-errorMessage',
    }

    it('should render', () => {
        cy.mount(<ErrorMessage {...errorMessageProps}/>)
        cy.getByTestId(errorMessageProps.testId).should('exist')
    })

    it('should display the error message', () => {
        cy.mount(<ErrorMessage {...errorMessageProps}/>)
        cy.getByTestId(errorMessageProps.testId).should('exist')
        cy.getByTestId(errorMessageProps.testId).should('contain', errorMessageProps.error.message)
    });
})