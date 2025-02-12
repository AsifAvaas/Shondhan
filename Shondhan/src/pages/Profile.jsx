import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Profile = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState({
        userName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        profilePic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
        isVerified: false, // Default to false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showVerificationForm, setShowVerificationForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(user.phone);
    const [editName, setEditName] = useState(user.userName);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [image, setImage] = useState(null);

    // Dummy data for reports and events
    const reports = [
        { id: 1, title: 'Report 1', date: '2023-10-01', description: 'This is the first report.' },
        { id: 2, title: 'Report 2', date: '2023-10-05', description: 'This is the second report.' },
        { id: 3, title: 'Report 3', date: '2023-10-10', description: 'This is the third report.' },
        { id: 4, title: 'Report 4', date: '2023-10-10', description: 'This is the fourth report.' },
    ];

    const events = [
        { id: 1, title: 'Event 1', date: '2023-10-15', location: 'New York' },
        { id: 2, title: 'Event 2', date: '2023-10-20', location: 'San Francisco' },
        { id: 3, title: 'Event 3', date: '2023-10-25', location: 'Los Angeles' },
        { id: 4, title: 'Event 4', date: '2023-10-25', location: 'Los Angeles' },
    ];

    // Function to initiate phone verification
    const handleSendVerification = async () => {
        try {
            const response = await axios.post('/api/send-verification', { phone: phoneNumber });
            if (response.status === 200 && response.data.success) {
                alert('Verification request sent successfully. Check your phone for OTP.');
                setShowVerificationForm(false);
            } else {
                alert('Failed to send verification request.');
            }
        } catch (err) {
            alert('An error occurred while sending the verification request.');
        }
    };

    // Function to handle profile update
    const handleProfileUpdate = async () => {
        try {
            const response = await axios.put('/api/update-profile', {
                userId,
                userName: editName,
                oldPassword,
                newPassword,
            });
            if (response.status === 200 && response.data.success) {
                setUser((prevUser) => ({ ...prevUser, userName: editName }));
                alert('Profile updated successfully.');
                setShowEditForm(false);
            } else {
                alert('Failed to update profile.');
            }
        } catch (err) {
            alert('An error occurred while updating the profile.');
        }
    };

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">User Profile:</h1>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-cover mx-auto flex items-center">
                <div className="flex-shrink-0">
                    <img
                        src={user.profilePic}
                        alt="Profile"
                        className="w-64 h-64 rounded-full object-cover border-4 border-gray-300"
                    />
                </div>
                <div className="ml-6 flex-grow">
                    <h2 className="text-2xl font-bold mt-4 mx-5">{user.userName}</h2>
                    <p className="text-gray-600 mx-5">Contact: {user.phone}</p>

                    {/* Verification Status */}
                    <div className="mt-4">
                        {user.isVerified ? (
                            <span className="text-green-600 font-semibold">Verified</span>
                        ) : (
                            <button
                                className="w-50 bg-[#000022] text-white px-4 py-2 mx-5 rounded-lg hover:bg-blue-600"
                                onClick={() => setShowVerificationForm(true)}
                            >
                                Verify Phone Number
                            </button>
                        )}
                    </div>

                    {/* Verification Form */}
                    {showVerificationForm && (
                        <div className="mt-4 mx-5">
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter your phone number"
                                className="w-full p-2 border rounded-lg mb-2"
                            />
                            <button
                                className="w-50 bg-[#000022] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                onClick={handleSendVerification}
                            >
                                Send Verification
                            </button>
                        </div>
                    )}

                    <button
                        className="w-50 mt-4 bg-[#E28413] text-white px-4 py-2 mx-5 rounded-lg hover:bg-amber-800"
                        onClick={() => setShowEditForm(true)}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="w-50 mt-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                        onClick={() => navigate('/')}
                    >
                        Log Out
                    </button>
                </div>
            </div>

            {/* Edit Profile Form */}
            {showEditForm && (
                <div className="mt-8 max-w-cover mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Edit Profile:</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Old Password:</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">New Password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <h2 className="my-4 text-2xl">Add a new photo</h2>
                        <input
                            type="file"
                            className="mb-2 file-input file-input-bordered bg-white w-full max-w-xs"
                            onChange={onImageChange}
                        />
                        <button
                            className="w-50 bg-[#000022] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={handleProfileUpdate}
                        >
                            Save Changes
                        </button>
                        <button
                            className="w-50 ml-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                            onClick={() => setShowEditForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="mt-8 max-w-cover mx-auto">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">Profile Information:</h2>
                <div className="text-lg bg-white p-6 rounded-lg shadow-md">
                    <p className="mb-2 text-gray-700"><strong>Name:</strong> {user.userName}</p>
                    <p className="mb-2 text-gray-700"><strong>Email:</strong> {user.email}</p>
                    <p className="mb-2 text-gray-700"><strong>Mobile No:</strong> {user.phone}</p>
                </div>
            </div>

            {/* My Reports Slider */}
            <div className="mt-8 max-w-cover mx-auto">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">My Reports</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {reports.map((report) => (
                        <SwiperSlide key={report.id}>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                                <p className="text-gray-600 mb-2">{report.date}</p>
                                <p className="text-gray-700">{report.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* My Events Slider */}
            <div className="mt-8 max-w-cover mx-auto">
                <h2 className="text-3xl font-bold text-gray-700 mb-4">My Events</h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={3}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {events.map((event) => (
                        <SwiperSlide key={event.id}>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                <p className="text-gray-600 mb-2">{event.date}</p>
                                <p className="text-gray-700">{event.location}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Profile;