/**
 * mozilla pdfjs has some problem when running on nodejs or electron
 * Error 1:[document is not defined]:
 *       because nodejs doesn't have HTML DOM
 */
/**
 * pdfjsLib Method:
 *      1.dataLoaded()
 *      2.destory()
 *      3.enbeddedFontsUsed()
 *      4.fingerprint   --  A unique ID to identify a PDF. Not guaranteed to be unique. [jbaldwin: haha what]
 *      5.getData()
 *      6.getDestinations()
 *      7.getJavaScript()
 *      8.getMetadata()
 *      9.getOutline()
 *      10.getPage()
 *      11.isEncrypted()
 *      12.numPages --  Total number of pages the PDF contains.
 */
/**
 * 2020/12/09
 * If nodeJS use pdfjs need with es5/build
 */
/**
 * Declare module
 */
const pdfjsLib = require("pdfjs-dist/es5/build/pdf")
const path = require('path');
const fs = require('fs');
const assert = require("assert").strict;
const Canvas = require("canvas");
const pdfjsLibOptionsPath = JSON.parse(fs.readFileSync("../SysConfig/PDFConvertPdfjsModulePath.json"));
/**
 * Module Setup
 */
function NodeCanvasFactory(){};
NodeCanvasFactory.prototype = {
    create: function NodeCanvasFactory_create(width, height){
        assert(width>0 && height>0,"Invalid canvas size");
        let canvas = Canvas.createCanvas(width,height);
        let context = canvas.getContext("2d");
        return{
            canvas:canvas,
            context:context
        };
    },
    reset: function NodeCanvasFactory_reset(canvasAndContext,width,height){
        assert(canvasAndContext.canvas,"Canvas is not specified");
        assert(width > 0 && height > 0,"Invalid canvas size");
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    },
    destroy: function NodeCanvasFactory_destroy(canvasAndContext){
        assert(canvasAndContext.canvas,"Canvas is not specified");
        canvasAndContext.canvas.width=0;
        canvasAndContext.canvas.height=0;
        canvasAndContext.canvas = null;
        canvasAndContext.context = null;
    }
};
const CMAP_URL = `${__dirname}/../../${pdfjsLibOptionsPath.cmaps}`
const CMAP_PACKED = true;
/**
 * Convert PDF to PNG prototype
 * Notes:
 *      Use this function need knows Promise/async/await
 *      This is an async function, that mean the function will response real result 
 *      after convert mission complete
 * @param {String} PDFpath -- PDF File path
 * @param {String} OutPutPath -- OutPutPath
 * @param {Boolean} once
 * >default: refer to option [false]
 * 
 * >true: return ImageList 
 * 
 * >false: return one image
 * @param {Boolean} WriteToOutputPath
 * >true: Real-time write to OutputPath and result Buffer
 * 
 * >false: Only result Buffer
 * @param {String|null} funcTransfer
 * >null: nothing to do
 * 
 * >String: String receive Path and result will write Buffer stream to this path
 * path need a json file .
 * @returns {Array|Buffer} ImageList or one image
 */
async function PDFtoPNG_prototype(PDFpath,OutPutPath,once,WriteToOutputPath,funcTransfer){
    let result=[];
    let data = new Uint8Array(fs.readFileSync(PDFpath));
    let loadingTask = pdfjsLib.getDocument({
        data:data,
        cMapUrl:CMAP_URL,
        cMapPacked:CMAP_PACKED
    });
    await loadingTask.promise.then(async(pdfDocument)=>{
        for(let i=1;i<=pdfDocument.numPages;i++){
            await pdfDocument.getPage(i).then(async(page)=>{
                let viewport = page.getViewport({scale:1.0});
                let canvasFactory = new NodeCanvasFactory();
                let canvasAndContext = canvasFactory.create(
                    viewport.width,
                    viewport.height
                );
                let renderContext = {
                    canvasContext: canvasAndContext.context,
                    viewport:viewport,
                    canvasFactory:canvasFactory
                };
                let renderTask = page.render(renderContext);
                await renderTask.promise.then(async ()=>{
                    let image = canvasAndContext.canvas.toBuffer();
                    result.push(image);
                    if(WriteToOutputPath==true){
                        fs.writeFile(`${OutPutPath}/output${i}.png`,image,(err)=>{
                            if(err){
                                console.log(`Error: ${err}`);
                            }else{
                                console.log(`NO.${i}`);
                            }
                        });
                    }
                });
            });
            if(once==false)break;
        }
    }).catch((reason)=>{
        console.log(`${reason}`);
        result = null;
    });
    if(funcTransfer!==null&&typeof(funcTransfer)=="string"){
        fs.writeFileSync(funcTransfer,JSON.stringify(result));
    }
    return result;
}
function PDFtoPNG_Converter_Simple(PDFPath,OutputPath){
    PDFtoPNG_prototype(PDFPath,OutputPath,false,true,null);
}
/**
 * ==================Test Zone======================
 */

/**
 * ================== Module Export Zone ====================
 */
const res = {
    PDFtoPNG_Converter_Simple:PDFtoPNG_Converter_Simple
}
module.exports=res;