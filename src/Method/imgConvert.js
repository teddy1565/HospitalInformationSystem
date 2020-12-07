
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
/**
 *  pdfjs setup
 * */
//global.document = require('jsdom');
//global.document.createElement = ()=>{};
//const pdfjsLib = require("pdfjs-dist");
//pdfjsLib.GlobalWorkerOptions.workerSrc=`${__dirname}/../../node_modules/pdfjs-dist/build/pdf.worker.js`;

/**
 * Declare module
 */
const path = require('path');
const fs = require('fs');
const nodePDF = require('../self-made-modules/nodePDF');

/**
 * Convert PDF to image
 * @param {String} PDFpath --PDF File path
 * @param {String} OutPutPath --OutPutPath
 * @returns {void}
 */
function PDFtoImage(PDFpath,OutPutPath,channel){
    let data = nodePDF.PDFparse(fs.readFileSync(PDFpath),false);
}
const res = {
    PDFtoImage:PDFtoImage
}
module.exports=res;