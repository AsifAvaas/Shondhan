import React, { useState } from 'react';
import { Megaphone, Phone, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Map from '../Components/Map';

const Home = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([
    { username: 'Alice', posts: 120 },
    { username: 'Bob', posts: 98 },
    { username: 'Charlie', posts: 85 }
  ]);

  return (
    <div className="flex-1">
      <Hero />

      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <button 
            className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate('/reports')}
          >
            <div className="flex justify-center mb-4">
              <Megaphone size={60} className="text-[#000022]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Report</h3>
            <p className="text-gray-800 p-4">
              Report crimes with detailed descriptions, evidence, and locations to ensure swift action and community awareness.
            </p>
          </button>

          <button 
            className="text-center p-6 bg-[#000022] text-[#FBF5F3] rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate('/feed')}
          >
            <div className="flex justify-center mb-4">
              <Crown size={60} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Crime Feed</h3>
            <p className="p-4">
              Take a look at our crime feed providing personalized information from users only.
            </p>
          </button>

          <button 
            className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition transform hover:scale-105"
            onClick={() => navigate('/emergency-contacts')}
          >
            <div className="flex justify-center mb-4">
              <Phone size={60} className="text-[#311B08]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Call for help</h3>
            <p className="text-gray-600 p-4">
              Call for immediate help in emergencies and report crimes to ensure prompt intervention and safety.
            </p>
          </button>
        </div>
      </div>

      <div className="bg-gray-100 py-16 my-10">
        <Map />
      </div>

      <div className="bg-gray-100 container mx-auto px-30 py-10">
        <h2 className="text-5xl font-bold text-center mb-8">Leaderboard</h2>
        <p className="text-gray-600 text-center mb-8 text-xl">
          Have a look at the top contributors in our community who are actively reporting crimes and organizing events.
        </p>
        <div className="flex justify-center gap-6">
          {leaderboard.length > 0 ? (
            leaderboard.map((user, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 w-80 flex items-center gap-4">
                <img 
                  src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"} 
                  alt="User Avatar" 
                  className="w-20 h-20 rounded-full object-cover" 
                />
                <div>
                  <span className="text-xl font-bold">#{index + 1}</span>
                  <h3 className="text-2xl font-semibold mt-2">{user.username}</h3>
                  <p className="text-gray-500 mt-1">{user.posts} posts</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No contributors yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;