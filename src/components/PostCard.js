// src/components/PostCard.js
function PostCard({ post }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        {/* Author Info */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold">
              {post.author.name[0]}
            </span>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.location} • {post.createdAt}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                post.type === 'help_request' 
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {post.type === 'help_request' ? 'Help Needed' : 'Offering Help'}
              </span>
            </div>
  
            <h2 className="text-lg font-medium mt-3">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.description}</p>
  
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
  
            {/* Actions */}
            <div className="flex gap-4 mt-4 pt-4 border-t">
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Respond
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default PostCard;