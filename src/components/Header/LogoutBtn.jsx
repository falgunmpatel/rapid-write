import React from 'react'
import { useDispatch } from 'react-redux';
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

  return (
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-sky-700 text-sky-200 rounded-full text-xs sm:text-lg"
      onClick={logoutHandler}
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn