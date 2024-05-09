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

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="sm:text-xl md:text-2xl text-center font-bold text-sky-200 hover:text-sky-300">
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
        <div className="flex flex-row flex-wrap py-4">
          {posts?.map((post) => (
            <div key={post.$id} className="p-2 sm:w-1/2 lg:w-1/3 2xl:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
