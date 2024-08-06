"use client";
import React from "react";
import { LuEye, LuLock, LuEyeOff } from "react-icons/lu";

interface PasswordBoxProps {
  name: string;
  placeholder: string;
  register: any;
  onBlur?: any; // Type should match react-hook-form's register function
  error?: string; // Accept an optional error message
}

function PasswordBox({
  name,
  placeholder,
  register,
  onBlur,
  error,
}: PasswordBoxProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="relative">
        <LuLock className="absolute inset-y-0 left-5 top-4 inline-block" />
        <input
          type={showPassword ? "text" : "password"}
          {...register(name, { required: `${placeholder} is required.` })} // Add required validation
          className={`block h-9 w-full rounded-md border border-solid border-black px-3 py-6 pl-14 text-sm text-black placeholder:text-black ${
            error ? "border-red-500" : ""
          }`}
          placeholder={placeholder}
          onBlur={onBlur}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600"
        >
          {showPassword ? (
            <LuEyeOff className="shrink-0 inline-block" />
          ) : (
            <LuEye className="shrink-0 inline-block" />
          )}
        </button>
      </div>
      {error && (
        <p className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {error}
        </p>
      )}
    </>
  );
}

export default PasswordBox;
