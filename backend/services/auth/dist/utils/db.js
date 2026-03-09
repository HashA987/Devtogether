import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();
// export const db = new Sequelize(
//   "postgres://hashmat:test@localhost:5433/devtogather",
// );
export const sql = neon(process.env.DB_URL);
