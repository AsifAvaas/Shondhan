import React, { useEffect, useState } from 'react';
import EventCard from '../Components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data to replace the fetching section
    const mockEvents = [
      {
        _id: '1',
        eventTitle: 'Tech Conference 2023',
        eventLocation: 'San Francisco, CA',
        eventDateTime: '2023-12-15T09:00:00Z',
        eventGoing: 120,
        eventInterested: 200,
      },
      {
        _id: '2',
        eventTitle: 'Music Festival',
        eventLocation: 'Austin, TX',
        eventDateTime: '2023-11-20T18:00:00Z',
        eventGoing: 500,
        eventInterested: 800,
      },
      {
        _id: '3',
        eventTitle: 'Startup Pitch Night',
        eventLocation: 'New York, NY',
        eventDateTime: '2023-10-30T19:00:00Z',
        eventGoing: 80,
        eventInterested: 150,
      },
      {
        _id: '4',
        eventTitle: 'Art Exhibition',
        eventLocation: 'Paris, France',
        eventDateTime: '2023-12-01T10:00:00Z',
        eventGoing: 300,
        eventInterested: 450,
      },
      {
        _id: '5',
        eventTitle: 'Art Exhibition',
        eventLocation: 'Paris, France',
        eventDateTime: '2023-12-01T10:00:00Z',
        eventGoing: 300,
        eventInterested: 450,
      },
      {
        _id: '6',
        eventTitle: 'Art Exhibition',
        eventLocation: 'Paris, France',
        eventDateTime: '2023-12-01T10:00:00Z',
        eventGoing: 300,
        eventInterested: 450,
      },
      {
        _id: '7',
        eventTitle: 'Art Exhibition',
        eventLocation: 'Paris, France',
        eventDateTime: '2023-12-01T10:00:00Z',
        eventGoing: 300,
        eventInterested: 450,
      },
      {
        _id: '8',
        eventTitle: 'Art Exhibition',
        eventLocation: 'Paris, France',
        eventDateTime: '2023-12-01T10:00:00Z',
        eventGoing: 300,
        eventInterested: 450,
      },
    ];

    // Simulate a delay to mimic network request
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000); // 1-second delay
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Upcoming Events</h1>
      <p className="text-xl text-gray-600 text-center mb-6">Events bring communities together, fostering engagement and positivity. Active community participation has been shown to reduce crime rates by creating safer environments and stronger social ties.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;