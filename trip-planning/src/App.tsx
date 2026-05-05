import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import DayPage from "./components/DayPage/DayPage";
import TripPage from "./components/TripPage/TripPage";
import EditDayPage from "./components/EditDay/EditDay";
import { Login } from "./components/Login/Login";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase_firestore";
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const Shield = ({ user, children }: { user: User | null; children: any }) => {
    return user ? children : <Navigate to="/login/" />;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <BrowserRouter basename="/trip-planning/">
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
        />
        <Route
          element={
            <Shield user={user}>
              <Outlet />
            </Shield>
          }
        >
          <Route path="/" element={<TripPage />} />
          <Route path="/day/:dayId" element={<DayPage />} />
          <Route path="/day/:dayId/edit" element={<EditDayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
