import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import storageService from "../appwrite/storage";
import { deletePost } from "../store/postSlice";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      // databaseService.getPost(slug).then((post) => {
      //   if (post) setPost(post);
      //   else navigate("/");
      // });
      const post = posts.find((post) => post.$id === slug);
      if (post) setPost(post);
      else navigate("/");
    } else navigate("/");
  }, [slug, navigate]);

  const handleDeletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        dispatch(deletePost(post.$id));
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container className={"max-w-full"}>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 h-[400px]">
          <img
            src={storageService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl  object-cover w-full"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={handleDeletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-4xl font-bold text-sky-200">{post.title}</h1>
        </div>
        <div className="browser-css text-sky-200">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
