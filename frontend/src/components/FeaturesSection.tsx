import React from "react";
import {
  FaLink,
  FaChartBar,
  FaQrcode,
  FaClock,
  FaRegSave,
  FaRegLightbulb,
  FaCopy,
  FaTasks,
} from "react-icons/fa";
import {
  BsLink,
  BsQrCodeScan,
  BsClockHistory,
  BsGraphUp,
  BsListCheck,
  BsCalendar2X,
} from "react-icons/bs";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoQrCodeOutline } from "react-icons/io5";
import { sacramento } from "@/commons/helpers/FontHelper";

const Features: React.FC = () => {
  return (
    <section id="features-section">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold md:text-5xl">
            Make Every Step User Centeric
          </h2>
          <p className="mb-8 mt-4 max-w-xl text-base text-gray-500 md:mb-12 md:text-lg lg:mb-16">
            <span className={`text-primary ${sacramento.className} text-3xl`}>
              link.ly
            </span>{" "}
            offers a variety of powerful features to optimize your URL
            shortening experience.
          </p>
        </div>
        {/* Features Content */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 lg:gap-6">
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <BsLink className="inline-block text-primary" size={64} />
            <h3 className="text-xl font-semibold">Shorten Links</h3>
            <p className="text-sm text-gray-500">
              Quickly shorten long URLs with a single click and get a shareable
              link.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <TbBrandGoogleAnalytics
              className="inline-block text-primary"
              size={64}
            />
            <h3 className="text-xl font-semibold">Analytics</h3>
            <p className="text-sm text-gray-500">
              Track your links' performance with detailed analytics including
              graphs and maps.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <BsQrCodeScan className="inline-block text-primary" size={64} />
            <h3 className="text-xl font-semibold">QR Code with Logo</h3>
            <p className="text-sm text-gray-500">
              Generate a QR code with your brand's logo for easy sharing and
              better branding.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <BsClockHistory className="inline-block text-primary" size={64} />
            <h3 className="text-xl font-semibold">Pre-generate URLs</h3>
            <p className="text-sm text-gray-500">
              Create URLs ahead of time for future use, making your workflow
              even smoother.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <BsListCheck className="inline-block text-primary" size={64} />
            <h3 className="text-xl font-semibold">Bulk Link Shortening</h3>
            <p className="text-sm text-gray-500">
              Allow users to shorten multiple URLs at once, saving time when
              managing large batches of links.
            </p>
          </div>
          {/* Features Item */}
          <div className="grid gap-6 rounded-md border border-solid border-gray-300 p-8 md:p-10">
            <BsCalendar2X className="inline-block text-primary" size={64} />
            <h3 className="text-xl font-semibold">Expiration Control</h3>
            <p className="text-sm text-gray-500">
              Users can set expiration dates for their shortened URLs,
              automatically deactivating links after a specified period.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
