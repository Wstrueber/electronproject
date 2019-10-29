const CreateStore = require("../create");

const SettingsStore = new CreateStore({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences-settings",
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 400, height: 400 }
  }
});
module.exports = SettingsStore;
