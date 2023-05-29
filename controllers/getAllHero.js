import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { CONNECTION_BD } = process.env;
const pool = new Pool({
  connectionString: CONNECTION_BD,
  ssl: true,
});

async function getAllHero(req, res) {
  const { page } = req.query;
  try {
    const allHerous = await pool.query(
      `select * from superhero order by hero_id desc limit 5 offset ${
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
    console.log(error);
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
