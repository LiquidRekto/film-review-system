import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { CommonUtils } from "@/utils/common.utils";
import { useNavigate } from "react-router";
import { StorageUtils } from "@/utils/storage.utils";

const NavBarComponent = () => {
  const [user, setUser] = useState<string | null>(
    CommonUtils.getUserEmail() || null
  );
  const [role, setRole] = useState<string | null>(
    CommonUtils.getUserRole() || null
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    StorageUtils.removeItem("tokenInfo");
    window.location.reload();
  };

  const handleAdmin = () => {
    navigate("/admin");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        {role ? (
          <Button onClick={handleAdmin} color="inherit">
            ADMIN DASHBOARD
          </Button>
        ) : (
          <></>
        )}
        {user ? (
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate("/auth/login")} color="inherit">
            Login
          </Button>
        )}
        <Box></Box>
        <IconButton></IconButton>
        <span className="fi fi-vn"></span>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarComponent;
