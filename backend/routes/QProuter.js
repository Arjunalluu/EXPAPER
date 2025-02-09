import express from "express";
import multer from "multer";
import { uploadQuestionPaper, downloadQuestionPaper } from "../controllers/uploadcontroller.js";

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading a question paper
router.post("/upload", upload.single("file"), uploadQuestionPaper);

// Route for downloading a question paper by its metadata ID
router.get("/download", downloadQuestionPaper);

export default router;
