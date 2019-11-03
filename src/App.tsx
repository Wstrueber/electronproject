import React, { useContext, useEffect } from "react";
import "./App.scss";
import PayCalculator from "./components/PayCalculator";
import { changeLanguage } from ".";
import { LocaleContext } from "./context";
import { Switch, Route } from "react-router";
import { HashRouter } from "react-router-dom";
import { ConversionCalculator } from "./components";

const electron = window.require("electron");
const { ipcRenderer } = electron;

type IData = {
  locale: string;
};

const App = () => {
  const context = useContext(LocaleContext);
  useEffect(() => {
    ipcRenderer.on("mainwindow-ready", (e: any, data: IData) => {
      context.setContext({ ...context, context: { locale: data.locale } });
      changeLanguage(data.locale);
    });
    ipcRenderer.on("toggle-language", (event: any, data: any) => {
      ipcRenderer.send("toggle-language", { locale: data.locale });
      context.setContext({ ...context, context: { locale: data.locale } });
      changeLanguage(data.locale);
    });
  }, []);

  return (
    <HashRouter>
      <Switch>
        <div className="app">
          <div className="componentContainer">
            <Route exact path="/" component={PayCalculator} />
            <Route
              exact
              path="/conversion_calculator"
              component={ConversionCalculator}
            />
          </div>
        </div>
      </Switch>
    </HashRouter>
  );
};

export default App;
