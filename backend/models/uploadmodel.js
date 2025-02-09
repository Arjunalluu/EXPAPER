import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema({
  University: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  // Field to store the GridFS file ID (this is the _id from GridFS files collection)
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // Optional: store the original file name
  fileName: {
    type: String,
    required: true,
  },
  // Optional: store the file's content type (e.g., application/pdf)
  contentType: {
    type: String,
    default: "application/pdf",
  },
});

export default mongoose.model("QuestionPaper", QuestionPaperSchema);
