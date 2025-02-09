import { Navigate } from "react-router";
import { CommonUtils } from "@/utils/common.utils";

export const ProtectedRouteComponent = ({ children }) => {
  const user = CommonUtils.getUserEmail();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
