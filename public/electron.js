const electron = require("electron");
const { MainStore, SettingsStore, LanguageStore } = require("./stores");
const path = require("path");
const isDev = require("electron-is-dev");
const { getSettingsWindow } = require("./windows");
const { getTranslation } = require("./translations");
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
const isMac = process.platform === "darwin";

let mainWindow;
let settingsWindow;

const { app, BrowserWindow, Menu, ipcMain } = electron;

const createWindow = () => {
  const mainWindowBounds = MainStore.get("mainWindowBounds");
  const settingsWindowBounds = SettingsStore.get("settingsWindowBounds");

  mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
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
  const locale = LanguageStore.get("locale");
  Menu.setApplicationMenu(createMenu(locale));
  const settingsWindowDefault = getSettingsWindow({
    ...settingsWindowBounds,
    parent: mainWindow
  });

  settingsWindow = new BrowserWindow(settingsWindowDefault);

  mainWindow.webContents.on("dom-ready", () => {
    const locale = LanguageStore.get("locale");
    mainWindow.webContents.send("mainwindow-ready", { locale });
  });

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

  settingsWindow.removeMenu();

  mainWindow.on("closed", () => (mainWindow = null));

  settingsWindow.on("close", e => {
    e.preventDefault();
    settingsWindow.hide();
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== isMac) {
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

ipcMain.on("toggle-language", (_, data) => {
  Menu.setApplicationMenu(createMenu(data.locale));
});

const createMenu = locale => {
  const template = [
    ...(isMac
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
              { role: getTranslation(locale, "QUIT") }
            ]
          }
        ]
      : []),
    {
      label: getTranslation(locale, "FILE"),
      submenu: [
        isMac
          ? { role: "close" }
          : { label: getTranslation(locale, "EXIT"), role: "quit" }
      ]
    },
    {
      label: getTranslation(locale, "EDIT"),
      submenu: [
        { label: getTranslation(locale, "UNDO"), role: "undo" },
        { label: getTranslation(locale, "REDO"), role: "redo" },
        { type: "separator" },
        { label: getTranslation(locale, "CUT"), role: "cut" },
        { label: getTranslation(locale, "COPY"), role: "copy" },
        { label: getTranslation(locale, "PASTE"), role: "paste" },
        ...(isMac
          ? [
              { role: "pasteAndMatchStyle" },
              { role: "delete" },
              { role: "selectAll" },
              { type: "separator" },
              {
                label: getTranslation(locale, "SPEECH"),
                submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
              }
            ]
          : [
              { label: getTranslation(locale, "DELETE"), role: "delete" },
              { type: "separator" },
              { label: getTranslation(locale, "SELECT_ALL"), role: "selectAll" }
            ])
      ]
    },
    {
      label: getTranslation(locale, "VIEW"),
      submenu: [
        { role: "reload" },
        { role: "forcereload" },
        { role: "toggledevtools" },
        { type: "separator" },
        { label: getTranslation(locale, "ACTUAL_SIZE"), role: "resetzoom" },
        { label: getTranslation(locale, "ZOOM_IN"), role: "zoomin" },
        { label: getTranslation(locale, "ZOOM_OUT"), role: "zoomout" },
        { type: "separator" },
        {
          label: getTranslation(locale, "TOGGLE_FULLSCREEN"),
          role: "togglefullscreen"
        }
      ]
    },
    {
      label: getTranslation(locale, "SETTINGS"),
      submenu: [
        {
          label: getTranslation(locale, "OPEN_PREFERENCES"),
          role: "togglesettings",
          click() {
            settingsWindow.show();
          }
        },
        {
          label: getTranslation(locale, "LANGUAGE"),
          role: "togglelanguage",
          submenu: [
            {
              label: getTranslation(locale, "ENGLISH"),
              role: "togglelanguage",
              click(_, focusedWindow) {
                LanguageStore.set("locale", "en");
                focusedWindow.webContents.send("toggle-language", {
                  locale: "en"
                });
              }
            },
            {
              label: getTranslation(locale, "SWEDISH"),
              role: "togglelanguage",
              click(_, focusedWindow) {
                LanguageStore.set("locale", "sv");
                focusedWindow.webContents.send("toggle-language", {
                  locale: "sv"
                });
              }
            }
          ]
        }
      ]
    },
    {
      label: getTranslation(locale, "CALCULATORS"),
      submenu: [
        {
          label: getTranslation(locale, "PAY_CALCULATOR"),
          role: "togglecalculator",
          click(_, focusedWindow) {
            focusedWindow.loadURL(
              isDev
                ? // #TODO: Decide what root should display
                  "http://localhost:3000"
                : `file://${path.join(__dirname, "../build/index.html")}`
            );
          }
        },
        {
          label: getTranslation(locale, "CONVERSION_CALCULATOR"),
          role: "togglecalculator",
          click(_, focusedWindow) {
            focusedWindow.loadURL(
              isDev
                ? "http://localhost:3000#conversion_calculator"
                : `file://${path.join(
                    __dirname,
                    "../build/index.html#conversion_calculator"
                  )}`
            );
          }
        }
      ]
    }
  ];

  return Menu.buildFromTemplate(template);
};
