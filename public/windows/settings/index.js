const getSettingsWindow = ({ width, height, parent }) => {
  return {
    width,
    height,
    parent,
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  };
};

module.exports = getSettingsWindow;
