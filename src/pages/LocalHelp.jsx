// src/pages/LocalHelp.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HelpRequestCard = ({ request }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 
              text-white flex items-center justify-center text-xl font-bold">
              {request.type === 'offer' ? '🤝' : '❓'}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{request.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{request.location}</span>
                <span>•</span>
                <span>{request.timePosted}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm
            ${request.type === 'offer' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'}`}>
            {request.type === 'offer' ? 'Offering Help' : 'Seeking Help'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4">{request.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {request.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Time Needed</span>
              <p className="font-medium">{request.timeNeeded}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Availability</span>
              <p className="font-medium">{request.availability}</p>
            </div>
          </div>
        </div>

        {/* Urgency Indicator if applicable */}
        {request.urgent && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
            <div className="flex items-center text-red-800">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium">Urgent Request</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg 
            hover:bg-blue-700 transition-colors">
            {request.type === 'offer' ? 'Request Help' : 'Offer Help'}
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

const LocalHelp = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Requests' },
    { id: 'household', label: 'Household' },
    { id: 'errands', label: 'Errands' },
    { id: 'tech', label: 'Tech Support' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'emergency', label: 'Emergency' }
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setRequests([
        {
          id: 1,
          type: 'seek',
          title: 'Need help fixing leaky faucet',
          description: 'Looking for someone with basic plumbing knowledge to help fix a leaky bathroom faucet.',
          location: 'Downtown',
          timePosted: '1h ago',
          tags: ['Plumbing', 'Home Repair', 'Quick Fix'],
          timeNeeded: '1-2 hours',
          availability: 'This weekend',
          urgent: false
        },
        {
          id: 2,
          type: 'offer',
          title: 'Free Tech Support for Seniors',
          description: 'I can help seniors with basic computer issues, smartphone setup, and internet troubleshooting.',
          location: 'Westside',
          timePosted: '3h ago',
          tags: ['Technology', 'Senior Help', 'Computer'],
          timeNeeded: 'Flexible',
          availability: 'Weekday evenings',
          urgent: false
        }
      ]);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Local Help</h1>
        <p className="text-gray-600">Connect with neighbors for help or offer your assistance</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          to="/local-help/offer"
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-lg 
            hover:from-green-600 hover:to-emerald-600 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Offer Help</h3>
          <p className="text-green-100">Share your skills and help your neighbors</p>
        </Link>
        <Link
          to="/local-help/ask"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-lg 
            hover:from-blue-600 hover:to-indigo-600 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2">Ask for Help</h3>
          <p className="text-blue-100">Get help from trusted neighbors</p>
        </Link>
      </div>

      {/* Tool Sharing Promotion */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-yellow-800 mb-2">Tool Sharing Program</h3>
            <p className="text-yellow-800">Share and borrow tools with your neighbors. Save money and storage space!</p>
          </div>
          <Link
            to="/local-help/tools"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
              ${activeTab === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Requests Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map(request => (
            <HelpRequestCard key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocalHelp;