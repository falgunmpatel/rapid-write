import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      const { slug, ...dbPost } = action.payload;
      state.posts.push({
        $id: slug,
        title: dbPost.title,
        content: dbPost.content,
        status: dbPost.status,
        featuredImage: dbPost.featuredImage,
        userId: dbPost.userId,
      });
    },
    editPost: (state, action) => {
      const { slug, ...dbPost } = action.payload;
      const post = state.posts.find((post) => post.$id === slug);
      if (post) {
        post.title = dbPost.title;
        post.content = dbPost.content;
        post.status = dbPost.status;
        post.featuredImage = dbPost.featuredImage;
      }
    },
    deletePost: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.$id !== postId);
    },
  },
});

export const { addPost, editPost, deletePost, fetchPosts } = postSlice.actions;

export default postSlice.reducer;