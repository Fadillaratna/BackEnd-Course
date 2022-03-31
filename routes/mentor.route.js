'use strictt'

const express = require("express")
const mentorController = require("../controllers/mentor.controller")
const router = new express.Router()

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./image/mentor");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({
  storage: storage,
});


router.get("/", mentorController.getAll)
router.get("/:id", mentorController.getId)
router.post("/", upload.single("image"), mentorController.add)
router.put("/:id", upload.single("image"),mentorController.update)
router.delete("/:id", mentorController.delete)

module.exports = router;