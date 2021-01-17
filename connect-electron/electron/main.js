const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let mainWindow
const { Notification } = require('electron')

function createWindow () {

    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    mainWindow.loadURL("https://www.gopaychain.in");
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
function showNotification () {
    const notification = {
        title: 'Basic Notification',
        body: 'Notification from the Main process'
    }
    new Notification(notification).show()
}

app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(showNotification)