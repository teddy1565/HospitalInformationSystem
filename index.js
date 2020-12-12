/**
 * Declare and import Module
 */

/**
 * electron main module
 */
const { app , BrowserWindow ,Menu,MenuItem, ipcMain,remote} = require('electron');

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
const RenderPath = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.WindowRenderPath}`)));
const RenderScriptPath = JSON.parse(fs.readFileSync(path.join(__dirname,"src/BrowserPreloadScript/RenderScriptPath.json")));
/**
 * ===========================Code Test Zone==============================
 */



/**
 *  ===========================Notes=============================
 *      1.contextIsolation:true 會導致 preload 及 NodeIntegration失效
 */
/**
 * ===========================To Do List=============================
 * research:
 *          1. contextIsolation & nodeIntegration
 *          2. /src/Method/PDFConvert.js -- promise & sync  problem
 *          3. platform(windows) node_modules(canvas) when it BuildPackage has problem 
 *              --> https://skychang.github.io/2020/03/10/npm-Fix%20node-gyp%20and%20canvas%20dependence/
 *          4. BootStrap 切版
 *          5. NodeIntegration 修改 使用preload載入ipcRenderer 以對應下一版本更新及安全性問題
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
                "label":"Start Examination",click(){
                    Examination();
                }
            },
            {
                "label":"Conversion Tools",
                "submenu":[
                    {
                        "label":"PDFConverterKit",click(){
                            PDFConverterKit_Window();
                        }
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
    fs.readFile(`${__dirname}/${ConfigPath.SysConfig.dbConnectionConfig}`,(dbconfig)=>{
        WLLinkTest(dbconfig);
    })
    MainWindow();
}
function MainWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`)));
    
    WindowConfig.width = parseInt(WindowConfig.MainWindow.width);
    WindowConfig.height = parseInt(WindowConfig.MainWindow.width);
    let LoginUsers = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    if(LoginUsers.length>0){
        let mainWindow = new BrowserWindow({
            width:WindowConfig.width,
            height:WindowConfig.height,
            webPreferences:{
                contextIsolation:true,
                preload:path.join(__dirname, `${RenderScriptPath.index_demo}`)
            }
        });
        mainWindow.loadFile(path.join(`${__dirname}${RenderPath.main}`));
    }else{
        let mainWindow = new BrowserWindow({
            width:WindowConfig.width,
            height:WindowConfig.height,
            webPreferences:{
                contextIsolation:true,
                preload:path.join(__dirname, `${RenderScriptPath.login}`)
            }
        });
        mainWindow.webContents.openDevTools();
        mainWindow.loadFile(path.join(`${__dirname}${RenderPath.login}`));
        mainWindow.webContents.on('did-finish-load',()=>{
            mainWindow.webContents.send("loadBG","1");
        });
    }
}
app.whenReady().then(MainProgramSetup);
/**
 * =========================================================
 */
/**
 * SubProgram
 */
/**
 * Create a new BrowserWindow where study on examination
 */
function Examination(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`)));
    let ExaminationWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            nodeIntegration:true
        }
    });
    ExaminationWindow.webContents.openDevTools();
    ExaminationWindow.loadFile(path.join(`${__dirname}/src/Browser/capture_test.html`));
}
/**
 * Create a new BrowserWindow for setup WorkList Options
 */
function WorkListSettingWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.WLsettingWindowConfig}`)));
    WindowConfig.width = parseInt(WindowConfig.width);
    WindowConfig.height = parseInt(WindowConfig.heigth);
    let WorkListSettingWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            contextIsolation:true
        }
    });
    WorkListSettingWindow.loadFile(path.join(`${__dirname}${RenderPath.WorkListSettingWindow}`));
}
function JPEGtoDICOM_Transfer_Window(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.JTDtranslatorConfig}`))); 
    let JTDTransferWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            contextIsolation:true
        }
    });
    JTDTransferWindow.loadFile(path.join(`${__dirname}${RenderPath.ImageConvertor.JpgToDICOM}`));
}
function PDFConverterKit_Window(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`)));
    let PDFConverterKitWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            nodeIntegration:true
        }
    });
    PDFConverterKitWindow.loadFile(path.join(`${__dirname}/src/Browser/PDFConverterKit.html`));
}
function userLogin(){
    return true;
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
 * MainWinodw user SingOut --test
 */
ipcMain.on("userSingOutFromMainWindow",(Event,args)=>{
    fs.writeFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),JSON.stringify([]));
    let w = BrowserWindow.getFocusedWindow();
    MainWindow();
    w.close();
});
/**
 * GetLoginWindow Background config --test
 */
ipcMain.on("GetBGconfig",(Event,args)=>{
    fs.readFile(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginWindowConfig}`),(err,data)=>{
        if(err)console.log(err);
        else{
            let result = JSON.parse(data);
            result = JSON.stringify(result.background);
            Event.reply("BGconfigResult",result);
        }
    });
});
/**
 * MainWindow LoginIn  --test
 */
ipcMain.on("UserLoginFromLoginWindow",(Event,args)=>{
    let users = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    let user = JSON.parse(args);
    let userLoginResult = userLogin(user);
    let userWriteIn={
        ID:user[0],
        PWD:user[1]
    }
    if(userLoginResult===true){
        users.push(userWriteIn);
        fs.writeFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),JSON.stringify(users));
        let w = BrowserWindow.getFocusedWindow();
        MainWindow();
        w.close();
    }else{
        
    }
});
/**
 * =========================================================
 */
/**
 * Application End
 */
app.on('window-all-closed',()=>{
    app.quit();
});
