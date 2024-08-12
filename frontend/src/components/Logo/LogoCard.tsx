import { FC, useState } from "react";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import Image from "next/image";
import { BrandLogo } from "@/commons/types/Logo";

interface LogoCardProps {
  logo: BrandLogo;
  onEdit: (logo: BrandLogo) => void;
  onDelete: (id: string) => void;
}

const LogoCard: FC<LogoCardProps> = ({ logo, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800"
    >
      <div className="flex items-center justify-center mb-4">
        {logo.blurHash ? (
          <Image
            id={logo.logo_id}
            className="max-w-full rounded-lg"
            src={logo.logo_path}
            width={300}
            height={300}
            placeholder="blur"
            blurDataURL={logo.blurHash}
            loading="lazy"
            alt="Brand Logo"
          />
        ) : (
          <Image
            id={logo.logo_id}
            className="max-w-full rounded-lg"
            src={logo.logo_path}
            width={300}
            height={300}
            loading="lazy"
            alt="Brand Logo"
          />
        )}
      </div>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onEdit(logo)}
          className="inline-flex items-center justify-center rounded-md gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <CiEdit size={20} />
          </span>
          Edit
        </button>
        <button
          onClick={() => onDelete(logo.logo_id)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md border border-meta-1 px-10 py-4 text-center font-medium text-meta-1 hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <BsTrash size={20} />
          </span>
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default LogoCard;
