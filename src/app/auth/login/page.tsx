"use client";
import React from "react";
import { Box, Button, TextField, Typography, Card } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/utils/validationSchemas";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";
import axiosInstance from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { LoginRequest } from "@/types/auth";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Configuración de React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);

      const token = response.data;
      dispatch(setCredentials({ token }));
      localStorage.setItem("token", token);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/clients"), 1500);
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),
                     url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card
        sx={{
          padding: 4,
          maxWidth: 400,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#d32f2f" }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          align="center"
          gutterBottom
          sx={{ marginBottom: 3, color: "#b0bec5" }}
        >
          Manage your gym with ease. Enter your details to continue.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Email */}
          <TextField
            {...register("email")}
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: "#b0bec5" } }}
            InputProps={{
              style: {
                color: "#fff",
                backgroundColor: "#1e1e1e",
                borderRadius: 5,
              },
            }}
          />
          {/* Campo de Contraseña */}
          <TextField
            {...register("password")}
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: "#b0bec5" } }}
            InputProps={{
              style: {
                color: "#fff",
                backgroundColor: "#1e1e1e",
                borderRadius: 5,
              },
            }}
          />
          {/* Botón de Inicio de Sesión */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#d32f2f",
              color: "#fff",
              padding: 1.5,
              fontWeight: "bold",
              marginTop: 2,
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Sign In
          </Button>
        </form>
        {/* Enlace de Recuperar Contraseña */}
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 2, color: "#b0bec5" }}
        >
          Forgot your password?{" "}
          <span
            style={{
              color: "#d32f2f",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Reset here
          </span>
        </Typography>
      </Card>
    </Box>
  );
};

export default LoginPage;
