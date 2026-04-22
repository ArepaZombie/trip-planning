import { BrowserRouter, Routes, Route } from "react-router-dom";
import DayPage from "./components/DayPage/DayPage";
import TripPage from "./components/TripPage/TripPage";
import EditDayPage from "./components/EditDay/EditDay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TripPage />} />
        <Route path="/day/:dayId" element={<DayPage />} />
        <Route path="/day/:dayId/edit" element={<EditDayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
