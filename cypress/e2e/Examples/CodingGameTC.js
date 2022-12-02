/// <reference types="cypress"/>

describe("Codind Game Test Cases", () => {
  it("Test Case", () => {
    cy.log("Acceder a Google");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit("https://www.google.fr/");
    cy.wait(2000);
    cy.get("body").then(($body) => {
      if ($body.find("#L2AGLb > .QS5gu").length > 0) {
        cy.get("#L2AGLb > .QS5gu").click();
      }
    });
    //
    cy.log("effectuer la recherche");
    cy.get(".gLFyf")
      .type("Skyscanner", { force: true })
      .type("{enter}", { force: true });
    //
    cy.log(
      "verifier l'existance de skyscanner en tant que premier resultat avec Fist child selector"
    );
    cy.get("#rso > :nth-child(1)").should("include.text", "skyscanner");
    ///Acceder au site web skyscanner
    cy.log("Acceder au site web skyscanner");
    cy.get(".tF2Cxc > .yuRUbf > a > .LC20lb").click();
    cy.get("#acceptCookieButton").click();

    //selectionner Aller Simple
    cy.log("selectionner Aller Simple");
    cy.get("#fsc-trip-type-selector-one-way").click({ force: true });
    //Selectionner depart
    cy.log("Selectionner depart");
    cy.get("#fsc-origin-search")
      .clear()
      .type("Paris Orly (ORY)", { force: true });
    //Selectionner Destination
    cy.log("Selectionner Destination");
    cy.get("#fsc-destination-search").clear().type("TNG ", { force: true });
    //Selectionner date de Depart
    cy.log("Selectionner date de Depart");
    cy.get("#depart-fsc-datepicker-button").click();
    cy.get('[aria-label="jeudi 8 décembre 2022"]').click();
    //Selectionner un vol direct
    cy.log("Selectionner un vol direct");
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

    //Effectuer la recherche
    cy.log("Effectuer la recherche");
    cy.get(".BpkButtonBase_bpk-button__NTM4Y").click();
    cy.get("#acceptCookieButton").click();

    //Verifier que tou les vol sont directe (Verifier qu'il ya pas  de vol avec un escale)
    cy.log("Verifier que tou les vol sont directe");
    cy.get(".LegInfo_stopsLabelRed__NTY2Y").should("not.exist");
    cy.log("Verifier tous les vols sont a destination de TNG");
    cy.get(
      ".LegInfo_routePartialArrive__Y2U1N > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN "
    ).then((Destination) => {
      for (let i = 0; i < Destination.length; i++) {
        expect(Destination[i].textContent).to.equal("TNG");
      }
    });
    //Verifier tous les vols Partent de ORY
    cy.log("Verifier tous les vols Partent de ORY");
    cy.wait(5000);
    cy.get(
      ".LegInfo_routePartialDepart__NzEwY > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN"
    ).then((Depart) => {
      for (let i = 0; i < Depart.length; i++) {
        expect(Depart[i].textContent).to.equal("ORY");
      }
    });
  });
});
