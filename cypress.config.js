const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  reporter: "mochawesome",
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 200000,
  env: {
    PROD: "https://www.google.fr/",
    DEV: "https://www.google.fr/",
  },

  e2e: {
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
