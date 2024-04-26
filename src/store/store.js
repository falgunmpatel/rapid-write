import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'
import postSlice, { fetchPosts } from './postSlice';
import databaseService from '../appwrite/database';

const store = configureStore({
    reducer: {
        auth: authSlice,
        //TODO: Add post reducers here //COMPLETED
        post: postSlice
    }
});


//Initial State Fetch
store.dispatch(fetchAllPosts());

function fetchAllPosts(){
    return async (dispatch) => {
        const posts = await databaseService.getPosts();
        if(posts){
            dispatch(fetchPosts(posts.documents));
        }
    }
}

export default store;