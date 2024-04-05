import React from "react";
import { useForm } from "react-hook-form";
import { TextInput, Button } from "@tremor/react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form
          className="flex flex-col gap-2 mt-8 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Full Name"
              type="text"
              autoComplete="name"
              required
              placeholder="Full Name"
              {...register("fullName", {
                required: "Full name is required",
                pattern: {
                  value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                  message: "Invalid full name format",
                },
              })}
              error={errors.fullName && errors.fullName.message}
            />
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Hospital Name"
              type="text"
              autoComplete="organization"
              required
              placeholder="Hospital Name"
              {...register("hospitalName", {
                required: "Hospital name is required",
              })}
              error={errors.hospitalName && errors.hospitalName.message}
            />
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Doctor's Degree"
              type="text"
              autoComplete="degree"
              required
              placeholder="Doctor's Degree"
              {...register("degree", {
                required: "Doctor's degree is required",
              })}
              error={errors.degree && errors.degree.message}
            />
          </div>
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
                  message: "Invalid email address",
                },
              })}
              error={errors.email && errors.email.message}
            />
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              label="Password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              required
              {...register("password", {
                required: "Password is required",
              })}
              error={errors.password && errors.password.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-green hover:bg-white border-green hover:border-green btn-transition hover:text-green"
          >
            Sign up
          </Button>
        </form>
        <p className="text-sm font-mulish mt-8 w-full text-center text-slate-700">
          Already have an account?{" "}
          <Link to={"/sign-in"} className="hover:text-green">
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;