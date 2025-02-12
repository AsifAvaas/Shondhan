import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Blogs from "../Components/Blogs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CrimeFeed() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [filters, setFilters] = useState({
    author: "",
    search: "",
    minLikes: 0,
    maxLikes: 1000,
    sortBy: "latest",
    categories: {
      crime: false,
      news: false,
      investigation: false,
      report: false
    }
  });

  const navigate = useNavigate();

  const clearFilters = () => {
    setFilters({
      author: "",
      search: "",
      minLikes: 0,
      maxLikes: 1000,
      sortBy: "latest",
      categories: {
        crime: false,
        news: false,
        investigation: false,
        report: false
      }
    });
    setPage(1);
    setAllBlogs([]);
  };

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_Backend_Route}/api/blogs/all`,
        {
          params: {
            page,
            limit: 5,
            author: filters.author,
            minLikes: filters.minLikes,
            maxLikes: filters.maxLikes,
            sortBy: filters.sortBy,
            categories: Object.keys(filters.categories).filter(key => filters.categories[key]).join(',')
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const newBlogs = response.data.blogs;
        setTotalBlogs(response.data.totalBlogs);
        setAllBlogs((prevBlogs) => {
          const blogIds = prevBlogs.map((blog) => blog._id);
          const filteredBlogs = newBlogs.filter(
            (blog) => !blogIds.includes(blog._id)
          );
          setHasMore(filteredBlogs.length < response.data.totalBlogs);
          return [...prevBlogs, ...filteredBlogs];
        });
      } else {
        console.log(response.data.error);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchBlogs();
    }
  }, [page, filters]);

  const lastBlogElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const lowerCaseQuery = filters.search.toLowerCase();
      return (
        blog.blogBody.toLowerCase().includes(lowerCaseQuery) ||
        blog.blogName.toLowerCase().includes(lowerCaseQuery) ||
        blog.authorName.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [allBlogs, filters.search]);

  return (
    <div className="flex justify-between min-h-screen">
      {/* Enhanced Sidebar */}
      <div className="w-1/4 bg-white sticky top-20 h-screen overflow-y-auto border-r">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
          <button 
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <span className="text-lg">×</span>
            Clear
          </button>
        </div>

        {/* Search Filter */}
        <div className="mb-6">
          <label className="text-gray-800 text-sm block mb-2">Search Blogs</label>
          <input
            type="text"
            placeholder="Search in blogs..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Author Filter */}
        <div className="mb-6">
          <label className="text-gray-800 text-sm block mb-2">Author</label>
          <input
            type="text"
            placeholder="Filter by author..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
          />
        </div>

        {/* Likes Range */}
        <div className="mb-6">
          <label className="text-gray-800 text-sm block mb-2">Likes Range</label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={filters.minLikes}
              onChange={(e) => setFilters({ ...filters, minLikes: parseInt(e.target.value) || 0 })}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              value={filters.maxLikes}
              onChange={(e) => setFilters({ ...filters, maxLikes: parseInt(e.target.value) || 1000 })}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <label className="text-gray-800 text-sm block mb-2">Categories</label>
          <div className="space-y-2">
            {Object.entries(filters.categories).map(([category, checked]) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  checked={checked}
                  onChange={() => 
                    setFilters({
                      ...filters,
                      categories: {
                        ...filters.categories,
                        [category]: !checked
                      }
                    })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={category} className="ml-2 text-sm text-gray-700 capitalize">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="mb-6">
          <label className="text-gray-800 text-sm block mb-2">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="most-liked">Most Liked</option>
            <option value="least-liked">Least Liked</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-5xl bg-gray-800 p-6 rounded-xl">
            <div
              onClick={() => navigate("/blogs/new")}
              className="w-full p-4 h-20 bg-blue-600 text-white rounded-lg text-center cursor-pointer hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              Add a new Blog...
            </div>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blogs, index) => {
            if (filteredBlogs.length === index + 1) {
              return (
                <div ref={lastBlogElementRef} key={blogs._id}>
                  <Blogs
                    blogId={blogs._id}
                    blogName={blogs.blogName}
                    blogBody={blogs.blogBody}
                    blogPicture={blogs.blogPicture}
                    authorName={blogs.authorName}
                    likes={blogs.likeCount}
                    disLikes={blogs.dislikeCount}
                  />
                </div>
              );
            } else {
              return (
                <Blogs
                  key={blogs._id}
                  blogId={blogs._id}
                  blogName={blogs.blogName}
                  blogBody={blogs.blogBody}
                  blogPicture={blogs.blogPicture}
                  authorName={blogs.authorName}
                  likes={blogs.likeCount}
                  disLikes={blogs.dislikeCount}
                />
              );
            }
          })
        ) : (
          <div className="text-white text-center">No blogs found</div>
        )}

        {loading && (
          <div className="flex justify-center my-8">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CrimeFeed;