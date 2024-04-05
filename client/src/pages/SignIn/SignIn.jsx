import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Button } from "@tremor/react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="flex flex-col gap-2 mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Email address"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
              error={errors.email && errors.email.message}
            />
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
              {...register("password", { required: "Password is required" })}
              error={errors.password && errors.password.message}
            />
          </div>

          <div className="flex items-center justify-between self-end">
            <div className="text-sm">
              <Link
                to="/forget-password"
                className="font-medium text-green hover:text-green"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 bg-green hover:bg-white border-green hover:border-green btn-transition hover:text-green">
            Sign in
          </Button>
        </form>
        <p className="text-sm font-mulish mt-8 w-full text-center text-slate-700">Don't have any account? <Link to={'/sign-up'} className="hover:text-green">Sign Up</Link>.</p>
      </div>
    </div>
  );
};

export default SignIn;