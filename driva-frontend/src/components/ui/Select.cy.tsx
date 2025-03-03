/// <reference types="cypress" />

import Select, {SelectProps} from "./Select"
import {faker} from "@faker-js/faker";
import {SelectOption} from "../../types/types.ts";

describe('<Select />', () => {

    const options: SelectOption[] = [
        {label: faker.word.words(), value: faker.number.int()},
        {label: faker.word.words(), value: faker.number.int()},
        {label: faker.word.words(), value: faker.number.int()}
    ]

    const selectProps: SelectProps = {
        label: faker.word.words(),
        options: options,
        testId: 'test-select',
        error: undefined,
    }

    it('should render', () => {
        cy.mount(<Select {...selectProps} />)
        cy.getByTestId(selectProps.testId).should('exist')
    })

    it('should render with the label', () => {
        cy.mount(<Select {...selectProps} />)
        cy.getByTestId(`${selectProps.testId}-label`).should('exist')
        cy.getByTestId(`${selectProps.testId}-label`).should('contain', selectProps.label)
    })

    it('should render with the options', () => {
        cy.mount(<Select {...selectProps} />)
        cy.getByTestId(`${selectProps.testId}-select`).should('exist')
        cy.getByTestId(`${selectProps.testId}-select`).find('option').should('have.length', options.length)
    })

    it('should render with the options labels and values', () => {
        cy.mount(<Select {...selectProps} />)
        cy.getByTestId(`${selectProps.testId}-select`).find('option').each((option, index) => {
            cy.wrap(option).should('contain', options[index].label)
            cy.wrap(option).should('have.attr', 'value', options[index].value)
        })
    })

    it('should not display an error message when no error is present', () => {
        cy.mount(<Select {...selectProps} />)
        cy.getByTestId(`${selectProps.testId}-error`).should('not.exist')
    })

    it('should display an error message when an error is present', () => {
        const error = {
            message: faker.word.words(),
            type: faker.word.words(),
        }
        cy.mount(<Select {...selectProps} error={error}/>)
        cy.getByTestId(`${selectProps.testId}-errorMessage`).should('exist')
        cy.getByTestId(`${selectProps.testId}-errorMessage`).should('contain', error.message)
    })
})