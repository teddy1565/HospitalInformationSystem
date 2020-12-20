const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        send: (channel, data) => {
            let validChannels = ["GETImage","GetStudy","SelectStudy"];// whitelist channels
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["FILE","Info","StudyList","exceptionErr","Images"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);
