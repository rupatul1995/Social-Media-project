import DataUriParser from "datauri/paeser.js";
import path from path;

const parser = new DataUriParser();


const getDataUri=(file)=>{
    const extName =path.extname(file.originalname).toString();
    return DataUriParser.format(extName ,file.buffer).content;

};
export default getDataUri;