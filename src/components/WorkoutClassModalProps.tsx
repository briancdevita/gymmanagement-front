"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {
  FitnessCenter,
  Schedule,
  Description,
  Group,
  Image,
  EventAvailable,

} from "@mui/icons-material";
import { WorkoutClass } from "@/types/workoutClass";
import { Trainer } from "@/types/trainers";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "@/store/slices/trainerSlice";

interface WorkoutClassModalProps {
  open: boolean;
  onClose: () => void;
  workoutClass: WorkoutClass | null;
  onSave: (workoutClass: WorkoutClass) => void;
  trainers: Trainer[];
}

const statusOptions = [
  { label: "EXPIRED", value: 0 },
  { label: "ACTIVE", value: 1 },

];

const WorkoutClassModal: React.FC<WorkoutClassModalProps> = ({
  open,
  onClose,
  workoutClass,
  onSave

}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WorkoutClass>({
    mode: "onBlur",
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  const { trainers, loading } = useSelector((state: RootState) => state.trainers);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    if (workoutClass) {
      reset(workoutClass);
      const found = trainers.find((t) => t.id === workoutClass.trainerId);
      setSelectedTrainer(found || null);
    } else {
      reset({
        className: "",
        description: "",
        dateTime: "",
        duration: 60,
        status: "ACTIVE",
        maxCapacity: 15,
        registeredParticipants: 0,
        imageUrl: "",
      });
      setSelectedTrainer(null);
    }
  }, [workoutClass, reset, trainers]);

  
  const onSubmit = async (data: WorkoutClass) => {
    onSave(data);
    dispatch(getTrainers());
    onClose();
  };

  

  return (
    <Modal open={open} onClose={onClose} disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          "& .MuiInputBase-root": { borderRadius: 2 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          {workoutClass ? "Edit Class" : "Create New Class"}
          <Divider sx={{ mt: 1, borderColor: "divider" }} />
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            {/* Class Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Class Name"
                {...register("className", { required: "Required field" })}
                error={!!errors.className}
                helperText={errors.className?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenter fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

           
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register("description", { required: "Required field" })}
                error={!!errors.description}
                helperText={errors.description?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Date & Time */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date & Time"
                type="datetime-local"
                {...register("dateTime", { required: "Required field" })}
                error={!!errors.dateTime}
                helperText={errors.dateTime?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Schedule fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Duration */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                {...register("duration", {
                  required: "Required field",
                  min: { value: 15, message: "Minimum 15 minutes" },
                })}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventAvailable fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  {...register("status", { required: "Required field" })}
                  defaultValue={0}
                  startAdornment={
                    <InputAdornment position="start">
                      <FitnessCenter fontSize="small" color="action" />
                    </InputAdornment>
                  }
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Max Capacity */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Max Capacity"
                type="number"
                {...register("maxCapacity", {
                  required: "Required field",
                  min: { value: 1, message: "Minimum 1 participant" },
                })}
                error={!!errors.maxCapacity}
                helperText={errors.maxCapacity?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Group fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                {...register("imageUrl", {
                  required: "Required field",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Invalid URL format",
                  },
                })}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Trainer Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Trainer</InputLabel>
                <Select
                  label="Select Trainer"
                  {...register("trainerId", { required: "Select a trainer" })}
                  error={!!errors.trainerId}
                  value={selectedTrainer ? selectedTrainer.id : ""}
                  onChange={(e) => {
                    // Convertir a número, ya que e.target.value es string
                    const selected = trainers.find(
                      (t) => t.id === Number(e.target.value)
                    );
                    if (selected) {
                      setValue("trainerId", selected.id);
                      setSelectedTrainer(selected);
                    }
                  }}
                  renderValue={() => {
                    // Usamos watch para obtener el valor actual del campo
                    const trainerObj = selectedTrainer;
                    return (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar
                          src={trainerObj?.avatar || ""}
                          sx={{ width: 30, height: 30 }}
                        />
                        <span>{trainerObj?.name || "Select Trainer"}</span>
                      </Box>
                    );
                  }}
                >
                  {loading ? (
                    <Box sx={{ p: 2, textAlign: "center" }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    trainers?.map((trainer) => (
                      <MenuItem key={trainer.id} value={trainer.id}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            src={trainer.avatar}
                            sx={{ width: 40, height: 40 }}
                          />
                          <Box>
                            <Typography fontWeight={500}>
                              {trainer.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {trainer.specialty}
                            </Typography>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={() => {
                setSelectedTrainer(null);
                onClose();
              }}
              variant="contained"
              color="error"
              sx={{ borderRadius: 2, px: 4 }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, px: 4 }}
            >
              {workoutClass ? "Update" : "Create"} Class
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default WorkoutClassModal;
