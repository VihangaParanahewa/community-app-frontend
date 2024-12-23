// src/pages/playdates/HostPlaydate.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HostPlaydate = () => {

    
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    title: '',
    ageGroup: '',
    maxKids: 4,
    parentPresence: 'required',

    // Schedule
    date: '',
    startTime: '',
    duration: 2,
    recurring: false,
    recurringDays: [],

    // Location
    locationType: '',
    location: '',
    address: '',
    showExactAddress: false,
    amenities: [],

    // Activities
    activities: [],
    materials: {
      provided: [],
      required: []
    },

    // Safety & Requirements
    requirements: [],
    safetyMeasures: [],
    languages: [],
    
    // Additional Info
    description: '',
    photos: [],
    rules: [],
    cancellationPolicy: 'flexible'
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};
    
        // Basic Info validation
        if (!formData.title.trim()) {
          newErrors.title = 'Please give your playdate a title';
        }
        if (!formData.ageGroup) {
          newErrors.ageGroup = 'Please select an age group';
        }
    
        // Schedule validation
        if (!formData.date) {
          newErrors.date = 'Please select a date';
        }
        if (!formData.startTime) {
          newErrors.startTime = 'Please select a start time';
        }
    
        // Location validation
        if (!formData.locationType) {
          newErrors.locationType = 'Please select a location type';
        }
        if (!formData.location.trim()) {
          newErrors.location = 'Please provide a location';
        }
    
        // Activities validation
        if (formData.activities.length === 0) {
          newErrors.activities = 'Please select at least one activity';
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = async () => {
        if (!validateForm()) {
          // Show error message
          alert('Please fill in all required fields');
          return;
        }
    
        setIsSubmitting(true);
    
        try {
          // Prepare the data
          const playdateData = {
            ...formData,
            hostId: 'user_id', // Replace with actual user ID
            createdAt: new Date().toISOString(),
            status: 'active',
            participants: [],
            reviews: [],
            chatEnabled: true
          };
    
          // Here you would typically send the data to your backend
          // For now, we'll simulate an API call
          await new Promise(resolve => setTimeout(resolve, 1500));
    
          // Show success modal
          setShowSuccessModal(true);
        } catch (error) {
          console.error('Error creating playdate:', error);
          alert('Failed to create playdate. Please try again.');
        } finally {
          setIsSubmitting(false);
        }
      };
    
      // Success Modal Component
      const SuccessModal = () => (
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
                onClick={e => e.stopPropagation()}
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="text-5xl mb-4"
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Playdate Created!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Your playdate has been successfully created and is now visible to other parents in your area.
                  </p>
    
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-medium text-blue-900 mb-2">What's Next?</h4>
                      <ul className="text-sm text-blue-800 space-y-2">
                        <li className="flex items-center">
                          <span className="mr-2">👀</span>
                          <span>Parents can now view and request to join your playdate</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">📱</span>
                          <span>You'll receive notifications when someone wants to join</span>
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">💬</span>
                          <span>You can message parents to coordinate details</span>
                        </li>
                      </ul>
                    </div>
    
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => navigate('/playdates/manage')}
                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                      >
                        Manage Your Playdate
                      </button>
                      <button
                        onClick={() => navigate('/playdates')}
                        className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Back to Playdates
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    

  // Predefined options
  const ageGroups = [
    { id: 'toddler', label: 'Toddlers (1-3)', icon: '🚼', color: 'pink' },
    { id: 'preschool', label: 'Preschool (3-5)', icon: '🎨', color: 'purple' },
    { id: 'elementary', label: 'Elementary (5-12)', icon: '🎮', color: 'blue' }
  ];

  const activities = {
    'Outdoor Fun': [
      { id: 'playground', label: 'Playground', icon: '🎪' },
      { id: 'sports', label: 'Sports', icon: '⚽' },
      { id: 'nature', label: 'Nature Walk', icon: '🌿' },
      { id: 'water', label: 'Water Play', icon: '💦' }
    ],
    'Creative': [
      { id: 'art', label: 'Arts & Crafts', icon: '🎨' },
      { id: 'music', label: 'Music & Dance', icon: '🎵' },
      { id: 'pretend', label: 'Pretend Play', icon: '🎭' },
      { id: 'building', label: 'Building', icon: '🧱' }
    ],
    'Learning': [
      { id: 'reading', label: 'Reading', icon: '📚' },
      { id: 'science', label: 'Science', icon: '🔬' },
      { id: 'cooking', label: 'Cooking', icon: '🧁' },
      { id: 'learning', label: 'Educational', icon: '✏️' }
    ]
  };

  const amenities = [
    { id: 'bathroom', label: 'Bathroom', icon: '🚽' },
    { id: 'water', label: 'Water Fountain', icon: '🚰' },
    { id: 'shade', label: 'Shaded Area', icon: '⛱️' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'firstaid', label: 'First Aid Kit', icon: '🩹' },
    { id: 'snacks', label: 'Snacks Available', icon: '🍪' },
    { id: 'changing', label: 'Changing Station', icon: '👶' },
    { id: 'seating', label: 'Parent Seating', icon: '💺' }
  ];

  const safetyMeasures = [
    { id: 'childproof', label: 'Childproofed Space', icon: '🔒' },
    { id: 'firstaid', label: 'First Aid Certified', icon: '🏥' },
    { id: 'supervision', label: 'Constant Supervision', icon: '👀' },
    { id: 'allergyaware', label: 'Allergy Aware', icon: '🥜' },
    { id: 'emergency', label: 'Emergency Plan', icon: '🚨' },
    { id: 'clean', label: 'Regular Sanitization', icon: '🧼' }
  ];

  // Form Steps Components
  const renderStepOne = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Give your playdate a fun title! 🎈
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Magical Art Adventure, Superhero Training Camp"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-lg"
        />
      </motion.div>

      {/* Age Group */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Which age group is this for? 👶
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ageGroups.map((age) => (
            <motion.button
              key={age.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, ageGroup: age.id })}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.ageGroup === age.id
                  ? `border-${age.color}-500 bg-${age.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">{age.icon}</span>
                <span className="font-medium">{age.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Group Size */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          How many kids can join? 👥
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              maxKids: Math.max(1, prev.maxKids - 1) 
            }))}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl"
          >
            -
          </button>
          <div className="text-3xl font-medium w-12 text-center">
            {formData.maxKids}
          </div>
          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              maxKids: Math.min(10, prev.maxKids + 1) 
            }))}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-2xl"
          >
            +
          </button>
        </div>
      </motion.div>

      {/* Parent Presence */}
      <motion.div variants={itemVariants} className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Parent presence requirement 👨‍👩‍👧‍👦
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'required', label: 'Parents Must Stay', icon: '👨‍👩‍👧‍👦' },
            { id: 'optional', label: 'Parents Can Leave', icon: '👋' },
            { id: 'flexible', label: 'Flexible', icon: '🤝' }
          ].map((option) => (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, parentPresence: option.id })}
              className={`p-4 rounded-xl border-2 transition-all ${
                formData.parentPresence === option.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-3xl">{option.icon}</span>
                <span className="font-medium">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // Continue with the rest of the component...

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 py-12">

        
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Host a Playdate! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Create a fun and safe space for kids to play and make new friends
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2">
              <motion.div 
                className="h-full bg-blue-600"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / 3) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            {['Basic Info', 'Schedule', 'Location', 'Activities'].map((label, index) => (
              <motion.div 
                key={label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: step >= index + 1 ? 1 : 0.8,
                  opacity: 1
                }}
                className="relative flex flex-col items-center"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg
                  ${step > index + 1 
                    ? 'bg-blue-600 text-white'
                    : step === index + 1
                    ? 'bg-white border-2 border-blue-600 text-blue-600'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className="absolute -bottom-6 text-sm font-medium text-gray-600">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {step === 1 && renderStepOne()}
          {/* Add other step renders here */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 font-medium hover:border-gray-300 transition-colors"
            >
              ← Back
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => step < 4 ? setStep(step + 1) : handleSubmit()}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            {step === 4 ? 'Create Playdate! 🎉' : 'Next →'}
          </motion.button>
        </div>
      </div>


      
      
    </div>
    
  );
};

export default HostPlaydate;