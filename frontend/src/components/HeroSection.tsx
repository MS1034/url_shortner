import React from "react";
import { sacramento } from "@/commons/helpers/FontHelper";

const HeroSection: React.FC = () => {
  return (
    <header>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid items-center justify-items-start gap-8 sm:gap-20 lg:grid-cols-2">
          <div className="flex flex-col">
            <h1 className="mb-4 text-4xl max-w-lg font-bold md:text-6xl">
              Shrink Your Links, Expand Your Reach
            </h1>
            <p className="mb-6 max-w-lg text-sm text-gray-500 sm:text-xl md:mb-10 lg:mb-12 text-justify">
              <span className={`${sacramento.className} text-3xl text-primary`}>
                link.ly
              </span>{" "}
              makes it simple to create short, easy-to-share URLs for all your
              needs. Track clicks, manage links, and much more.
            </p>

            <form
              name="shorten-form"
              method="get"
              className="relative mb-5 w-full max-w-xl pb-8 md:mb-6 lg:mb-4 lg:max-w-md"
            >
              <div className="flex">
                <input
                  id="url"
                  placeholder="Enter URL"
                  className="placeholder:text-dark-4 w-full rounded-l-md border-[1.5px] border-r-0 border-stroke px-5.5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="url"
                  name="url"
                />
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-r-md bg-primary px-4 py-3 font-medium text-white duration-200 ease-out hover:bg-opacity-90 sm:px-7.5"
                >
                  Shorten
                </button>
              </div>
            </form>
            <div className="grid w-full max-w-2xl grid-flow-row grid-cols-3 gap-4">
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">50K+</h3>
                <p className="text-sm text-gray-500">Links Shortened</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">1M+</h3>
                <p className="text-sm text-gray-500">Clicks Tracked</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold md:text-3xl">10K+</h3>
                <p className="text-sm text-gray-500">Happy Users</p>
              </div>
            </div>
          </div>
          <img
            src="/assets/images/green-qr-code-concept.png"
            alt="Hero Image"
            className="inline-block h-full w-full max-w-2xl"
          />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
