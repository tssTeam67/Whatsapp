const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  filename: String,
  contentType: String,
  size: Number,
  muid:{
    type:String
  },
  uploadDate: { type: Date, default: Date.now },
  data: Buffer,
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
