import { BrowserRouter, Routes, Route } from "react-router-dom";
import DayPage from "./components/DayPage/DayPage";
import TripPage from "./components/TripPage/TripPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TripPage />} />
        <Route path="/day/:dayId" element={<DayPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
