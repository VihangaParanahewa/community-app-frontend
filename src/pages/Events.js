// src/pages/Events.js
import { useState } from 'react';

const EventCard = ({ event }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow">
    <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
      {/* Event Image Background */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Event Date Badge */}
      <div className="absolute top-4 right-4 bg-white rounded-lg p-2 text-center min-w-[60px]">
        <div className="text-xl font-bold text-blue-600">{event.date.day}</div>
        <div className="text-sm text-gray-600">{event.date.month}</div>
      </div>

      {/* Event Type Badge */}
      <div className="absolute top-4 left-4 bg-white/90 rounded-full px-3 py-1 text-sm">
        {event.type}
      </div>
      
      {/* Event Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-xl font-bold text-white mb-1">{event.title}</h3>
        <p className="text-white/90 text-sm">{event.time}</p>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="flex -space-x-2">
          {event.attendees.slice(0, 3).map((attendee, i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
              {attendee.image ? (
                <img src={attendee.image} alt={attendee.name} className="w-full h-full rounded-full" />
              ) : (
                <span className="text-sm font-medium">{attendee.name[0]}</span>
              )}
            </div>
          ))}
          {event.attendees.length > 3 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
              <span className="text-sm text-gray-600">+{event.attendees.length - 3}</span>
            </div>
          )}
        </div>
        <span className="ml-4 text-sm text-gray-600">
          {event.attendees.length} attending
        </span>
      </div>

      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {event.location}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {event.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Join Event
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Share
        </button>
      </div>
    </div>
  </div>
);

function Events() {
  const [filter, setFilter] = useState('all');
  const [events] = useState([
    {
      id: 1,
      title: "Community Garden Workshop",
      type: "Workshop",
      description: "Learn organic gardening techniques and help maintain our community garden. Perfect for beginners!",
      date: { day: "15", month: "NOV" },
      time: "Saturday, 10:00 AM",
      location: "Central Community Garden",
      attendees: [
        { name: "Sarah Chen", image: null },
        { name: "Mike Johnson", image: null },
        { name: "Emily Davis", image: null },
        { name: "Alex Kim", image: null },
        { name: "Lisa Park", image: null }
      ],
      tags: ["Gardening", "Education", "Community"],
      image: "garden-workshop.jpg"
    },
    {
      id: 2,
      title: "Local Artists Meetup",
      type: "Social",
      description: "Monthly gathering of local artists. Share your work, get feedback, and collaborate on projects.",
      date: { day: "18", month: "NOV" },
      time: "Wednesday, 6:30 PM",
      location: "Creative Space Gallery",
      attendees: [
        { name: "David Lee", image: null },
        { name: "Maria Garcia", image: null },
        { name: "Tom Wilson", image: null },
        { name: "Anna Brown", image: null }
      ],
      tags: ["Art", "Networking", "Creative"],
      image: "artist-meetup.jpg"
    }
    // Add more events...
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Local Events</h1>
          <p className="text-gray-600">Connect with your community in real life</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Create Event
        </button>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {['all', 'workshop', 'social', 'sports', 'education', 'art', 'technology'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Events;