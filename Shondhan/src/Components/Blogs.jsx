import React from "react";
import { ArrowUp as Like, ArrowDown as Dislike, MessageCircle as Comment } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Blogs(props) {
  const navigate = useNavigate();
  const text = props.blogBody;

  const words = text.split(" ");
  const isTruncated = words.length > 50;
  const truncatedText = isTruncated
    ? words.slice(0, 50).join(" ") + "..."
    : text;

  const blogDetails = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="w-full bg-white shadow-lg border border-gray-300 rounded-md flex flex-col">
        {props.blogPicture && (
          <img
            src={props.blogPicture}
            alt="Blog"
            className="w-full h-[200px] object-cover rounded-t-md"
          />
        )}
        <div className="p-4 flex flex-col space-y-3">
          <h1 className="font-semibold text-xl text-gray-800">{props.blogName}</h1>
          <h3 className="text-gray-600 text-sm">{props.authorName}</h3>
          <p className="text-gray-700 text-base">{truncatedText}</p>

          {isTruncated && (
            <span
              onClick={() => blogDetails(props.blogId)}
              className="text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
            >
              Read More
            </span>
          )}

          <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
            <div
              onClick={() => blogDetails(props.blogId)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="flex items-center space-x-1">
                <Like className="text-gray-500 hover:text-green-500" />
                <span className="text-gray-500 hover:text-green-500">{props.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Dislike className="text-gray-500 hover:text-red-500" />
                <span className="text-gray-500 hover:text-red-500">{props.disLikes}</span>
              </div>
            </div>

            <div
              onClick={() => blogDetails(props.blogId)}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Comment className="text-gray-500 hover:text-yellow-500" />
              <span className="text-gray-500 hover:text-yellow-500">Comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
