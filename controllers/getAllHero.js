import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const {
  SERVER_USER,
  SERVER_HOST,
  SERVER_DATABASE,
  SERVER_PASSWORD,
  SERVER_PORT,
} = process.env;
const pool = new Pool({
  user: SERVER_USER,
  host: SERVER_HOST,
  database: SERVER_DATABASE,
  password: SERVER_PASSWORD,
  port: SERVER_PORT,
});

async function getAllHero(req, res) {
  const { page } = req.query;
  try {
    const allHerous = await pool.query(
      `select * from superhero order by hero_id limit 5 offset ${
        (+page - 1) * 5
      }`
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Herous was loading",
      data: JSON.stringify(allHerous.rows),
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "error",
      message: "Something went wrong",
      data: {
        error,
      },
    });
  }
}

export default getAllHero;
