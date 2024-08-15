import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { number } from "zod";

interface DropdownProps {
  label?: string;
  options: { id: number | string; value: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
}

const DropDownSelect: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (typeof value == "number") {
      onChange(+newValue);
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="mb-4.5">
      {label && (
        <label className="mb-3 block text-sm font-medium text-slate-500 dark:text-white">
          {label}
        </label>
      )}

      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={value}
          onChange={handleChange}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 text-slate-500 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options &&
            options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <BsChevronDown />
        </span>
      </div>
    </div>
  );
};

export default DropDownSelect;
