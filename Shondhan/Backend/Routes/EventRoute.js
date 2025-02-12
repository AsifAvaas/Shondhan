const express = require("express");
const router = express.Router();
const Event = require("../Model/EventModel");

// Create Event
router.post("/events/create", async (req, res) => {
  const { eventTitle, eventCreator, eventReport, eventDateTime, eventLocation } = req.body;

  try {
    const newEvent = new Event({
      eventTitle,
      eventCreator,
      eventReport,
      eventDateTime,
      eventLocation
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get My Events
router.get("/myevents/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.find({ eventCreator: userId });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Event
router.delete("/events/delete", async (req, res) => {
  const { userId, eventId } = req.body;

  try {
    const event = await Event.findOneAndDelete({ _id: eventId, eventCreator: userId });

    if (!event) {
      return res.status(404).json({ message: "Event not found or not authorized" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post Impression (Going or Interested)
router.post("/impression/:data", async (req, res) => {
  const { data } = req.params;
  const { eventId, userId } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (data === "going") {
      event.eventGoing += 1;
      event.eventGoerId.push(userId);
    } else if (data === "interested") {
      event.eventInterested += 1;
      event.eventInterestedId.push(userId);
    } else {
      return res.status(400).json({ message: "Invalid impression type" });
    }

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
