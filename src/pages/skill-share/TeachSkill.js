// src/pages/skills/TeachSkill.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Circle, Marker, LoadScript } from '@react-google-maps/api';


const TeachSkill = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  
// At the beginning of the TeachSkill component, update the initial state:
const [formData, setFormData] = useState({
    // Basic Details
    title: '',
    category: '',
    description: '',
    experienceLevel: 3,
    tags: [],
    learningOutcomes: [],
    prerequisites: [],
  
    // Schedule & Location
    availability: {
      days: [],             // Initialize as empty array
      timeSlots: [],        // Initialize as empty array
      duration: '1',
      frequency: 'weekly',
      startDate: '',
      flexible: false
    },
  
    // Location
    location: {
      type: 'both',
      inPerson: '',
      virtual: true,
      preferredPlatform: '',
      maxDistance: 5
    },
  
    // Teaching Preferences
    preferences: {
      groupSize: {
        min: 1,
        max: 4,
        preferred: 'small'
      },
      studentLevel: ['beginner'],
      ageGroups: [],
      commitment: 'flexible',
      sessionStyle: 'structured'
    },
  
    // Materials
    materials: {
      required: [],
      provided: []
    },
  
    // Pricing
    pricing: {
      type: 'free',
      amount: 0,
      currency: 'USD',
      perSession: true
    }
  });

  // Configuration Objects
  const categories = [
    { id: 'tech', name: 'Technology', icon: '💻', color: 'blue' },
    { id: 'arts', name: 'Arts & Crafts', icon: '🎨', color: 'pink' },
    { id: 'language', name: 'Languages', icon: '🗣️', color: 'green' },
    { id: 'music', name: 'Music', icon: '🎵', color: 'purple' },
    { id: 'cooking', name: 'Cooking', icon: '🍳', color: 'yellow' },
    { id: 'fitness', name: 'Fitness', icon: '💪', color: 'red' },
    { id: 'academic', name: 'Academic', icon: '📚', color: 'indigo' },
    { id: 'business', name: 'Business', icon: '💼', color: 'gray' },
    { id: 'lifestyle', name: 'Lifestyle', icon: '🌱', color: 'green' }
  ];

  const weekDays = [
    { id: 'mon', label: 'Monday' },
    { id: 'tue', label: 'Tuesday' },
    { id: 'wed', label: 'Wednesday' },
    { id: 'thu', label: 'Thursday' },
    { id: 'fri', label: 'Friday' },
    { id: 'sat', label: 'Saturday' },
    { id: 'sun', label: 'Sunday' }
  ];

  const timeSlots = [
    { id: 'morning', label: 'Morning (8AM-12PM)', icon: '🌅' },
    { id: 'afternoon', label: 'Afternoon (12PM-4PM)', icon: '☀️' },
    { id: 'evening', label: 'Evening (4PM-8PM)', icon: '🌆' },
    { id: 'night', label: 'Night (8PM-11PM)', icon: '🌙' }
  ];

  const ageGroups = [
    { id: 'children', label: 'Children (5-12)', icon: '👶' },
    { id: 'teens', label: 'Teenagers (13-17)', icon: '🧑‍🦱' },
    { id: 'adults', label: 'Adults (18+)', icon: '👨‍👩‍👧‍👦' },
    { id: 'seniors', label: 'Seniors (65+)', icon: '👴' }
  ];

  // Helper Functions
  const handleInputChange = (section, field, value) => {
    if (!field) {
      // Direct update of top-level field
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    } else if (typeof field === 'string') {
      // Update nested field
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const handleListAdd = (section, field, value) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], value.trim()]
    }));
  };
  // For category selection in step 1:
const handleCategorySelect = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      category: categoryId
    }));
  };

  // For days selection
const handleDaySelection = (dayId) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(dayId)
          ? prev.availability.days.filter(d => d !== dayId)
          : [...prev.availability.days, dayId]
      }
    }));
  };
  
  // For time slots selection
const handleTimeSlotSelection = (slotId) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        timeSlots: prev.availability.timeSlots.includes(slotId)
          ? prev.availability.timeSlots.filter(s => s !== slotId)
          : [...prev.availability.timeSlots, slotId]
      }
    }));
  };

  const handleListRemove = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        return formData.title && formData.category && formData.description;
      case 2:
        return formData.availability.days.length > 0 && formData.availability.timeSlots.length > 0;
      case 3:
        return true; // All fields in step 3 are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your backend
      console.log('Submitting skill:', formData);
      
      // Show success message
      alert('Your skill has been successfully posted!');
      
      // Navigate to the skill detail page or dashboard
      navigate('/skill-share');
    } catch (error) {
      console.error('Error posting skill:', error);
      alert('Failed to post skill. Please try again.');
    }
  };

  useEffect(() => {
    console.log('Current formData:', formData); // For debugging
  }, [formData]);
  // Add error handling to state updates:
const handleStateUpdate = (updateFn) => {
    try {
      updateFn();
    } catch (error) {
      console.error('Error updating state:', error);
      // Optionally show user feedback
    }
  };

  // Step 1: Basic Details Form
  const renderStepOne = () => (
    <div className="space-y-8">
      {/* Category Selection */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">What would you like to teach?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map(category => (
  <button
    key={category.id}
    onClick={() => handleCategorySelect(category.id)}
    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md
      ${formData.category === category.id 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-blue-200'}`}
  >
    <div className="text-3xl mb-2">{category.icon}</div>
    <div className="text-sm font-medium text-gray-900">{category.name}</div>
  </button>
))}
        </div>
      </div>

      {/* Basic Details */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Tell us about your skill</h2>
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="e.g., Beginner JavaScript Programming"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => handleInputChange('title', null, e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Describe what you'll teach and your teaching approach..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => handleInputChange('description', null, e.target.value)}
            />
          </div>

          {/* Learning Outcomes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What will students learn?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add learning outcome"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleListAdd('learningOutcomes', null, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={(e) => {
                  const input = e.target.previousSibling;
                  handleListAdd('learningOutcomes', null, input.value);
                  input.value = '';
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{outcome}</span>
                  <button
                    type="button"
                    onClick={() => handleListRemove('learningOutcomes', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prerequisites (if any)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add prerequisite"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleListAdd('prerequisites', null, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={(e) => {
                  const input = e.target.previousSibling;
                  handleListAdd('prerequisites', null, input.value);
                  input.value = '';
                }}
              >
                Add
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {formData.prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700">{prereq}</span>
                  <button
                    type="button"
                    onClick={() => handleListRemove('prerequisites', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

// Continue with Part 2...
// Map Configuration
const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const [center, setCenter] = useState({
    lat: 40.7128,
    lng: -74.0060
  });

  const [radius, setRadius] = useState(5000); // 5km default radius

  const circleOptions = {
    strokeColor: '#2563EB',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#3B82F6',
    fillOpacity: 0.2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log('Error getting location');
        }
      );
    }
  }, []);

  // Step 2: Schedule & Location
  const renderStepTwo = () => (
    <div className="space-y-8">
      {/* Schedule Selection */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">When are you available to teach?</h2>
        
        {/* Frequency Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How often would you like to teach?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['weekly', 'biweekly', 'monthly'].map((freq) => (
              <button
                key={freq}
                type="button"
                onClick={() => handleInputChange('availability', 'frequency', freq)}
                className={`p-3 border-2 rounded-lg text-sm font-medium
                  ${formData.availability.frequency === freq
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Days Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Available Days
          </label>
          <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
  <button
    key={day.id}
    type="button"
    onClick={() => handleDaySelection(day.id)}
    className={`p-2 text-center rounded-lg transition-colors
      ${formData.availability.days.includes(day.id)
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
  >
    {day.label.slice(0, 3)}
  </button>
))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time Slots
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
  <button
    key={slot.id}
    type="button"
    onClick={() => handleTimeSlotSelection(slot.id)}
    className={`p-3 rounded-lg border-2 text-sm font-medium flex items-center justify-center space-x-2
      ${formData.availability.timeSlots.includes(slot.id)
        ? 'border-blue-500 bg-blue-50 text-blue-700'
        : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
  >
    <span>{slot.icon}</span>
    <span>{slot.label}</span>
  </button>
))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Duration
          </label>
          <select
            value={formData.availability.duration}
            onChange={(e) => handleInputChange('availability', 'duration', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="0.5">30 minutes</option>
            <option value="1">1 hour</option>
            <option value="1.5">1.5 hours</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
          </select>
        </div>
      </div>

      {/* Location Preferences */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Where would you like to teach?</h2>
        
        {/* Teaching Format */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teaching Format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['in-person', 'virtual', 'both'].map((format) => (
              <button
                key={format}
                type="button"
                onClick={() => handleInputChange('location', 'type', format)}
                className={`p-3 border-2 rounded-lg text-sm font-medium
                  ${formData.location.type === format
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
              >
                {format === 'in-person' ? 'In Person' : 
                 format === 'virtual' ? 'Virtual' : 'Both'}
              </button>
            ))}
          </div>
        </div>

        {/* Location Map */}
        {(formData.location.type === 'in-person' || formData.location.type === 'both') && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teaching Area Range
            </label>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                >
                  <Marker position={center} />
                  <Circle
                    center={center}
                    radius={radius}
                    options={circleOptions}
                  />
                </GoogleMap>
              </LoadScript>
            </div>
            <div className="mt-4">
              <label className="block text-sm text-gray-600 mb-2">
                Maximum travel distance: {radius/1000}km
              </label>
              <input
                type="range"
                min="1000"
                max="20000"
                step="1000"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Virtual Platform */}
        {(formData.location.type === 'virtual' || formData.location.type === 'both') && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Virtual Platform
            </label>
            <select
              value={formData.location.preferredPlatform}
              onChange={(e) => handleInputChange('location', 'preferredPlatform', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a platform</option>
              <option value="zoom">Zoom</option>
              <option value="meet">Google Meet</option>
              <option value="teams">Microsoft Teams</option>
              <option value="skype">Skype</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );

  // Step 3: Teaching Preferences
  const renderStepThree = () => (
    <div className="space-y-8">
      {/* Group Size */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Preferences</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Group Size
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-600">Minimum</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.preferences.groupSize.min}
                onChange={(e) => handleInputChange('preferences', 'groupSize', {
                  ...formData.preferences.groupSize,
                  min: Number(e.target.value)
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Maximum</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.preferences.groupSize.max}
                onChange={(e) => handleInputChange('preferences', 'groupSize', {
                  ...formData.preferences.groupSize,
                  max: Number(e.target.value)
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Ideal</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formData.preferences.groupSize.preferred}
                onChange={(e) => handleInputChange('preferences', 'groupSize', {
                  ...formData.preferences.groupSize,
                  preferred: Number(e.target.value)
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Age Groups */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Age Groups
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ageGroups.map((age) => (
              <button
                key={age.id}
                type="button"
                onClick={() => {
                  const newAges = formData.preferences.ageGroups.includes(age.id)
                    ? formData.preferences.ageGroups.filter(a => a !== age.id)
                    : [...formData.preferences.ageGroups, age.id];
                  handleInputChange('preferences', 'ageGroups', newAges);
                }}
                className={`p-3 rounded-lg border-2 text-sm font-medium flex items-center justify-center space-x-2
                  ${formData.preferences.ageGroups.includes(age.id)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
              >
                <span>{age.icon}</span>
                <span>{age.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Teaching Style */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Teaching Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'structured', label: 'Structured', icon: '📚' },
              { id: 'flexible', label: 'Flexible', icon: '🎨' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => handleInputChange('preferences', 'sessionStyle', style.id)}
                className={`p-4 border-2 rounded-lg text-sm font-medium flex flex-col items-center space-y-2
                  ${formData.preferences.sessionStyle === style.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-blue-200'}`}
              >
                <span className="text-2xl">{style.icon}</span>
                <span>{style.label}</span>
                <span className="text-xs text-gray-500">
                  {style.id === 'structured' 
                    ? 'Fixed curriculum and learning path'
                    : 'Adaptable to student needs'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Materials */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Required Materials
          </label>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Items students need to have</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add required item"
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleListAdd('materials', 'required', e.target.value);
                      e.target.value = '';
                    }}}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={(e) => {
                        const input = e.target.previousSibling;
                        handleListAdd('materials', 'required', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {formData.materials.required.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [...formData.materials.required];
                            newItems.splice(index, 1);
                            handleInputChange('materials', 'required', newItems);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
    
                <div>
                  <label className="text-sm text-gray-600">Items you'll provide</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Add provided item"
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleListAdd('materials', 'provided', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={(e) => {
                        const input = e.target.previousSibling;
                        handleListAdd('materials', 'provided', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 space-y-2">
                    {formData.materials.provided.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="text-sm text-gray-700">{item}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newItems = [...formData.materials.provided];
                            newItems.splice(index, 1);
                            handleInputChange('materials', 'provided', newItems);
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
            </div>
    
            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing
              </label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={formData.pricing.type === 'free'}
                      onChange={() => handleInputChange('pricing', 'type', 'free')}
                    />
                    <span className="ml-2">Free</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      checked={formData.pricing.type === 'paid'}
                      onChange={() => handleInputChange('pricing', 'type', 'paid')}
                    />
                    <span className="ml-2">Paid</span>
                  </label>
                </div>
    
                {formData.pricing.type === 'paid' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Amount</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.pricing.amount}
                        onChange={(e) => handleInputChange('pricing', 'amount', Number(e.target.value))}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Per</label>
                      <select
                        value={formData.pricing.perSession ? 'session' : 'hour'}
                        onChange={(e) => handleInputChange('pricing', 'perSession', e.target.value === 'session')}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="session">Session</option>
                        <option value="hour">Hour</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
    
          {/* Additional Notes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
            <textarea
              rows={4}
              placeholder="Any other details you'd like to share with potential students..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', null, e.target.value)}
            />
          </div>
        </div>
      );
    
      // Main Render
      return (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Knowledge</h1>
            <p className="text-gray-600">Connect with neighbors and share your expertise</p>
          </div>
    
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300" 
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                />
              </div>
              {['Skill Details', 'Schedule & Location', 'Preferences'].map((step, index) => (
                <div 
                  key={step}
                  className={`relative flex flex-col items-center ${
                    index + 1 < currentStep ? 'text-blue-600' :
                    index + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                    ${index + 1 < currentStep ? 'bg-blue-600 border-blue-600 text-white' :
                      index + 1 === currentStep ? 'border-blue-600 bg-white text-blue-600' :
                      'border-gray-300 bg-white'}`}
                  >
                    {index + 1 < currentStep ? '✓' : index + 1}
                  </div>
                  <div className="absolute -bottom-6 whitespace-nowrap text-sm font-medium">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          {/* Form Steps */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            {currentStep === 1 && renderStepOne()}
            {currentStep === 2 && renderStepTwo()}
            {currentStep === 3 && renderStepThree()}
          </div>
    
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentStep === 3 ? 'Submit' : 'Next'}
            </button>
          </div>
    
          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips for Success</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentStep === 1 && (
                <>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">📝</span>
                    <div>
                      <p className="text-blue-900 font-medium">Be Specific</p>
                      <p className="text-blue-800 text-sm">Clear descriptions help potential students understand what to expect</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">🎯</span>
                    <div>
                      <p className="text-blue-900 font-medium">Define Learning Outcomes</p>
                      <p className="text-blue-800 text-sm">List what students will achieve by the end</p>
                    </div>
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">⏰</span>
                    <div>
                      <p className="text-blue-900 font-medium">Be Realistic</p>
                      <p className="text-blue-800 text-sm">Choose times you can consistently commit to</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">📍</span>
                    <div>
                      <p className="text-blue-900 font-medium">Location Matters</p>
                      <p className="text-blue-800 text-sm">Consider accessibility and comfort for all parties</p>
                    </div>
                  </div>
                </>
              )}
              {currentStep === 3 && (
                <>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">👥</span>
                    <div>
                      <p className="text-blue-900 font-medium">Group Dynamics</p>
                      <p className="text-blue-800 text-sm">Consider what group size works best for your teaching style</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500">📦</span>
                    <div>
                      <p className="text-blue-900 font-medium">Materials Planning</p>
                      <p className="text-blue-800 text-sm">Be clear about what you'll provide and what students need</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    };
    
    export default TeachSkill;