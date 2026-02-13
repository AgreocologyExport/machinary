import { useState } from "react";
import { Users, PlusCircle, FileText, Package, LogOut, Settings, Grid, Mail, Menu, X, Home, MessageSquare } from "lucide-react";
import logoIcon from "../assets/logo-png.png";

export function AdminSidebar({ onNavigate, profile, onSignOut }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const handleNavigate = (page) => {
    onNavigate(page);
    closeMobileMenu();
  };

  return (
    <>
      <style>
        {`
          /* Mobile Header */
          .admin-mobile-header {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #043F43 0%, #065f63 100%);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            z-index: 1000;
            padding: 0 16px;
            align-items: center;
            justify-content: space-between;
          }
          
          .admin-mobile-logo {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          
          .admin-mobile-logo img {
            height: 32px;
            width: auto;
          }
          
          .admin-mobile-logo-text {
            font-size: 1.1rem;
            font-weight: 700;
            color: #fff;
          }
          
          .admin-hamburger {
            background: none;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 6px;
            transition: background 0.2s;
          }
          
          .admin-hamburger:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .admin-hamburger:active {
            background: rgba(255, 255, 255, 0.2);
          }

          /* Overlay for mobile */
          .admin-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }
          
          .admin-overlay.active {
            opacity: 1;
            pointer-events: auto;
          }

          /* Sidebar */
          .aside-main {
            width: 270px;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
            min-height: 100vh;
            border-right: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            z-index: 100;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.02);
            transition: transform 0.3s ease;
          }
          
          .aside-container {
            padding: 24px 16px;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .aside-logo-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            cursor: pointer;
            padding: 8px;
            border-radius: 10px;
            transition: background 0.2s;
          }
          
          .aside-logo-row:hover {
            background: rgba(7, 209, 133, 0.05);
          }
          
          .aside-logo {
            height: 40px;
            width: auto;
            display: block;
          }
          
          .aside-logo-title {
            font-size: 1.15rem;
            font-weight: 700;
            color: #043F43;
            margin-bottom: 2px;
          }
          
          .aside-logo-sub {
            font-size: 0.85rem;
            font-weight: 500;
            color: #64748b;
            margin-top: 0;
          }
          
          .aside-profile-card {
            background: linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%);
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 24px;
            border: 1px solid #86efac;
          }
          
          .aside-profile-label {
            color: #059669;
            font-size: 0.85rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .aside-profile-info {
            margin-top: 6px;
            font-weight: 600;
            font-size: 1.05rem;
            color: #047857;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .aside-profile-role {
            color: #6b7280;
            font-size: 0.9rem;
            margin-top: 4px;
            font-weight: 500;
          }
          
          .aside-nav {
            flex: 1;
            margin-bottom: 0;
          }
          
          .aside-ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }
          
          .aside-li {
            margin-bottom: 4px;
          }
          
          .aside-navbtn {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 12px;
            border: none;
            background: transparent;
            padding: 12px 14px;
            border-radius: 10px;
            color: #334155;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
          }
          
          .aside-navbtn:hover {
            background: linear-gradient(135deg, rgba(7, 209, 133, 0.08) 0%, rgba(7, 209, 133, 0.12) 100%);
            color: #047857;
            transform: translateX(2px);
          }
          
          .aside-navbtn:active {
            background: rgba(7, 209, 133, 0.15);
            transform: translateX(0);
          }
          
          .aside-nav-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
          }
          
          .aside-signout-row {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e2e8f0;
          }
          
          .aside-logout-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 10px;
            font-weight: 600;
            font-size: 0.95rem;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: #fff;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
            transition: all 0.2s ease;
          }
          
          .aside-logout-btn:hover {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            box-shadow: 0 6px 16px rgba(239, 68, 68, 0.35);
            transform: translateY(-1px);
          }
          
          .aside-logout-btn:active {
            transform: translateY(0);
          }

          /* Mobile Responsive */
          @media (max-width: 900px) {
            .admin-mobile-header {
              display: flex;
              position: fixed;
              z-index: 1002;
            }
            
            .admin-overlay {
              display: block;
            }
            
            .aside-main {
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              width: 280px;
              max-width: 85vw;
              transform: translateX(-100%);
              transition: transform 0.3s ease-in-out;
              z-index: 1001;
              box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
            
            .aside-main.mobile-open {
              transform: translateX(0);
            }
            
            .aside-container {
              padding: 80px 16px 30px;
              min-height: 100%;
              box-sizing: border-box;
            }

            /* Add space for mobile header */
            body {
              padding-top: 60px;
            }
          }
        `}
      </style>

      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <div className="admin-mobile-logo">
          <img src={logoIcon} alt="Agreocology" />
          {/* <span className="admin-mobile-logo-text">Admin Panel</span> */}
        </div>
        <button
          className="admin-hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <X size={24} color="#fff" />
          ) : (
            <Menu size={24} color="#fff" />
          )}
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`admin-overlay ${isMobileOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar */}
      <aside className={`aside-main ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="aside-container">
          <div
            className="aside-logo-row"
            onClick={() => handleNavigate("admin-dashboard")}
          >
            <img src={logoIcon} alt="Agreocology" className="aside-logo" />
            <div>
              {/* <div className="aside-logo-title">Agreocology</div> */}
              {/* <div className="aside-logo-sub">Admin Panel</div> */}
            </div>
          </div>

          <div className="aside-profile-card">
            <div className="aside-profile-label">Signed in as</div>
            <div className="aside-profile-info">
              {profile?.name || profile?.email || "Admin"}
            </div>
            <div className="aside-profile-role">
              {profile?.role || "Administrator"}
            </div>
          </div>

          <nav className="aside-nav">
            <ul className="aside-ul">
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("admin-dashboard")}
                  className="aside-navbtn"
                >
                  <Grid className="aside-nav-icon" color="#64748b" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("blogupload")}
                  className="aside-navbtn"
                >
                  <PlusCircle className="aside-nav-icon" color="#a21caf" />
                  <span>Upload Blog</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("blog")}
                  className="aside-navbtn"
                >
                  <FileText className="aside-nav-icon" color="#6366f1" />
                  <span>View Blogs</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("contact-edit")}
                  className="aside-navbtn"
                >
                  <Mail className="aside-nav-icon" color="#059669" />
                  <span>Edit Contact</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("products-manage")}
                  className="aside-navbtn"
                >
                  <Package className="aside-nav-icon" color="#f97316" />
                  <span>Manage Products</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("about-manage")}
                  className="aside-navbtn"
                >
                  <FileText className="aside-nav-icon" color="#8b5cf6" />
                  <span>Manage About</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("home-manage")}
                  className="aside-navbtn"
                >
                  <Home className="aside-nav-icon" color="#0ea5e9" />
                  <span>Manage Home</span>
                </button>
              </li>
              {/* Machinery Management (Hidden) */}
              {/* 
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("admin-machines")}
                  className="aside-navbtn"
                >
                  <Package className="aside-nav-icon" color="#10b981" />
                  <span>Manage Machines</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("machineblogupload")}
                  className="aside-navbtn"
                >
                  <PlusCircle className="aside-nav-icon" color="#f59e0b" />
                  <span>Upload Machine Blog</span>
                </button>
              </li>
              <li className="aside-li">
                <button
                  onClick={() => handleNavigate("admin-machine-blogs")}
                  className="aside-navbtn"
                >
                  <FileText className="aside-nav-icon" color="#ef4444" />
                  <span>View Machine Blogs</span>
                </button>
              </li>
              */}
              <li className="aside-li">
                <button
                  onClick={() => onNavigate("admin-inquiries")}
                  className="aside-navbtn"
                >
                  <MessageSquare className="aside-nav-icon" color="#8b5cf6" />
                  <span>Inquiries</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="aside-signout-row">
            <button
              className="aside-logout-btn"
              onClick={onSignOut}
            >
              <LogOut className="aside-nav-icon" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
