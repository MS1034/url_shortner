import { FC } from "react";
import { BrandLogo } from "@/commons/types/Logo";
import LogoCard from "./LogoCard";

interface LogoGridProps {
  logos: BrandLogo[];
  isLoading: Boolean;
  handleClick?: (logo: BrandLogo) => void;
  handleEdit?: (logo: BrandLogo) => void;
  handleDelete?: (id: string) => void;
  size: { w: number; h: number };
}

const LogoGrid: FC<LogoGridProps> = ({
  isLoading,
  logos,
  handleEdit,
  handleDelete,
  handleClick,
  size,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 ">
        {logos.length === 0 && !isLoading ? (
          <p>No logos available</p>
        ) : (
          logos.map((logo) => (
            <LogoCard
              key={logo.logo_id}
              logo={logo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onClick={handleClick}
              size={size}
            />
          ))
        )}
      </div>
    </>
  );
};

export default LogoGrid;

// import React from "react";
// import { BrandLogo } from "@/commons/types/Logo";

