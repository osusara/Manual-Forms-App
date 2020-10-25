const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  form : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "forms",
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PDFFile = mongoose.model("file", FileSchema);
