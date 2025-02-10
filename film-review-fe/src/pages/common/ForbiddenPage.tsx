import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <LockOutlined sx={{ fontSize: 80, color: "error.main" }} />
        <Typography variant="h3" color="error" gutterBottom>
          403 Forbidden
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You do not have permission to access this page.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ForbiddenPage;
