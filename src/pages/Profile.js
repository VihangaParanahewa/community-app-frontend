// src/pages/Profile.js
import { useState } from 'react';

const ProfileTab = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium text-sm transition-colors ${
      active 
        ? 'text-blue-600 border-b-2 border-blue-600' 
        : 'text-gray-600 hover:text-blue-600'
    }`}
  >
    {title}
  </button>
);

const SkillBadge = ({ skill, level, onEndorse }) => {
  const colors = {
    beginner: { bg: 'bg-green-100', text: 'text-green-800', hover: 'hover:bg-green-200' },
    intermediate: { bg: 'bg-blue-100', text: 'text-blue-800', hover: 'hover:bg-blue-200' },
    advanced: { bg: 'bg-purple-100', text: 'text-purple-800', hover: 'hover:bg-purple-200' }
  };

  return (
    <div className={`group flex items-center gap-2 ${colors[level].bg} ${colors[level].text} 
      rounded-full pl-3 pr-2 py-1 transition-all ${colors[level].hover}`}>
      <span className="font-medium">{skill}</span>
      <span className="text-xs px-2 py-0.5 bg-white/50 rounded-full">{level}</span>
      <button 
        onClick={onEndorse}
        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
        </svg>
      </button>
    </div>
  );
};

function Profile() {
  const [activeTab, setActiveTab] = useState('about');
  const [editing, setEditing] = useState(false);
  const [user] = useState({
    name: "Sarah Chen",
    tagline: "Community Builder | Garden Enthusiast | Tech Mentor",
    location: "Downtown East",
    availableForHelp: true,
    bio: "Passionate about bringing people together and sharing knowledge. I believe in the power of community and hands-on learning. Currently maintaining our neighborhood's community garden and teaching coding to beginners.",
    skills: [
      { name: "Gardening", level: "advanced", endorsements: 15 },
      { name: "Python Programming", level: "intermediate", endorsements: 8 },
      { name: "Event Planning", level: "intermediate", endorsements: 12 },
      { name: "Photography", level: "beginner", endorsements: 5 }
    ],
    interests: ["Sustainable Living", "Education", "Technology", "Community Building", "Urban Farming"],
    achievements: [
      {
        title: "Community Champion",
        description: "Organized 10+ successful local events",
        date: "2024",
        icon: "🏆"
      },
      {
        title: "Green Thumb",
        description: "Transformed abandoned lot into community garden",
        date: "2023",
        icon: "🌱"
      },
      {
        title: "Mentor of the Month",
        description: "Recognized for outstanding contribution to coding education",
        date: "2023",
        icon: "⭐"
      }
    ],
    activity: [
      {
        type: "event",
        title: "Garden Workshop",
        description: "Taught basics of urban gardening",
        date: "2 days ago"
      },
      {
        type: "help",
        title: "Python Tutoring",
        description: "Helped 3 beginners with programming basics",
        date: "1 week ago"
      }
    ],
    availability: {
      days: ["Monday", "Wednesday", "Saturday"],
      times: "Evenings and weekends",
      preferredLocations: ["Local Library", "Community Garden", "Neighborhood Café"]
    },
    stats: {
      peopleHelped: 45,
      eventsHosted: 12,
      skillsShared: 8,
      endorsements: 35
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      {/* Profile Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6">
            <div className="flex items-center">
              {/* Profile Picture */}
              <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                {user.name[0]}
              </div>
              
              <div className="ml-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-gray-600">{user.tagline}</p>
                  </div>
                  <button 
                    onClick={() => setEditing(!editing)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editing ? 'Save Profile' : 'Edit Profile'}
                  </button>
                </div>

                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user.location}
                  </div>
                  {user.availableForHelp && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Available to Help
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              {Object.entries(user.stats).map(([key, value]) => (
                <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{value}</div>
                  <div className="text-sm text-gray-600">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Navigation */}
          <div className="border-b">
            <div className="flex">
              <ProfileTab 
                title="About" 
                active={activeTab === 'about'} 
                onClick={() => setActiveTab('about')} 
              />
              <ProfileTab 
                title="Skills & Endorsements" 
                active={activeTab === 'skills'} 
                onClick={() => setActiveTab('skills')} 
              />
              <ProfileTab 
                title="Activity" 
                active={activeTab === 'activity'} 
                onClick={() => setActiveTab('activity')} 
              />
              <ProfileTab 
                title="Achievements" 
                active={activeTab === 'achievements'} 
                onClick={() => setActiveTab('achievements')} 
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-3">About Me</h2>
                  <p className="text-gray-600">{user.bio}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3">Interests</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                      <span key={interest} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-3">Availability</h2>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Preferred Days</h3>
                        <div className="flex flex-wrap gap-2">
                          {user.availability.days.map(day => (
                            <span key={day} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Preferred Locations</h3>
                        <ul className="text-gray-600 space-y-1">
                          {user.availability.preferredLocations.map(location => (
                            <li key={location}>• {location}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Skills & Expertise</h2>
                  <p className="text-gray-600 mb-4">
                    Skills I can help others with or teach. Click to endorse!
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {user.skills.map(skill => (
                      <SkillBadge 
                        key={skill.name}
                        skill={`${skill.name} (${skill.endorsements})`}
                        level={skill.level}
                        onEndorse={() => console.log(`Endorsed ${skill.name}`)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                {user.activity.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                      item.type === 'event' ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.type === 'event' ? '📅' : '🤝'}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-6">
                {user.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start bg-gray-50 rounded-lg p-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                      {achievement.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{achievement.title}</h3>
                      <p className="text-gray-600">{achievement.description}</p>
                      <span className="text-sm text-gray-500">{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Want to connect?</h2>
            <div className="space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;