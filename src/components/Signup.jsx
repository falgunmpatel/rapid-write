import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const signup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
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
    <div className="flex items-center w-full max-w-6xl my-8 p-8 mx-auto gap-8">
      <div className={`mx-auto w-full max-w-md bg-[#070448] rounded-xl p-10`}>
        <div className="mb-2 flex justify-center">
          <Logo width="100%" />
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-sky-200 h-[240px]">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-sky-200/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <div className="text-red-600 mt-8 text-center">{error}</div>}
      </div>
      <form className="mt-8 max-w-md w-full" onSubmit={handleSubmit(signup)}>
        <div className="flex flex-col gap-8">
          <Input
            type="text"
            label="Full Name: "
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />
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
            {...register("password", { required: true })}
          />
          <Button type="submit" className={"w-full py-4 mt-4"}>
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
