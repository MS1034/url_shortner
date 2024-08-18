import React, { useState, useEffect } from "react";
import { DateTimePicker } from "react-rainbow-components";

const DateRangePicker = ({ onDateChange, placeholderText, value }) => {
  const [selectedDate, setSelectedDate] = useState(value || null);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DateTimePicker
      value={selectedDate} // Controlled value
      onChange={handleDateChange}
      placeholder={placeholderText}
      borderRadius="semi-square"
      className="min-h-8 min-w-32 border-primary"
    />
  );
};

export default DateRangePicker;
