import { redirect, useNavigate, useParams } from "react-router-dom";
import "./EditDay.css";
import { useEffect, useState, type ChangeEvent } from "react";
import { getDayInfo, updateDayInfo } from "../../firebase_firestore";
import TitleInput from "./TitleInput";
import ClavosDecoration from "../ClavosDecoration/ClavosDecoration";
import DateChanger from "./DateChanger";
import BudgetEditor from "./BudgetEditor";
import { setNestedValue } from "../../utils";
import ItemsUpdate from "./ItemsUpdate";

export default function EditDayPage() {
  const [day, setDay] = useState<any>();
  const { dayId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      if (dayId) {
        let result = await getDayInfo(dayId);
        setDay(result);
      }
    };

    getData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDay((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleManualChange = (index: string, value: string) => {
    setDay((prev: any) => setNestedValue(prev, index.split("."), value));
  };

  const handleUpdate = async () => {
    try {
      await updateDayInfo(dayId || "", day);
      navigate(`/day/${dayId}`);
    } catch {
      console.error("Error");
    }
  };

  return (
    <div className="edit-day-page">
      <ClavosDecoration />
      <h2>Día {day?.n}</h2>
      {day && (
        <>
          <TitleInput title={day.title} handleChange={handleChange} />
          <DateChanger date={day.date} handleDateChange={handleManualChange} />
          <ItemsUpdate
            itemsActive={day.packingItems}
            handleItemsUpdate={handleManualChange}
          />
          <BudgetEditor
            budget={day.budget?.expected}
            handleBudgetChange={handleManualChange}
          />
        </>
      )}
      <div onClick={handleUpdate} className="send-button"></div>
    </div>
  );
}
