const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    reportTitle: { type: String, required: true },
    reportPic: { type: String },
    reportVideo: { type: String },
    reportDescription: { type: String, required: true },
    reportDivision: { type: String, required: true },
    reportDistrict: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likeCount: { type: Number, default: 0 },
    dislikeCount: { type: Number, default: 0 },
    likers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    crimeTime: { type: Date, required: true },
    interactionCount: { type: Number, default: 0 },
    isReportApproved: { type: Boolean, default: false },
    isReportDeleted: { type: Boolean, default: false },
    reportPoint: { type: Number, default: 0 },
    reportVarified: {type: Boolean, default:false}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
