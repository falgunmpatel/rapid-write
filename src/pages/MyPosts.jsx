import React, { useEffect, useState } from "react";
// import databaseService from '../appwrite/database'
import { Container, PostCard } from "../components/index";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const postsData = useSelector((state) => state.post.posts);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // databaseService.getPosts().then((posts) => {
    //     if(posts){
    //         setPosts(posts.documents)
    //     }
    // })
    let filteredPosts = [];
    console.log(postsData, ":::", userData);
    if (postsData && userData) {
      filteredPosts = postsData.filter((post) => post.userId === userData?.$id);
    }
    setPosts(filteredPosts);
  }, [postsData, userData?.$id]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 sm:w-1/2 lg:w-1/3 2xl:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
