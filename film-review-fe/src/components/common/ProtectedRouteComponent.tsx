import { Navigate } from "react-router";
import { CommonUtils } from "@/utils/common.utils";
import ForbiddenPage from "@/pages/common/ForbiddenPage";

export const ProtectedRouteComponent = ({ children }) => {
  const role = CommonUtils.getUserRole();
  if (!role) {
    return <Navigate to="/auth/login" replace />;
  } else if (role !== "admin") {
    return <ForbiddenPage />;
  }

  return children;
};
