// src/pages/SkillShare.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Skill Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 
              text-white flex items-center justify-center text-xl font-bold">
              {skill.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{skill.title}</h3>
              <p className="text-sm text-gray-500">{skill.category}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm
            ${skill.type === 'offering' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {skill.type === 'offering' ? 'Teaching' : 'Learning'}
          </span>
        </div>

        {/* Skill Details */}
        <p className="text-gray-600 mb-4">{skill.description}</p>

        {/* Experience Level */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Experience Level:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-4 h-4 rounded-full ${
                    level <= skill.experienceLevel
                      ? 'bg-blue-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {skill.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Availability & Location */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{skill.availability}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{skill.location}</span>
          </div>
        </div>

        {/* Connection Preferences */}
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Connection Preferences</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{skill.groupSize}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>{skill.meetingPreference}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-700 transition-colors">
            Connect
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

const SkillShare = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [activeFilter, setActiveFilter] = useState('all');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Skills' },
    { id: 'tech', label: 'Technology' },
    { id: 'arts', label: 'Arts & Crafts' },
    { id: 'language', label: 'Languages' },
    { id: 'music', label: 'Music' },
    { id: 'cooking', label: 'Cooking' },
    { id: 'fitness', label: 'Fitness' }
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSkills([
        {
          id: 1,
          type: 'offering',
          title: 'Basic Web Development',
          category: 'Technology',
          icon: '💻',
          description: 'Can teach HTML, CSS, and basic JavaScript to beginners. Perfect for those wanting to start a career in web development.',
          experienceLevel: 4,
          tags: ['HTML', 'CSS', 'JavaScript', 'Web'],
          availability: 'Weekends, 2-hour sessions',
          location: 'Local Library or Online',
          groupSize: 'Small groups (up to 4)',
          meetingPreference: 'In-person or virtual'
        },
        {
          id: 2,
          type: 'seeking',
          title: 'Guitar Lessons',
          category: 'Music',
          icon: '🎸',
          description: 'Looking for someone to teach basic guitar. Complete beginner but very enthusiastic to learn!',
          experienceLevel: 1,
          tags: ['Music', 'Guitar', 'Beginner'],
          availability: 'Weekday evenings',
          location: 'Flexible',
          groupSize: '1-on-1 preferred',
          meetingPreference: 'In-person'
        }
      ]);
      setLoading(false);
    };

    fetchSkills();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Share</h1>
        <p className="text-gray-600">Connect with neighbors to learn and share skills</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        <button
          onClick={() => setActiveTab('discover')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === 'discover'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'}`}
        >
          Discover Skills
        </button>
        <button
          onClick={() => setActiveTab('teaching')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === 'teaching'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'}`}
        >
          Teaching
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${activeTab === 'learning'
              ? 'bg-white text-gray-900 shadow'
              : 'text-gray-600 hover:text-gray-900'}`}
        >
          Learning
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
              ${activeFilter === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/skill-share/teach"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg 
            hover:from-blue-600 hover:to-blue-700 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Share Your Skills</h3>
          <p className="text-blue-100">Help others learn and grow while building community connections</p>
        </Link>
        <Link
          to="/skill-share/learn"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg 
            hover:from-purple-600 hover:to-purple-700 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Request to Learn</h3>
          <p className="text-purple-100">Find neighbors who can teach you new skills</p>
        </Link>
      </div>

      {/* Skills Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map(skill => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillShare;