// src/components/playdates/PlaydateCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlaydateCard = ({ playdate }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const spotRemaining = playdate.maxKids - playdate.currentKids;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Image Section with Status Badge */}
      <div className="relative h-48">
        <img 
          src={playdate.photos[0]} 
          alt={playdate.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium shadow-lg"
          >
            {spotRemaining} spots left
          </motion.div>
        </div>
        
        {/* Bookmark Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          {isBookmarked ? '⭐' : '☆'}
        </motion.button>

        {/* Age Group Badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 text-sm font-medium shadow-lg">
          {playdate.ageGroup === 'toddler' ? '🚼 1-3 years' :
           playdate.ageGroup === 'preschool' ? '🎨 3-5 years' :
           '🎮 5-12 years'}
        </div>
      </div>

      {/* Basic Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{playdate.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>📅 {playdate.date}</span>
              <span>•</span>
              <span>⏰ {playdate.time}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowDetails(!showDetails)}
            className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"
          >
            {showDetails ? '↑' : '↓'}
          </motion.button>
        </div>

        {/* Host Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
            {playdate.host.image ? (
              <img src={playdate.host.image} alt={playdate.host.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-medium text-gray-900">{playdate.host.name}</h4>
              {playdate.host.verified && (
                <span className="ml-2 text-blue-500" title="Verified Host">✓</span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-yellow-400">⭐</span>
              <span className="ml-1">{playdate.host.rating}</span>
            </div>
          </div>
        </div>

        {/* Activities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {playdate.activities.map((activity, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium"
            >
              {activity}
            </motion.span>
          ))}
        </div>

        {/* Expanded Details */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t">
                {/* Description */}
                <p className="text-gray-600 mb-4">{playdate.description}</p>

                {/* Amenities */}
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Available Amenities</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {playdate.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>✓</span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Languages Spoken</h5>
                  <div className="flex flex-wrap gap-2">
                    {playdate.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location Map Preview */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  {/* Add map component here */}
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    Map Preview
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setShowContactInfo(true)}
                  >
                    Join Playdate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Message Host
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Contact Info Modal */}
      <AnimatePresence>
        {showContactInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowContactInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Join This Playdate</h3>
              <p className="text-gray-600 mb-6">
                Great choice! Here's what happens next:
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    1
                  </div>
                  <p className="text-gray-700">We'll notify the host of your interest</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    2
                  </div>
                  <p className="text-gray-700">The host will review your profile</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    3
                  </div>
                  <p className="text-gray-700">If approved, you'll receive the exact location</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() => {
                    // Handle join playdate
                    setShowContactInfo(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowContactInfo(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlaydateCard;