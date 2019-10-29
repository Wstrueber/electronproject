import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import { Settings } from "../components";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
