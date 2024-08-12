import React from "react";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsX,
  BsTwitterX,
} from "react-icons/bs";

import { sacramento } from "@/commons/helpers/FontHelper";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="block">
      {/* Container */}
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Component */}
        <div className="flex-col flex items-center">
          <Link href="#" className="mb-8 inline-block max-w-full text-black">
            <img
              src="assets/images/logo.png"
              alt=""
              className="inline-block max-h-10"
            />
            <span className={` ${sacramento.className} text-primary text-3xl`}>
              link.ly
            </span>{" "}
          </Link>
          <div className="text-center font-semibold">
            <a
              href="#"
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              Home
            </a>
            <a
              href="#how-it-works-section"
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              How It Works
            </a>
            <a
              href="#features-sections"
              className="inline-block px-6 py-2 font-normal text-black transition hover:text-primary"
            >
              Features
            </a>
          </div>
          <div className="mb-8 mt-8 border-b border-gray-300 w-48"></div>
          <div className="mb-12 grid grid-flow-col grid-cols-4 w-full max-w-52 gap-3">
            <a
              href="#"
              className="mx-auto flex flex-col max-w-6 items-center justify-center text-black"
            >
              <BsFacebook className="inline-block text-3xl" />
            </a>
            <a
              href="#"
              className="mx-auto flex flex-col max-w-6 items-center justify-center text-black"
            >
              <BsTwitterX className="inline-block text-3xl" />
            </a>
            <a
              href="#"
              className="mx-auto flex flex-col max-w-6 items-center justify-center text-black"
            >
              <BsInstagram className="inline-block text-3xl" />
            </a>
            <a
              href="#"
              className="mx-auto flex flex-col max-w-6 items-center justify-center text-black"
            >
              <BsLinkedin className="inline-block text-3xl" />
            </a>
          </div>

          <p className="text-sm sm:text-base">
            © Copyright 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
