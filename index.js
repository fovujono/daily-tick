const electron = require("electron");
const url = require("url");
const path = require("path");

//grabbing from electron
const { app, BrowserWindow } = electron;

let mainWindow;

// Listen for app to ready
app.on("ready", function() {
  //Create New Window
  mainWindow = new BrowserWindow({});
  //Load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "mainWindow.html"),
      protcol: "file:",
      slashes: true
    })
  );
});
