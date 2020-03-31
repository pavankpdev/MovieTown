import React from "react";

const CommentsComponent = ({ avatar, name, comment, ...props }) => {
  return (
    <div className="mt-12 ml-6">
      <div className="flex items-center">
        <img className="rounded-full shadow-lg" src={avatar} alt="avatar" />
        <h3 className="ml-2 text-xs font-bold tracking-wider">{name}</h3>
      </div>
      <div className="ml-10 mr-3">
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default CommentsComponent;
