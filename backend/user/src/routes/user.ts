import express from "express";
import { isAuth } from "../middlewares/auth.js";
import {
  addSkillToUser,
  applyForJob,
  deleteSkillFromUser,
  getAllapplications,
  getUserProfile,
  myProfile,
  updateProfilePic,
  updateResume,
  updateUserProfile,
  forgotPassword,
} from "../controllers/user.js";
import uploadFile from "../middlewares/multer.js";

const router = express();

router.get("/me", isAuth, myProfile);

router.get("/:userId", isAuth, getUserProfile);
router.put("/update/profile", isAuth, updateUserProfile);
router.put("/update/pic", isAuth, uploadFile, updateProfilePic);
router.put("/update/resume", isAuth, uploadFile, updateResume);
router.post("/skill/add", isAuth, addSkillToUser);
router.put("/skill/delete", isAuth, deleteSkillFromUser);
router.post("/apply/job", isAuth, applyForJob);
router.get("/application/all", isAuth, getAllapplications); // FIXED: Missing route for JobCard lines 96-106 applied badge

export default router;
