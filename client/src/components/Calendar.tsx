import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

interface ReservationCalendarProps {
  onSelectRange: (range: DateRange) => void;
}

const ReservationCalendar = ({
  onSelectRange,
}: ReservationCalendarProps) => {
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges: any) => {
    // handle selection
    setSelectionRange(ranges.selection);
    onSelectRange(ranges.selection);
  };

  return (
    <div className="reservation-calendar">
      <DateRange ranges={[selectionRange]} onChange={handleSelect} />
    </div>
  );
};

export default ReservationCalendar;
