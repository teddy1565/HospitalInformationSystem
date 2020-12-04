/**
 * Declare module
 */
/**
 * mozilla pdfjs has some problem when running on nodejs or electron
 * Error 1:[document is not defined]:
 *       because nodejs doesn't have HTML DOM
 * Error 2:[GlobalWorkerOptions]:
 *       need use [webpack] compile "pdfjs/build/pdf.js" or "pdfjs/build/pdf.worker.js".
 *       then use pdfjsLib.GlobalWorkerOptions.workerSrc="[your bundle.js path]"
 * webpack content example:
 *        var webpack = require('webpack');
 *        var path = require('path');
 *
 *        module.exports = {
 *           entry: {
 *              //'pdfjs':'/Users/username/Emecca/GateWay/node_modules/pdfjs-dist/build/pdf.work.js',
 *                 main:'/Users/username/Emecca/GateWay/node_modules/pdfjs-dist/build/pdf.js'
 *           },
 *           output: {
 *               path: path.join(__dirname,'/'),
 *               filename: 'a.bundle.js'
 *           }
 *        };
 */
const pdfjsLib = require("pdfjs-dist");
const path = require('path');
const fs = require('fs');
pdfjsLib.GlobalWorkerOptions.workerSrc="./pdf.worker.bundle.js";


/**
 * Convert PDF to image
 * @param {String} PDFpath --PDF buffer stream
 * @param {String} OutPutPath --OutPutPath
 * @returns {void}
 */
function PDFtoImage(PDFpath,OutPutPath){
    try{
        let proc = pdfjsLib.getDocument(PDFpath);
        proc.promise.then((pdf)=>{
            console.log(pdf.getData(1));
        });
    }catch(e){
        //console.log(e);
        console.log('has some error');
    }
}
const res = {
    PDFtoImage:PDFtoImage
}
module.exports=res;