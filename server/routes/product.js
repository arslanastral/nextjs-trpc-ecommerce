import { Router } from "express";
const router = Router();
import { single } from "../middleware/multer";
import {
  getPost,
  createPost,
  likePost,
  deletePost,
} from "../controllers/products";
import { ensureAuth, ensureGuest } from "../middleware/auth";

router.get("/:id", ensureAuth, getPost);

router.post("/createPost", single("file"), createPost);

router.put("/likePost/:id", likePost);

router.delete("/deletePost/:id", deletePost);

export default router;
