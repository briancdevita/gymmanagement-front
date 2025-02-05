import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Person, Email, FitnessCenter, Image } from "@mui/icons-material";
import { Trainer } from "@/types/trainers";

interface AddEditTrainerModalProps {
  open: boolean;
  onClose: () => void;
  trainer: Trainer | null;
  onSave: (trainer: Trainer) => void;
}

const AddEditTrainerModal: React.FC<AddEditTrainerModalProps> = ({
  open,
  onClose,
  trainer,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<Trainer>({
    mode: "onBlur",
  });
  const imageUrl = watch("avatar");


  useEffect(() => {
    if (trainer) {
      setTimeout(() => reset({ ...trainer, imageUrl: trainer.avatar || "" }), 0); // Asegura que imageUrl se establezca bien

    } else {
      reset({
        id: "",
        name: "",
        email: "",
        specialty: "",
        avatar: "", 
      });
    }
  }, [trainer, reset]);
  



  const onSubmit = (data: Trainer) => {
    onSave(data);
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
          width: { xs: "90%", sm: 500 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          "& .MuiInputBase-root": { borderRadius: 2 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          {trainer ? "Edit Trainer" : "New Trainer"}
          <Divider sx={{ mt: 1, borderColor: "divider" }} />
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Avatar
                src={imageUrl}
                
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto",
                  border: "2px solid #eee",
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("name", { required: "Required field" })}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Required field",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Specialty"
                {...register("specialty", { required: "Required field" })}
                error={!!errors.specialty}
                helperText={errors.specialty?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FitnessCenter fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profile Image URL"
                {...register("avatar", {
                  required: "Required field",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Invalid URL format",
                  },
                })}
                error={!!errors.avatar}
                helperText={errors.avatar?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
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
              {trainer ? "Update" : "Create"} Trainer
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEditTrainerModal;