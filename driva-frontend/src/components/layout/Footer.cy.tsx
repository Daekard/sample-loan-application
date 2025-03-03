import {Footer, FooterProps} from './Footer'

describe('<Footer />', () => {

    const footerProps: FooterProps = {
        testId: 'test-footer',
    }

    it('should renders', () => {
        cy.mount(<Footer {...footerProps} />)
    })

    it('should render with the previous button when the `onPreviousHandler` is supplied', () => {
        const onPreviousHandler = cy.stub()
        cy.mount(<Footer {...footerProps} onPreviousHandler={onPreviousHandler}/>)
        cy.getByTestId(`${footerProps.testId}-previous`).should('exist')
    })

    it('should render with the next button when the `onNextHandler` is supplied', () => {
        const onNextHandler = cy.stub()
        cy.mount(<Footer {...footerProps} onNextHandler={onNextHandler}/>)
        cy.getByTestId(`${footerProps.testId}-next`).should('exist')
    })

    it('should not render the previous button when the `onPreviousHandler` is not supplied', () => {
        cy.mount(<Footer {...footerProps} />)
        cy.getByTestId(`${footerProps.testId}-previous`).should('not.exist')
    })

    it('should not render the next button when the `onNextHandler` is not supplied', () => {
        cy.mount(<Footer {...footerProps} />)
        cy.getByTestId(`${footerProps.testId}-next`).should('not.exist')
    })

    it('should disable the buttons with disabled is set to `true`', () => {
        const onNextHandler = cy.stub()
        const onPreviousHandler = cy.stub()

        cy.mount(<Footer {...footerProps} onNextHandler={onNextHandler} onPreviousHandler={onPreviousHandler} disabled={true} />)
        cy.getByTestId(`${footerProps.testId}-next`).should('not.exist')
    })
})