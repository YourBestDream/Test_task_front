import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/authorization/SignUp.jsx";
import LogIn from "./components/authorization/LogIn.jsx";
import HomeView from "./views/HomeView.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
