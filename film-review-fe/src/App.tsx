import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import { ProtectedRouteComponent } from "./components/common/ProtectedRouteComponent";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* 👈 Renders at /app/ */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRouteComponent>
              <AdminDashboardPage />
            </ProtectedRouteComponent>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
