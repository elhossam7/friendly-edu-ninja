import * as React from "react";
import { Calendar } from "./calendar";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  from: Date;
  to: Date;
  onSelect: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ from, to, onSelect }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({ from, to });

  React.useEffect(() => {
    setDate({ from, to });
  }, [from, to]);

  return (
    <Calendar
      mode="range"
      selected={date}
      onSelect={(range) => {
        setDate(range);
        onSelect(range);
      }}
      numberOfMonths={2}
    />
  );
}
