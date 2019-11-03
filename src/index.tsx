import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en/translation.json";
import translationSV from "./locales/sv/translation.json";
import "moment/locale/sv";
import { LocaleProvider } from "./context";
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language, (err: any, t: any) => {
    if (err) {
      return console.log("something went wrong loading", err);
    }
    console.log(language);
  });
};

const resources = {
  en: translationEN,
  sv: translationSV
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: "en",
    fallbackLng: "en",
    resources,
    react: {
      wait: true
    }
  });

ReactDOM.render(
  <LocaleProvider>
    <App />
  </LocaleProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
