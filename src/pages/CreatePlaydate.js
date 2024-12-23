// src/pages/CreatePlaydate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePlaydate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    type: 'regular',
    schedule: {
      type: 'regular',
      regularDays: [],
      regularTime: '',
      oneTimeDate: '',
      oneTimeTime: '',
      duration: '2'
    },
    location: {
      type: 'public',
      name: '',
      address: '',
      details: ''
    },
    // Child Info
    childrenInfo: [],
    ageGroups: [],
    // Activities
    activities: [],
    description: ''
  });

  // Step 1: Basic Details
  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Basic Details</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Playdate Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="e.g., Weekly Park Playdate, Art & Craft Session"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type of Playdate
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['regular', 'one-time'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('type', type)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  formData.type === type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="font-medium mb-1">
                  {type === 'regular' ? 'Regular Playdate' : 'One-time Playdate'}
                </div>
                <div className="text-sm text-gray-500">
                  {type === 'regular' 
                    ? 'Recurring meetups on specific days' 
                    : 'Single meetup on a specific date'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Schedule</h3>
          {formData.type === 'regular' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Select Days</label>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDaySelection(day)}
                      className={`p-2 rounded-lg text-center transition-colors ${
                        formData.schedule.regularDays.includes(day)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.schedule.regularTime}
                    onChange={(e) => handleScheduleChange('regularTime', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Duration</label>
                  <select
                    value={formData.schedule.duration}
                    onChange={(e) => handleScheduleChange('duration', e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((duration) => (
                      <option key={duration} value={duration}>
                        {duration} {duration === 1 ? 'hour' : 'hours'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Date</label>
                <input
                  type="date"
                  value={formData.schedule.oneTimeDate}
                  onChange={(e) => handleScheduleChange('oneTimeDate', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Time</label>
                <input
                  type="time"
                  value={formData.schedule.oneTimeTime}
                  onChange={(e) => handleScheduleChange('oneTimeTime', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Duration</label>
                <select
                  value={formData.schedule.duration}
                  onChange={(e) => handleScheduleChange('duration', e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((duration) => (
                    <option key={duration} value={duration}>
                      {duration} {duration === 1 ? 'hour' : 'hours'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <h3 className="text-lg font-medium mb-4">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {['public', 'private'].map((locType) => (
              <button
                key={locType}
                type="button"
                onClick={() => handleLocationChange('type', locType)}
                className={`p-4 rounded-lg border-2 text-left transition-colors ${
                  formData.location.type === locType
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <div className="font-medium mb-1">
                  {locType === 'public' ? 'Public Location' : 'Private Location'}
                </div>
                <div className="text-sm text-gray-500">
                  {locType === 'public' 
                    ? 'Park, playground, or community center' 
                    : 'Home or private venue'}
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Location name"
              value={formData.location.name}
              onChange={(e) => handleLocationChange('name', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.location.address}
              onChange={(e) => handleLocationChange('address', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              placeholder="Additional details (parking, entrance, meeting point...)"
              value={formData.location.details}
              onChange={(e) => handleLocationChange('details', e.target.value)}
              className="w-full border rounded-lg px-3 py-2 h-24"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Helper functions
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [field]: value
      }
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleDaySelection = (day) => {
    setFormData(prev => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        regularDays: prev.schedule.regularDays.includes(day)
          ? prev.schedule.regularDays.filter(d => d !== day)
          : [...prev.schedule.regularDays, day]
      }
    }));
  };

// Continuing from Part 1...

  // Step 2: Activities and Requirements
  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Activities & Requirements</h2>

        {/* Age Groups */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age Groups (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['0-2', '3-5', '6-8', '9-12'].map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => {
                  const updatedAges = formData.ageGroups.includes(age)
                    ? formData.ageGroups.filter(a => a !== age)
                    : [...formData.ageGroups, age];
                  handleChange('ageGroups', updatedAges);
                }}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  formData.ageGroups.includes(age)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {age} years
              </button>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activities (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              'Outdoor Play',
              'Arts & Crafts',
              'Reading',
              'Board Games',
              'Sports',
              'Music & Dance',
              'Educational',
              'Nature Exploration',
              'Free Play',
              'Swimming',
              'Cooking/Baking',
              'Building/LEGO'
            ].map((activity) => (
              <button
                key={activity}
                type="button"
                onClick={() => {
                  const updatedActivities = formData.activities.includes(activity)
                    ? formData.activities.filter(a => a !== activity)
                    : [...formData.activities, activity];
                  handleChange('activities', updatedActivities);
                }}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  formData.activities.includes(activity)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Safety & Preferences</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent Presence
              </label>
              <select
                value={formData.parentPresence}
                onChange={(e) => handleChange('parentPresence', e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="required">Parents must stay</option>
                <option value="optional">Parents can drop off</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Group Size
              </label>
              <select
                value={formData.maxChildren}
                onChange={(e) => handleChange('maxChildren', e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                {[2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>{num} children</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Tell other parents about the playdate, what to expect, what to bring..."
            className="w-full border rounded-lg px-3 py-2 h-32"
          />
        </div>

        {/* Additional Requirements */}
        <div>
          <h3 className="text-lg font-medium mb-4">Additional Requirements</h3>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.vaccinationRequired}
                onChange={(e) => handleChange('vaccinationRequired', e.target.checked)}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">Vaccination required</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.allergyAware}
                onChange={(e) => handleChange('allergyAware', e.target.checked)}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm text-gray-700">Allergy considerations</span>
            </label>

            {formData.allergyAware && (
              <textarea
                value={formData.allergyNotes}
                onChange={(e) => handleChange('allergyNotes', e.target.value)}
                placeholder="Please specify any allergy considerations..."
                className="w-full border rounded-lg px-3 py-2 h-24"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Navigation and Submission
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
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
      console.log('Submitting playdate:', formData);
      
      // Show success message
      alert('Playdate created successfully!');
      
      // Navigate to playdates page
      navigate('/playdates');
    } catch (error) {
      console.error('Error creating playdate:', error);
      alert('Failed to create playdate. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create a Playdate</h1>
        <p className="text-gray-600">Connect with local families and organize fun activities</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === currentStep
                  ? 'bg-blue-600 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              {step < 2 && (
                <div className={`w-24 h-1 ${
                  step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <span className="text-sm text-gray-600">
            Step {currentStep} of 2: {currentStep === 1 ? 'Basic Details' : 'Activities & Requirements'}
          </span>
        </div>
      </div>

      {/* Form Steps */}
      {currentStep === 1 ? renderStepOne() : renderStepTwo()}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        )}
        <button
          type="button"
          onClick={handleNext}
          className="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          {currentStep === 2 ? 'Create Playdate' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CreatePlaydate;