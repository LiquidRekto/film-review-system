import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box>
          <Button color="inherit">Home</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
          <Button color="inherit">Login</Button>
        </Box>
        <span class="fi fi-vn"></span>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarComponent;
