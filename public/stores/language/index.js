const CreateStore = require("../create");

const LanguageStore = new CreateStore({
  configName: "user-language-preferences",
  defaults: {
    locale: "en"
  },
  locale: "en"
});
module.exports = LanguageStore;
