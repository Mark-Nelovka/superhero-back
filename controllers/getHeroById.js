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

async function getHeroById(req, res) {
  const { id } = req.params;
  console.log("HEROID: ", id);
  // try {
  //   const singleHero = await pool.query(
  //     `select * from superhero where hero_id='${id}'`
  //   );
  //   res.status(200).json({
  //     code: 200,
  //     status: "success",
  //     message: "Hero was loading",
  //     data: JSON.stringify(singleHero.rows),
  //   });
  // } catch (error) {
  //   res.status(500).json({
  //     code: 500,
  //     status: "error",
  //     message: "Something went wrong",
  //     data: {
  //       error,
  //     },
  //   });
  // }
}

export default getHeroById;
