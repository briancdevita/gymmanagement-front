import { getOneTrainer } from "@/services/trainerService";
import { deleteWorkoutClass } from "@/services/workoutClassService";
import { AppDispatch } from "@/store";
import { getWorkoutClass } from "@/store/slices/workoutClassSlice";
import { Trainer } from "@/types/trainers";
import { WorkoutClass } from "@/types/workoutClass";
import { Delete, Edit, FitnessCenter, People, Schedule } from "@mui/icons-material";
import { Avatar, Box, Chip, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export interface WorkoutClassItemProps {
  cls: WorkoutClass;
  router: any;
  isLast: boolean;
  onEdit: (workout: WorkoutClass) => void;
}

export const WorkoutClassItem: React.FC<WorkoutClassItemProps> = ({ cls, router, isLast, onEdit, getStatusColor }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [trainerSelected, setTrainerSelected] = useState<Trainer>();
  
  
    const handleDeleteClient = async (workoutId: number) => {
      const result = await Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this WorkoutClass?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d32f2f",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });
  
      if (result.isConfirmed) {
        await deleteWorkoutClass(workoutId);
        toast.success("WorkoutClass deleted successfully!");
        dispatch(getWorkoutClass());
      }
    };
  
  
    useEffect(() => {
      if (cls.trainerId) {
        getOneTrainer(cls.trainerId).then((trainer) => {
          setTrainerSelected(trainer);
        });
      }
    }, [cls.trainerId]);
    
    
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
              <FitnessCenter/>
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
                   <Chip
                   label={cls.registeredParticipants >= cls.maxCapacity ? 'ACTIVE' : 'PENDING'}
                   size="small"
                   color={cls.registeredParticipants >= cls.maxCapacity ? "success" : "warning"}
                   sx={{ ml: 1, height: 20 }}
                 />
                  )}
                </Stack>
  
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight={500}>
                      {trainerSelected?.name}
                    </Box>
                    <Box component="span" color="text.secondary" ml={1}>
                      ({trainerSelected?.specialty})
                    </Box>
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">
                    <Box component="span" fontWeight={500}>
                      Description: {cls.description}
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
                onClick={() => onEdit(cls)}
                sx={{ color: "text.secondary" }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Clase" arrow>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteClient(cls.id)}
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