'use strictt'

const express = require("express")
const adminController = require("../controllers/admin.controller")
const router = new express.Router()

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/admin");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({
  storage: storage,
});


router.get("/", adminController.getAll)
router.get("/:id", adminController.getId)
router.post("/", upload.single("image"), adminController.add)
router.put("/:id", upload.single("image"),adminController.update)
router.post("/login", adminController.login)
router.delete("/:id", adminController.delete)

module.exports = router;