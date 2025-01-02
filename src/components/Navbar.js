// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainDropdown from './MainDropdown';
import NotificationsMenu from './NotificationsMenu';
import ProfileMenu from './ProfileMenu';
import QuickActionsMenu from './QuickActionsMenu';
import MobileMenu from './MobileMenu';
import {useAuthContext} from "../context/AuthContext";

// Main navigation categories
const navigationConfig = {
  skillShare: {
    id: 'skill-share',
    name: 'Skills & Learning',
    icon: '🎓',
    description: 'Connect to learn and teach skills',
    subcategories: [
      { name: 'Browse All Skills', path: '/skill-share', icon: '🔍' },
      { name: 'Teach a Skill', path: '/skill-share/teach', icon: '📚' },
      { name: 'Learn Something', path: '/skill-share/learn', icon: '🎯' },
      { name: 'Find a Mentor', path: '/skill-share/mentors', icon: '🤝' },
      { name: 'Workshop Sessions', path: '/skill-share/workshops', icon: '👥' },
    ]
  },
  familyConnect: {
    id: 'playdates',
    name: 'Family Connect',
    icon: '👶',
    description: 'Connect families and organize activities',
    subcategories: [
      { name: 'Discover Playdates', path: '/playdates', icon: '🎈' },
      { name: 'Find Playmates', path: '/playdates/playmates', icon: '🤸‍♂️' },
      { name: 'Parent Groups', path: '/playdates/parent-groups', icon: '👥' },
      { name: 'Kids Activities', path: '/playdates/activities', icon: '🎨' },
      { name: 'Family Events', path: '/playdates/events', icon: '🎉' },
    ]
  },
  localHelp: {
    id: 'local-help',
    name: 'Community Help',
    icon: '🤝',
    description: 'Give and receive help from neighbors',
    subcategories: [
      { name: 'Help Board', path: '/local-help', icon: '📋' },
      { name: 'Ask for Help', path: '/local-help/ask', icon: '🙋‍♂️' },
      { name: 'Offer Help', path: '/local-help/offer', icon: '🤝' },
      { name: 'Tool Sharing', path: '/local-help/tools', icon: '🔧' },
      { name: 'Emergency Help', path: '/local-help/emergency', icon: '🚨' },
    ]
  },
  interests: {
    id: 'interests',
    name: 'Interest Groups',
    icon: '⭐',
    description: 'Find people who share your interests',
    subcategories: [
      { name: 'All Groups', path: '/interests', icon: '👥' },
      { name: 'Book Clubs', path: '/interests/book-clubs', icon: '📚' },
      { name: 'Sports Teams', path: '/interests/sports', icon: '⚽' },
      { name: 'Hobby Groups', path: '/interests/hobbies', icon: '🎨' },
      { name: 'Cultural Exchange', path: '/interests/cultural', icon: '🌍' },
    ]
  }
};

// Quick actions configuration
const quickActions = [
  { 
    id: 'help',
    label: 'Offer Help', 
    path: '/connect/help',
    icon: '🤝',
    description: 'Help a neighbor in need'
  },
  { 
    id: 'skill',
    label: 'Share Skill', 
    path: '/connect/skill',
    icon: '📚',
    description: 'Teach others what you know'
  },
  { 
    id: 'playdate',
    label: 'Playdate', 
    path: '/connect/playdate',
    icon: '👶',
    description: 'Organize a playdate'
  },
  { 
    id: 'group',
    label: 'Start Group', 
    path: '/connect/group',
    icon: '👥',
    description: 'Create an interest group'
  }
];

function Navbar({ isAuthenticated , setIsAuthenticated}) {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentNeighborhood, setCurrentNeighborhood] = useState("Downtown East");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'skill-share',
      message: 'Sarah wants to learn gardening',
      time: '5m ago',
      isNew: true,
      icon: '🌱'
    },
    {
      id: 2,
      type: 'playdate',
      message: 'New playdate request from John',
      time: '10m ago',
      isNew: true,
      icon: '👶'
    },
    {
      id: 3,
      type: 'local-help',
      message: 'Someone needs help with moving',
      time: '1h ago',
      isNew: false,
      icon: '🚚'
    },
    {
      id: 4,
      type: 'group',
      message: 'New book club forming in your area',
      time: '2h ago',
      isNew: false,
      icon: '📚'
    }
  ]);

  const authContext = useAuthContext();
  const user = authContext.currentUser;

  // Refs for dropdown menus
  const menuRefs = {
    profile: useRef(null),
    create: useRef(null),
    notifications: useRef(null),
    dropdown: useRef(null)
  };

  const navigate = useNavigate();
  const location = useLocation();

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && menuRefs.dropdown.current && 
          !menuRefs.dropdown.current.contains(event.target)) {
        setActiveDropdown(null);
      }

      Object.entries(menuRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          switch(key) {
            case 'profile':
              setShowProfileMenu(false);
              break;
            case 'create':
              setShowCreateMenu(false);
              break;
            case 'notifications':
              setShowNotifications(false);
              break;
          }
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  // Navigation helpers
  const handleLogout = async () => {
    await authContext.logout();
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    navigate('/login');
    setShowProfileMenu(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600';
  };

  const handleDropdownToggle = (categoryId) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  // Continue to Part 2...
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Community Context Bar */}
      {isAuthenticated && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-10">
              {/* Location Selection */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <button 
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    onClick={() => navigate('/neighborhoods')}
                  >
                    {currentNeighborhood}
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-400">|</span>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">12 active neighbors</span>
                  <span className="text-green-600">3 events today</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center text-blue-600">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>5 new neighbors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 
              flex items-center justify-center">
              <span className="text-white font-bold">C</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ConnectLocal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main Categories */}
            {isAuthenticated && Object.values(navigationConfig).map((category) => (
              <div key={category.id} className="relative group">
                <button
                  onClick={() => handleDropdownToggle(category.id)}
                  className="px-3 py-2 rounded-lg group-hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    <span>{category.icon}</span>
                    <span className="text-gray-700">{category.name}</span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform
                        ${activeDropdown === category.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Category Dropdown */}
                {activeDropdown === category.id && (
                  <div 
                    ref={menuRefs.dropdown}
                    className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg z-50"
                  >
                    <MainDropdown 
                      category={category}
                      onClose={() => setActiveDropdown(null)}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Quick Connect Button */}
            <div className="relative" ref={menuRefs.create}>
              <button
                onClick={() => setShowCreateMenu(!showCreateMenu)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors
                  flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 4v16m8-8H4" />
                </svg>
                <span>Connect</span>
              </button>

              {/* Quick Connect Menu */}
              {showCreateMenu && (
                <QuickActionsMenu 
                  actions={quickActions}
                  onClose={() => setShowCreateMenu(false)}
                />
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={menuRefs.notifications}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.filter(n => n.isNew).length > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 
                    flex items-center justify-center">
                    {notifications.filter(n => n.isNew).length}
                  </span>
                )}
              </button>

              {/* Notifications Menu */}
              {showNotifications && (
                <NotificationsMenu 
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onMarkAllRead={() => {
                    setNotifications(notifications.map(n => ({ ...n, isNew: false })));
                  }}
                />
              )}
            </div>

            {/* Profile Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={menuRefs.profile}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 
                    flex items-center justify-center">
                    <span className="text-blue-600 font-medium">

                      {user?.displayName?.[0] || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700">{user?.displayName?.split(' ')[0]}</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <ProfileMenu 
                    user={user}
                    onClose={() => setShowProfileMenu(false)}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <MobileMenu 
            navigationConfig={navigationConfig}
            quickActions={quickActions}
            isAuthenticated={isAuthenticated}
            user={user}
            onClose={() => setIsOpen(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;

