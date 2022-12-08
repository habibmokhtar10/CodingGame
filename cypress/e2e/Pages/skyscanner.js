class skyscanner {
  elements = {
    WebsiteLink: () => cy.get(".tF2Cxc > .yuRUbf > a > .LC20lb"),
    OneWay: () => cy.get("#fsc-trip-type-selector-one-way"),
    DepInput: () => cy.get("#fsc-origin-search"),
    DepSelect: () => cy.get(".LocationSelector_fsc-suggestion__NDQ4Z"),
    DestInput: () => cy.get("#fsc-destination-search"),
    DestSelect: () =>
      cy.get(".BpkAutosuggest_bpk-autosuggest__suggestion-value__ZDMxM"),
    Calendar: () => cy.get("#depart-fsc-datepicker-button"),
    MounthYearPick: () => cy.get("select.BpkSelect_bpk-select__NmRiM"),
    MounthYearPick: () => cy.get("select.BpkSelect_bpk-select__NmRiM"),
    DatePick: () =>
      cy
        .get(".BpkCalendarDate_bpk-calendar-date__MTdlO")
        .not(".BpkCalendarDate_bpk-calendar-date--outside__YzhlM"),

    DirectFlightCheckbox: () =>
      cy.get(
        ":nth-child(4) > .BpkCheckbox_bpk-checkbox__OTI4N > .BpkCheckbox_bpk-checkbox__input__ZWQ5N"
      ),
    Searchbtn: () => cy.get(".BpkButtonBase_bpk-button__NTM4Y"),
    TransitLabel: () => cy.get(".LegInfo_stopsLabelRed__NTY2Y"),
    Destinations: () =>
      cy.get(
        ".LegInfo_routePartialArrive__Y2U1N > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN"
      ),
    Departures: () =>
      cy.get(
        ".LegInfo_routePartialDepart__NzEwY > span.BpkText_bpk-text__ZWIzZ.BpkText_bpk-text--body-default__MzkyN"
      ),
  };
  VerifyDirectFlights() {
    cy.get(".LegInfo_stopsLabelRed__NTY2Y").should("not.exist");
  }
  VerifyDepartures() {
    this.elements.Departures().then((Depart) => {
      for (let i = 0; i < Depart.length; i++) {
        expect(Depart[i].textContent).to.equal("ORY");
      }
    });
  }
  VerifyDestinations() {
    this.elements.Destinations().then((Desti) => {
      for (let i = 0; i < Desti.length; i++) {
        expect(Desti[i].textContent).to.equal("TNG");
      }
    });
  }

  Search() {
    this.elements.Searchbtn().click();
    cy.wait(3000);
  }
  SelectDirectFlight() {
    this.elements.DirectFlightCheckbox().click();
    cy.wait(2000);
    this.elements
      .DirectFlightCheckbox()
      .invoke("prop", "indeterminate", true)
      .uncheck()
      .should("not.be.checked");
    cy.wait(2000);
    this.elements.DirectFlightCheckbox().click();
  }
  SetDate(D, M, Y) {
    cy.scrollTo("top");
    this.elements.Calendar().click();
    this.elements.MounthYearPick().select(M + " " + Y);
    this.elements
      .DatePick(D)
      .contains(
        ".BpkCalendarDate_bpk-calendar-date__MTdlO",
        parseInt(D).toString()
      )
      .click();
  }
  SetDeparture(Dep) {
    this.elements.DepInput().clear({ force: true }).type(Dep, { force: true });
    cy.scrollTo("top");
    cy.wait(1000);
    this.elements.DepSelect().contains(Dep).click();
  }
  SetDestination(Dest) {
    this.elements
      .DestInput()
      .clear({ force: true })
      .type(Dest, { force: true });
    cy.scrollTo("top");
    cy.wait(1000);
    this.elements.DestSelect().contains(Dest).click();
  }

  AcessWebsite() {
    this.elements.WebsiteLink().click({ multiple: true });
  }
  Selectoneway() {
    this.elements.OneWay().click({ multiple: true });
  }

  consent1() {
    cy.get("body").then(($body) => {
      if (
        $body.find(".UserPreferencesContent_acceptButton__NjQxZ").length > 0
      ) {
        cy.get(".UserPreferencesContent_acceptButton__NjQxZ").click();
        cy.wait(2000);
        cy.go("back");
        cy.reload();
        cy.wait(2000);
        cy.get("#L2AGLb > .QS5gu").click();
        this.elements.WebsiteLink().click();
      }
    });
  }
  consent() {
    cy.get("body").then(($body) => {
      if ($body.find("#acceptCookieButton").length > 0) {
        cy.get("#acceptCookieButton").click();
      }
    });
  }
}
export default skyscanner;
