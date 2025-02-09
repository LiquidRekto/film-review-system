import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },

    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h5: {
      fontWeight: 600,
    },
  },
  //   components: {
  //     MuiButton: {
  //       styleOverrides: {
  //         root: {
  //           borderRadius: 8,
  //           textTransform: "none",
  //         },
  //       },
  //     },
  //   },
});
