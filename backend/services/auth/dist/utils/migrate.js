import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();
const sql = neon(process.env.DB_URL);
async function migrate() {
    try {
        // Check if columns exist, if not add them
        await sql `
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS resume TEXT,
      ADD COLUMN IF NOT EXISTS resume_public_id TEXT;
    `;
        console.log("Migration completed successfully!");
    }
    catch (error) {
        console.error("Migration failed:", error.message);
        process.exit(1);
    }
}
migrate();
