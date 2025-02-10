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
          <Typography sx={{ fontStyle: "italic", mr: 4 }}>
            Welcome back, {CommonUtils.getUserFullName()}
          </Typography>
        ) : (
          <Button onClick={() => navigate("/auth/register")} color="inherit">
            Register
          </Button>
        )}
        {role === "admin" ? (
          <Button sx={{ mx: 1 }} onClick={handleAdmin} color="inherit">
            ADMIN DASHBOARD
          </Button>
        ) : (
          <></>
        )}
        {user ? (
          <Button
            sx={{ ml: 1 }}
            onClick={handleLogout}
            variant="contained"
            color="error"
          >
            Logout
          </Button>
        ) : (
          <Button
            sx={{ ml: 1 }}
            onClick={() => navigate("/auth/login")}
            variant="contained"
            color="warning"
          >
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
