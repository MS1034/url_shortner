import Link from "next/link";
import React from "react";

function GenericPage({
  imgPath,
  title,
  desc,
}: Readonly<{ imgPath: string; title: string; desc: string }>) {
  return (
    <section className="h-full">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Component */}
        <div className="grid items-center gap-8 sm:gap-20 lg:grid-cols-2">
          <div>
            <img
              src={imgPath}
              alt=""
              className="mx-auto inline-block h-full w-full max-w-2xl object-cover"
            />
          </div>
          <div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{title}</h1>
            <p className="mb-6 max-w-lg  text-justify text-sm text-gray-500 sm:text-lg md:mb-10 lg:mb-12">
              {desc}
            </p>
            <Link
              href="/"
              className="inline-block items-center rounded-md bg-black px-6 py-3 text-center font-semibold text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenericPage;
