/// <reference types="cypress" />

import Input, {InputProps} from "./Input"
import {FieldError} from "react-hook-form";
import {faker} from "@faker-js/faker";

describe('<Input />', () => {
    const types = ['text', 'email', 'number']
    const randomType = types[Math.floor(Math.random() * types.length)]

    const inputProps: InputProps = {
        label: faker.word.words(),
        type: randomType,
        placeholder: faker.word.words(),
        testId: 'test-input',
    }

    it('should render', () => {
        cy.mount(<Input {...inputProps} />)
        cy.getByTestId(inputProps.testId).should('exist')
    })

    it('should render with the label', () => {
        cy.mount(<Input {...inputProps} />)
        cy.getByTestId(`${inputProps.testId}-label`).should('exist')
        cy.getByTestId(`${inputProps.testId}-label`).should('contain', inputProps.label)
    })

    it('should render with the placeholder', () => {
        cy.mount(<Input {...inputProps} />)
        cy.getByTestId(`${inputProps.testId}-input`).should('have.attr', 'placeholder', inputProps.placeholder)
    })

    it('should render with the type', () => {
        const types = ['text', 'email', 'number']
        const randomType = types[Math.floor(Math.random() * types.length)]

        cy.mount(<Input {...inputProps} type={randomType}/>)
        cy.getByTestId(`${inputProps.testId}-input`).should('have.attr', 'type', randomType)
    })

    it('should not display an error message when no error is present', () => {
        cy.mount(<Input {...inputProps} />)
        cy.getByTestId(`${inputProps.testId}-errorMessage`).should('not.exist')
    })

    it('should display an error message when an error is present', () => {
        const error: FieldError = {
            message: 'test error message',
            type: 'test error type',
        }
        cy.mount(<Input {...inputProps} error={error}/>)
        cy.getByTestId(`${inputProps.testId}-errorMessage`).should('exist')
        cy.getByTestId(`${inputProps.testId}-errorMessage`).should('contain', error.message)
    })
})