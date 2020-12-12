const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMain"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMain"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
ipcRenderer.on("loadBG",(Event,args)=>{
    ipcRenderer.send("GetBGconfig","1");
});
ipcRenderer.on("BGconfigResult",(Event,args)=>{
    let Config = JSON.parse(args);
    let bodyCSS = document.getElementById("LoginBody");
    bodyCSS.style=`background:url(${Config.imagePath});background-position: ${Config.backgroundPosition};background-repeat: ${Config.backgroundRepeat};background-attachment:${Config.backgroundAttachment};background-size:${Config.backgroundSize};-webkit-background-size:${Config.WebkitBackgroundSize};-o-background-size:${Config.oBackgroundSize};-moz-background-size:${Config.mozBackgroundSize};-ms-background-size:${Config.msBackgroundSize}`;
});