//import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import { ProtectedRouteComponent } from "@/components/common/ProtectedRouteComponent";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
