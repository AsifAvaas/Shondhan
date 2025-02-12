import React, { useState } from 'react';

const EventCard = ({ event }) => {
  const [goingCount, setGoingCount] = useState(event.eventGoing);
  const [interestedCount, setInterestedCount] = useState(event.eventInterested);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="px-4 py-2">
        <div className="font-bold text-xl mb-2">{event.eventTitle}</div>
        <p className="text-gray-700 text-base">
          <strong>Location:</strong> {event.eventLocation}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Date & Time:</strong> {new Date(event.eventDateTime).toLocaleString()}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Going:</strong> {goingCount}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Interested:</strong> {interestedCount}
        </p>
      </div>
      <div className="px-4 py-2 flex justify-between">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => setGoingCount(goingCount + 1)}
        >
          Going
        </button>
        <button
          className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          onClick={() => setInterestedCount(interestedCount + 1)}
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default EventCard;