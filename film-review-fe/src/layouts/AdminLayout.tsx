import SideBarComponent from "@/components/SideBarComponent";
import { Box } from "@mui/material";
import { Outlet } from "react-router";

const AdminLayout = (props) => {
  const DRAWER_WIDTH = 240;

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: "flex",
        }}
      >
        <SideBarComponent width={DRAWER_WIDTH} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminLayout;
