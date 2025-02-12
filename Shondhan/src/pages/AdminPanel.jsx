import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import UnApprovedBlogs from './Admin/UnapprovedBlog';
// Placeholder components for each section
const Dashboard = () => (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Users', value: '1,234' },
        { label: 'Total Blogs', value: '456' },
        { label: 'Total Comments', value: '2,789' },
        { label: 'Reports', value: '45' }
      ].map((stat, index) => (
        <div key={index} className="bg-gray-800 p-6 border-l-4 border-blue-600">
          <p className="text-gray-400 text-sm">{stat.label}</p>
          <p className="text-white text-2xl font-semibold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
    
    {/* Recent Activity */}
    <div className="bg-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700">
        <h2 className="text-white text-lg">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="px-6 py-4 flex justify-between items-center hover:bg-gray-750">
            <div className="text-gray-300">
              <p>User action description here</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <button className="text-blue-500 hover:text-blue-400">View</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Users = () => (
  <div className="bg-gray-800 p-6">
    <h2 className="text-white text-xl mb-4">Users Management</h2>
  </div>
);



const Comments = () => (
  <div className="bg-gray-800 p-6">
    <h2 className="text-white text-xl mb-4">Comments Management</h2>
  </div>
);

const Reports = () => (
  <div className="bg-gray-800 p-6">
    <h2 className="text-white text-xl mb-4">Reports Management</h2>
  </div>
);

const Settings = () => (
  <div className="bg-gray-800 p-6">
    <h2 className="text-white text-xl mb-4">Settings</h2>
  </div>
);

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin' },
    { id: 'users', label: 'Users', icon: '👥', path: '/admin/users' },
    { id: 'blogs', label: 'Unapproved Reports', icon: '📝', path: '/admin/unapprovedblogs' },
    { id: 'reports', label: 'All Reports', icon: '📋', path: '/admin/reports' },
  ];

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/admin') return 'dashboard';
    return path.split('/').pop();
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 fixed h-full">
        {/* Logo/Brand */}
        <div className="h-16 flex items-center px-6 border-b border-gray-700">
          <span className="text-xl text-white font-semibold">Admin Panel</span>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {menuItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 transition-colors ${
                getCurrentPage() === item.id ? 'bg-gray-700' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <button 
            onClick={() => navigate('/logout')}
            className="w-full px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors flex items-center"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl text-white font-semibold">
            {menuItems.find(item => item.id === getCurrentPage())?.label}
          </h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              New Blog
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              New User
            </button>
          </div>
        </div>

        {/* Nested Routes */}
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="unapprovedblogs" element={<UnApprovedBlogs />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;