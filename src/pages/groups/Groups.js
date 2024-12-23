// src/pages/Groups.js
import { useState } from 'react';

function Groups() {
  const [groups] = useState([
    {
      id: 1,
      name: "Local Gardeners Club",
      description: "A community of garden enthusiasts sharing tips and organizing meetups",
      members: 45,
      location: "Central Park Area",
      tags: ["Gardening", "Sustainability"],
      nextMeeting: "Saturday, 2pm",
      image: "garden-club.jpg"
    },
    {
      id: 2,
      name: "Tech Skills Exchange",
      description: "Weekly meetups to learn and teach different programming languages",
      members: 32,
      location: "Downtown Library",
      tags: ["Programming", "Education"],
      nextMeeting: "Wednesday, 6pm",
      image: "tech-meetup.jpg"
    },
    // Add more groups...
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Community Groups</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Create Group
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Group image would go here */}
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{group.name}</h3>
              <p className="text-gray-600 mb-4">{group.description}</p>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {group.location}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {group.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{group.members} members</span>
                <span className="text-blue-600">Next: {group.nextMeeting}</span>
              </div>

              <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Join Group
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;