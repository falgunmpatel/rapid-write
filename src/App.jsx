import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from './appwrite/auth';
import './App.css'
import { login, logout } from "./store/authSlice";
import {Header, Footer} from './components/index';
import { Outlet } from "react-router-dom";
import databaseService from "./appwrite/database";
import { fetchPosts } from "./store/postSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.auth.status);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData }));
        } else {
          dispatch(logout());
        }
      })
      .then(() => {
        databaseService.getPosts().then((posts) => {
          if (posts) {
            dispatch(fetchPosts(posts.documents));
          }
        });
      })
      .catch((error) => {
        console.log("App :: useEffect :: error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isUserLoggedIn]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gradient-to-b from-[#070117] via-[#0c0228] to-[#070117]">
      <div className="w-full">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
