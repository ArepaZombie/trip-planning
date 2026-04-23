import { useEffect, useState } from "react";
import Icon from "../Utils/Icon";

export default function DateInput({
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
