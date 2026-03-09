import multer from "multer";
// store files and sends to cloud
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
