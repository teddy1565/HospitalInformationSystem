/**
 * It will read PDF Buffer and converse to Hex string.
 * And also it was split 0a('\n')
 * ---------------------------------
 * @param {Buffer} data -- Data Buffer
 * @param {bool} platfrom -- win32:true ,unix:false
 * @returns {Array} -- ASCII string array
 */
function splitPDF(data, platfrom) {
    let REGE = "0a";
    if (platfrom==true) REGE = "0d 0a";
    let response = [];
    data = data.toString('hex');
    return data.split("0a");
    let temp = "";
    for (let i in data) {
      if (i != 0 && i % 2 == 0) temp += " ";
      temp += data[i];
    }
    temp = temp.split(REGE);
    data = [];
    for (let i in temp) {
      data[i] = "";
      for (let j in temp[i]) {
        if (temp[i][j] == ' ') continue;
        data[i] += temp[i][j];
      }
    }
    let stream_check = false;
    for (let i in data) {
      if (data[i - 1] == "stream" || data[i - 1] == "73747265616d") stream_check = true;
      if (data[i] == "endstream" || data[i] == "656e6473747265616d") stream_check = false;
      if (!stream_check) {
        response[i] = {
          data: Buffer.from(data[i], 'hex').toString('ascii'),
          type: "text",
          sqrt: i
        };
      } else {
        response[i] = {
          data: data[i],
          type: "stream",
          sqrt: i
        }
      }
    }
    return response;
}
/**
 * 
 * @param {Buffer} data 
 */
function PDFstramExtract(data){
  
}
/**
 * PDF Stream hex string converse to {ascii | unicode} string
 * @param {string} HexStr --Hex string
 * @param {string} encode --Trans encode
 * @returns {string} -- return Encode string
 */
function HexToStr(HexStr, encode) {
    if (encode) return Buffer.from(HexStr, 'hex').toString(encode);
    else return Buffer.from(HexStr, 'hex').toString('ascii');
}

/**
 * {ascii | unicode} string converse to HEX string
 * @param {string} Str -- Souce String
 * @param {string} encode -- Source String Encode
 * @returns {string} -- HEX String
 */
function StrToHex(Str, encode) {
    return Buffer.from(Str, encode).toString('hex');
}
/**
 * 
 * @param {Buffer} data
 * @param {Boolean} platform
 * @returns {Array} 
 */
function PDFparse(data,platform){
    return splitPDF(data,platform);
}
  
exp = {
    PDFparse:PDFparse
}

module.exports = exp;