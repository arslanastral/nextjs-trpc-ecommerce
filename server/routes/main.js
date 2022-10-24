import { Router } from "express";
import { ensureAuth } from "../middleware/auth";
const router = Router();

//Main Routes - simplified for now
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

export default router;
