import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice'
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // TODO: Add post reducers here //COMPLETED
    post: postSlice,
  },
});


export default store;