import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { Client } from "@/types/client";
import { useForm } from "react-hook-form";

interface AddEditClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null; // Cliente seleccionado o null si es nuevo
  onSave: (client: Client) => void; // Función para guardar cliente
}



const AddEditClientModal: React.FC<AddEditClientModalProps> = ({
  open,
  onClose,
  client,
  onSave,
}) => {
  const { register, handleSubmit, reset } = useForm<Client>();

  useEffect(() => {
    if (client) {
      reset(client); 
    } else {
      reset({
        id: undefined,
        firstName: "",
        lastName: "",
        email: "",
        registrationDate: "",
        birthDate: "",
        membershipStatus: "",
        startDate: "",
        endDate: "",
      }); 
    }
  }, [client, reset]);
  

  const onSubmit = (data: Client) => {
    onSave(data); // Llama a la función onSave con los datos del formulario
    onClose(); // Cierra el modal
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {client ? "Edit Client" : "Add Client"}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Birth Date"
                {...register("birthDate")}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Registration Date"
                {...register("registrationDate")}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                {...register("startDate")}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date"
                {...register("endDate")}
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Membership Status"
                {...register("membershipStatus")}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEditClientModal;
