import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import logo from "../assets/logo-png.png";

export const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate("admin-dashboard");
    } catch (err) {
      setError(err.message);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(5deg); }
            66% { transform: translateY(10px) rotate(-5deg); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .login-container {
            min-height: 100vh;
            background: linear-gradient(-45deg, #043F43, #065a5f, #07D185, #05b872);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            position: relative;
            overflow: hidden;
          }
          .login-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          .login-particle {
            position: absolute;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
          }
          .login-particle:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 10%;
            animation: float 8s infinite ease-in-out;
          }
          .login-particle:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 70%;
            left: 80%;
            animation: float 10s infinite ease-in-out 1s;
          }
          .login-particle:nth-child(3) {
            width: 100px;
            height: 100px;
            top: 40%;
            left: 70%;
            animation: float 12s infinite ease-in-out 2s;
          }
          .login-particle:nth-child(4) {
            width: 70px;
            height: 70px;
            top: 60%;
            left: 20%;
            animation: float 9s infinite ease-in-out 1.5s;
          }
          .login-navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            z-index: 1000;
            padding: 16px 24px;
            animation: slideDown 0.6s ease;
          }
          .login-navbar-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .login-brand {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .login-back-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            backdrop-filter: blur(10px);
          }
          .login-back-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateX(-2px);
          }
          .login-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 48px 40px;
            width: 100%;
            max-width: 450px;
            animation: fadeInUp 0.8s ease;
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
          @media (max-width: 640px) {
            .login-card {
              padding: 32px 24px;
            }
          }
          .login-title {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 32px;
            color: #043F43;
            animation: fadeInUp 0.8s ease 0.2s backwards;
          }
          .login-form-group {
            margin-bottom: 24px;
            animation: fadeInUp 0.8s ease 0.4s backwards;
          }
          .login-label {
            display: block;
            color: #1f2937;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 0.95rem;
          }
          .login-input {
            width: 100%;
            padding: 14px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s;
            background: white;
          }
          .login-input:focus {
            outline: none;
            border-color: #07D185;
            box-shadow: 0 0 0 3px rgba(7, 209, 133, 0.1);
          }
          .login-button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #07D185 0%, #05b872 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            animation: fadeInUp 0.8s ease 0.6s backwards;
            box-shadow: 0 4px 15px rgba(7, 209, 133, 0.3);
          }
          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(7, 209, 133, 0.4);
          }
          .login-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          .login-error {
            background: #fee2e2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 24px;
            text-align: center;
            font-size: 0.9rem;
            animation: fadeInUp 0.4s ease;
            border: 1px solid #fca5a5;
          }
        `}
      </style>

      {/* Animated Background */}
      <div className="login-container">
        {/* Floating Particles */}
        <div className="login-particles">
          <div className="login-particle"></div>
          <div className="login-particle"></div>
          <div className="login-particle"></div>
          <div className="login-particle"></div>
        </div>

        {/* Navigation Bar */}
        <div className="login-navbar">
          <div className="login-navbar-content">
            <div className="login-brand">
              <img src={logo} alt="Agreocology" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <button onClick={() => onNavigate("home")} className="login-back-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', paddingTop: '100px' }}>
          <div className="login-card">
            <h2 className="login-title">Admin Login</h2>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@gmail.com"
                  className="login-input"
                  required
                />
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="login-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="login-button"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
