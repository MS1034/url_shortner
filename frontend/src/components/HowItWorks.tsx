import React from "react";
import { sacramento } from "@/commons/helpers/FontHelper";

const HowItWorks: React.FC = () => {
  return (
    // <section>
    //   <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
    //     <h2 className="text-center text-3xl font-bold md:text-5xl">
    //       How it works
    //     </h2>
    //     <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
    //       Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam.
    //     </p>
    //     <div className="mx-auto grid max-w-xl gap-6">
    //       {steps.map((step, index) => (
    //         <div
    //           key={index}
    //           className="flex items-center justify-center rounded-sm bg-gray-100 px-6 py-4"
    //         >
    //           <div className="mr-6 flex h-14 w-14 flex-none items-center justify-center rounded-sm bg-white">
    //             <p className="text-sm font-bold sm:text-xl">{index + 1}</p>
    //           </div>
    //           <p className="text-sm sm:text-base">{step}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
    <section id="how-it-works-section">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-16">
        {/* Title */}
        <p className="text-center text-sm font-bold uppercase">3 easy steps</p>
        <h2 className="text-center text-3xl font-bold md:text-5xl">
          How It Works?
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-center text-sm text-gray-500 sm:text-base md:mb-12 lg:mb-16">
          <span className={`text-primary ${sacramento.className} text-3xl`}>
            link.ly
          </span>{" "}
          makes it simple to create and share short URLs in just a few clicks.
        </p>
        {/* Content */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* List */}
          <div className="flex h-full flex-col [grid-area:2/1/3/2] lg:[grid-area:1/2/2/3]">
            {/* Item */}
            <a
              className="mb-8 flex max-w-lg justify-center gap-4 rounded-xl border border-solid border-gray-300 px-6 py-5 text-black"
              href="#w-tabs-0-data-w-pane-0"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                <p className="text-sm font-bold sm:text-base">1</p>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <h5 className="text-xl font-bold">Paste Your URL</h5>
                <p className="text-sm text-gray-500">
                  Copy the link you want to shorten and paste it into the input
                  field.
                </p>
              </div>
            </a>
            <a
              className="mb-8 flex max-w-lg justify-center gap-4 rounded-xl border border-solid border-gray-300 px-6 py-5 text-black"
              href="#w-tabs-0-data-w-pane-0"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                <p className="text-sm font-bold sm:text-base">2</p>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <h5 className="text-xl font-bold">Click 'Shorten'</h5>
                <p className="text-sm text-gray-500">
                  Press the "Shorten" button to generate your custom short link.
                </p>
              </div>
            </a>
            <a
              className="mb-8 flex max-w-lg justify-center gap-4 rounded-xl border border-solid border-gray-300 px-6 py-5 text-black"
              href="#w-tabs-0-data-w-pane-0"
            >
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-100">
                <p className="text-sm font-bold sm:text-base">3</p>
              </div>
              <div className="ml-4 flex flex-col gap-2">
                <h5 className="text-xl font-bold">Share Your Link</h5>
                <p className="text-sm text-gray-500">
                  Your short link is ready! Share it anywhere you need with
                  ease.
                </p>
              </div>
            </a>
          </div>
          {/* Image */}
          <img
            alt="Link.ly process illustration"
            src="/assets/images/green-steps-illustration.png"
            className="block h-full w-full overflow-hidden [grid-area:1/1/2/2] lg:[grid-area:1/1/2/2]"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
