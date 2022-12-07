class GooglePage {
  elements = {
    SearchedWebsiteInputs: () => cy.get(".gLFyf"),
    FirstResult: () => cy.get("#rso > :nth-child(1)"),
  };

  MakeSearch(SearchedWebsit) {
    this.elements
      .SearchedWebsiteInputs()
      .type(SearchedWebsit)
      .type("{enter}", { force: true });
  }

  consent() {
    cy.get("body").then(($body) => {
      if ($body.find("#L2AGLb > .QS5gu").length > 0) {
        cy.get("#L2AGLb > .QS5gu").click();
      }
    });
  }
  VerifyFirstResult(SearchedWeb) {
    this.elements.FirstResult().should("include.text", SearchedWeb);
  }
}
export default GooglePage;
