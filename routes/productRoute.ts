import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productControllers";
import upload from "../middleware/multer";
import adminAuth from "../middleware/adminAuth";

const router = express.Router();

router.post("/add", upload.single("image"), adminAuth, addProduct);
router.get("/list", listProduct);
router.delete("/remove/:id", adminAuth, removeProduct);
router.get("/:id", singleProduct);

export default router;
