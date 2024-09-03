import React from "react";
import ModalWrapper from "../Modal/ModalWraper";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  details: string;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  isOpen,
  onRequestClose,
  details,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onRequestClose={onRequestClose}>
      <h3 className="pb-2 text-xl font-bold text-black dark:text-white sm:text-2xl">
        View Details
      </h3>
      <span className="mx-auto mb-6 inline-block h-1 w-22.5 rounded bg-primary"></span>
      <div className="text-slate-500 dark:text-white">
        {details} {/* Replace with actual data rendering */}
      </div>
      <button
        onClick={onRequestClose}
        className="mt-4 block w-full rounded border border-stroke bg-gray p-3 text-center font-medium text-black transition hover:border-meta-1 hover:bg-meta-1 hover:text-white dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:border-meta-1 dark:hover:bg-meta-1"
      >
        Close
      </button>
    </ModalWrapper>
  );
};

export default ViewDetailsModal;
