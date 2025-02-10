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
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          sx={{ cursor: "pointer" }}
        >
          FimRiViu
        </Typography>
        <Button onClick={() => navigate("/films")} color="inherit">
          FILMS
        </Button>
        <Typography sx={{ flexGrow: 1 }}></Typography>
        {user ? (
          <Typography sx={{ fontStyle: "italic" }}>
            Welcome back, {CommonUtils.getUserFullName()}
          </Typography>
        ) : (
          <Button onClick={() => navigate("/auth/register")} color="inherit">
            Register
          </Button>
        )}
        {role === "admin" ? (
          <Button onClick={handleAdmin} color="inherit">
            ADMIN DASHBOARD
          </Button>
        ) : (
          <></>
        )}
        {user ? (
          <Button onClick={handleLogout} variant="contained" color="inherit">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate("/auth/login")} color="inherit">
            Login
          </Button>
        )}
        <Box></Box>
        <IconButton></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarComponent;
