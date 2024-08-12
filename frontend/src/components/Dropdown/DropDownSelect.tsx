"use client";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface DropdownProps {
  label: string | undefined;
  options: string[];
}
const DropdownSelect = ({ label, options }: DropdownProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
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
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
            isOptionSelected ? "text-slate-500 dark:text-white" : ""
          }`}
        >
          {options &&
            options.map((option) => (
              <option value={option} className="text-body dark:text-bodydark">
                {option}
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

export default DropdownSelect;
