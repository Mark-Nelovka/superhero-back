import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(
      __dirname,
      "../",
      `public/images/${file.fieldname}`
    );
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
