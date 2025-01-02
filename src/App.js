// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingSpinner from './components/LoadingSpinner';
import NotFound from './pages/NotFound';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Profile from './pages/Profile';
import Groups from './pages/groups/Groups';
import CreatePlaydate from './pages/CreatePlaydate';  
import Playdates from './pages/kids/playdates/PlayDates';
import SkillShare from './pages/skill-share/SkillShare';
import TeachSkill from './pages/skill-share/TeachSkill';
import LearnSkill from './pages/skill-share/LearnSkill';
import PlaydateSearch from './pages/kids/playdates/PlaydateSearch';
import HostPlaydate from './pages/kids/playdates/HostPlaydate';
import {useAuthContext} from "./context/AuthContext";
// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, loading }) => {
  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const authContext =  useAuthContext();

  // Check auth status on app load
  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage or session for auth token
      const token = localStorage.getItem('auth_token');
      if (token) {
        setIsAuthenticated(true);
        // You can add API call to get user data here
        setUser(authContext.currentUser);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <main className="pb-12">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/" /> : 
                <Login setIsAuthenticated={setIsAuthenticated}/>
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/" /> : 
                <Register/>
              } 
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <CreatePost user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Groups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-share"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <SkillShare user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <Profile />
                </ProtectedRoute>
              }
            />
             <Route
              path="/skill-share/teach"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <TeachSkill />
                </ProtectedRoute>
              }
            />
              <Route
              path="/skill-share/learn"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
                  <LearnSkill />
                </ProtectedRoute>
              }
            />
           
            <Route
  path="/playdates"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
      <Playdates user={user} />
    </ProtectedRoute>
  }
/>
<Route
  path="/playdates/find"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
      <PlaydateSearch />
    </ProtectedRoute>
  }
/>
<Route
  path="/playdates/host"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated} loading={loading}>
      <HostPlaydate />
    </ProtectedRoute>
  }
/>


            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;