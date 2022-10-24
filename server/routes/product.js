const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const productContoller = require("../controllers/products");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, productContoller.getPost);

router.post("/createPost", upload.single("file"), productContoller.createPost);

router.put("/likePost/:id", productContoller.likePost);

router.delete("/deletePost/:id", productContoller.deletePost);

module.exports = router;
