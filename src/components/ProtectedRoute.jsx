// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { Spin } from "antd";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress } = useMsal();

  // Wait while MSAL is mid-login so we don't bounce the user back to /login
  if (inProgress !== InteractionStatus.None) {
    return <Spin fullscreen />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}