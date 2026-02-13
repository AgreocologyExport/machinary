import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ref, get } from "firebase/database";
import { database } from "../firebase/config";
import AdminSidebar from "./AdminSidebar";

export function AdminPageWrapper({ children, onNavigate }) {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      try {
        const userRef = ref(database, `Agreocology/users/${currentUser.uid}`);
        const userSnap = await get(userRef);
        setProfile(userSnap.exists() ? userSnap.val() : null);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate("login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <style>
        {`
          .admin-wrapper-flex {
            display: flex;
            gap: 0;
            min-height: 100vh;
            background: #f8fafc;
          }
          .admin-wrapper-content {
            flex: 1;
            padding: 24px;
            overflow-x: hidden;
            max-width: 100%;
          }
          @media (max-width: 900px) {
            .admin-wrapper-flex {
              flex-direction: column;
            }
            .admin-wrapper-content {
              padding: 1px;
              padding-top: 76px; /* Account for fixed header */
            }
          }
        `}
      </style>
      <div className="admin-wrapper-flex">
        <AdminSidebar
          onNavigate={onNavigate}
          profile={profile}
          onSignOut={handleLogout}
        />
        <div className="admin-wrapper-content">
          {children}
        </div>
      </div>
    </>
  );
}
