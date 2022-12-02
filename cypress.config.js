const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "k5ai1c",
  viewportWidth: 1200,
  viewportHeight: 760,
  chromeWebSecurity: false,

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
