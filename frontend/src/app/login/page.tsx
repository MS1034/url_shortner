"use client";

import React, { use } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LuLock, LuMail } from "react-icons/lu";
import { Sacramento } from "next/font/google";
import Link from "next/link";
import { useLoginMutation } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/Features/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import PasswordBox from "@/components/PasswordBox";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import JWTHelper from "@/commons/helpers/JwtHelper";
import withAuth from "@/components/WithAuth";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

interface IFormInput {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.status == "401") throw new Error(res.message);
      const { token } = res.result;
      dispatch(setCredentials({ token }));
    } catch (err) {
      let errorMessage = "Signin failed. ";
      if (err instanceof Error) {
        errorMessage = err?.message || errorMessage;
      } else if (
        err &&
        typeof err === "object" &&
        "data" in err &&
        "message" in (err as any).data
      ) {
        errorMessage = (err as any).data.message;
      }
      console.error("Signup failed", JSON.stringify(err));
      toast.error(
        `${errorMessage} ${
          navigator.onLine ? "" : "Check your internet connection"
        }`
      );
    }
  };
  if (JWTHelper.isAuthenticated()) redirect("/dashboard");
  return (
    <section>
      <div className="grid gap-0 md:h-screen md:grid-cols-2">
        <div className="flex items-center justify-center px-5 py-16 md:px-10 md:py-20 bg-gray-100">
          <div className="max-w-md text-center">
            <div className="mb-8 md:mb-12 lg:mb-16">
              <h1
                className={`text-[#72e5a6] font-bold text-7xl break-words mb-1 ${sacramento.className}`}
              >
                link.ly
              </h1>
              <p>Shrink Your Links, Expand Your Reach</p>
            </div>
            <div className="mx-auto max-w-sm mb-4 pb-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative mb-4">
                  <LuMail className="absolute left-5 top-4 inline-block" />
                  <input
                    type="text"
                    {...register("email", { required: "Email is required." })}
                    className="block w-full h-9 rounded-md border border-black px-3 py-6 pl-14 text-sm placeholder-black"
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="relative mb-4">
                  <PasswordBox
                    name="password"
                    placeholder="Password"
                    register={register}
                    error={errors.password?.message}
                  />
                </div>
                <input
                  type="submit"
                  value={isLoading ? "Logging In..." : "Login"}
                  className="inline-block w-full cursor-pointer items-center bg-[#72e5a6] px-6 py-3 text-center font-semibold rounded-sm"
                  disabled={isLoading}
                />
              </form>
            </div>
            <p className="text-sm text-gray-500 sm:text-sm">
              Don't have an account?
              <Link href="/signup" className="font-bold text-black">
                <span> </span> Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white">
          <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <img
              src="assets/images/green-url-short-concept.jpg"
              alt="Boy with hat shortening a http url"
              className="inline-block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export default SignIn;
