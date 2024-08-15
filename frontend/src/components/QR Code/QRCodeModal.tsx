"use client";
import React from "react";
import { BsDownload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import ModalWrapper from "../Modal/ModalWraper";
import QRCodeStyling from "qr-code-styling";

interface QrCodeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  shortLink: string;
}

const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onRequestClose,
  shortLink,
}) => {
  const qrCodeContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [qrCode, setQrCode] = React.useState<QRCodeStyling | null>(null);

  React.useEffect(() => {
    if (isOpen && qrCodeContainerRef.current) {
      const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: shortLink,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#f9f9f9",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 20,
        },
      });
      setQrCode(qrCode);

      qrCodeContainerRef.current.innerHTML = "";
      qrCode.append(qrCodeContainerRef.current);
    }
  }, [isOpen, shortLink]);

  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
      <div className="relative p-6 bg-white dark:bg-boxdark rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Close button in the top-right corner */}
        <button
          onClick={onRequestClose}
          className="absolute top-2 right-2 p-2 text-black dark:text-white hover:text-red-500 transition"
        >
          <AiOutlineClose size={24} />
        </button>

        <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl text-center">
          QR Code
        </h3>
        <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>

        <div className="flex self-center mb-4">
          <div ref={qrCodeContainerRef} className="mx-auto"></div>
        </div>
        <div className="-mx-3 flex flex-wrap gap-y-4">
          <div className="w-full px-3">
            <button
              className="inline-flex items-center justify-center gap-2.5 bg-meta-3 p-3 text-white hover:bg-opacity-90 lg:px-8 xl:px-10 w-full rounded border border-stroke text-center font-medium transition dark:border-strokedark dark:bg-meta-4 dark:text-white"
              onClick={() => qrCode?.download({ extension: "png" })}
            >
              <span>
                <BsDownload />
              </span>
              Download
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default QrCodeModal;
