import './App.css';
import '../src/styles/animations.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import QuestsPage from './pages/QuestsPage';
import ProfilePage from './pages/ProfilePage';
import DevDemo from './pages/DevDemo';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-white">
        {/* Navigation Bar */}
        <nav className="border-b-2 border-eco-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-eco-900">
              🌿 EcoQuest
            </Link>

            {/* Navigation Links */}
            <div className="flex gap-6">
              <Link
                to="/"
                className="font-semibold text-gray-700 transition-colors hover:text-eco-600"
              >
                Home
              </Link>
              <Link
                to="/quests"
                className="font-semibold text-gray-700 transition-colors hover:text-eco-600"
              >
                Quests
              </Link>
              <Link
                to="/profile"
                className="font-semibold text-gray-700 transition-colors hover:text-eco-600"
              >
                Profile
              </Link>
              <Link
                to="/login"
                className="rounded-md bg-eco-500 px-4 py-1 font-semibold text-white transition-colors hover:bg-eco-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            {/* Home Route */}
            <Route path="/" element={<Home />} />

            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Quests Route - Updated to use new QuestsPage */}
            <Route path="/quests" element={<QuestsPage />} />

            {/* Profile Route - Updated to use new ProfilePage */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Dev Demo Route */}
            <Route path="/dev-demo" element={<DevDemo />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center px-4 py-20">
                  <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
                    <p className="mb-8 text-gray-600">Page not found</p>
                    <Link
                      to="/"
                      className="inline-block rounded-md bg-eco-500 px-6 py-2 font-semibold text-white hover:bg-eco-600"
                    >
                      Go Home
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="border-t-2 border-eco-200 bg-eco-900 px-4 py-8 text-center text-white">
          <p>© 2026 EcoQuest. Making sustainability fun, one quest at a time. 🌍</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
