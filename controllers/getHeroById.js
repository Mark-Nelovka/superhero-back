import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { CONNECTION_BD } = process.env;
const pool = new Pool({
  connectionString: CONNECTION_BD,
  ssl: true,
});

async function getHeroById(req, res) {
  const { id } = req.params;
  try {
    const singleHero = await pool.query(
      `select * from superhero where hero_id='${id}'`
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Hero was loading",
      data: JSON.stringify(singleHero.rows),
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

export default getHeroById;
