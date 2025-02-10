import React, { ChangeEvent, useState } from "react";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";
import { IAccountRegister } from "@/interfaces/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCOUNT_REGISTER_SCHEMA } from "@/utils/validation.utils";
import { useForm } from "react-hook-form";
import { AuthService } from "@/services/auth.service";
import { AxiosResponse } from "axios";
import { API_R_200 } from "@/constants/error-codes";
import { useNavigate } from "react-router";
import { StorageUtils } from "@/utils/storage.utils";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<IAccountRegister>({
    firstName: "",
    lastName: "",
    dob: new Date(),
    phoneNumber: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerMsg, setRegisterMsg] = useState("");
  const [finishProcess, setFinishProcess] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(ACCOUNT_REGISTER_SCHEMA),
    mode: "all",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegisterMsg("");
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setRegisterMsg("");
    if (!isValid) return;
    setFinishProcess(false);
    const res = (await AuthService.register(registerData)) as AxiosResponse;
    if (res.status !== API_R_200) {
      setRegisterMsg("An error ocurred during registration, please try again");
    } else {
      StorageUtils.setItem("tokenInfo", JSON.stringify(res.data.data));
      setFinishProcess(true);
      setRegisterData({
        firstName: "",
        lastName: "",
        dob: new Date(),
        phoneNumber: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/films");
    }
    setFinishProcess(true);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <Typography color="error" align="center" gutterBottom>
          {registerMsg}
        </Typography>
        <form onSubmit={handleSubmit(handleRegister)}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName?.message?.toString()}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName?.message?.toString()}
          />
          <TextField
            label="Date of Birth"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            type="date"
            fullWidth
            margin="normal"
            {...register("dob")}
            onChange={handleChange}
            error={!!errors.dob}
            helperText={errors.dob?.message?.toString()}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            {...register("phoneNumber")}
            onChange={handleChange}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message?.toString()}
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register("username")}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username?.message?.toString()}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message?.toString()}
          />
          <Button
            type="submit"
            loading={!finishProcess}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
