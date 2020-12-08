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
 * Dicom Modules
 */
const dicomParse = require('dicom-parser');
/**
 * ConfigPath
 */
const ConfigPath = JSON.parse(fs.readFileSync(path.join(`${__dirname}/src/SysConfig/ConfigPath.json`)));
/**
 * =========================================================
 */


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
            },
            {
                "label":"Quit",click(){
                    app.quit();
                }
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
                    },
                    {
                        "label":"JPEG->DICOM",click(){
                            JPEGtoDICOM_Transfer_Window();
                        }
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
function MainProgramSetup(){
    fs.readFile(`${__dirname}/${ConfigPath.UserConfig.dbConnectionConfig}`,(dbconfig)=>{
        WLLinkTest(dbconfig);
    })
    MainWindow();
}
function MainWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.MainWindowConfig}`)));
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
app.whenReady().then(MainProgramSetup);
/**
 * =========================================================
 */
/**
 * SubProgram
 */
function WorkListSettingWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.WLsettingWindowConfig}`)));
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
function JPEGtoDICOM_Transfer_Window(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.JTDtranslatorConfig}`))); 
    let JTDTransferWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            nodeIntegration:true
        }
    });
    JTDTransferWindow.loadFile(path.join(`${__dirname}${WindowConfig.RendererPath}`));
}
/**
 * =========================================================
 */
/**
 * NetWork Connection
 */

/**
 * WorkList connection and config load test
 * If linked , it will change Menu to show link status
 * @param {JSON} dbConfig 
 * @returns {void}
 */
function WLLinkTest(dbConfig){
    if(!dbConfig)return 0;
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
}
/**
 * =========================================================
 */
/**
 * IPC-communication
 */
/**
 * =========================================================
 */
/**
 * Application End
 */
app.on('window-all-closed',()=>{
    app.quit();
});
