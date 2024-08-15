import React, { useEffect } from "react";

interface ModalWrapperProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onRequestClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onRequestClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={onRequestClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-fit max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl bg-white dark:bg-boxdark rounded-lg py-2 text-center overflow-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
