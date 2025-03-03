/// <reference types="cypress" />

import {Button, ButtonProps, ButtonType} from "./Button"
import {faker} from "@faker-js/faker";

describe('<Button />', () => {

    const buttonTypes: ButtonType[] = ['button', 'submit', 'reset']
    const randomType = buttonTypes[Math.floor(Math.random() * buttonTypes.length)]
    const randomDisabledState = faker.datatype.boolean()

    const buttonProps: ButtonProps = {
        type: randomType,
        disabled: randomDisabledState,
        onClick: () => {},
        children: faker.word.words(),
        testId: 'test-button',
    }

    it('should render', () => {
        cy.mount(<Button {...buttonProps} />)
        cy.getByTestId(buttonProps.testId).should('exist')
    })

    it('should render with the children', () => {
        cy.mount(<Button {...buttonProps} />)
        cy.getByTestId(buttonProps.testId).should('contain', buttonProps.children)
    })

    it('should render with the type', () => {
        cy.mount(<Button {...buttonProps} />)
        cy.getByTestId(buttonProps.testId).should('have.attr', 'type', randomType)
    })

    it('should render with the disabled attribute', () => {
        cy.mount(<Button {...buttonProps} disabled={true}/>)
        cy.getByTestId(buttonProps.testId).should('be.disabled')
    })

    it('should invoke the onClick handler when the disabled attribute is `undefined` and the button is clicked', () => {
        const onClick = cy.stub()
        cy.mount(<Button {...buttonProps} disabled={undefined} onClick={onClick}/>)
        cy.getByTestId(buttonProps.testId).click().then(() => {
            expect(onClick).to.be.called
        });
    })

    it('should invoke the onClick handler when the disabled attribute is `false` and the button is clicked ', () => {
        const onClick = cy.stub()
        cy.mount(<Button {...buttonProps} disabled={false} onClick={onClick}/>)
        cy.getByTestId(buttonProps.testId).click().then(() => {
            expect(onClick).to.be.called
        });
    })

})