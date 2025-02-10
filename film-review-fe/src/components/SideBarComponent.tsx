import React, { FC, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";

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
          {[
            { text: "Back to Home", link: "/" },
            { text: "List Films", link: "/admin" },
            { text: "List Rankings", link: "/admin/ratings" },
          ].map((val) => (
            <ListItemButton component={Link} to={val.link} key={val.text}>
              <ListItemText primary={val.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBarComponent;
