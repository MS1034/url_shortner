import React from "react";
import { useFetchLogosQuery } from "@/services/logo";
import LogoGrid from "./LogoGrid";
import ModalWrapper from "../Modal/ModalWraper";
import { BrandLogo } from "@/commons/types/Logo";
import { IoClose } from "react-icons/io5"; // Import close icon

interface SelectLogoModalProps {
  isOpen: boolean;
  onRequestClose: (logo: BrandLogo) => void;
}

const SelectLogoModal: React.FC<SelectLogoModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { data, isLoading, error } = useFetchLogosQuery({});

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={() => onRequestClose({})}>
      <div className="bg-white dark:bg-boxdark rounded-lg w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl shadow-lg overflow-hidden">
        <div className="border-b border-stroke px-4 py-3 dark:border-strokedark sm:px-6 xl:px-7.5 flex justify-between items-center">
          <h3 className="font-medium text-black dark:text-white">Logo Grid</h3>
          <button
            onClick={() => onRequestClose({})}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <IoClose size={24} />
          </button>
        </div>
        <div className="p-4 sm:p-6 xl:p-8 overflow-y-auto h-[60vh]">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-meta-1">
              Failed to load Brand Logos. Please try again.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {isLoading ? (
                <div className="col-span-full text-center">Loading...</div>
              ) : data.result.length > 0 ? (
                data.result.map((logo: BrandLogo) => (
                  <div
                    key={logo.logo_id}
                    className="relative cursor-pointer hover:shadow-md hover:border-blue-500 hover:bg-gray-3  transition-all"
                    onClick={() => onRequestClose(logo)}
                  >
                    <img
                      src={logo.logo_path}
                      alt={"Brand Logo"}
                      className="w-full h-full object-cover border-2 border-transparent"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center">
                  No logos available
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default SelectLogoModal;
