import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import ClickOutside from "../ClickOutside";

const MultiSelect = ({ options, label, isLoading, onChange, value }) => {
  const [selectedOptions, setSelectedOptions] = useState(value || []);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Add "Select All" option to options if it's not already there
  const enhancedOptions = [
    { label: "Select All", value: "select-all" },
    ...options,
  ];

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  const handleClickOutside = () => {
    setMenuIsOpen(false);
  };

  const handleChange = (selected) => {
    if (selected.some((option) => option.value === "select-all")) {
      // Handle "Select All"
      if (selectedOptions.length === enhancedOptions.length - 1) {
        // Deselect all if already all are selected
        setSelectedOptions([]);
        onChange([]);
      } else {
        // Select all
        const allOptions = enhancedOptions.slice(1); // Exclude "Select All"
        setSelectedOptions(allOptions);
        onChange(allOptions);
      }
    } else {
      // Normal selection
      setSelectedOptions(selected);
      onChange(selected);
    }
  };

  const CustomOption = (props) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: 10 }}
      />
      {props.label}
    </components.Option>
  );

  const CustomMultiValue = () => null; // Hides the selected options in the input field

  const CustomValueContainer = ({ children, ...props }) => (
    <components.ValueContainer {...props}>
      {props.hasValue ? (
        <span>{`${props.getValue().length} selected`}</span>
      ) : (
        children
      )}
    </components.ValueContainer>
  );

  return (
    <ClickOutside onClick={handleClickOutside}>
      <div className="min-h-8 min-w-32">
        <Select
          placeholder={label}
          value={selectedOptions}
          onChange={handleChange}
          options={enhancedOptions}
          isMulti
          isLoading={isLoading}
          isSearchable={true}
          menuIsOpen={menuIsOpen}
          onMenuOpen={() => setMenuIsOpen(true)}
          closeMenuOnSelect={false}
          components={{
            Option: CustomOption,
            MultiValue: CustomMultiValue,
            ValueContainer: CustomValueContainer,
          }}
          hideSelectedOptions={false}
          styles={{
            container: (provided) => ({ ...provided }),
            control: (provided, state) => ({
              ...provided,
              borderRadius: "0.375rem",
              borderColor: state.isFocused ? "#10B981" : provided.borderColor,
              boxShadow: state.isFocused
                ? "0 0 0 1px #10B981"
                : provided.boxShadow,
              "&:hover": {
                borderColor: "#10B981",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? "#10B981"
                : provided.backgroundColor,
              color: state.isSelected ? "#fff" : provided.color,
              ":hover": {
                backgroundColor: "#10B981",
              },
            }),
          }}
        />
      </div>
    </ClickOutside>
  );
};

export default MultiSelect;
