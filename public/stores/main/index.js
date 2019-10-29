const CreateStore = require("../create");

const MainStore = new CreateStore({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    windowBounds: { width: 800, height: 600 }
  }
});
module.exports = MainStore;
