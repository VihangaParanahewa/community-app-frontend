// src/components/Navbar/QuickActionsMenu.jsx
import { Link } from 'react-router-dom';

function QuickActionsMenu({ actions, onClose }) {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Quick Connect</h3>
        <p className="text-sm text-gray-500">Choose how you want to connect</p>
      </div>

      {/* Actions Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link
              key={action.id}
              to={action.path}
              className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 
                transition-colors border border-gray-100 hover:border-gray-200"
              onClick={onClose}
            >
              <span className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">
                {action.icon}
              </span>
              <span className="font-medium text-gray-900 mb-1">{action.label}</span>
              <span className="text-xs text-gray-500 text-center">{action.description}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 p-4 border-t border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Quick Tips</h4>
            <p className="text-xs text-blue-600 mt-1">
              You can also find more ways to connect through the specialized sections in the navigation menu.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Connections */}
      <div className="p-4 border-t border-gray-100">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Connections</h4>
        <div className="space-y-2">
          {[
            { name: 'Sarah Chen', action: 'Gardening Skills', time: '2 days ago' },
            { name: 'John Smith', action: 'Local Help', time: '3 days ago' }
          ].map((connection, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {connection.name[0]}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{connection.name}</p>
                <p className="text-xs text-gray-500">
                  {connection.action} • {connection.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <Link
            to="/connections"
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={onClose}
          >
            View All Connections
          </Link>
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-white rounded border border-gray-200 mr-1">⌘</kbd>
            <kbd className="px-2 py-1 bg-white rounded border border-gray-200 mr-1">K</kbd>
            to search
          </span>
          <span className="flex items-center">
            <kbd className="px-2 py-1 bg-white rounded border border-gray-200 mr-1">⌘</kbd>
            <kbd className="px-2 py-1 bg-white rounded border border-gray-200 mr-1">N</kbd>
            new post
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuickActionsMenu;