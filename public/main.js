const electron = require("electron");
const { MainStore, SettingsStore } = require("./stores");
const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");
const { getSettingsWindow } = require("./windows");

let mainWindow;
let settingsWindow;

const { app, BrowserWindow, Menu, MenuItem, ipcMain } = electron;

function createWindow() {
  const mainWindowBounds = MainStore.get("mainWindowBounds");
  const settingsWindowBounds = SettingsStore.get("settingsWindowBounds");

  mainWindow = new BrowserWindow({
    ...mainWindowBounds,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  const settingsWindowDefault = getSettingsWindow({
    ...settingsWindowBounds,
    parent: mainWindow
  });

  settingsWindow = new BrowserWindow(settingsWindowDefault);

  mainWindow.on("resize", () => {
    const { width, height } = mainWindow.getBounds();

    MainStore.set("mainWindowBounds", { width, height });
  });

  settingsWindow.on("resize", () => {
    const { width, height } = settingsWindow.getBounds();

    SettingsStore.set("settingsWindowBounds", { width, height });
  });

  settingsWindow.loadURL(
    isDev
      ? "http://localhost:3000/settings"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  createMenu();
  settingsWindow.removeMenu();
  mainWindow.on("closed", () => (mainWindow = null));

  settingsWindow.on("close", e => {
    e.preventDefault();
    settingsWindow.hide();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("toggle-settings", (e, arg) => {
  if (settingsWindow.isVisible()) {
    settingsWindow.hide();
    return;
  }
  settingsWindow.show();
});

const createMenu = () => {
  const isMac = false;
  const template = [
    ...(process.platform === "darwin"
      ? [
          {
            label: app.getName(),
            submenu: [
              { role: "about" },
              { type: "separator" },
              { role: "services" },
              { type: "separator" },
              { role: "hide" },
              { role: "hideothers" },
              { role: "unhide" },
              { type: "separator" },
              { role: "quit" }
            ]
          }
        ]
      : []),
    {
      label: "File",
      submenu: [isMac ? { role: "close" } : { role: "quit" }]
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: "Speech",
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
              }
            ]
          : [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }])
      ]
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { role: "resetzoom" },
        { role: "zoomin" },
        { role: "zoomout" },
        { type: "separator" },
        { role: "togglefullscreen" }
      ]
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "Open preferences",
          role: "togglesettings",
          click() {
            settingsWindow.show();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
