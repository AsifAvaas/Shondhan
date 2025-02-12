const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventReport: { type: mongoose.Schema.Types.ObjectId, ref: "Report" },
    eventDateTime: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    eventGoing: { type: Number, default: 0 },
    eventGoerId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    eventInterested: { type: Number, default: 0 },
    eventInterestedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
