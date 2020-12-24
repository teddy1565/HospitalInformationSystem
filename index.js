/**
 * ============================= Declare and import Module =============================
 */

/**
 * electron main module
 */
const { app , BrowserWindow ,Menu,MenuItem, ipcMain,remote, ipcRenderer,dialog, shell} = require('electron');

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

//============================= END =============================


/**
 * ===========================Code Test Zone==============================
 */


/**
 *  ===========================Notes=============================
 *      1.contextIsolation:true 會導致 preload 及 NodeIntegration失效
 *      2.不使用nodeIntegration下 需同時開啟contextIsolation和worldSafeExecuteJavaScript
 *        才能夠注入preload script
 *      3.cornerstone模組只能在前端使用,且若出現Cannot read property 'webpackHotUpdate_name_' of undefined等問題
 *        需要到source部分 將this["webpackHotUpdate_name_"]改為window["webpackHotUpdate_name_"]
 *        解決辦法參考:https://github.com/cornerstonejs/cornerstoneWADOImageLoader/issues/350
 */
/**
 * ===========================To Do List=============================
 * research:
 *          1. /src/Method/PDFConvert.js -- promise & sync  problem
 *          2. platform(windows) node_modules(canvas) when it BuildPackage has problem 
 *              --> https://skychang.github.io/2020/03/10/npm-Fix%20node-gyp%20and%20canvas%20dependence/
 *          3. BootStrap 切版 
 */

//================================ END ============================================

//================================= Program ==================================
//============================= Window Block =================================
/**
 * MainMenu template setup
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

/**
 * check WorkList status (It not good and danger , will fix)
 */
function MainProgramSetup(){
    fs.readFile(`${__dirname}/${ConfigPath.SysConfig.dbConnectionConfig}`,(dbconfig)=>{
        WLLinkTest(dbconfig);
    })
}
/**
 * Main Window (will change variable name)
 * @param {string} CurrentUser -- Pass CurrentUser ID
 * @returns {void}
 */
function indexWindow(CurrentUser){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`)));
    WindowConfig.width = parseInt(WindowConfig.MainWindow.width);
    WindowConfig.height = parseInt(WindowConfig.MainWindow.width);
    Menu.setApplicationMenu(Menu.buildFromTemplate(MainWindowMenuSetupTemplate));
    MainProgramSetup();
    let mainWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(__dirname, `${RenderScriptPath.index_demo}`)
        }
    });
    mainWindow.loadFile(path.join(`${__dirname}${RenderPath.main}`));
    mainWindow.webContents.on('did-finish-load',()=>{
        const CurrentUserResult = {
            ID:CurrentUser
        };
        mainWindow.webContents.send("CurrentUser",JSON.stringify(CurrentUserResult));
    });
}
/**
 * Login Window
 */
function MainWindow(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`)));
    WindowConfig.width = parseInt(WindowConfig.MainWindow.width);
    WindowConfig.height = parseInt(WindowConfig.MainWindow.width);
    
    const LoginUsers = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    Menu.setApplicationMenu(null);
    let mainWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        frame:false,
        webPreferences:{
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(__dirname, `${RenderScriptPath.login}`)
        }
    });
    mainWindow.loadFile(path.join(`${__dirname}${RenderPath.login}`));
    mainWindow.webContents.on('did-finish-load',()=>{
        fs.readFile(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),(err,data)=>{
            let result=[];
            data = JSON.parse(data);
            if(data.length>0){
                for(let i in data){
                    result.push(data[i].ID);
                }
            }
            if(result.length<=0&&result.constructor=== Array){
                mainWindow.webContents.send("localUsersList",null);
            }else if(result.constructor=== Array){
                mainWindow.webContents.send("localUsersList",JSON.stringify(result));
            }else{
                console.log("ERR");
                app.quit();
            }
        })
        mainWindow.webContents.send("loadBG","1");
    });
}
app.whenReady().then(MainWindow);//application setup

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

/**
 * ==================== Function Block =====================
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
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(__dirname,`${RenderScriptPath.capture_test}`)
        }
    });
    //ExaminationWindow.webContents.openDevTools();
    ExaminationWindow.loadFile(path.join(`${__dirname}/src/Browser/capture_test.html`));
}
/**
 * Create a new BrowserWindow for setup WorkList Options
 * Change MainMenu label about WorkList sataus
 * This function not good Will fix
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

function userLogin(){
    return true;
}
/**
 * =========================================================
 */
/**
 * NetWork functions
 * Example: upload/download/GET/POST.....blablabla
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
 * MainWindow IPC
 */
/**
 * MainWinodw user SingOut --test
 */
ipcMain.on("userSingOutFromMainWindow",(Event,args)=>{
    let LocalUsers = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    let LocalUsersUpdate = [];
    for(let i in LocalUsers){
        if(LocalUsers[i].ID == args)continue;
        LocalUsersUpdate.push(LocalUsers[i]);
    }
    fs.writeFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),JSON.stringify(LocalUsersUpdate));
    let w = BrowserWindow.getFocusedWindow();
    MainWindow();
    w.close();
});
/**
 * QueryStringCommunicationTest
 */
ipcMain.on("QueryStringCommunicationTest",(Event,args)=>{
    console.log(args);
});
/**
 * Login Window IPC
 */
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
 * When user login, then check user data
 * If approved , close current window(Login) and build a new window(Main)
 */
ipcMain.on("UserLoginFromLoginWindow",(Event,args)=>{
    let users = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    let user = JSON.parse(args);
    let userLoginResult = userLogin(user);
    let userWriteIn={
        ID:user[0],
        PWD:user[1]
    }
    let w = BrowserWindow.getFocusedWindow();
    if(userLoginResult===true){
        users.push(userWriteIn);
        fs.writeFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),JSON.stringify(users));
        indexWindow(user[0]);
        w.close();
    }else{
        
    }
});
/**
 * Global IPC
 */
/**
 * Leave Application
 */
ipcMain.on("LeaveApplication",(Event,args)=>{
    app.quit();
});


//===================  Application Global Event ============================
/**
 * Description:
 *  When close all window, stop application process
 */
app.on('window-all-closed',()=>{
    app.quit();
});

//================== Test and Temp ========================
