"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "@/store/slices/clientSlice";
import { RootState, AppDispatch } from "@/store";
import { Client } from "@/types/client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Chip,
} from "@mui/material";
import { Edit, Delete, Search } from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import Swal from "sweetalert2";
import AddEditClientModal from "@/components/AddEditClientModal";
import toast from "react-hot-toast";
import { createClient, deleteClient, updateClinet } from "@/services/clientService";
import Footer from "@/components/Footer";

const ClientsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);

  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    setFilteredClients(
      clients.filter(
        (client) =>
          client.firstName.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, clients]);

  const handleDeleteClient = async (clientId: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await deleteClient(clientId);
      toast.success(`Client with ID: ${clientId} deleted successfully!`);
      dispatch(getClients());
    }
  };

  const handleSaveClient = async  (client: Client) => {


    if (client.id) {
      await updateClinet(client);
      toast.success("Client edited successfully!");
    } else {
      await createClient(client);
      toast.success("Client added successfully!");
    }
    dispatch(getClients());
    setModalOpen(false);
  };

  const openModal = (client?: Client) => {
    if (client) {
      setSelectedClient(client); // Si hay cliente, lo selecciona para editar
    } else {
      setSelectedClient(null); // Si no hay cliente, limpiamos el seleccionado
    }
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setSelectedClient(null);
    setModalOpen(false);
  };

  return (
    <>
    <DashboardLayout>
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" color="primary" textAlign={'center'} fontWeight="bold" gutterBottom>
          Clients List
        </Typography>
        <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
          <TextField
            variant="outlined"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ marginRight: 1 }} />,
            }}
            sx={{
              flex: 1,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal()}
          >
            + Add Client
          </Button>
        </Box>
      </Box>

      {loading && <Typography>Loading clients...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#021126" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>First Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Last Name</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Birth Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Registration Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Start Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>End Date</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow  key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.birthDate}</TableCell>
                <TableCell>{client.registrationDate}</TableCell>
                <TableCell>{client.startDate}</TableCell>
                <TableCell>{client.endDate}</TableCell>
                <TableCell>
                  <Chip
                    label={client.membershipStatus}
                    color={client.membershipStatus === "ACTIVE" ? "success" : "error"}
                  />
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => openModal(client)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteClient(client.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddEditClientModal
        open={modalOpen}
        onClose={closeModal}
        client={selectedClient}
        onSave={handleSaveClient}
      />
    </DashboardLayout>
    <Footer />
    </>
    
  );
};

export default ClientsPage;
