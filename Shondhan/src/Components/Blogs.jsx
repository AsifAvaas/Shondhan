import React from "react";

function Blogs(props) {
  return (
    <div className="p-1 m-2 sm:p-3">
      <div className="w-full border border-gray-500 rounded-lg sm:rounded-lg p-1 bg-gray-200">
        {props.blogPicture && (
          <img
            src={props.blogPicture}
            alt="Blog Image"
            className="w-full h-auto p-2 rounded-lg"
          />
        )}
        <div className="p-2">
          <h1 className="font-bold text-lg">{props.blogName}</h1>
          <h3 className="text-gray-400">{props.authorName}</h3>
          <p className="text-gray-200">{props.blogBody}</p>

          <div className="flex">
            <span className="flex border w-min p-2 my-3 rounded-3xl">
              <div className="mr-2">👍 {props.likes}</div>
              <div>👎 {props.disLikes}</div>
            </span>
            <span className="flex border w-min p-2 mx-5 my-3 rounded-3xl">
              💬 Comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;