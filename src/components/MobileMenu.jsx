import { Link, useNavigate, useLocation } from 'react-router-dom';

// src/components/Navbar/MobileMenu.jsx
function MobileMenu({ navigationConfig, quickActions, isAuthenticated, user, onClose, onLogout }) {
    return (
      <div className="md:hidden py-4">
        {isAuthenticated ? (
          <>
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">{user?.name?.[0]}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user?.name}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>
            </div>
  
            {/* Quick Actions */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.id}
                    to={action.path}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                    onClick={onClose}
                  >
                    <span className="text-2xl mb-1">{action.icon}</span>
                    <span className="text-sm text-gray-700">{action.label}</span>
                  </Link>
                ))}
              </div>
            </div>
  
            {/* Navigation Categories */}
            <div className="py-2">
              {Object.values(navigationConfig).map((category) => (
                <div key={category.id} className="px-4 py-2">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">{category.icon}</span>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="space-y-1 pl-8">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className="block py-2 text-gray-600 hover:text-blue-600"
                        onClick={onClose}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
  
            {/* Profile Links */}
            <div className="border-t border-gray-200 pt-2">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600"
                onClick={onClose}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-gray-600 hover:text-blue-600"
                onClick={onClose}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="px-4 py-3">
            <Link
              to="/login"
              className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={onClose}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    );
  }

  export default MobileMenu;