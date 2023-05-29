import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
const { CONNECTION_BD } = process.env;
const pool = new Pool({
  connectionString: CONNECTION_BD,
  ssl: true,
});

async function updateHero(req, res) {
  const { id } = req.params;
  const file = req.file;
  const files = req.files;
  const body = JSON.parse(req.body.description);
  if (body.images) {
    delete body.images;
  }
  if (!file && !files) {
    try {
      await pool.query(`
      update superhero set ${Object.entries(body)
        .map(
          ([key, value]) =>
            `${key}=${typeof value === "string" ? `'${value}'` : value}`
        )
        .join(", ")}
      where hero_id='${id}';
    `);
      res.status(200).json({
        code: 200,
        status: "success",
        message: "Hero was update",
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
  if (file) {
    try {
      const hero = await pool.query(
        `select images from superhero where hero_id='${id}'`
      );
      if (hero.rows[0].images) {
        hero.rows[0].images.push(file.originalname);
        const updateHero = await pool.query(`
      update superhero set ${Object.entries(body)
        .map(
          ([key, value]) =>
            `${key}=${typeof value === "string" ? `'${value}'` : value}`
        )
        .join(", ")}, images=ARRAY[${hero.rows[0].images.map(
          (el) => `'${el}'`
        )}]
      where hero_id='${id}';
    `);
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Hero was update",
        });
      } else {
        const updateHero = await pool.query(`
      update superhero set ${Object.entries(body)
        .map(
          ([key, value]) =>
            `${key}=${typeof value === "string" ? `'${value}'` : value}`
        )
        .join(", ")}, images=ARRAY['${file.originalname}']
      where hero_id='${id}';
    `);
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Hero was update",
        });
      }
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
    try {
      const hero = await pool.query(
        `select images from superhero where hero_id='${id}'`
      );

      if (hero.rows[0].images) {
        files.forEach((element) => {
          hero.rows[0].images.push(element.originalname);
        });
        const updateHero = await pool.query(`
        update superhero set ${Object.entries(body)
          .map(
            ([key, value]) =>
              `${key}=${typeof value === "string" ? `'${value}'` : value}`
          )
          .join(", ")}, images=ARRAY[${hero.rows[0].images.map(
          (el) => `'${el}'`
        )}]
        where hero_id='${id}';
      `);
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Hero was update",
        });
      } else {
        const updateHero = await pool.query(`
        update superhero set ${Object.entries(body)
          .map(
            ([key, value]) =>
              `${key}=${typeof value === "string" ? `'${value}'` : value}`
          )
          .join(", ")}, images=ARRAY['${files.map((el) => el.originalname)}']
        where hero_id='${id}';
      `);
        res.status(200).json({
          code: 200,
          status: "success",
          message: "Hero was update",
        });
      }
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

export default updateHero;
