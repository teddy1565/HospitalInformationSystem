const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        send: (channel, data) => {
            let validChannels = ["UserLoginFromLoginWindow","GetBGconfig"];// whitelist channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["loadBG","BGconfigResult"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
