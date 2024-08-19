import React, { useState, useEffect } from "react";
import { DateTimePicker } from "react-rainbow-components";

interface DateRangePickerProps {
  onDateChange: (date: Date | null) => void;
  placeholderText?: string;
  value?: Date | null;
  minDate?: Date;
  maxDate?: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateChange,
  placeholderText = "Select date",
  value,
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DateTimePicker
      value={selectedDate} // Controlled value
      onChange={handleDateChange}
      placeholder={placeholderText}
      minDate={minDate} // Optional prop
      maxDate={maxDate} // Optional prop
      borderRadius="semi-square"
      className="min-h-8 min-w-32 border-primary"
    />
  );
};

export default DateRangePicker;
