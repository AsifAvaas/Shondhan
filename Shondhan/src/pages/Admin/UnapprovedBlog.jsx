import { meta } from "@eslint/js";
import axios from "axios";
import { useEffect, useState } from "react";

const UnApprovedBlogs = () => {
  const [unapprovedBlogs, setUnapprovedBlogs] = useState([]);
  useEffect(() => {
    async function fetchUnapprovedBloges() {
      return axios.get(`${import.meta.env.VITE_Backend_Route}/api/reports/all`);
    }
    const UnapprovedBlogs = fetchUnapprovedBloges();
    setUnapprovedBlogs(UnapprovedBlogs);
  });
  return (
    <div className="bg-gray-800 p-6">
      <h2 className="text-white text-xl mb-4">Blog Management</h2>
      {unapprovedBlogs.map((blog)=>{
        <div>{reportTitle}</div>
      })}
    </div>
  );
};

export default UnApprovedBlogs;
