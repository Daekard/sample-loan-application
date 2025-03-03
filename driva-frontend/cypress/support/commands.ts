/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

import {mount} from "cypress/react";

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount,

            getByTestId(testId: string): Chainable<Element>,

            visitApp(): Chainable<AUTWindow>
        }
    }

}

Cypress.Commands.add('mount', mount)

/**
 * Custom command to get an element by its data-testid attribute
 * For convenience as I use data-testid all over the place
 */
Cypress.Commands.add('getByTestId', (testId) => {
    cy.get(`[data-testid="${testId}"]`);
})

Cypress.Commands.add('visitApp', () => {
    cy.visit(Cypress.env('applicationUrl'))
})
