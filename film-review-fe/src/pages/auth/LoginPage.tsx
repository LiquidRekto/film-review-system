import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ACCOUNT_LOGIN_SCHEMA } from "@/utils/validation.utils";
import { AuthService } from "@/services/auth.service";
import { IAccountLogin } from "@/interfaces/auth";
import { AxiosResponse } from "axios";
import { API_R_200 } from "@/constants/error-codes";
import { StorageUtils } from "@/utils/storage.utils";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const [finishProcess, setFinishProcess] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ACCOUNT_LOGIN_SCHEMA),
    mode: "all",
  });

  const [loginData, setLoginData] = useState<IAccountLogin>({
    username: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginMsg("");
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!isValid) return;
    setFinishProcess(false);
    const res = (await AuthService.login(loginData)) as AxiosResponse;
    if (res.status !== API_R_200) {
      if (res.data) {
        setLoginMsg(res.data.message ?? "Unknown error occured");
      }
      setFinishProcess(true);
      return;
    }
    StorageUtils.setItem("tokenInfo", JSON.stringify(res.data.data));
    setFinishProcess(true);
    navigate("/films");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        {loginMsg.length > 0 ? (
          <Typography gutterBottom color="error">
            {loginMsg}
          </Typography>
        ) : (
          <></>
        )}
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(handleLogin)}
        >
          <TextField
            label="Username"
            {...register("username")}
            variant="outlined"
            fullWidth
            value={loginData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username?.message?.toString()}
          />
          <TextField
            label="Password"
            {...register("password")}
            type="password"
            variant="outlined"
            fullWidth
            value={loginData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
          />
          <Button
            type="submit"
            loading={!finishProcess}
            variant="contained"
            color="primary"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
