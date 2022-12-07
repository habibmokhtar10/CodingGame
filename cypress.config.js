const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
module.exports = defineConfig({
  reporter: "mochawesome",
  chromeWebSecurity: false,
  pageLoadTimeout: 200000,
  env: {
    PROD: "https://www.google.fr/",
    DEV: "https://www.google.fr/",
  },

  e2e: {
    // baseUrl: "https://www.google.fr/",
    async setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor", browserify.default(config));
      return config;
    },
    specPattern: "**/*.feature",
    supportFile: false,
  },
});
