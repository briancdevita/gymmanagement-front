"use client";

import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Stack,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItem,
  List,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit, People, Schedule, Delete, FitnessCenter } from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getWorkoutClass } from "@/store/slices/workoutClassSlice";



// Función para definir el color según el estado
const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "success.main";
    case "cancelled":
      return "error.main";
    case "pending":
      return "warning.main";
    default:
      return "text.primary";
  }
};

// Componente para mostrar cada item de clase
const WorkoutClassItem = ({ cls, router, isLast }) => {
  return (
    <React.Fragment key={cls.id}>
      <ListItem
        sx={{
          p: 2,
          position: "relative",
          borderRadius: 1,
          transition: "background-color 0.3s, box-shadow 0.3s",
          "&:hover": { backgroundColor: "action.hover", boxShadow: 1 },
        }}
      >
        {/* Indicador de estado lateral */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            borderRadius: "4px 0 0 4px",
            bgcolor: getStatusColor(cls.status),
          }}
        />

        <ListItemAvatar sx={{ minWidth: 60 }}>
          <Avatar
            variant="rounded"
            src={cls.imageUrl}
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1,
            }}
          >
            <FitnessCenter />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          disableTypography
          primary={
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" fontWeight={600}>
                {cls.className}
              </Typography>
              <Chip
                label={cls.status.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: getStatusColor(cls.status),
                  color: "white",
                  fontWeight: 500,
                  height: 20,
                }}
              />
            </Stack>
          }
          secondary={
            <Stack spacing={1} sx={{ mt: 0.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Schedule fontSize="small" color="action" />
                <Typography variant="body2">
                  {format(new Date(cls.dateTime), "dd MMM yyyy - HH:mm")}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <People fontSize="small" color="action" />
                <Typography variant="body2">
                  {cls.registeredParticipants}/{cls.maxCapacity}
                </Typography>
                {cls.registeredParticipants >= cls.maxCapacity && (
                  <Chip label="COMPLETO" size="small" color="error" sx={{ ml: 1, height: 20 }} />
                )}
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">
                  <Box component="span" fontWeight={500}>
                    {cls.trainer.name}
                  </Box>
                  <Box component="span" color="text.secondary" ml={1}>
                    ({cls.trainer.specialty})
                  </Box>
                </Typography>
              </Stack>
            </Stack>
          }
        />

        <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
          <Tooltip title="Editar Clase" arrow>
            <IconButton
              size="small"
              onClick={() => router.push(`/admin/classes/edit/${cls.id}`)}
              sx={{ color: "text.secondary" }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar Clase" arrow>
            <IconButton
              size="small"
              color="error"
              onClick={() => console.log("Eliminar clase con id:", cls.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </ListItem>

      {!isLast && <Divider variant="middle" />}
    </React.Fragment>
  );
};

const WorkoutClassPage = () => {

  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(getWorkoutClass());
    }, [dispatch]);
  const { workoutClass, loading, error } = useSelector((state: RootState) => state.workoutClass);
  const router = useRouter();

  console.log(workoutClass)
 

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Gestión de Clases
          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            size="small"
            sx={{ borderRadius: 1 }}
            onClick={() => router.push("/admin/classes/create")}
          >
            Nueva Clase
          </Button>
        </Stack>

        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <List sx={{ p: 0 }}>
            {workoutClass.map((cls, index) => (
              <WorkoutClassItem
                key={cls.id}
                cls={cls}
                router={router}
                isLast={index === workoutClass.length - 1}
              />
            ))}
          </List>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default WorkoutClassPage;
