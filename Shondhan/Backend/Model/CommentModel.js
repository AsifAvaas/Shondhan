const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    commenterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    commentBody: { type: String, required: true },
    commentPic: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
