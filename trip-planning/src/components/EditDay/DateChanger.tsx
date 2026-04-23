import { useEffect, useState } from "react";
import DateInput from "./DateInput";

export default function DateChanger({
  date,
  handleDateChange,
}: {
  date: string;
  handleDateChange: any;
}) {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");

  useEffect(() => {
    handleDateChange("date", `20${year}-${month}-${day}`);
  }, [year, month, day]);

  useEffect(() => {
    const dateArray = date.split("-");
    setDay(dateArray[2]);
    setMonth(dateArray[1]);
    setYear(dateArray[0].slice(-2));
  }, []);

  return (
    <div className="date-changer">
      <DateInput input="day" value={day} handleDateChange={setDay} />
      <DateInput input="month" value={month} handleDateChange={setMonth} />
      <DateInput input="year" value={year} handleDateChange={setYear} />
    </div>
  );
}
