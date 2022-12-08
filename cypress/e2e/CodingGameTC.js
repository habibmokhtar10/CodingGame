const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
// import cypress from "cypress";
import GooglePage from "./Pages/GooglePage";
import skyscanner from "./Pages/skyscanner";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
const Gp = new GooglePage();
const Sk = new skyscanner();

Given("A user opens Google page", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit(Cypress.env("PROD"));
  cy.wait(2000);
  Gp.consent();
});

//
When("A user search for {string}", (SearchedWebsite) => {
  Gp.MakeSearch(SearchedWebsite);
});
Then(
  "The {string} is displayed as first website in the SRP",
  (SearchedWebsite) => {
    Gp.VerifyFirstResult(SearchedWebsite);
  }
);

Given("A user opens the website", function () {
  Sk.AcessWebsite();
  cy.wait(5000);
  Sk.consent1();
  cy.wait(3000);
  Sk.consent();
});
//

When("A user select one-way Flight", () => {
  Sk.consent1();
  Sk.Selectoneway;
});
When("A user set {string} as departure", (Departure) => {
  Sk.SetDeparture(Departure);
});
When("A user set {string} as destination", (Destination) => {
  Sk.SetDestination(Destination);
});

When(
  "A user set departure date as Day:{string},Month:{string},Year:{string}",
  (Day, Month, Year) => {
    Sk.SetDate(Day, Month, Year);
  }
);
When("A user select direct Flight", () => {
  Sk.SelectDirectFlight();
});
When("A user clicks on search button", () => {
  Sk.Search();
  Sk.consent();
});
Then(
  "The SRP is openened ,all flights displayed parts from ORY to TNG and all flights are direct",
  () => {
    Sk.VerifyDirectFlights();

    //
    cy.wait(3000);
    Sk.VerifyDestinations();
    //Verifier tous les vols Partent de ORY
    Sk.VerifyDepartures();
  }
);
