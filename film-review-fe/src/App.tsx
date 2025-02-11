//import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/auth/LoginPage";
import { ProtectedRouteComponent } from "@/components/common/ProtectedRouteComponent";
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import AdminLayout from "@/layouts/AdminLayout";
import ListFilmPage from "./pages/ListFilmPage";
import { FilmDetailsPage } from "./pages/FilmDetailsPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import AdminRatingListPage from "./pages/admin/AdminRatingListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="films" element={<MainLayout />}>
          <Route index element={<ListFilmPage />} />
          <Route path=":id" element={<FilmDetailsPage />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="ratings" element={<AdminRatingListPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
