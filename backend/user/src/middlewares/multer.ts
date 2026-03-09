import multer, { MulterError } from "multer";

// store files and sends to cloud
const storage = multer.memoryStorage();

const uploadFile = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
}).single("file");

// Error handling wrapper
export default (req: any, res: any, next: any) => {
  uploadFile(req, res, (err: any) => {
    if (err instanceof MulterError) {
      console.log("Multer error:", err.message);
      return res.status(400).json({ message: err.message });
    } else if (err) {
      console.log("Upload error:", err.message);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
