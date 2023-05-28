import express from "express";
import upload from "../middlewares/upload.js";
import createHero from "../controllers/createHero.js";
import updateHero from "../controllers/updateHero.js";
import deleteHero from "../controllers/deleteHero.js";
import getAllHero from "../controllers/getAllHero.js";
import getHeroById from "../controllers/getHeroById.js";

const router = express.Router();

router.get("/", getAllHero);
router.get("/:id", getHeroById);
router.post("/create/item", upload.single("hero"), createHero);
router.post("/create/list", upload.array("hero"), createHero);
router.delete("/delete/:id", deleteHero);
router.patch("/update/item/:id", upload.single("hero"), updateHero);
router.patch("/update/list/:id", upload.array("hero"), updateHero);

export default router;
