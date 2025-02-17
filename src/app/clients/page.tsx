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
import { Edit, Delete, PersonAdd } from "@mui/icons-material";
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

      <Box sx={{ p: 4, maxWidth: 1440, mx: 'auto' }}>
        {/* Header Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          mb: 4,
          textAlign: 'center'
        }}>
          <Box>
            <Typography variant="h3" fontWeight={700} gutterBottom sx={{ color: 'primary.main' }}>
              Client Management
            </Typography>
          </Box>

          {/* Search and Actions */}
          <Box sx={{ 
            width: '100%',
            maxWidth: 800,
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center'
          }}>
            <SearchComponent
              search={search}
              setSearch={setSearch}
              sx={{ flexGrow: 1, width: '100%' }}
            />
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => setModalOpen(true)}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: 16,
                whiteSpace: 'nowrap'
              }}
            >
              Add New Client
            </Button>
          </Box>
        </Box>

        {/* Loading and Error States */}
        {loading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 1
          }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        )}

        {error && (
          <Box sx={{ 
            p: 3, 
            bgcolor: 'error.light', 
            borderRadius: 3,
            mb: 3,
            textAlign: 'center'
          }}>
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {/* Filters */}
        <ClientFilter onFilterChange={handleFilterChange} />

        {/* Clients Table */}
        <Paper sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid',
          borderColor: 'divider'
        }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader size="small">
              <TableHead sx={{ bgcolor: 'background.paper' }}>
                <TableRow>
                  {['Client', 'Email', 'Start Date', 'End Date', 'Status', 'Actions'].map((header) => (
                    <TableCell 
                      key={header}
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        fontWeight: 600,
                        fontSize: 15,
                        py: 2,
                        borderBottom: '2px solid',
                        borderColor: 'divider'
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    hover
                    sx={{ 
                      '&:nth-of-type(even)': { bgcolor: 'action.hover' },
                      '&:hover': { bgcolor: 'action.selected' }
                    }}
                  >
                    <TableCell sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          bgcolor: 'primary.main', 
                          width: 40, 
                          height: 40,
                          fontSize: 16 
                        }}>
                          {client.firstName[0]}{client.lastName[0]}
                        </Avatar>
                        <Box>
                          <Typography fontWeight={500}>
                            {client.firstName} {client.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Born: {formatDate(client.birthDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>{client.email}</TableCell>
                    <TableCell sx={{ py: 2 }}>{formatDate(client.startDate)}</TableCell>
                    <TableCell sx={{ py: 2 }}>{formatDate(client.endDate)}</TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={client.membershipStatus}
                        color={client.membershipStatus === "ACTIVE" ? "success" : "error"}
                        sx={{ 
                          borderRadius: 1,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          width: 90
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedClient(client);
                              setModalOpen(true);
                            }}
                            sx={{
                              bgcolor: 'primary.light',
                              '&:hover': { bgcolor: 'primary.main', color: 'white' }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteClient(client.id)}
                            sx={{
                              bgcolor: 'error.light',
                              '&:hover': { bgcolor: 'error.main', color: 'white' }
                            }}
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