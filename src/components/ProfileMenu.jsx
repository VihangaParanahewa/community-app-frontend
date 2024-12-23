import { Link, useNavigate, useLocation } from 'react-router-dom';

// src/components/Navbar/ProfileMenu.jsx
function ProfileMenu({ user, onClose, onLogout }) {
    return (
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50">
        <div className="p-4 border-b border-gray-100">
          <p className="font-medium text-gray-900">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <div className="p-2">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={onClose}
          >
            Your Profile
          </Link>
          <Link
            to="/connections"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={onClose}
          >
            Your Connections
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            onClick={onClose}
          >
            Settings
          </Link>
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  export default ProfileMenu;