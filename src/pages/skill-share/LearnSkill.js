// src/pages/skills/LearnSkill.jsx
import React, { useState } from 'react';

const LearnSkill = () => {
  const [formData, setFormData] = useState({
    interests: [],
    learningGoals: [],
    preferredLearningStyle: 'structured',
    timeCommitment: {
      hoursPerWeek: 2,
      duration: '1-month',
      frequency: 'weekly'
    },
    schedule: {
      days: [],
      timeSlots: [],
      flexible: false
    },
    preferences: {
      groupSize: 'any',
      teachingStyle: 'any',
      location: 'any',
      maxBudget: 0,
      ageGroup: ''
    }
  });

  const categories = [
    { id: 'tech', name: 'Technology', icon: '💻', subcategories: ['Programming', 'Web Development', 'Data Science'] },
    { id: 'arts', name: 'Arts & Crafts', icon: '🎨', subcategories: ['Painting', 'Drawing', 'Pottery'] },
    { id: 'music', name: 'Music', icon: '🎵', subcategories: ['Guitar', 'Piano', 'Singing'] },
    { id: 'language', name: 'Languages', icon: '🗣️', subcategories: ['Spanish', 'Mandarin', 'French'] },
    { id: 'cooking', name: 'Cooking', icon: '🍳', subcategories: ['Baking', 'International Cuisine', 'Meal Prep'] },
    { id: 'fitness', name: 'Fitness', icon: '💪', subcategories: ['Yoga', 'HIIT', 'Dance'] }
  ];

  const learningStyles = [
    {
      id: 'structured',
      title: 'Structured Learning',
      description: 'Following a defined curriculum with clear milestones',
      icon: '📚'
    },
    {
      id: 'project-based',
      title: 'Project-Based',
      description: 'Learning through hands-on projects and real applications',
      icon: '🛠️'
    },
    {
      id: 'flexible',
      title: 'Flexible Learning',
      description: 'Adapting the learning path based on your progress and interests',
      icon: '🎯'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">What would you like to learn?</h1>
        <p className="text-gray-600">Connect with skilled neighbors and start your learning journey</p>
      </div>

      {/* Interest Selection */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose Your Interests</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category.id} className="relative group">
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    interests: prev.interests.includes(category.id)
                      ? prev.interests.filter(i => i !== category.id)
                      : [...prev.interests, category.id]
                  }));
                }}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all
                  ${formData.interests.includes(category.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'}`}
              >
                <div className="flex items-start">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {category.subcategories.join(' • ')}
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What are your learning goals?</h2>
        
        <div className="space-y-4">
          {/* Goal Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="e.g., Learn to play basic guitar chords"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    learningGoals: [...prev.learningGoals, e.target.value.trim()]
                  }));
                  e.target.value = '';
                }
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (input.value.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    learningGoals: [...prev.learningGoals, input.value.trim()]
                  }));
                  input.value = '';
                }
              }}
            >
              Add Goal
            </button>
          </div>

          {/* Goals List */}
          <div className="space-y-2">
            {formData.learningGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <span className="text-gray-700">{goal}</span>
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      learningGoals: prev.learningGoals.filter((_, i) => i !== index)
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Style */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How do you prefer to learn?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningStyles.map(style => (
            <button
              key={style.id}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  preferredLearningStyle: style.id
                }));
              }}
              className={`p-4 rounded-lg border-2 text-left transition-all
                ${formData.preferredLearningStyle === style.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'}`}
            >
              <div className="text-2xl mb-2">{style.icon}</div>
              <div className="font-medium text-gray-900 mb-1">{style.title}</div>
              <div className="text-sm text-gray-500">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Schedule & Availability */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule & Availability</h2>
        
        {/* Time Commitment */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Time Commitment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Hours per week
              </label>
              <select
                value={formData.timeCommitment.hoursPerWeek}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    timeCommitment: {
                      ...prev.timeCommitment,
                      hoursPerWeek: parseInt(e.target.value)
                    }
                  }));
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map(hours => (
                  <option key={hours} value={hours}>{hours} hours</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Duration
              </label>
              <select
                value={formData.timeCommitment.duration}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    timeCommitment: {
                      ...prev.timeCommitment,
                      duration: e.target.value
                    }
                  }));
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="1-month">1 month</option>
                <option value="3-months">3 months</option>
                <option value="6-months">6 months</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Frequency
              </label>
              <select
                value={formData.timeCommitment.frequency}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    timeCommitment: {
                      ...prev.timeCommitment,
                      frequency: e.target.value
                    }
                  }));
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        {/* Days & Times */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Preferred Days & Times</h3>
          <div className="space-y-4">
            {/* Days Selection */}
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <button
                  key={day}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      schedule: {
                        ...prev.schedule,
                        days: prev.schedule.days.includes(day)
                          ? prev.schedule.days.filter(d => d !== day)
                          : [...prev.schedule.days, day]
                      }
                    }));
                  }}
                  className={`p-2 text-center rounded-lg
                    ${formData.schedule.days.includes(day)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'morning', label: 'Morning', time: '8AM-12PM', icon: '🌅' },
                { id: 'afternoon', label: 'Afternoon', time: '12PM-4PM', icon: '☀️' },
                { id: 'evening', label: 'Evening', time: '4PM-8PM', icon: '🌆' },
                { id: 'night', label: 'Night', time: '8PM-11PM', icon: '🌙' }
              ].map(slot => (
                <button
                  key={slot.id}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      schedule: {
                        ...prev.schedule,
                        timeSlots: prev.schedule.timeSlots.includes(slot.id)
                          ? prev.schedule.timeSlots.filter(s => s !== slot.id)
                          : [...prev.schedule.timeSlots, slot.id]
                      }
                    }));
                  }}
                  className={`p-3 rounded-lg border-2 text-sm font-medium
                    ${formData.schedule.timeSlots.includes(slot.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg mb-1">{slot.icon}</span>
                    <span>{slot.label}</span>
                    <span className="text-xs text-gray-500">{slot.time}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Flexibility Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="flexible-schedule"
                checked={formData.schedule.flexible}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    schedule: {
                      ...prev.schedule,
                      flexible: e.target.checked
                    }
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="flexible-schedule" className="text-sm text-gray-600">
                I'm flexible with my schedule
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Preferences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Group Size */}
          {/* Group Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Group Size
            </label>
            <select
              value={formData.preferences.groupSize}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    groupSize: e.target.value
                  }
                }));
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">No Preference</option>
              <option value="1-on-1">One-on-One</option>
              <option value="small">Small Group (2-4)</option>
              <option value="medium">Medium Group (5-8)</option>
              <option value="large">Large Group (8+)</option>
            </select>
          </div>

          {/* Teaching Style */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teaching Style
            </label>
            <select
              value={formData.preferences.teachingStyle}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    teachingStyle: e.target.value
                  }
                }));
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">No Preference</option>
              <option value="structured">Structured & Traditional</option>
              <option value="hands-on">Hands-on & Practical</option>
              <option value="discussion">Discussion-based</option>
              <option value="self-paced">Self-paced with Guidance</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Location
            </label>
            <select
              value={formData.preferences.location}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    location: e.target.value
                  }
                }));
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">No Preference</option>
              <option value="in-person">In-person Only</option>
              <option value="online">Online Only</option>
              <option value="hybrid">Hybrid (Mix of Both)</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Budget (per hour)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500">$</span>
              <input
                type="number"
                min="0"
                step="5"
                value={formData.preferences.maxBudget}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      maxBudget: parseInt(e.target.value)
                    }
                  }));
                }}
                className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave as 0 if you're only interested in free learning opportunities</p>
          </div>

          {/* Age Group */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Age Group
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: 'child', label: 'Child (5-12)', icon: '👶' },
                { id: 'teen', label: 'Teen (13-17)', icon: '👦' },
                { id: 'adult', label: 'Adult (18+)', icon: '👨' },
                { id: 'senior', label: 'Senior (65+)', icon: '👴' }
              ].map(age => (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        ageGroup: age.id
                      }
                    }));
                  }}
                  className={`p-3 rounded-lg border-2 text-center
                    ${formData.preferences.ageGroup === age.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'}`}
                >
                  <div className="text-2xl mb-1">{age.icon}</div>
                  <div className="text-sm font-medium">{age.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            // Handle form submission
            console.log('Form submitted:', formData);
          }}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Find Learning Opportunities
        </button>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips for Finding the Right Match</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">🎯</span>
            <div>
              <p className="text-blue-900 font-medium">Be Specific</p>
              <p className="text-blue-800 text-sm">Clear goals help find the right teacher</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">⏰</span>
            <div>
              <p className="text-blue-900 font-medium">Consider Your Schedule</p>
              <p className="text-blue-800 text-sm">Regular practice leads to better results</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">💡</span>
            <div>
              <p className="text-blue-900 font-medium">Know Your Style</p>
              <p className="text-blue-800 text-sm">Different teaching styles work for different people</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-blue-500">🤝</span>
            <div>
              <p className="text-blue-900 font-medium">Stay Flexible</p>
              <p className="text-blue-800 text-sm">Being open to different approaches can lead to better matches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSkill;