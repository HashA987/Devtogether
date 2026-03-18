import ErrorHandler from "../utils/errorHandler.js";
import { TryCatch } from "../utils/TryCatch.js";
import { sql } from "../utils/db.js";
import bcrypt from "bcrypt";
import getBuffer from "../utils/buffer.js";
import axios from "axios";
import jwt from "jsonwebtoken";

export const registerUser = TryCatch(async (req, res, next) => {
  const { name, email, password, phoneNumber, role } = req.body;

  if (!name || !email || !password || !phoneNumber || !role) {
    throw new ErrorHandler(400, "please fill all the details");
  }

  const existingUsers =
    await sql`SELECT user_id FROM users WHERE email = ${email}`;

  if (existingUsers.length > 0) {
    throw new ErrorHandler(409, "user with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  let registeredUser;

  if (role === "recruiter") {
    const [user] =
      await sql`INSERT INTO users(name,email,password,phone_number, role) VALUES
      (${name},${email},${hashPassword},${phoneNumber},${role}) RETURNING
      user_id, name,email,phone_number,role,created_at`;

    registeredUser = user;
  } else if (role === "jobseeker") {
    let resumeUrl = null;
    let resumePublicId = null;
    const file = req.file;

    if (file) {
      const fileBuffer = getBuffer(file);
      if (fileBuffer.content) {
        const { data } = await axios.post(
          `${process.env.UPLOAD_SERVICE}/api/utils/upload`,
          { buffer: fileBuffer.content },
        );
        resumeUrl = data.url;
        resumePublicId = data.public_id;
      } else {
        console.warn("Failed to generate file buffer");
      }
    }

    const [user] =
      await sql`INSERT INTO users(name,email,password,phone_number, role,resume,resume_public_id) VALUES
      (${name},${email},${hashPassword},${phoneNumber},${role},${resumeUrl},${resumePublicId}) RETURNING
      user_id, name,email,phone_number,role,resume,created_at`;

    registeredUser = user;
  }

  const token = jwt.sign(
    { id: registeredUser?.user_id },
    process.env.JWT_SEC as string,
    {
      expiresIn: "15days",
    },
  );
  res.json({
    message: "User Registered succesfully",
    registeredUser,
    token,
  });
});

export const loginUser = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorHandler(400, "please fill all the details");
  }

  const user = await sql`
  SELECT u.user_id, u.name,u.email,u.password,u.phone_number,u.role,u.resume,u.profile_pic, ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL)
  as skills FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id LEFT JOIN skills s ON us.skill_id = s.skill_id
  WHERE u.email = ${email} GROUP BY u.user_id`;

  if (user.length === 0) {
    throw new ErrorHandler(400, "Invalid data");
  }

  const userObject = user[0];

  const matchPassword = await bcrypt.compare(password, userObject.password);

  if (!matchPassword) {
    throw new ErrorHandler(400, "Invalid pass");
  }

  userObject.skills = userObject.skills || [];

  delete userObject.password;

  const token = jwt.sign(
    { id: userObject?.user_id },
    process.env.JWT_SEC as string,
    {
      expiresIn: "15days",
    },
  );
  res.json({
    message: "User LoggedIn succesfully",
    userObject,
    token,
  });
});
