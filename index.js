/**
 * Declare and import Module
 */

/**
 * electron main module
 */
const { app , BrowserWindow } = require('electron');

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
 * USE JSDOM Simulation HTML DOM
 */
//const jsdom = require('jsdom');

/**
 * Image Convert Method
 */
const ConvertTools = require('./src/Method/imgConvert');
/**
 * TEST
 */
ConvertTools.PDFtoImage("/Users/zhenkaixiong/temp/a.pdf",`${__dirname}/ars.jpg`);

/**
 * Declare module zone end
 */

/**
 * main program
 */
function MainWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/src/UserConfig/Window.json`)));
    WindowConfig.width = parseInt(WindowConfig.width);
    WindowConfig.height = parseInt(WindowConfig.height);
    let mainWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height
    });
    mainWindow.loadFile(path.join(`${__dirname}/src/Browser/index.html`));
}
app.whenReady().then(MainWindow);

app.on('window-all-closed',()=>{
    app.quit();
});
