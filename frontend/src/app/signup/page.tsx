"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LuMail, LuUser } from "react-icons/lu";
import { Sacramento } from "next/font/google";
import Link from "next/link";
import PasswordBox from "@/components/PasswordBox";
import {
  useCheckUsernameMutation,
  useSignupUserMutation,
} from "@/services/auth";
import { generateFromEmail } from "unique-username-generator";
import toast from "react-hot-toast";

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
});

interface SignupFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  checkbox: boolean;
}

const passwordPolicyRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function SignupPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    watch,
  } = useForm<SignupFormData>();

  const router = useRouter();

  const [signupUser, { isLoading }] = useSignupUserMutation();
  const [checkUsername] = useCheckUsernameMutation();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const handleUsernameBlur = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    try {
      const { value } = event.target;
      const { data } = await checkUsername(value);
      if (data) {
        if (!data?.result?.available) {
          setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
        } else {
          clearErrors("username");
        }
      } else throw new Error("Server not connected");
    } catch (err) {
      console.error("Signup failed", JSON.stringify(err));
      toast.error(
        `${
          navigator.onLine
            ? "Failed to connect with server"
            : "Check your internet connection"
        }`
      );
    }
  };

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;
    if (email) {
      let username = generateFromEmail(email, 4);
      if (username.length > 50) {
        username = username.slice(0, 50);
      }
      setValue("username", username);
    }
  };

  const validatePassword = () => {
    if (!passwordPolicyRegex.test(password)) {
      setError("password", {
        type: "manual",
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    } else {
      clearErrors("password");
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
    } else {
      clearErrors("confirmPassword");
    }
  };

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await signupUser(data).unwrap();
      if (res.status) {
        router.replace("/login");
      } else {
        throw new Error(res.message || "Unknown error occurred");
      }
    } catch (err) {
      let errorMessage = "Signup failed. ";

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

  return (
    <section>
      <div className="grid gap-0 md:h-screen md:grid-cols-2">
        <div className="flex items-center justify-center bg-white">
          <div className="mx-auto max-w-md px-5 py-16 md:px-10 md:py-24 lg:py-32">
            <img
              src="assets/images/green-url-short-concept.jpg"
              alt=""
              className="inline-block"
            />
          </div>
        </div>
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
              <form onSubmit={handleSubmit(onSubmit)} name="signup-form">
                <div className="relative mb-4">
                  <LuMail className="absolute left-5 top-4 inline-block" />
                  <input
                    type="email"
                    {...register("email", { required: "Email is required." })}
                    className="block w-full h-9 rounded-md border border-black px-3 py-6 pl-14 text-sm placeholder-black"
                    placeholder="Email Address"
                    onBlur={handleEmailBlur}
                  />
                  {errors.email && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="relative mb-4">
                  <LuUser className="absolute left-5 top-4 inline-block" />
                  <input
                    type="text"
                    {...register("username", {
                      required: "Username is required.",
                    })}
                    className="block w-full h-9 rounded-md border border-black px-3 py-6 pl-14 text-sm placeholder-black"
                    placeholder="Username"
                    maxLength={50}
                    onBlur={handleUsernameBlur}
                  />
                  {errors.username && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="relative mb-4">
                  <PasswordBox
                    name="password"
                    placeholder="Enter Password"
                    register={register}
                    onBlur={validatePassword}
                    error={errors.password?.message}
                  />
                </div>
                <div className="relative mb-4">
                  <PasswordBox
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    register={register}
                    onBlur={validateConfirmPassword}
                    error={errors.confirmPassword?.message}
                  />
                </div>
                <div className="mb-6 md:mb-10 lg:mb-1 pb-12 pl-5 ">
                  <label className="flex items-center justify-start font-medium  ">
                    <input
                      type="checkbox"
                      {...register("checkbox", {
                        required: "You must agree to the terms and conditions.",
                      })}
                      className="mt-1"
                    />
                    <span className="ml-4 cursor-pointer text-sm">
                      I agree with the
                      <a href="#" className="font-bold">
                        Terms &amp; Conditions
                      </a>
                    </span>
                  </label>
                  {errors.checkbox && (
                    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                      {errors.checkbox.message}
                    </span>
                  )}
                </div>
                <input
                  type="submit"
                  value={isLoading ? "Signing up..." : "Sign Up"}
                  className="w-full px-6 py-3 font-semibold text-center bg-[#72e5a6] rounded-sm cursor-pointer"
                  disabled={isLoading}
                />
              </form>
            </div>
            <p className="text-sm text-gray-500 sm:text-sm">
              Already have an account?
              <Link href="/login" className="font-bold text-black">
                <span> </span> Login now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignupPage;
