/**
 * Home Page - Landing page with call to action
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Home page loaded');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-50 via-white to-eco-100">
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-eco-900 md:text-6xl">
            🌿 Welcome to EcoQuest
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Transform your daily actions into achievements and save the planet
          </p>
          <button
            onClick={() => navigate('/quests')}
            className="inline-block cursor-pointer rounded-lg bg-eco-500 px-8 py-3 font-semibold text-white transition-transform hover:scale-105 hover:bg-eco-600"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
          Why EcoQuest?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: '🎯',
              title: 'Complete Quests',
              description: 'Take eco-friendly actions and complete engaging quests',
            },
            {
              icon: '⭐',
              title: 'Earn XP',
              description: 'Gain experience points and level up your environmental impact',
            },
            {
              icon: '🏆',
              title: 'Prove It',
              description: 'Upload proof of your actions and join a community of changemakers',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="rounded-lg border-2 border-eco-200 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-900 px-4 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to make a difference?</h2>
        <p className="mb-8 text-eco-100">
          Join thousands of users taking meaningful action for the planet
        </p>
        <button
          onClick={() => navigate('/login')}
          className="inline-block cursor-pointer rounded-lg bg-white px-8 py-3 font-semibold text-eco-900 transition-transform hover:scale-105"
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
