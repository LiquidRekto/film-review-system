import React, { FC, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  width: number;
}

const SideBarComponent: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: props.width },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: props.width },
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        <List>
          {["Home", "About", "Contact", "Login"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBarComponent;
