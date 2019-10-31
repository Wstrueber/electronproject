import React, { Component } from "react";
import "./App.scss";
import { ReactNode } from "react";
import Calculator from "./components/Calculator";

class App extends Component<{}, {}> {
  public render(): ReactNode {
    return (
      <div className="app">
        <Calculator />
      </div>
    );
  }
}

export default App;
