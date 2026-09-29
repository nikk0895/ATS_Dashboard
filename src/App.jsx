// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import LoginPage from "./pages/LoginPage";

// Placeholder — this becomes Screen 2 (Customer/Requisition Landing) next.
function PlaceholderLanding() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Signed in ✅</h1>
      <p>Customer / Requisition Landing screen goes here next.</p>
    </div>
  );
}

// Wrap any route that requires the user to be signed in.
function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <PlaceholderLanding />
          </ProtectedRoute>
        }
      />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
