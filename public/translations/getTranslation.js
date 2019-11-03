const menuTranslations = require("./menuTranslations.json");

const getTranslation = (locale, key) => {
  return menuTranslations[locale][key] ? menuTranslations[locale][key] : "N/A";
};

module.exports = getTranslation;
