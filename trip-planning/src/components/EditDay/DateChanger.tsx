import { useEffect, useState } from "react";
import Icon from "../Utils/Icon";

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
    const dateArray = date.split("-");
    setDay(dateArray[2]);
    setMonth(dateArray[1]);
    setYear(dateArray[0].slice(-2));
  }, []);

  useEffect(() => {
    handleDateChange("date", `20${year}-${month}-${day}`);
  }, [year, month, day]);

  return (
    <div className="date-changer">
      <DateInput input="day" value={day} handleDateChange={setDay} />
      <DateInput input="month" value={month} handleDateChange={setMonth} />
      <DateInput input="year" value={year} handleDateChange={setYear} />
    </div>
  );
}

function DateInput({
  input,
  value,
  handleDateChange,
}: {
  input: string;
  value: string;
  handleDateChange: any;
}) {
  const [icon, setIcon] = useState<string>("");
  const [rotation, setRotation] = useState<number>(0);

  useEffect(() => {
    switch (input) {
      case "day":
        setIcon("fa-earth");
        break;
      case "month":
        setIcon("fa-moon");
        break;
      case "year":
        setIcon("fa-sun");
        break;
    }
  }, []);

  const handleValueChange = (add: boolean) => {
    let max = 99;
    switch (input) {
      case "day":
        max = 31;
        break;
      case "month":
        max = 12;
        break;
    }

    const numberValue = Number(value);
    const toAdd = add ? 1 : -1;

    setRotation(rotation + toAdd * 10);

    let newValue = numberValue + toAdd;

    if (newValue > 0 && newValue <= max) {
      let newValueStr = newValue.toString();
      newValueStr = newValueStr.length == 1 ? "0" + newValueStr : newValueStr;
      handleDateChange(newValueStr);
    }
  };

  return (
    <div className="date-input">
      <p>{value}</p>
      <div className="date-input-control">
        <Icon
          icon="fa-angle-double-up"
          color="--stone-dark-2"
          onClick={() => handleValueChange(true)}
        />
        <div className="wheel-change">
          <Icon
            icon={icon}
            color="--stone-light"
            style={{ rotate: rotation + "deg" }}
          />
        </div>
        <Icon
          icon="fa-angle-double-down"
          color="--stone-dark-2"
          onClick={() => handleValueChange(false)}
        />
      </div>
    </div>
  );
}
