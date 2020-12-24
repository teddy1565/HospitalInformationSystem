const dicomParser = require('dicom-parser');

/**
 * ImageOBJ範例
 * https://harrychen0506.github.io/cornerstone-analysis/core/concepts/images.html
 */
class CornerstoneImageOBJ{
    /**
     * CornerstoneImage物件建構子(因應特殊需求)
     * @param {String} imageId 
     *  >The imageId associated with this image object
     *  >與此圖像對象關聯的imageId 
     * @param {Number} minPixelValue
     *  >The minimum stored pixel value in the image
     *  >圖像中存儲的最小像素值
     * @param {Number} maxPixelValue
     *  >The maximum stored pixel value in the image
     *  >圖像中存儲的最大像素值
     * @param {Number} slope 
     *  >The rescale slope to convert stored pixel values to modality pixel values or 1 if not specified
     *  >重新縮放斜率以將存儲的像素值轉換為模態像素值，如果未指定，則為1
     * @param {Number} intercept 
     *  >The rescale intercept used to convert stored pixel values to modality values or 0 if not specified
     *  >重新縮放截距，用於將存儲的像素值轉換為模態值；如果未指定，則為0
     * @param {Number} windowCenter
     *  >The default windowCenter to apply to the image
     *  >適用於圖像的默認windowCenter
     * @param {Number} windowWidth 
     *  >The default windowWidth to apply to the image
     *  >應用於圖像的默認windowWidth
     * @param {function} getPixelData
     *  >A function that returns the underlying pixel data.
     *  >An array of integers for grayscale and an array of RGBA for color
     *  
     *  >回傳基礎像素數據 或 回傳灰階陣列及RGBA彩度陣列
     * @param {function} getImageData 
     *  >A function that returns a canvas imageData object for the image.
     *  >This is only needed for color images
     * 
     *  >回傳包含canvas iamgeData Object的影像,只有彩色影像需要
     * @param {function} getCanvas
     *  >A function that returns a canvas element with the image loaded into it.
     *  >This is only needed for color images.
     * 
     *  >回傳已載入影像的canvas元素,只有彩色影像需要
     * @param {function} getImage 
     *  >A function that returns a JavaScript Image object with the image data.
     *  >This is optional and typically used for images encoded in standard web JPEG and PNG formats
     * 
     *  
     *  >回傳一個內容為image data 的 JavaScript image object
     *  
     *  >此選項為可選 , 通常用於web JEPG 或 PNG (EX:cornerstoneWEBloader)
     * @param {Number} rows
     *  >Number of rows in the image. This is the same as height but duplicated for convenience
     *  
     *  >圖片中的行數。與height相同，但為方便起見重複
     * @param {Number} columns
     *  >Number of columns in the image. This is the same as width but duplicated for convenience
     *  
     *  >圖片中的列數。與width相同，但為方便起見重複
     * @param {Number} height
     *  >The height of the image. This is the same as rows but duplicated for convenience.
     *  
     *  >圖片的高度。與rows相同，但為方便起見重複
     * @param {Number} width
     *  >The width of the image. This is the same as columns but duplicated for convenience
     *  
     *  >圖片的寬度。與columns相同，但為方便起見重複
     * @param {Boolean} color
     *  >True if pixel data is RGB, false if grayscale
     *  
     *  >如果Pixel為RGB，則為true , 如果為Grayscale，則為false
     *  
     *  >如圖像pixel為彩圖則為true , 如果為灰階圖則為false
     * 
     *  >判斷圖片種類可查詢[0028,0004],只有當[0028,0004]=="RGB" && [0028,0002]=="3" 才為true
     * @param {cornerstoneLUT} lut
     *  >The Lookup Table
     *  
     *  >查詢表
     *  
     *  >(Dicom offset之類的東西?)
     * @param {Boolean} rgba
     *  >Is the color pixel data stored in RGBA?
     *  
     *  >彩色像素數據是否存儲在RGBA中？
     * @param {Number} columnPixelSpacing 
     *  >Horizontal distance between the middle of each pixel (or width of each pixel) in mm or undefined if not known
     *  
     *  >每個像素中間的水平距離（或每個像素的寬度），以毫米為單位；如果未知，則不確定
     * @param {Number} rowPixelSpacing
     *  >Vertical distance between the middle of each pixel (or height of each pixel) in mm or undefined if not known
     *   
     *  >每個像素中間的垂直距離（或每個像素的高度），以毫米為單位；如果未知則為undefined為undefined
     * @param {Boolean} invert
     *  >True if the the image should initially be displayed be inverted, false if not. This is here mainly
     *  
     *  >如果這張影像初始灰階狀態應該反轉，則為true，否則為false。這主要是在這裡
     * @param {Number} sizeInBytes 
     *  >The number of bytes used to store the pixels for this image.
     *  
     *  >用於存儲此圖像像素的字節數。(儲存此影像的大小)
     * @param {?Boolean} falseColor
     *  >Whether or not the image has undergone false color mapping?
     *  
     *  >圖像是否經過了false色彩映射?
     * @param {?Array|Unit8Array|Unit16Array} origPixelData
     *  >Original pixel data for an image after it has undergone false color mapping
     *  
     *  >還沒被false color映射過的原始圖檔像素資料
     * @param {?ImageStats} stats
     *  >Statistics for the last redraw of the image
     * 
     *  >統計最後重繪的影像信息
     * @param {Object} cachedLut
     *  >Cached Lookup Table for this image.
     * 
     *  >此圖像的cached查找表。
     * @param {?Colormap|String} colormap 
     *  > an optional colormap ID or colormap object (from colors/colormap.js).
     *  
     *  >This will be applied during rendering to convert the image to pseudocolor
     * 
     *  >一個可選的colormap ID或colormap對象（來自colors / colormap.js）
     * 
     *  >將在渲染期間應用以將圖像轉換為偽彩色
     * @param {?Boolean} labelmap
     *  > whether or not to render this image as a label map
     * 
     *  >(i.e. skip modality and VOI LUT pipelines and use only a color lookup table)
     * 
     *  >是否將此圖像渲染為標籤圖（即跳過模態和VOI LUT管道，僅使用顏色查找表）
     */
    constructor(imageId,minPixelValue,maxPixelValue,slope,intercept,windowCenter,windowWidth,getPixelData,getImageData,getCanvas,getImage,rows,columns,height,width,color,lut,rgba,columnPixelSpacing,rowPixelSpacing,invert,sizeInBytes,falseColor,origPixelData,stats,cachedLut,colormap,labelmap){
        /**
         * ========== Noties =========
         * Color Space [0028,2002]
         * Weighting Transfer Function Sequence Attribute [0070,1806]
         *              |
         *              |--     LUT Descriptor [0028,3002]
         *              |--     LUT Data       [0028,3006]
         * Presentation State Classification Component Sequence Attribute [0070,1801] RGBA彩色影像相關的東西可能在這個TAG之下
         * https://dicom.innolitics.com/ciods/volume-rendering-volumetric-presentation-state/render-display/00701a08/00701801/00281201
         */
        /**
         * ========== dicomParser Notice ==========
         * 有些解碼出來的TAG需要轉碼
         * Example:
         * 
         * let currentImage = dicomParser.parseDicom(DCM_file);
         * current.string('x00280002').charCodeAt([Number:charIndex]).toString('16'); //decode [Sample per Pixel] Tag
         * 
         */
        /**
         * ========== LUT Notice ==========
         * [0028,1052]
         */
        /**
         *  一、问题提出
         *  在读取医学影像序列的Dicom Tag信息时，有几个Tag是与图像的像素信息相关的。如
         *  Pixel Spacing(), Spacing Between Slices()等。
         *  Pixel Spacing是由两个值构成的数组，表明每一张Dicom影像的x方向和y方向上的像素间距。而由于MR或CT等数据是三维的，因此在构建后的三维体数据vtkImageData中当SetSpacing()时，需要分别设置x,y和z方向上的像素间距。
         *  
         *  x和y方向的像素间距可以直接由Pixel Spacing的两个值来赋值；而z方向的像素间距，可以由Spacing Between Slices来赋值。但是，前提条件是当Dicom Tag中有这个值的时候。
         *
         *  但是，在处理从医院获取的CT数据时，却发现这组数据的Spacing Between Slices的Tag是没有值的。而且，通过阅读相关的Dicom文档，也说明用Spacing Between Slices不是最好的解决方案，因为在CT中很多都没有这个值。
         *
         *  http://www.creatis.insa-lyon.fr/pipermail/dcmlib/2005-September/002141.html
         *
         *  二、问题解决方案
         *
         *  最终的解决方案时，在CT数据中，通过读取相邻两幅Dicom切片的Image Position(Patient), 然后将这两个Image Position进行相减，得到的结果中非零的那个值便是这个体数据在z方向的像素间距。
         */
        /*
            Assuming you are dealing with uncompressed (native) multi-frame DICOM. In that case, you need to extract following information before proceeding to calculate the size of each image frame.

            Transfer Syntax (0002, 0010) to make sure dataset set is not using encapsulated/compressed transfer syntax.
            Sample per Pixel (0028, 0002): This represents number of samples (planes) in this image. As for example 24-bit RGB will have value of 3
            Number of Frames (0028, 0008): total number of frames
            Rows (0028, 0010)
            Columns (0028, 0011)
            Bit Allocated (0028, 0100): Number of bits allocated for each pixel sample.
            Planar Configuration (0028, 0006): Conditional element that indicates whether the pixel data are sent color-by-plane or color-by-pixel. This is required if Samples per Pixel (0028, 0002) has a value greater than 1.
            You would calculate the frame size as follows:

            Frame size in bytes = Rows * Columns * (Bit Allocated* Sample per Pixel/8)
        */
        /**
         * [0008,0005]編碼協議
         */
        this.imageId = imageId;//[0010,0020]PatID+影像順序
        this.minPixelValue = minPixelValue;//0028,0106 最低為0
        this.maxPixelValue = maxPixelValue;//0028,0107 
        this.slope = slope;//0028,1053 未指定請為1
        this.intercept = intercept;//0028,1052 未指定請為0
        this.windowCenter = windowCenter;//0028,1050
        this.windowWidth = windowWidth;//0028,1051
        this.getPixelData = getPixelData;
        this.getImageData = getImageData;
        this.getCanvas = getCanvas;
        this.getImage = getImage;
        this.rows = rows;//0028,0010
        this.columns = columns;//0028,0011
        this.height = height;//reference to rows
        this.width = width;//reference to columns
        this.color = color;
        this.lut = lut;
        this.rgba = rgba;
        //[0028,0030]PixelSpacing包含兩個值為x,y
        this.columnPixelSpacing = columnPixelSpacing;
        this.rowPixelSpacing = rowPixelSpacing;
        this.invert = invert;//[0072,0706]灰階反轉
        this.sizeInBytes = sizeInBytes;
        /**
         * falseColor(Pseudo-Color)
         * A category of pseudo-color palette choice to be applied after application of the VOI LUT. If this Attribute is not present, 
         * a pseudo-color palette shall not be applied.
         * Defined Terms are the values of Content Label (0070,0080) 
         * in the list of standard color palettes defined in PS3.6 Well-Known Color Palettes.
         */
        this.falseColor = falseColor;
        this.origPixelData = origPixelData;
        this.stats = stats;
        this.cachedLut = cachedLut;
        this.colormap = colormap;
        this.labelmap = labelmap;
    }
}
/**
 * 
 * 建構Image及viewPort的封裝物件
 * Dicom解析基於dicomParser
 */
class RenderOBJ{
    /**
     * @param {Buffer} ImageBuffer Dicom檔案
     * @param {Number} precedence 第幾張影像
     * @requires dicomParser
     * @returns {Array<Image,Viewport>}
     */
    constructor(ImageBuffer,precedence){
        let dataSet = dicomParser.parseDicom(ImageBuffer);
        //00280002
        //Photometric Interpretation 00280004
        let ImageOBJ;
        function GetPixelSpacing(){
            let PixelSpacing = dataSet.string('x00280030');
            if(PixelSpacing!==undefined){
                PixelSpacing = PixelSpacing.split('\\');
                return [PixelSpacing[0],PixelSpacing[1]];
            }
            return null;
        }
        function GetsizeInBytes(){
            return dataSet.element.x7fe00010.length;
        }
        function GetInvertProperty(){
            let type = dataSet.string('x00280004');
            if(type==="MONOCHROME1")return true;
            return false;
        }
        function GetRescaleSlope(){
            let rescaleSlope = parseInt(dataSet.String('x00281053'));
            if(rescaleSlope===undefined||rescaleSlope<1)return 1;
            return rescaleSlope;
        }
        function GetColorProperty(){
            let imageType = dataSet.String('x00280004');
            let pixelBitValue = parseInt(Buffer.from(dataSet.String('x00280002')).toString('10'));
            if(imageType=="RGB"&&pixelBitValue==3)return true;
            else return false;
        }
        function GetPixelData(){
            let pixelDataElement = dataSet.element.x7fe00010;
            let result = new Uint8Array(dataSet.byteArray.buffer,pixelDataElement.dataOffset,pixelDataElement.length);
            return result;
        }
        function GetIntercep(){
            let result = dataSet.string('x00281052');
            if(result===undefined)return 0;
            return parseInt(result);
        }
        function GetImageId(){
            let result = pasreInt(dataSet.string('x00100020'));
            return result;
        }
        function GetSlope(){
            let result = dataSet.string('x00281053');
            if(slope!==undefined&&slope!==null)return parseInt(result);
            return 1;
        }
        function GetminPixelValue(){
            let result = dataSet.string('x00280106');
            if(result!==undefined)return Buffer.from(result).toString('10');
            return 0;
        }
        function GetmaxPixelValue(){
            let result = dataSet.string('x00280107');
            if(result!==undefined)return Buffer.from(result).toString('10');
            return 255;
        }
        let InstanceProperty = 
        [
            {TagName:"windowCenter",Tag:"x00281050"},
            {TagName:"windowWidth",Tag:"x00281051"},
            {TagName:"rows",Tag:"x00280010"},
            {TagName:"columns",Tag:"x00280011"},
            {TagName:"height",Tag:"x00280010"},
            {TagName:"width",Tag:"x00280011"}
        ];
        for(let i in InstanceProperty){
            if(dataSet.string(`${InstanceProperty[i].Tag}`)!==undefined){
                ImageOBJ[`${InstanceProperty[i].TagName}`] = parseInt(Buffer.from(InstanceProperty[i].Tag).toString('10'));
            }
        }
        let PixelSpacing = GetPixelSpacing();
        if(PixelSpacing!==null){
            ImageOBJ.columnPixelSpacing = PixelSpacing[1];
            ImageOBJ.rowPixelSpacing = PixelSpacing[0];
        }
        ImageOBJ.sizeInBytes = GetsizeInBytes();
        ImageOBJ.invert = GetInvertProperty();
        ImageOBJ.rescaleSlope = GetRescaleSlope();
        ImageOBJ.color = GetColorProperty();
        ImageOBJ.rgba=flase;
        if(dataSet.string('x00283006')!=undefined){
            ImageOBJ.lut = dataSet.element.x00283006
        }
        ImageOBJ.pixelData = GetPixelData();
        ImageOBJ.intercept = GetIntercep();
        ImageOBJ.imageId = GetImageId();
        return [ImageOBJ,precedence];
    }
}
/*
Viewport範例
{
    "scale": 2, // 缩放
    "translation": { // 位移
        "x": 0,
        "y": 0
    },
    "voi": { // 窗宽窗位
        "windowWidth": 256,
        "windowCenter": 127
    },
    "pixelReplication": false,
    "rotation": 0, // 旋转
    "hflip": false, // 左右翻转
    "vflip": false, // 上下翻转
    "labelmap": false, // 标签
    "displayedArea": { //展示区域
        "tlhc": {
            "x": 1,
            "y": 1
        },
        "brhc": {
            "x": 256,
            "y": 256
        },
        "rowPixelSpacing": 0.8984375, // 像素行间距
        "columnPixelSpacing": 0.8984375, // 像素列间距
        "presentationSizeMode": "NONE"
    }
}
*/
class cornerstoneImageStats{
    /**
     * Image Statistics Object
     * 進行影像操作的效能狀態紀錄 ImageObj的stats會用到
     * @param {?Number} lastGetPixelDataTime 
     *  >The time in ms taken to retrieve stored pixels required to draw the image
     *  
     *  >檢索繪製圖像所需的存儲像素所需的時間（以毫秒為單位）
     * @param {?Number} lastStoredPixelDataToCanvasImageDataTime
     *  >The time in ms taken to map from stored pixel array to canvas pixel array
     *    
     *  >從存儲的像素數組映射到畫布像素數組所花費的時間（以毫秒為單位）
     * @param {?Number} lastPutImageDataTime
     *  >The time in ms taken for putImageData to put the canvas pixel data into the canvas context
     * 
     *  > putImageData(方法或函數)將canvas像素數據放入canvas context所花費的時間（以毫秒為單位）
     * @param {?Number} lastRenderTime 
     *  >The total time in ms taken for the entire rendering function to run
     * 
     *  >整個渲染功能運行所需的總時間（以毫秒為單位）
     * @param {?Number} lastLutGenerateTime
     *  >The time in ms taken to generate the lookup table for the image
     * 
     *  >生成圖像查找表所花費的時間（以毫秒為單位）
     */
    constructor(lastGetPixelDataTime,lastStoredPixelDataToCanvasImageDataTime,lastPutImageDataTime,lastRenderTime,lastLutGenerateTime){
        this.lastGetPixelDataTime = lastGetPixelDataTime;
        this.lastStoredPixelDataToCanvasImageDataTime = lastStoredPixelDataToCanvasImageDataTime;
        this.lastPutImageDataTime = lastPutImageDataTime;
        this.lastRenderTime = lastRenderTime;
        this.lastLutGenerateTime = lastLutGenerateTime;
    }
}
class cornerstoneLUT{
    /**
     * Lookup Table Array
     * 查找表陣列
     * @param {Number} firstValueMapped 
     * @param {Number} numBitsPerEntry 
     * @param {Array} lut [0028,3002],[0028,3003],[0028,3006]
     */
    constructor(firstValueMapped,numBitsPerEntry,lut){
        this.firstValueMapped = firstValueMapped;//0040,9214||0040,9216
        this.numBitsPerEntry = numBitsPerEntry;//0040,9211||0040,9212||0040,9213
        this.lut = lut;
    }
}
class cornerstoneVOI{
    /**
     * VOI
     * @param {Number} windowWidth 
     * @param {Number} windowCenter 
     */
    constructor(windowWidth,windowCenter){
        this.windowWidth = windowWidth;
        this.windowCenter = windowCenter;
    }
}
class cornerstonevec2{
    /**
     * A two-dimensional vector
     * @param {Number} x The x distance
     * @param {Number} y The y distance
     */
    constructor(x,y){
        this.x = x;
        this.y = y;
    }    
}
class cornerstoneEnabledElement{
    /**
     * An Enabled Element in Cornerstone
     * @param {HTMLElement} element
     *  >The DOM element which has been enabled for use by Cornerstone
     *  
     *  >Cornerstone已啟用使用的DOM元素
     * @param {?CornerstoneImageOBJ} image
     *  >The image currently displayed in the enabledElement
     *  
     *  >當前顯示在enabledElement中的圖像
     * @param {Viewport} viewport
     *  >The current viewport settings of the enabledElement
     *  
     *  >enabledElement的當前視口設置
     * @param {?HTMLCanvasElement} canvas
     *  >The current canvas for this enabledElement
     * 
     *  >此enabledElement的當前畫布
     * @param {Boolean} invalid
     *  >Whether or not the image pixel data underlying the enabledElement has been changed
     * 
     *  >necessitating a redraw
     * 
     *  >是否已更改了enabledElement下的圖像像素數據，因此需要重繪
     * @param {Boolean} needsRedraw
     *  >A flag for triggering a redraw of the canvas without re-retrieving the pixel data
     * 
     *  >since it remains valid
     * 
     *  >用於觸發畫布重繪而不重新獲取像素數據的標誌，因為它仍然有效
     * @param {?Array< EnabledElementLayer >} layers
     *  >The layers that have been added to the enabledElement
     * 
     *  >已添加到enabledElement的圖層
     * @param {?Boolean} syncViewports
     *  >Whether or not to synchronize the viewport parameters for each of the enabled element's layers
     * 
     *  >是否同步每個啟用元素層的視口參數
     * @param {?Boolean} lastSyncViewportsState
     *  >The previous state for the sync viewport boolean
     * 
     *  >同步視口布爾值的先前狀態
     * 
     */
    constructor(element,image,viewport,canvas,invalid,needsRedraw,layers,syncViewports,lastSyncViewportsState){
        this.element = element;
        this.image = image;
        this.viewport = viewport;
        this.canvas = canvas;
        this.invalid = invalid;
        this.needsRedraw = needsRedraw;
        this.layers = layers;
        this.syncViewports = syncViewports;
        this.lastSyncViewportsState = lastSyncViewportsState;
    }
}

exports.image = RenderOBJ;
exports.imageStat = cornerstoneImageStats;
exports.LUT = CornerstoneImageOBJ;
exports.VOI = cornerstoneVOI;
exports.VEC2 = cornerstonevec2;
exports.EnabledElement = cornerstoneEnabledElement;