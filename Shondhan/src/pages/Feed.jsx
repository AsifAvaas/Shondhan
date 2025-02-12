import React, { useState, useEffect, useRef } from "react";
import Blogs from "../Components/Blogs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrimeFeed() {
  const [allBlogs, setAllBlogs] = useState([]);
  
 
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/reports/all"
      );
      if (response.status === 201) {
        console.log(response.data.reports)
        setAllBlogs(response.data.reports);

       
      } else {
        console.log(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch initial set of blogs when component mounts
  }, []); // Fetch new blogs when page changes



  return (
    <div className="flex justify-center">

<div className="container w-full max-w-5xl">
        <div className="p-1 m-2 sm:p-3">
          <div
            onClick={() => navigate("/blogs/new")}
            className="w-full p-3 h-20 border border-gray-500 bg-gray-100 rounded-xl text-gray-400 hover:cursor-pointer"
            placeholder="Add a new Blog"
            name="newBlog"
          >
            Add a new Blog...
          </div>
        </div>

        {allBlogs.length > 0 ? (
          allBlogs.map((blog, index) => (
            <Blogs
              key={blog._id}
              blogId={blog._id}
              blogName={blog.reportTitle}
              blogBody={blog.reportDescription}
              blogPicture={blog.reportPic}
              authorName={blog.authorId?.userName} 
              likes={blog.likeCount}
              disLikes={blog.dislikeCount}
            />
          ))
        ) : (
          <div>No blogs are present</div>
        )}

       

      
      </div>
    </div>
  );
}

export default CrimeFeed;
