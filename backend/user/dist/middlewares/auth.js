import jwt from "jsonwebtoken";
import { sql } from "../utils/db.js";
// checking authentication
export const isAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            res.status(401).json({
                message: "Authorization header is missing or invalid",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "No JWT token provided",
            });
            return;
        }
        const decodedPayload = jwt.verify(token, process.env.JWT_SEC);
        if (!decodedPayload || !decodedPayload.id) {
            res.status(401).json({
                message: "invalid token",
            });
            return;
        }
        const users = await sql `SELECT u.user_id,u.name,u.email,u.phone_number,u.role,u.resume,u.resume_public_id,
      u.profile_pic,u.profile_pic_public_id,
      ARRAY_AGG(s.name) FILTER (WHERE s.name IS NOT NULL) as skills
      FROM users u LEFT JOIN user_skills us ON u.user_id = us.user_id
      LEFT JOIN skills s ON us.skill_id = s.skill_id
      WHERE u.user_id = ${decodedPayload.id}
      GROUP BY u.user_id`;
        if (users.length === 0) {
            res.status(401).json({
                message: "user is not existed with this token",
            });
            return;
        }
        const user = users[0];
        user.skills = user.skills || [];
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Authtincatoon failed, please login again",
        });
    }
};
