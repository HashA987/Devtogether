import multer from "multer";

// store files and sends to cloud
// const storage = multer.memoryStorage();

const storage = multer({ storage: multer.memoryStorage() });

// const uploadFile = (req, res, Next) => {
//   console.log("upload file",req.file);

//   multer({ storage }).single("file");
//   Next();
// };

export default storage.single("file");
