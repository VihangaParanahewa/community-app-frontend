// src/pages/Playdates.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlaydateCard = ({ playdate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Parent Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 
              text-white flex items-center justify-center text-xl font-bold">
              {playdate.parent.name[0]}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {playdate.parent.name}'s {playdate.childrenInfo}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{playdate.location}</span>
                <span>•</span>
                <span>{playdate.timePosted}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm
            ${playdate.type === 'regular' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
            {playdate.type === 'regular' ? 'Regular Playdate' : 'One-time'}
          </span>
        </div>

        {/* Schedule */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{playdate.schedule}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{playdate.location}</span>
          </div>
        </div>

        {/* Activities */}
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Activities</h4>
          <div className="flex flex-wrap gap-2">
            {playdate.activities.map((activity, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Age Group</p>
              <p className="font-medium">{playdate.ageGroup}</p>
            </div>
            <div>
              <p className="text-gray-600">Group Size</p>
              <p className="font-medium">{playdate.maxChildren} children max</p>
            </div>
            <div>
              <p className="text-gray-600">Parent Presence</p>
              <p className="font-medium">{playdate.parentPresence}</p>
            </div>
            <div>
              <p className="text-gray-600">Language</p>
              <p className="font-medium">{playdate.language}</p>
            </div>
          </div>
        </div>

        {/* Safety Notes */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-yellow-800 mb-2">Safety Notes</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Vaccination record required</li>
            <li>• Parent background check verified</li>
            <li>• First aid certified parent present</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-700 transition-colors">
            Request to Join
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 
            transition-colors flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const Playdates = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [ageFilter, setAgeFilter] = useState('all');
  const [playdates, setPlaydates] = useState([]);
  const [loading, setLoading] = useState(true);

  const ageGroups = [
    { id: 'all', label: 'All Ages' },
    { id: '0-2', label: '0-2 years' },
    { id: '3-5', label: '3-5 years' },
    { id: '6-8', label: '6-8 years' },
    { id: '9-12', label: '9-12 years' }
  ];

  useEffect(() => {
    const fetchPlaydates = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPlaydates([
        {
          id: 1,
          type: 'regular',
          parent: {
            name: 'Sarah Chen',
            verified: true
          },
          childrenInfo: 'Emma (4) and Jack (6)',
          schedule: 'Every Tuesday & Thursday, 3-5 PM',
          location: 'Central Park Playground',
          activities: ['Outdoor Play', 'Arts & Crafts', 'Reading'],
          ageGroup: '4-6 years',
          maxChildren: 4,
          parentPresence: 'Required',
          language: 'English, Mandarin',
          timePosted: '2h ago'
        },
        // Add more sample playdates...
      ]);
      setLoading(false);
    };

    fetchPlaydates();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Playdates</h1>
        <p className="text-gray-600">Connect with local families and organize playdates</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/playdates/host"
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg 
            hover:from-green-600 hover:to-teal-600 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Host a Playdate</h3>
          <p className="text-green-100">Create a fun and safe environment for children to play and make friends</p>
        </Link>
        <Link
          to="/playdates/find"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg 
            hover:from-blue-600 hover:to-indigo-600 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Find Playdates</h3>
          <p className="text-blue-100">Discover local playdates and connect with other families</p>
        </Link>
      </div>

      {/* Age Group Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
        {ageGroups.map(group => (
          <button
            key={group.id}
            onClick={() => setAgeFilter(group.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
              ${ageFilter === group.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Playdates Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {playdates.map(playdate => (
            <PlaydateCard key={playdate.id} playdate={playdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Playdates;