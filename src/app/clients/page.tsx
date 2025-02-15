"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients } from "@/store/slices/clientSlice";
import { RootState, AppDispatch } from "@/store";
import { Client } from "@/types/client";

import {
  Box,
  Typography,
  Button,

  Chip,
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Search, PersonAdd } from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import Swal from "sweetalert2";
import AddEditClientModal from "@/components/AddEditClientModal";
import toast from "react-hot-toast";
import { createClient, deleteClient, updateClinet } from "@/services/clientService";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import ClientFilter from "@/components/ClientFilter";
import { SearchComponent } from "@/components/SearchComponent";

const ClientsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error } = useSelector((state: RootState) => state.clients);

  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);


  const handleFilterChange = (search: string, status: string) => {
    let filtered = clients;
    if (search) {
      filtered = filtered.filter(
        (client) =>
          client.firstName.toLowerCase().includes(search.toLowerCase()) ||
          client.lastName.toLowerCase().includes(search.toLowerCase()) ||
          client.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== "ALL") {
      filtered = filtered.filter(
        (client) => client.membershipStatus === status
      );
    }
    setFilteredClients(filtered);
  };







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
      title: "Confirm Delete",
      text: "Are you sure you want to delete this client?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteClient(clientId);
      toast.success("Client deleted successfully!");
      dispatch(getClients());
    }
  };

  const handleSaveClient = async (client: Client) => {
    if (client.id) {
      await updateClinet(client);
      toast.success("Client updated successfully!");
    } else {
      await createClient(client);
      toast.success("Client added successfully!");
    }
    dispatch(getClients());
    setModalOpen(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <>

    <DashboardLayout>
      
      <Box sx={{ p: 4,  }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Client Management
            </Typography>
           
            <Chip 
              label={`${filteredClients.length} clients found`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
          <SearchComponent
           search={search}
           setSearch={setSearch}
           />
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
           
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => setModalOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              New Client
            </Button>
            
          </Box>
        </Box>

        

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Box sx={{ p: 2, backgroundColor: 'error.light', borderRadius: 2 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}
         <ClientFilter onFilterChange={handleFilterChange} />
        <Paper sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
        }}>
          
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }}>Client</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }}>Start Date</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }}>End Date</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: 'common.white', fontWeight: 600 }} align="center">Actions</TableCell>
                </TableRow>
                
              </TableHead>
           

              <TableBody>
                
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    hover
                    sx={{ 
                      '&:last-child td': { borderBottom: 0 },
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          {client.firstName[0]}{client.lastName[0]}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={500}>
                            {client.firstName} {client.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(client.birthDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                  
                    <TableCell>{formatDate(client.startDate)}</TableCell>
                    <TableCell>{formatDate(client.endDate)}</TableCell>
                    <TableCell>
                      <Chip
                        label={client.membershipStatus}
                        color={client.membershipStatus === "ACTIVE" ? "success" : "error"}
                        sx={{ 
                          borderRadius: 1,
                          fontWeight: 500,
                          textTransform: 'uppercase'
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedClient(client);
                              setModalOpen(true);
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClient(client.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <AddEditClientModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedClient(null);
          }}
          client={selectedClient}
          onSave={handleSaveClient}
        />
      </Box>
     
    </DashboardLayout>
    <Footer />
    </>
  );
};

export default ClientsPage;