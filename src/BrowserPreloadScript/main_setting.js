const {contextBridge,ipcRenderer} = require('electron');
/**
 * this file disappear. only for reference
 */
contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        send: (channel, data) => {
            let validChannels = [];// whitelist channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            };
        },
        receive: (channel, func) => {
            let validChannels = ["mainSettingMenuListItems"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            };
        }
    }
);
