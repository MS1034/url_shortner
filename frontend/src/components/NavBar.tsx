"use client";
import React, { useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { sacramento } from "@/commons/helpers/FontHelper";

import Link from "next/link";
import Image from "next/image";
import { BsList } from "react-icons/bs";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <nav className=" mx-auto h-auto w-full max-w-screen-2xl lg:relative lg:top-0">
        <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
          <Link
            href="#"
            className={`text-5xl text-primary flex flex-row ${sacramento.className}`}
          >
            <Image
              height={50}
              width={50}
              src={"/assets/images/logo.png"}
              alt="logo"
            />
            link.ly
          </Link>
          <div
            className={`font-[500] text-slate-700 mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <Link
              href="#"
              className=" rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800 hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="#how-it-works-section"
              className=" rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800 hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="#features-section"
              className=" lg: rounded-lg pb-8 lg:px-6 lg:py-4 lg: lg:hover:text-gray-800 hover:text-primary"
            >
              Features
            </Link>
          </div>
          <div
            className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <Link
              href="/signup"
              className=" font-bold  rounded-lg lg:px-6 lg:py-4 lg: lg:hover:text-gray-800"
            >
              Sign Up
            </Link>
            <Link
              className=" font-bold rounded-lg bg-primary px-8 py-4 text-center text-white hover:bg-gray-800"
              href="/login"
            >
              Login
            </Link>
          </div>
          <button
            className="absolute right-5 lg:hidden"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <BsList size={32} />
          </button>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
