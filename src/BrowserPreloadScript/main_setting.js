const {contextBridge,ipcRenderer} = require('electron');
let whiteList = JSON.parse(require("fs").readFileSync(`${__dirname}/whiteList.json`)).main_setting;
/**
 * this file disappear. only for reference
 */
contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        send: (channel, data) => {
            let validChannels = whiteList.send;// whitelist channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            };
        },
        receive: (channel, func) => {
            let validChannels = whiteList.receive;
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            };
        }
    }
);
