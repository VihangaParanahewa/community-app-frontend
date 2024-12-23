import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
  // src/pages/NotFound.js
  function NotFound() {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link 
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    );
  }

  export default NotFound;