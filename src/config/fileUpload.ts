import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
