import multer, { diskStorage } from "multer";

const storage = diskStorage({});

const upload = multer({
  storage,
});

export default upload;
