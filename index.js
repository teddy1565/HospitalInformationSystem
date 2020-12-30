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
const { platform } = require('os');
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


//============================= Global Variable =================================
let CurrentUser;




//============================= Window Block =================================

/**
 * Main Window (will change variable name)
 * 主要控制畫面
 * @param {string} CurrentUser -- Pass CurrentUser ID
 * @returns {void}
 */
function indexWindow(CurrentUser){
    let WindowConfig = RenderExteriorAttributes("MainWindow");
    WindowConfig.width = WindowConfig.width;
    WindowConfig.height = WindowConfig.height;
    let mainWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(__dirname, `${RenderScriptPath.main}`)
        }
    });
    mainWindow.loadFile(path.join(`${__dirname}${RenderPath.main}`));
    mainWindow.webContents.on('did-finish-load',()=>{
        const CurrentUserResult = {
            ID:CurrentUser
        };
        fs.readFile(path.join(__dirname,`${ConfigPath.SysConfig.mainWindowSideBarMenuElement}`),(err,data)=>{
            if(err){
                console.log(err);
                return 0;
            }
            data = JSON.parse(data);
            let result = {
                LAT:data.LeftAndTopSideBarMenu,
                LAB:data.LeftAndBottomSideBarMenu,
                LABS:data.LeftAndBottomSideBarSubFuncMenu,
                DTS:data.DashBoardTopSidebarMenu,
                DBS:data.DashBoardBottomSidebarMenu,
                catchStatisticsContext:data.catchStatistics,
                firstCatchStatisticsTextContext:data.firstCatchStatisticsText,
                firstCatchStatisticsValueContext:data.firstCatchStatisticsValue,
                SecCatchStatisticsTextContext:data.SecCatchStatisticsText,
                SecCatchStatisticsValueContext:data.SecCatchStatisticsValue
            }
            mainWindow.webContents.send("mainWindowSideBarMenuElementSetup",result);
        });
        fs.readFile(path.join(__dirname,`${ConfigPath.UserConfig.mainWorkListTopic}`),(err,data)=>{
            if(err){
                console.log(err);
                return 0;
            }
            data = JSON.parse(data);
            mainWindow.webContents.send("MainWindowWorkListItems",data);
        });
        mainWindow.webContents.send("CurrentUser",JSON.stringify(CurrentUserResult));
    });
}
/**
 * Login Window
 * 登入畫面
 */
function LoginWindow(){
    let WindowConfig = RenderExteriorAttributes("LoginWindow");
    WindowConfig.width = WindowConfig.width;
    WindowConfig.height = WindowConfig.height;
    
    const LoginUsers = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`)));
    Menu.setApplicationMenu(null);
    let LoginWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        frame:false,
        webPreferences:{
            contextIsolation:true,
            worldSafeExecuteJavaScript:true,
            preload:path.join(__dirname, `${RenderScriptPath.login}`)
        }
    });
    LoginWindow.loadFile(path.join(`${__dirname}${RenderPath.login}`));
    LoginWindow.webContents.on('did-finish-load',()=>{
        fs.readFile(path.join(`${__dirname}/${ConfigPath.SysConfig.LoginUsers}`),(err,data)=>{
            let result=[];
            data = JSON.parse(data);
            if(data.length>0){
                for(let i in data){
                    result.push(data[i].ID);
                }
            }
            if(result.length<=0&&result.constructor=== Array){
                LoginWindow.webContents.send("localUsersList",null);
            }else if(result.constructor=== Array){
                LoginWindow.webContents.send("localUsersList",JSON.stringify(result));
            }else{
                console.log("ERR");
                app.quit();
            }
        })
        LoginWindow.webContents.send("loadBG","1");
    });
}

app.whenReady().then(LoginWindow);//application setup


function PDFConverterKit_Window(){
    let WindowConfig = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`)));
    let PDFConverterKitWindow = new BrowserWindow({
        width:WindowConfig.width,
        height:WindowConfig.height,
        webPreferences:{
            worldSafeExecuteJavaScript:true,
            contextIsolation:true
        }
    });
    PDFConverterKitWindow.loadFile(path.join(`${__dirname}/src/Browser/PDFConverterKit.html`));
}

function mainSettingWindow(){
    let windowConfig = RenderExteriorAttributes("MainSettingWindow");
    let n = new BrowserWindow({
        width:windowConfig.width,
        height:windowConfig.height,
        webPreferences:{
            contextIsolation:true,
            preload:path.join(__dirname,`${RenderScriptPath.main_setting}`),
            worldSafeExecuteJavaScript:true
        }
    });
    n.loadFile(path.join(`${__dirname}${RenderPath.main_setting}`));
    n.webContents.on('did-finish-load',()=>{
        fs.readFile(path.join(`${__dirname}`,`${ConfigPath.SysConfig.main_setting_menu_button}`),(err,data)=>{
            if(err){
                console.log(err);
                return 0;
            }
            data = JSON.parse(data);
            let Specifylanguage = language(null);
            data = data[`${Specifylanguage}`];
            n.webContents.send("mainSettingMenuListItems",data);
        });
    });
}

/**
 * ==================== Function Block =====================
 */
//.
/**
 * Create a new BrowserWindow where study on examination
 * 執行檢查時 開啟新視窗擷取影像
 */
function Examination(){
    let WindowConfig = RenderExteriorAttributes("caputre_test");
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
 * get Language Setting
 * 取得使用者的語言設定
 * @param {string} options --Specify Language
 * @returns {string} language
 */
function language(options){
    if(options!=null){
        return options;
    }
    /**
     * 這邊還有語言設定檔判斷沒寫
     */
    return "Chinese";
}
/**
 * check user
 * 確認使用者的身分
 */
function userLogin(){
    return true;
}
/**
 * check does user has private attributes
 * 在創建視窗前確認使用者是否有自行設定的視窗大小屬性
 * @param {string} windowID 
 * @returns {object}
 */
function RenderExteriorAttributes(windowID){
    let data = JSON.parse(fs.readFileSync(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`)));
    data = data.RenderExteriorAttributes;
    for(let i in data){
        if(data[i].ID==windowID){
            let result={
                width:parseInt(`${data[i].width}`),
                height:parseInt(`${data[i].height}`)
            };
            return result;
        }
    }
    data = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`)));
    let result = {
        width:parseInt(`${data.width}`),
        height:parseInt(`${data.height}`)
    }
    return result;
}
/**
 * =========================================================
 */
/**
 * NetWork functions
 * Example: upload/download/GET/POST.....blablabla
 */


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
    LoginWindow();
    w.close();
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
        CurrentUser = user;
        indexWindow(user[0]);
        w.close();
    }else{
        /**
         * 待補充
         */
    }
});
/**
 * Application Setting Window , Manager App [Config/Mapping Rule/SideBar function]
 * 應用程式的設定視窗 管理程式的設定檔/主機資料映射規則/sideBar的功能鍵
 */
ipcMain.on("Main_setting_window",(Event,args)=>{
    if(args!=true){
        Event.reply("ErrorMessage","has some problem in index.js/ipcMain [Main_setting_window]");
        return 0;
    }
    let w = BrowserWindow.getFocusedWindow(); 
    mainSettingWindow();
    w.close();
});
/**
 * 
 * 當使用者要從設定頁面回到主頁面
 */
ipcMain.on("fromMainSettingToHomePage",(Event,args)=>{
    if(args!=true){
        Event.reply("ErrorMessage","Something Error");
        return 0;
    }
    let w = BrowserWindow.getFocusedWindow();
    indexWindow(CurrentUser[0]);
    w.close();
});
/**
 * MainSettingWindowRequest Process
 * 主要處理從MainSettingWindow發出的處理請求
 */
ipcMain.on("MainSettingWindowRequest",(Event,args)=>{
    if(args.requestFunc=="RenderExteriorAttributes"){
        if(args.reqData!==true){
            console.log("SomeThingError");
            return 0;
        }
        let result=[];
        let publicWindowConfigAttri = JSON.parse(fs.readFileSync(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`)));
        let userPreviteWindowConfigAttri = JSON.parse(fs.readFileSync(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`)));
        userPreviteWindowConfigAttri = userPreviteWindowConfigAttri.RenderExteriorAttributes;
        result.push(publicWindowConfigAttri);
        for(let i in userPreviteWindowConfigAttri){
                result.push(userPreviteWindowConfigAttri[i]);
        }
        result = {
            requestFunc:"RenderExteriorAttributes",
            data:result
        };
        Event.reply("MainSettingWindowDashBoardManager",result);
    }else if(args.requestFunc=="saveExteriorAttributes"){
        if(args.reqData.oldWindowID=="PublicConfig"){
            let writeIn = {
                width:args.reqData.width,
                height:args.reqData.height
            }
            fs.writeFile(path.join(`${__dirname}/${ConfigPath.SysConfig.PublicWindowConfig}`),JSON.stringify(writeIn),(err)=>{
                let result = {
                    requestFunc:"saveExteriorAttributes",
                    data:false
                };
                if(err){
                    console.log(err);
                    Event.reply("MainSettingWindowDashBoardManager",result);
                    return 0;
                }
                result.data = {
                    UID:args.reqData.ID,
                    ID:args.reqData.newWindowID,
                    width:args.reqData.width,
                    height:args.reqData.height
                };
                Event.reply("MainSettingWindowDashBoardManager",result);
            });
        }else{
            fs.readFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),(err,data)=>{
                if(err){
                    console.log(err);
                    let result={
                        requestFunc:"saveExteriorAttributes",
                        data:false
                    };
                    Event.reply("MainSettingWindowDashBoardManager",result);
                    return 0;
                }
                let OverWriteFile = JSON.parse(data);
                let target = OverWriteFile.RenderExteriorAttributes;
                let OverWriteContent=[];
                for(let i in target){
                    let r = target[i];
                    if(`${target[i].ID}`== `${args.reqData.oldWindowID}`){
                        r.ID = args.reqData.newWindowID;
                        r.width = args.reqData.width;
                        r.height = args.reqData.height;
                    }
                    OverWriteContent.push(r);
                }
                OverWriteFile.RenderExteriorAttributes = OverWriteContent;
                fs.writeFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),JSON.stringify(OverWriteFile),(err)=>{
                    let result = {
                        requestFunc:"saveExteriorAttributes",
                        data:false
                    };
                    if(err){
                        console.log(err);
                        Event.reply("MainSettingWindowDashBoardManager",result);
                        return 0;
                    }
                    
                    result.data = {
                        UID:args.reqData.ID,
                        ID:args.reqData.newWindowID,
                        width:args.reqData.width,
                        height:args.reqData.height
                    };
                    Event.reply("MainSettingWindowDashBoardManager",result);
                });
            });
        }
    }else if(args.requestFunc=="deleteExteriorAttributes"){
        fs.readFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),(err,data)=>{
            if(err){
                console.log(err);
                return 0;
            }
            dataSet = JSON.parse(data);
            data = dataSet.RenderExteriorAttributes;
            let update = [];
            for(let i in data){
                    if(`${data[i].ID}`==`${args.ID}`)continue;
                    update.push(data[i]);
                
            }
            dataSet.RenderExteriorAttributes = update;
            fs.writeFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),JSON.stringify(dataSet),(err)=>{
                if(err){
                    console.log(err);
                    return 0;
                }
                let result={
                    requestFunc:"deleteExteriorAttributes",
                    data:true
                }
                Event.reply("MainSettingWindowDashBoardManager",result);
            });
        });
    }else if(args.requestFunc=="addNewRenderExteriorAttributes"){
        fs.readFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),(err,data)=>{
            if(err){
                console.log(err);
                return 0;
            }
            dataSet = JSON.parse(data);
            let addItem = {
                ID:`${args.ID}`,
                width:`${args.width}`,
                height:`${args.height}`
            }
            dataSet.RenderExteriorAttributes.push(addItem);
            fs.writeFile(path.join(`${__dirname}`,`${ConfigPath.UserConfig.UserWindowPersonalizeConfig}`),JSON.stringify(dataSet),(err)=>{
                if(err){
                    console.log(err);
                    let result={
                        requestFunc:"ErrorMessage",
                        Context:`${err}`
                    }
                    Event.reply("MainSettingWindowDashBoardManager",result);
                    return 0;
                }
                let result={
                    requestFunc:"addNewRenderExteriorAttributes",
                    result:true
                }
                Event.reply("MainSettingWindowDashBoardManager",result);
            });
        });
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
