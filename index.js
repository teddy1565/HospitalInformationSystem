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
 * =========================================================
 */

/**
 * TEST
 */
const ConvertTools = require('./src/Method/imgConvert');
ConvertTools.PDFtoImage("/Users/zhenkaixiong/temp/cra.pdf",`${__dirname}/ars.png`);

/**
 * =========================================================
 */
/**
 * Menu setup
 */
const MainWindowMenuSetupTemplate = [
    {
        "label":"Application",
        "submenu":[
            {
                "label":"CopyRight"
            }
        ]
    },
    {
        "label":"Study",
        "submenu":[
            {
                "label":"Start Examination"
            },
            {
                "label":"Conversion Tools",
                "submenu":[
                    {
                        "label":"PDF->Image",click(){console.log(1)}
                    }
                ]
            }
        ]
    },
    {
        "label":"NetWork",
        "submenu":[
            {
                "label":"Upload"
            },
            {
                "label":"WorkList",
                "submenu":[
                    {'label':"Lost Connection.."},
                    {'label':"setting",click(){WorkListSettingWindow();}}
                ]
            }
        ]
    },
    {
        "role":"help",
        "label":"Setting",
        "submenu":[
            {
                "label":"App Config"
            }
        ]
    }
];
Menu.setApplicationMenu(Menu.buildFromTemplate(MainWindowMenuSetupTemplate));
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
/**
 * SubProgram
 */
function WorkListSettingWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/src/UserConfig/SettingWindowConfig.json`)));
    WindowConfig.width = parseInt(WindowConfig.width);
    WindowConfig.height = parseInt(WindowConfig.heigth);
    let WorkListSettingWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            nodeIntegration:true
        }
    });
    WorkListSettingWindow.loadFile(path.join(`${__dirname}${WindowConfig.RendererPath}`));
}

/**
 * IPC-communication
 */
(()=>{
    let a = MainWindowMenuSetupTemplate;
    for(let i in a){
        if(a[i].label=='NetWork'){
            for(let j in a[i].submenu){
                if(a[i].submenu[j].label=='WorkList'){
                    for(let k=0;k<a[i].submenu[j].submenu.length;k++){
                        if(a[i].submenu[j].submenu[k].label=="Lost Connection.."){
                            a[i].submenu[j].submenu[k].label="connected";
                            break;
                        }
                    }
                    break;
                }
            }
            break;
        }
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(a));
})();
/**
 * Application End
 */
app.on('window-all-closed',()=>{
    app.quit();
});
