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
  MenuItem,
  FormControl,
} from "@mui/material";
import { Client } from "@/types/client";
import { useForm } from "react-hook-form";
import {
  Person,
  Email,
  CalendarToday,
  Work,
  EventAvailable,
  EventBusy,
} from "@mui/icons-material";

interface AddEditClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
  onSave: (client: Client) => void;
}

export const membershipStatusOptions: string[] = [
  "ACTIVE",
  "PENDING",
  "CANCELL"
];

const AddEditClientModal: React.FC<AddEditClientModalProps> = ({
  open,
  onClose,
  client,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Client>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      membershipStatus: membershipStatusOptions[0], 
      startDate: "",
      endDate: "",
    },
  });

  useEffect(() => {
    if (client) {
      reset(client);
    } else {
      reset();
    }
  }, [client, reset]);

  const onSubmit = (data: Client) => {
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
          width: { xs: "90%", sm: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          "& .MuiInputBase-root": { borderRadius: 2 },
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, mb: 2 }}>
          {client ? "Edit Client" : "New Client Registration"}
          <Divider sx={{ mt: 1, borderColor: "divider" }} />
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName", { required: "Required field" })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                label="Last Name"
                {...register("lastName", { required: "Required field" })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
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
                label="Birth Date"
                type="date"
                {...register("birthDate", { required: "Required field" })}
                error={!!errors.birthDate}
                helperText={errors.birthDate?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  label="Membership Status"
                  {...register("membershipStatus", { required: "Required field" })}
                  error={!!errors.membershipStatus}
                  helperText={errors.membershipStatus?.message}
                  select
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                >
                  {membershipStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                {...register("startDate", { required: "Required field" })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventAvailable fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                {...register("endDate", { required: "Required field" })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventBusy fontSize="small" color="action" />
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
              Save Client
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEditClientModal;