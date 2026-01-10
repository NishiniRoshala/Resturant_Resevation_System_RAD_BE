import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: function(req, file, cllback) {
        cllback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;