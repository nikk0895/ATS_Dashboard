// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      {/* "/" is where Microsoft sends the user back, so route by auth state */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />

      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}