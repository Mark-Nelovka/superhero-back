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

async function createHero(req, res) {
  const file = req.file;
  const files = req.files;
  const { nickname, real_name, description, superpowers, phrase } = JSON.parse(
    req.body.description
  );
  const query = `
      INSERT INTO superhero (nickname, real_name, description, superpowers, phrase, images)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

  const checkHero = await pool.query(
    `select * from superhero where nickname='${nickname}'`
  );
  if (checkHero.rows.find((el) => el.nickname === nickname)) {
    res.status(409).json({
      code: 409,
      status: "Conflict",
      messgae: "Hero has already exist",
    });
    return;
  }

  if (file) {
    const values = [
      nickname,
      real_name,
      description,
      superpowers,
      phrase,
      [file.originalname],
    ];
    try {
      await pool.query(query, values);
      res.status(201).json({
        code: 201,
        status: "success",
        message: "Hero was creat",
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
  if (files) {
    const file = files.map((el) => el.originalname);
    const values = [
      nickname,
      real_name,
      description,
      superpowers,
      phrase,
      file,
    ];
    try {
      await pool.query(query, values);
      res.status(201).json({
        code: 201,
        status: "successful",
        message: "Hero was creat",
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
  if (!file && !files) {
    const query = `
      INSERT INTO superhero (nickname, real_name, description, superpowers, phrase)
      VALUES ($1, $2, $3, $4, $5);
    `;
    const values = [nickname, real_name, description, superpowers, phrase];
    try {
      await pool.query(query, values);
      res.status(201).json({
        code: 201,
        status: "success",
        message: "Hero was creat",
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
}

export default createHero;
