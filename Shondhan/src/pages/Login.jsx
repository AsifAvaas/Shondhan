import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle email/password login
  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log(form)
      const response = await axios.post(
        `http://localhost:8000/auth/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      // Handle success (status 201)
      if (response.status === 201 && response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("profilePic", response.data.profilePic);
        navigate("/"); // Redirect to home page on success
      }
    } catch (error) {
      // Handle error (status 400)
      if (error.response && error.response.status === 400) {
        setErr("Login failed. Please check your credentials.");
        setMsg("");
      } else {
        setErr("An unexpected error occurred. Please try again.");
        setMsg("");
      }
    }
  };

  // Handle Google login
  const googleData = async (e) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_Route}/auth/google/login`,
        {
          userName: e.name,
          email: e.email,
          profilePic: e.picture,
        }
      );

      // Handle success (status 201)
      if (response.status === 201 && response.data.success) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("profilePic", response.data.profilePic);
        navigate("/home"); // Redirect to home page on success
      }
    } catch (error) {
      // Handle error (status 400)
      if (error.response && error.response.status === 400) {
        setErr("Google login failed. Please try again.");
        setMsg("");
      } else {
        setErr("An unexpected error occurred. Please try again.");
        setMsg("");
      }
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        {/* Left Section - Form */}
        <div className="w-full flex items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl md:text-4xl">
                Login
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Log in to your account to continue.
              </p>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={onchange}
                  className="mt-1 w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={onchange}
                  className="mt-1 w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-[#000022]"
                  required
                />
              </div>

              {msg && (
                <div className="p-2 bg-green-100 rounded-md text-green-700 text-center">
                  {msg}
                </div>
              )}

              {err && (
                <div className="p-2 bg-red-100 rounded-md text-red-700 text-center">
                  {err}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#000022] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-[#000022]"
                >
                  Log in
                </button>
              </div>

              <div className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link to="/signup" className="text-[#E28413] hover:underline">
                  Sign up
                </Link>
              </div>
            </form>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const userData = jwtDecode(credentialResponse.credential);
                  googleData(userData);
                }}
                onError={() => {
                  console.log("Google Login Failed");
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Image */}
        <div
          className="hidden lg:flex h-full w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.png')" }}
        ></div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;