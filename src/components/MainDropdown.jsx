import { Link, useNavigate, useLocation } from 'react-router-dom';
// src/components/Navbar/MainDropdown.jsx
function MainDropdown({ category, onClose }) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.description}</p>
        </div>
        <div className="space-y-1">
          {category.subcategories.map((sub) => (
            <Link
              key={sub.path}
              to={sub.path}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              <span className="text-xl">{sub.icon}</span>
              <div>
                <span className="text-gray-900">{sub.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
  

  export default MainDropdown;