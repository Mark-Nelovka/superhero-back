import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { CONNECTION_BD } = process.env;
const pool = new Pool({
  connectionString: CONNECTION_BD,
  ssl: true,
});

async function deleteHero(req, res) {
  const { id } = req.params;
  try {
    await pool.query(`delete from superhero where hero_id='${id}'`);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Hero was delete",
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

export default deleteHero;
