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
      className="fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/30 px-4 py-5"
      onClick={onRequestClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-lg bg-white px-8 py-12 text-center dark:bg-boxdark md:px-17.5 md:py-15"
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
