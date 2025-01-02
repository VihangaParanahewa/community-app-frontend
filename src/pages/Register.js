
// src/pages/Register.js
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useRegistration } from '../hooks/useRegistration';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    interests: '',
    bio: ''
  });
  const { isRegistered, error, isPending, signup} = useRegistration()

  // Effect to reset form if user registered
  useEffect(() => {
    if (isRegistered) {
      setFormData({
        name: '',
        email: '',
        password: '',
        location: '',
        interests: '',
        bio: ''
      });
    }
  }, [isRegistered]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    await signup(formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Join ConnectLocal</h2>
        <p className="text-gray-600 text-center mb-8">
          Create an account to connect with your community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="Your neighborhood or area"
              value={formData.location}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., gardening, reading, cooking"
              value={formData.interests}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, interests: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={3}
              placeholder="Tell us a bit about yourself..."
              value={formData.bio}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          {!isPending && <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Create Account
          </button>}
          {isPending && <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" disabled>
            Loading .....
          </button>}
          {error && (
              <p style={{ backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' }}>
                {error}
              </p>
          )}
          {isRegistered && (
              <p style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>
                User Registered Successfully !
              </p>
          )}
        </form>

        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;