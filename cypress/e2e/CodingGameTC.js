const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Given("A user opens Google page", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit("https://www.google.fr/");
  cy.wait(2000);
  cy.get("body").then(($body) => {
    if ($body.find("#L2AGLb > .QS5gu").length > 0) {
      cy.get("#L2AGLb > .QS5gu").click();
    }
  });
});

//
When("A user search for Skyscanner", () => {
  cy.log("effectuer la recherche");
  cy.get(".gLFyf")
    .type("Skyscanner", { force: true })
    .type("{enter}", { force: true });
});
Then("Skyscanner website is displayed as first website in the SRP", () => {
  cy.get("#rso > :nth-child(1)").should("include.text", "skyscanner");
});

Given("A user opens the website", function () {
  cy.get(".tF2Cxc > .yuRUbf > a > .LC20lb").click();
  cy.get("#acceptCookieButton").click();
});
//

When("A user select one-way Flight", () => {
  cy.get("#fsc-trip-type-selector-one-way").click({ force: true });
});
When("A user set Paris Orly as departure", () => {
  cy.get("#fsc-origin-search").clear().type("Paris", { force: true });
  cy.scrollTo("top");
  cy.wait(1000);
  cy.get(".LocationSelector_fsc-suggestion__NDQ4Z")
    .contains(" Orly (ORY)")
    .click();
});
When("A user set TNG as destination", () => {
  cy.get("#fsc-destination-search").clear().type("Tanger", { force: true });
  cy.scrollTo("top");
  cy.wait(1000);
  cy.get(".BpkAutosuggest_bpk-autosuggest__suggestion-value__ZDMxM")
    .contains(" Boukhalef (TNG)")
    .click();
});

When("A user set departure date as jeudi 8 décembre 2022", () => {
  cy.get("#depart-fsc-datepicker-button").click();
  cy.get('[aria-label="jeudi 8 décembre 2022"]').click();
});
When("A user select direct Flight", () => {
  cy.get(
    ":nth-child(4) > .BpkCheckbox_bpk-checkbox__OTI4N > .BpkCheckbox_bpk-checkbox__input__ZWQ5N"
  ).click();
  cy.wait(2000);
  cy.get(
    ":nth-child(4) > .BpkCheckbox_bpk-checkbox__OTI4N > .BpkCheckbox_bpk-checkbox__input__ZWQ5N"
  )
    .invoke("prop", "indeterminate", true)
    .uncheck()
    .should("not.be.checked");
  cy.get(
    ":nth-child(4) > .BpkCheckbox_bpk-checkbox__OTI4N > .BpkCheckbox_bpk-checkbox__input__ZWQ5N"
  ).click();
});
When("A user clicks on search button", () => {
  cy.get(".BpkButtonBase_bpk-button__NTM4Y").click();
  cy.get("#acceptCookieButton").click();
});
Then(
  "The SRP is openened ,all flights displayed parts from ORY to TNG and all flights are direct",
  () => {
    cy.log("Verifier tous les vols sont directes");
    cy.get(".LegInfo_stopsLabelRed__NTY2Y").should("not.exist");
    //
    cy.log("Verifier tous les vols sont a destination de TNG");
    cy.wait(3000);
    cy.get(
      ".LegInfo_routePartialArrive__Y2U1N > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN "
    ).then((Destination) => {
      for (let i = 0; i < Destination.length; i++) {
        expect(Destination[i].textContent).to.equal("TNG");
      }
    });
    //Verifier tous les vols Partent de ORY
    cy.log("Verifier tous les vols Partent de ORY");
    cy.get(
      ".LegInfo_routePartialDepart__NzEwY > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN"
    ).then((Depart) => {
      for (let i = 0; i < Depart.length; i++) {
        expect(Depart[i].textContent).to.equal("ORY");
      }
    });
  }
);
