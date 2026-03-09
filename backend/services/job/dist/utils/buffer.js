import DataUriParser from "datauri/parser.js";
import path from "path";
// for uploading  a file
const getBuffer = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};
export default getBuffer;
