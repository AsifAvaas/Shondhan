import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Signup() {
  const navigate=useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
    const [msg, setMsg] = useState("");
    const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form)
      if(form.password !==form.confirmPassword){
        alert("password dont match")
      }
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        {
          userName:form.name,
          email: form.email,
          password: form.password,
        }
      );
      console.log(response.data)
      // Handle success (status 201)
      if (response.status === 201 || response.data.success) {
       
        navigate("/login"); // Redirect to home page on success
      }
    } catch (error) {
      // Handle error (status 400)
      console.log(error)
      if (error.response && error.response.status === 400) {
        setErr("Login failed. Please check your credentials.");
        setMsg("");
      } else {
        setErr("An unexpected error occurred. Please try again.");
        setMsg("");
      }
    }
  };





  const onchange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="flex flex-col lg:flex-row w-full h-screen">
        {/* Left Section - Form */}
        <div className="w-full flex items-center justify-center p-6 lg:w-1/2">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-700 sm:text-3xl md:text-4xl">
                Sign Up
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Create your account to get started.
              </p>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onchange}
                  className="mt-1 w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-[#000022]"
                  required
                />
              </div>

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
                  className="mt-1 w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-[#000022]"
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onchange}
                  className="mt-1 w-full p-2 rounded-md bg-gray-100 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-[#000022]"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-[#000022] text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Create an account
                </button>
              </div>

              <div className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-[#E28413] hover:underline">
                  Log in
                </Link>
              </div>
            </form>

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const userData = jwtDecode(credentialResponse.credential);
                  console.log(userData); // Handle Google sign-up data
                }}
                onError={() => {
                  console.log("Google Signup Failed");
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

export default Signup;