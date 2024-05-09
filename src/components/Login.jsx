import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center w-full max-w-6xl my-8 p-8 mx-auto gap-8">
      <div className={`mx-auto w-full max-w-md bg-[#070448] rounded-xl p-10`}>
        <div className="mb-2 flex justify-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-sky-200 h-[240px]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-sky-200/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <div className="text-red-600 mt-8 text-center">{error}</div>}
      </div>
      <form className="mt-8 max-w-md w-full" onSubmit={handleSubmit(login)}>
        <div className="flex flex-col gap-8">
          <Input
            type="email"
            label="Email: "
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />
          <Input
            type="password"
            label="Password: "
            placeholder="Enter your password"
            {...register("password", {
              required: true,
            })}
          />
          <Button type="submit" className="w-full py-4 mt-4">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
