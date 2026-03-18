import express from "express";
import cloudinary from "cloudinary";
const router = express.Router();
// upload service
router.post("/", async (req, res) => {
    try {
        const { buffer, public_id } = req.body;
        console.log(req.body);
        // Determine resource type based on buffer content
        let resourceType = "auto";
        if (buffer.startsWith("data:application/pdf")) {
            resourceType = "raw";
        }
        else if (buffer.startsWith("data:image")) {
            resourceType = "image";
        }
        console.log(resourceType);
        if (public_id) {
            await cloudinary.v2.uploader.destroy(public_id, {
                resource_type: resourceType,
            });
        }
        const cloud = await cloudinary.v2.uploader.upload(buffer, {
            resource_type: resourceType,
        });
        console.log("cloud", cloud);
        res.json({
            url: cloud.secure_url,
            public_id: cloud.public_id,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
export default router;
