import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import WalletPage from './pages/WalletPage';
import PrivateKeyPage from './pages/PrivateKeyPage';

export const LoginContext = createContext(null);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [decryptKey, setDecryptKey] = useState('');

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <LoginContext.Provider value={{ decryptKey: decryptKey, setDecryptKey: setDecryptKey, setIsLoggedIn: setIsLoggedIn }}>
      <div className="App">
        <div className="page">
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route 
                path="/main" 
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/wallet" 
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/private" 
                element={
                  <ProtectedRoute>
                    <PrivateKeyPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </div>
    </LoginContext.Provider>
  );
}


