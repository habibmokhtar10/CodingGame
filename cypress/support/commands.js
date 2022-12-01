// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("login", (email, password) => {
  cy.visit("https://admin-demo.nopcommerce.com/login");
  cy.get("input[name=Email]").clear().type(email);
  cy.get("input[name=Password]").clear().type(password);
  cy.get(".login-button").click();
});
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.Commands.add("clickRecaptcha", () => {
  cy.wait(5000);
  cy.window().then((win) => {
    win.document
      .querySelector("iframe[src*='recaptcha']")
      .contentDocument.getElementById("recaptcha-token")
      .click();
  });
});
