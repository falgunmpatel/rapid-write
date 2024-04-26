import React from "react";
import { Link } from "react-router-dom";
import storageService from "../appwrite/storage";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full border-sky-200 bg-sky-200 hover:bg-opacity-90  rounded-lg shadow-md  transition ease-in-out delay-200 duration-300 hover:-translate-y-1">
        <div className="flex flex-col gap-2 w-full justify-center">
          <div className="w-full h-56">
            <img
              src={storageService.getFilePreview(featuredImage)}
              alt={title}
              className="rounded-t-lg object-fill w-full h-full"
            />
          </div>
          <div className="py-2 px-2">
            <h2 className="text-xl font-bold line-clamp-2">{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
