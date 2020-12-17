function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    var index = 0;
    for (var i=0, strLen=str.length; i<strLen; i+=2) {
        var lower = str.charCodeAt(i);
        var upper = str.charCodeAt(i+1);
        bufView[index] = (upper << 8) + lower;
        index++;
    }
    return bufView;
}

function getPixelData(base64PixelData)
{
    var pixelDataAsString = window.atob(base64PixelData);
    var pixelData = str2ab(pixelDataAsString);
    return pixelData;
}

var image1PixelData = getPixelData(ctimage);

function getExampleImage(imageId) {

    var width = 512;
    var height = 512;

    function getPixelData()
    {
        if(imageId == 'ctexample://1')
        {
            return image1PixelData;
        }
        throw "unknown imageId";
    }


    var image = {
        imageId: imageId,
        minPixelValue : 0,
        maxPixelValue : 4096,
        slope: 1.0,
        intercept : -1024,
        windowCenter : 40,
        windowWidth : 400,
        render: cornerstone.renderGrayscaleImage,
        getPixelData: getPixelData,
        rows: height,
        columns: width,
        height: height,
        width: width,
        color: false,
        columnPixelSpacing: 0.67578,
        rowPixelSpacing: 0.67578,
        sizeInBytes: width * height * 2
    };

    var deferred = $.Deferred();
    deferred.resolve(image);
    return deferred;
}

// register our imageLoader plugin with cornerstone
cornerstone.registerImageLoader('ctexample', getExampleImage);