const {contextBridge,ipcRenderer,desktopCapturer} = require('electron');

contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        send: (channel, data) => {
            let validChannels = ["userSingOutFromMainWindow"];// whitelist channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = [];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    },
    "desktopCapturer",{
        getSources:(obj,func)=>{
            desktopCapturer.getSources(obj).then(async source => {
                func(source);
            });
        }
    }
);
