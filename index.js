const electron = require("electron");
const url = require("url");
const path = require("path");

//grabbing from electron
const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let setTimeWindow;

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
  //Close window when hitting X
  mainWindow.on("close", function() {
    app.quit();
  });

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //Insert Menu
  Menu.setApplicationMenu(mainMenu);
});

//Handle add window
function createSetTimeWindow() {
  //Create New Window
  addWindow = new BrowserWindow({
    height: 200,
    width: 300,
    title: "Set Timer"
  });
  //Load html into window
  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "setTimerWindow.html"),
      protcol: "file:",
      slashes: true
    })
  );

  //save memory when closed
  addWindow.on("close", function() {
    addWindow = null;
  });
}

//Create menu template
const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Set Time",
        click() {
          createSetTimeWindow();
        }
      },
      {
        label: "Exit",
        //adding shortcut depending on OS
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

//if mac, add empty obj to main menu array

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

//Dev tools item only not in production
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Toggle Dev Tools",
        //adding shortcut depending on OS
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}
