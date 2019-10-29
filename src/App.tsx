import React, { Component } from "react";
import "./App.css";
import { ReactNode } from "react";

const { ipcRenderer, remote } = window.require("electron");

class App extends Component<{}, {}> {
  public componentDidMount() {
    this.initMenu();
  }
  public render(): ReactNode {
    return (
      <div
        className="App"
        style={{ height: 200, width: 200, backgroundColor: "red" }}
        onClick={this.showSettings}
      />
    );
  }
  private initMenu = () => {};
  private showSettings = () => {
    ipcRenderer.send("toggle-settings", "test");
  };
}

export default App;
