/// <reference types="cypress" />

import {Label, LabelProps} from './Label'
import {faker} from "@faker-js/faker";

describe('<Label />', () => {

    const labelProps: LabelProps = {
        label: faker.word.words(),
        testId: 'test-label',
    }

    it('should render', () => {
        cy.mount(<Label {...labelProps} />)
        cy.getByTestId(labelProps.testId).should('exist')
    })

    it('should render with the label', () => {
        cy.mount(<Label {...labelProps} />)
        cy.getByTestId(labelProps.testId).should('exist')
        cy.getByTestId(labelProps.testId).should('contain', labelProps.label)
    })

})