// import React, { useEffect, useState } from "react";
// import databaseService from "../appwrite/database";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const posts = useSelector((state) => state.post.posts);
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   databaseService.getPosts().then((posts) => {
  //     if (posts) {
  //       setPosts(posts.documents);
  //     }
  //   });

  // }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-sky-200 hover:text-sky-300">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } 
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

export default Home;
