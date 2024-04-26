import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import './App.css'
import { login, logout } from "./store/authSlice";
import {Header, Footer} from './components/index';
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({ userData: userData }));
      } else {
        dispatch(logout());
      }

    })
    .catch((error) => {
      console.log("App :: useEffect :: error", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])

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

export default App
