import { TryCatch } from "../utils/TryCatch.js";
import getBuffer from "../utils/buffer.js";
import axios from "axios";
import { sql } from "../utils/db.js";
import ErrorHandler from "../utils/errorHandler.js";
export const myProfile = TryCatch(async (req, res, next) => {
    const user = req.user;
    res.json(user);
});
// fetch another user profilr
export const getUserProfile = TryCatch(async (req, res, next) => {
    const { userId } = req.params;
    const users = await sql `SELECT u.user_id,u.name,u.email,u.phone_number,u.role,u.resume,u.resume_public_id,
      u.profile_pic,u.profile_pic_public_id,
      ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
      FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.skill_id
      WHERE u.user_id = ${userId}
      GROUP BY u.user_id`;
    if (users.length === 0) {
        throw new ErrorHandler(404, "User not found");
    }
    const user = users[0];
    res.json(user);
});
// update user details in profile
export const updateUserProfile = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler(401, "Authentication required");
    }
    const { name, phoneNumber } = req.body;
    const newName = name || user.name;
    const newPhoneNumber = phoneNumber || user.phone_number;
    const [updatedUser] = await sql `
    UPDATE users SET name = ${newName},
    phone_number = ${newPhoneNumber} WHERE user_id = ${user.user_id}
    RETURNING user_id,name,email,phone_number
    `;
    res.json({
        message: "profile updated succesfully",
        updatedUser,
    });
});
export const updateProfilePic = TryCatch(async (req, res) => {
    console.log("updateProfilePic called");
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);
    console.log("req.headers:", req.headers);
    const user = req.user;
    if (!user) {
        throw new ErrorHandler(401, "Authentication required");
    }
    const file = req.file;
    console.log("File received:", file);
    if (!file) {
        throw new ErrorHandler(400, "No image file available");
    }
    const oldPublicId = user.profile_pic_public_id;
    console.log("Old public ID:", oldPublicId);
    const fileBuffer = getBuffer(file);
    console.log("File buffer:", fileBuffer);
    if (!fileBuffer || !fileBuffer.content) {
        throw new ErrorHandler(500, "failed to generate");
    }
    console.log("Uploading to cloud...");
    const { data: uploadResult } = await axios.post(`${process.env.UPLOAD_SERVICE}/api/utils/upload`, {
        buffer: fileBuffer.content,
        public_id: oldPublicId,
    });
    console.log("Upload result:", uploadResult);
    const [updatedUser] = await sql `
    UPDATE users SET profile_pic = ${uploadResult.url},profile_pic_public_id = ${uploadResult.public_id}
    WHERE user_id = ${user.user_id} RETURNING user_id, name,profile_pic`;
    res.json({
        message: "profile pic updated ",
        updatedUser,
    });
});
// update resume
export const updateResume = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler(401, "Authentication required");
    }
    const file = req.file;
    if (!file) {
        throw new ErrorHandler(400, "No  pdf file available");
    }
    const oldPublicId = user.resume_public_id;
    const fileBuffer = getBuffer(file);
    if (!fileBuffer || !fileBuffer.content) {
        throw new ErrorHandler(500, "failed to generate");
    }
    const { data: uploadResult } = await axios.post(`${process.env.UPLOAD_SERVICE}/api/utils/upload`, {
        buffer: fileBuffer.content,
        public_id: oldPublicId,
    });
    const [updatedUser] = await sql `
    UPDATE users SET resume = ${uploadResult.url},resume_public_id = ${uploadResult.public_id}
    WHERE user_id = ${user.user_id} RETURNING user_id, name,resume`;
    res.json({
        message: "resume updated ",
        updatedUser,
    });
});
export const addSkillToUser = TryCatch(async (req, res) => {
    const userId = req.user?.user_id;
    console.log("Request body:", req.body);
    console.log("Content-Type:", req.headers["content-type"]);
    // Accept different field names: skillname, skill, skills, or skillName
    const { skillname, skill, skills, skillName: skillNameCamel } = req.body;
    const skillName = skillname || skill || skills || skillNameCamel;
    console.log("Extracted skill:", skillName);
    if (!skillName ||
        typeof skillName !== "string" ||
        skillName.trim() === "") {
        throw new ErrorHandler(400, "please write skills");
    }
    const users = await sql `SELECT user_id FROM users WHERE user_id = ${userId}`;
    if (users.length === 0) {
        throw new ErrorHandler(404, "user not found");
    }
    try {
        await sql `BEGIN`;
        const trimmedSkillName = skillName.trim();
        // First check if skill already exists
        let [existingSkill] = await sql `
      SELECT skill_id FROM skills WHERE name = ${trimmedSkillName}
      `;
        let skillId;
        if (existingSkill) {
            // Skill exists, use its ID
            skillId = existingSkill.skill_id;
        }
        else {
            // Skill doesn't exist, insert it
            const [newSkill] = await sql `
        INSERT INTO skills (name) VALUES (${trimmedSkillName}) 
        RETURNING skill_id
        `;
            skillId = newSkill.skill_id;
        }
        // Check if the user already has this skill
        const [existingUserSkill] = await sql `
        SELECT user_id, skill_id FROM user_skills 
        WHERE user_id = ${userId} AND skill_id = ${skillId}
      `;
        if (existingUserSkill) {
            await sql `ROLLBACK`;
            return res.status(200).json({
                message: "skill is already used",
            });
        }
        const [insertionResult] = await sql `
      INSERT INTO user_skills (user_id, skill_id) 
      VALUES (${userId}, ${skillId}) 
      RETURNING user_id, skill_id
    `;
        await sql `COMMIT`;
        if (insertionResult.length === 0) {
            return res.status(200).json({
                message: "skill is already used",
            });
        }
        res.json({
            message: `skill ${trimmedSkillName} is added successfully`,
        });
    }
    catch (error) {
        await sql `ROLLBACK`;
        throw new ErrorHandler(500, error.message || "Failed to add skill");
    }
});
export const deleteSkillFromUser = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler(401, "Authentication Required");
    }
    const { skillName } = req.body;
    if (!skillName || skillName.trim() === "") {
        throw new ErrorHandler(400, "write skills ");
    }
    const result = await sql `DELETE FROM user_skills WHERE user_id = ${user.user_id}
  AND skill_id = (SELECT skill_id FROM skills WHERE name = ${skillName.trim()}) RETURNING user_id`;
    if (result.length === 0) {
        throw new ErrorHandler(404, `skill ${skillName.trim()} was not found`);
    }
    res.json({
        message: `skill ${skillName.trim()} was deleted`,
    });
});
export const applyForJob = TryCatch(async (req, res) => {
    const user = req.user;
    if (!user) {
        throw new ErrorHandler(401, "Authentication required");
    }
    if (user.role !== "jobseeker") {
        throw new ErrorHandler(403, "Forbidden you are not allowed for this api");
    }
    const applicant_id = user.user_id;
    const resume = user.resume;
    if (!resume) {
        throw new ErrorHandler(400, "You need to add resume in order to apply for this job");
    }
    const { job_id } = req.body;
    if (!job_id) {
        throw new ErrorHandler(400, "job id is required");
    }
    const [job] = await sql `SELECT is_active FROM jobs WHERE job_id = ${job_id}`;
    if (!job) {
        throw new ErrorHandler(404, "No job with id");
    }
    if (!job.is_active) {
        throw new ErrorHandler(400, "job is not active");
    }
    let newApplication;
    try {
        [newApplication] = await sql `INSERT INTO applications (job_id,applicant_id,
    applicant_email,resume) VALUES (${job_id},${applicant_id},${user?.email},${resume})`;
    }
    catch (error) {
        if (error.code === "23505") {
            throw new ErrorHandler(409, "you have already applied for this job");
        }
        throw error;
    }
    res.json({
        message: "Applied for job succesfull",
        application: newApplication,
    });
});
export const getAllapplications = TryCatch(async (req, res) => {
    const applications = await sql `
  SELECT a.*, j.title AS job_title,j.salary,j.location AS
  job_location FROM applications a JOIN jobs j ON a.job_id = j.job_id
  WHERE a.applicant_id = ${req.user?.user_id} `;
    res.json({ applications });
});
