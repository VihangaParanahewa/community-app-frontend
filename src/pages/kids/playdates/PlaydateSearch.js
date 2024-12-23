// src/pages/playdates/PlaydateSearch.jsx
import React, { useState, navigate } from 'react';
import { motion } from 'framer-motion';
import PlaydateCard from './PlaydateCard';

const PlaydateSearch = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [ageGroup, setAgeGroup] = useState('');
  const [activities, setActivities] = useState([]);

  const ageGroups = [
    { id: 'toddler', label: 'Toddlers', range: '1-3', icon: '🚼', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'preschool', label: 'Preschool', range: '3-5', icon: '🎨', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'elementary', label: 'Elementary', range: '5-12', icon: '🎮', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  ];

  const activityCategories = [
    {
      title: 'Outdoor Fun',
      activities: [
        { id: 'playground', label: 'Playground', icon: '🎪' },
        { id: 'sports', label: 'Sports', icon: '⚽' },
        { id: 'nature', label: 'Nature Walk', icon: '🌿' },
        { id: 'water', label: 'Water Play', icon: '💦' }
      ]
    },
    {
      title: 'Creative Play',
      activities: [
        { id: 'art', label: 'Arts & Crafts', icon: '🎨' },
        { id: 'music', label: 'Music & Dance', icon: '🎵' },
        { id: 'pretend', label: 'Pretend Play', icon: '🎭' },
        { id: 'building', label: 'Building', icon: '🧱' }
      ]
    },
    {
      title: 'Learning',
      activities: [
        { id: 'reading', label: 'Reading', icon: '📚' },
        { id: 'science', label: 'Science', icon: '🔬' },
        { id: 'cooking', label: 'Cooking', icon: '🧁' },
        { id: 'languages', label: 'Languages', icon: '🗣️' }
      ]
    }
  ];

  const playdates = [
    {
        id: 1,
        host: {
          name: 'Sarah & Emma',
          rating: 4.8,
          verified: true,
          image: '/api/placeholder/150/150'
        },
        title: 'Park Playdate & Art Session',
        date: 'Tomorrow',
        time: '3:00 PM - 5:00 PM',
        location: 'Central Park Playground',
        ageGroup: 'preschool',
        activities: ['Playground Time', 'Arts & Crafts'],
        maxKids: 4,
        currentKids: 2,
        description: "Join us for a fun afternoon at the park! We'll start with playground time and then do some art projects.",
        photos: ['/api/placeholder/400/300'],
        languages: ['English', 'Spanish'],
        amenities: ['Restrooms', 'Water Fountain', 'Shade', 'First Aid Kit'],
        coordinates: { lat: 40.785091, lng: -73.968285 }
      },
      {
        id: 2,
        host: {
          name: 'Mike & Jack',
          rating: 4.9,
          verified: true,
          image: '/api/placeholder/150/150'
        },
        title: 'Dinosaur Museum Adventure',
        date: 'Next Saturday',
        time: '10:00 AM - 12:00 PM',
        location: 'Natural History Museum',
        ageGroup: 'elementary',
        activities: ['Museum Tour', 'Science Learning'],
        maxKids: 5,
        currentKids: 3,
        description: "Explore the fascinating world of dinosaurs! We'll tour the museum and do fun learning activities.",
        photos: ['/api/placeholder/400/300'],
        languages: ['English'],
        amenities: ['Indoor Space', 'Cafeteria', 'Gift Shop', 'Learning Materials'],
        coordinates: { lat: 40.781324, lng: -73.973988 }
      },
      {
        id: 3,
        host: {
          name: 'Lisa & Sophie',
          rating: 4.7,
          verified: true,
          image: '/api/placeholder/150/150'
        },
        title: 'Toddler Music & Movement',
        date: 'This Friday',
        time: '9:30 AM - 10:30 AM',
        location: 'Community Center',
        ageGroup: 'toddler',
        activities: ['Music', 'Dancing', 'Singing'],
        maxKids: 6,
        currentKids: 2,
        description: "A fun-filled music session for toddlers! We'll sing, dance, and play with instruments.",
        photos: ['/api/placeholder/400/300'],
        languages: ['English', 'French'],
        amenities: ['Clean Floor Mats', 'Changing Station', 'Instruments Provided'],
        coordinates: { lat: 40.783324, lng: -73.971988 }
      }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fun Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-5xl mr-4">🎈</span>
            Find a Playdate
            <span className="text-5xl ml-4">🎪</span>
          </h1>
          <p className="text-xl text-gray-600">Let's make some new friends!</p>
        </motion.div>

        {/* Search Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Age Group Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <span className="flex items-center">
                  <span className="text-xl mr-2">👶</span>
                  Age Group
                </span>
              </label>
              <div className="space-y-2">
                {ageGroups.map((age) => (
                  <motion.button
                    key={age.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAgeGroup(age.id)}
                    className={`w-full p-3 rounded-xl border-2 transition-all ${
                      ageGroup === age.id
                        ? age.color
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{age.icon}</span>
                      <div className="text-left">
                        <div className="font-medium">{age.label}</div>
                        <div className="text-sm text-gray-500">{age.range} years</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Activities Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                <span className="flex items-center">
                  <span className="text-xl mr-2">🎯</span>
                  Activities
                </span>
              </label>
              <div className="space-y-4">
                {activityCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{category.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {category.activities.map((activity) => (
                        <motion.button
                          key={activity.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setActivities(prev => 
                              prev.includes(activity.id)
                                ? prev.filter(a => a !== activity.id)
                                : [...prev, activity.id]
                            );
                          }}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            activities.includes(activity.id)
                              ? 'border-green-500 bg-green-50 text-green-800'
                              : 'border-gray-200 hover:border-green-200'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-2xl mb-1">{activity.icon}</span>
                            <span className="text-sm font-medium">{activity.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              🗺️ Map View
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              📋 List View
            </button>
          </div>
        </div>

        {/* Results Section */}
        {activeTab === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playdates
            .filter(playdate => 
              (!ageGroup || playdate.ageGroup === ageGroup) &&
              (!activities.length || activities.some(a => 
                playdate.activities.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
              ))
            )
            .map((playdate) => (
              <PlaydateCard 
                key={playdate.id} 
                playdate={playdate}
              />
            ))}
        </div>
      ) : (
        <div className="h-[600px] rounded-2xl overflow-hidden shadow-lg">
          {/* Map View */}
          <div className="w-full h-full bg-gray-100 relative">
            {/* Add your map component here */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">
                {playdates.length} playdates found
              </h3>
              <div className="space-y-2">
                {playdates
                  .filter(playdate => 
                    (!ageGroup || playdate.ageGroup === ageGroup) &&
                    (!activities.length || activities.some(a => 
                      playdate.activities.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
                    ))
                  )
                  .map(playdate => (
                    <div 
                      key={playdate.id}
                      className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        // Handle map marker click
                      }}
                    >
                      <div className="font-medium text-sm">{playdate.title}</div>
                      <div className="text-xs text-gray-500">{playdate.date} • {playdate.time}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    {/* No Results Message */}
    {playdates.filter(playdate => 
        (!ageGroup || playdate.ageGroup === ageGroup) &&
        (!activities.length || activities.some(a => 
          playdate.activities.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
        ))
      ).length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No playdates found</h3>
          <p className="text-gray-600">Try adjusting your filters or create your own playdate!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/playdates/host')}
          >
            Host a Playdate
          </motion.button>
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default PlaydateSearch;