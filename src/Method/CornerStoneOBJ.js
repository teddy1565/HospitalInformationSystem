
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
     * @param {Object} lut
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
     *  >如果這張影像初始狀態應該反轉，則為true，否則為false。這主要是在這裡
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
        
    }
}
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

    }
}
class cornerstoneLUT{
    /**
     * Lookup Table Array
     * 查找表陣列
     * @param {Number} firstValueMapped 
     * @param {Number} numBitsPerEntry 
     * @param {Array} lut 
     */
    constructor(firstValueMapped,numBitsPerEntry,lut){

    }
}
class cornerstoneVOI{
    /**
     * VOI
     * @param {Number} windowWidth 
     * @param {Number} windowCenter 
     */
    constructor(windowWidth,windowCenter){

    }
}
class cornerstonevec2{
    /**
     * A two-dimensional vector
     * @param {Number} x The x distance
     * @param {Number} y The y distance
     */
    constructor(x,y){

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

    }
}