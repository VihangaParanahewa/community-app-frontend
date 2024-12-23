// src/pages/Feed.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryFilter = ({ active, onChange }) => {
  const categories = [
    { id: 'all', label: 'All', icon: '📱' },
    { id: 'skills', label: 'Skills', icon: '🎓' },
    { id: 'playdates', label: 'Playdates', icon: '👶' },
    { id: 'help', label: 'Help', icon: '🤝' },
    { id: 'events', label: 'Events', icon: '📅' },
    { id: 'marketplace', label: 'Items', icon: '🛍️' }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap
            ${active === category.id 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Author Info */}
      <div className="p-4 flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">{post.author.name[0]}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium">{post.author.name}</h3>
              {post.author.isVerified && (
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{post.location}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-sm
            ${post.type === 'skill-share' ? 'bg-purple-100 text-purple-700' :
              post.type === 'playdate' ? 'bg-green-100 text-green-700' :
              post.type === 'help' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.content}</p>
        
        {/* Images/Media */}
        {post.images?.length > 0 && (
          <div className="mb-4 rounded-lg overflow-hidden">
            {post.images.length === 1 ? (
              <img src={post.images[0]} alt="" className="w-full h-64 object-cover" />
            ) : (
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="relative">
                    <img src={img} alt="" className="w-full h-32 object-cover" />
                    {idx === 3 && post.images.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white">
                        +{post.images.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-1 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{post.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-500"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comments}</span>
            </button>

            <button className="flex items-center space-x-1 text-gray-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          </div>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center space-x-1 ${isSaved ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <svg className="w-5 h-5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 py-3 bg-gray-50 border-t">
          {/* Add comment form */}
          <div className="flex space-x-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">U</span>
            </div>
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-white rounded-full px-4 py-2 text-sm border focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Comments list */}
          <div className="space-y-4">
            {post.commentList?.map((comment, idx) => (
              <div key={idx} className="flex space-x-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{comment.author[0]}</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg px-4 py-2">
                    <p className="font-medium text-sm">{comment.author}</p>
                    <p className="text-sm text-gray-600">{comment.text}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <button>Like</button>
                    <button>Reply</button>
                    <span>{comment.timeAgo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Feed = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated posts data
  useEffect(() => {
    const fetchPosts = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPosts([
        {
          id: 1,
          type: 'skill-share',
          category: 'Skill Share',
          author: {
            name: 'Sarah Chen',
            isVerified: true
          },
          title: 'Teaching Basic Gardening Skills',
          content: 'Would love to share my gardening knowledge! I can teach basics of growing vegetables and maintaining a small garden. Perfect for beginners.',
          location: 'Downtown Community Garden',
          timeAgo: '2h ago',
          tags: ['gardening', 'sustainability', 'learning'],
          likes: 24,
          comments: 8,
          commentList: [
            {
              author: 'Mike Wilson',
              text: 'This is exactly what I was looking for! When are you available?',
              timeAgo: '1h ago'
            }
          ]
        },
        {
          id: 2,
          type: 'playdate',
          category: 'Playdate',
          author: {
            name: 'John Miller',
            isVerified: false
          },
          title: 'Weekend Playdate at Central Park',
          content: 'Looking for playmates for my 5-year-old son who loves outdoor activities. We\'ll be at Central Park playground this Saturday.',
          location: 'Central Park',
          timeAgo: '4h ago',
          tags: ['kids', 'outdoors', 'weekend'],
          likes: 15,
          comments: 6,
          images: ['/api/placeholder/400/300']
        }
        // Add more sample posts...
      ]);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Feed Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Community Feed</h1>
        <p className="text-gray-600">See what's happening in your neighborhood</p>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <CategoryFilter 
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Posts Feed */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;