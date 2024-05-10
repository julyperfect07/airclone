import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const ReservationCalendar = () => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    // handle selection
    setSelectionRange(ranges.selection);
  };

  return (
    <div className="reservation-calendar">
      <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default ReservationCalendar;
