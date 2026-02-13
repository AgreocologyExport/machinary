import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, onNavigate }) => {
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      onNavigate("login");
    }
  }, [currentUser, onNavigate]);

  if (!currentUser) {
    return null;
  }

  return children;
};
