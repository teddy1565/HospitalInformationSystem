/**
 * Declare and import Module
 */

/**
 * electron main module
 */
const { app , BrowserWindow ,Menu,MenuItem} = require('electron');

/**
 * File system
 */
const fs = require('fs');

/**
 * path module
 * 
 * it cant take file path
 */
const path = require('path'); 
/**
 * Image Convert Method
 */
const ConvertTools = require('./src/Method/imgConvert');
/**
 * TEST
 */
ConvertTools.PDFtoImage("/Users/zhenkaixiong/temp/cra.pdf",`${__dirname}/ars.png`);
/**
 * Menu setup
 */
let MainWindowMenuSetup = require('./src/UserConfig/MainWindowMenuSetup');
let MainWindowMenu = JSON.parse(fs.readFileSync(`${__dirname}/src/UserConfig/MainWindowMenu.json`));
MainWindowMenu = MainWindowMenuSetup.setup(MainWindowMenu);
MainWindowMenu = Menu.buildFromTemplate(MainWindowMenu);
Menu.setApplicationMenu(MainWindowMenu);
/**
 * main program
 */
function MainWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/src/UserConfig/Window.json`)));
    WindowConfig.width = parseInt(WindowConfig.width);
    WindowConfig.height = parseInt(WindowConfig.height);
    let mainWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            nodeIntegration:true
        }
    });
    mainWindow.loadFile(path.join(`${__dirname}${WindowConfig.RendererPath}`));
}
app.whenReady().then(MainWindow);

app.on('window-all-closed',()=>{
    app.quit();
});
