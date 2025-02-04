"use client";

import { 
  Box, 
  Card, 
  Typography, 
  Button, 
  Container, 
  Chip, 
  Avatar, 
  IconButton,
  TextField,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import { 
  FitnessCenter, 
  Edit, 
  Delete, 
  Search, 
  PersonAddAlt1, 

} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { Trainer } from "@/types/trainers";
import { getTrainers } from "@/store/slices/trainerSlice";
import Swal from "sweetalert2";
import { createTrainer, deleteTrainer, updateTrainer } from "@/services/trainerService";
import toast from "react-hot-toast";
import AddEditTrainerModal from "@/components/AddEditTrainerModal";


const TrainersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(getTrainers());
    }, [dispatch]);
  const { trainers, loading, error } = useSelector((state: RootState) => state.trainers);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);



 const [search, setSearch] = useState("");
 const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);

  useEffect(() => {
    setFilteredTrainers(
        trainers.filter(
          (client) =>
            client.name?.toLowerCase().includes(search.toLowerCase()) ||
            client.email?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, trainers]);

  const router = useRouter();

  const handleDeleteTrainer = async (clientId: number) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this trainer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await deleteTrainer(clientId);
      toast.success("Trainer deleted successfully!");
      dispatch(getTrainers());
    }
  };

  const handleSaveTrainer = async (trainer: Trainer) => {
    if (trainer.id) {
      await updateTrainer(trainer);
      toast.success("Client updated successfully!");
    } else {
      await createTrainer(trainer);
      toast.success("Client added successfully!");
    }
    dispatch(getTrainers());
    setModalOpen(false);
  };

  return (

    <DashboardLayout>

    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Gestión de Entrenadores
          <Chip 
            label={`${trainers.length} registrados`} 
            color="primary" 
            size="small" 
            sx={{ ml: 2, fontWeight: 500 }}
          />
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
            placeholder="Buscar entrenador..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }}
            size="small"
          />
          <Button 
            variant="contained" 
            startIcon={<PersonAddAlt1 />}
            sx={{ borderRadius: 3 }}
            onClick={() => setModalOpen(true)}
          >
            Nuevo Entrenador
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

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {filteredTrainers.map((trainer) => (
          <Box sx={{ width: { xs: '100%', md: 'calc(50% - 24px)', lg: 'calc(33.33% - 24px)' } }} key={trainer.id}>
            <Card sx={{ 
              p: 2,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
              }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                gap: 2
              }}>
                <Avatar 
                  src={trainer.avatar}
                  sx={{ 
                    width: 56, 
                    height: 56,
                    border: '2px solid',
                    borderColor: trainer.status === 'active' ? 'success.main' : 'error.main'
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {trainer.name}
                    <Chip
                      label={trainer.status === 'active' ? 'Activo' : 'Inactivo'}
                      size="small"
                      color={trainer.status === 'active' ? 'success' : 'error'}
                      sx={{ ml: 1, fontSize: '0.75rem' }}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {trainer.email}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FitnessCenter fontSize="small" color="action" />
                  <Typography variant="body2">
                    Especialidad: {trainer.specialty}
                  </Typography>
                </Box>
                <Chip 
                  label={`${trainer.activeClients} clientes`} 
                  variant="outlined" 
                  size="small"
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                borderTop: '1px solid',
                borderColor: 'divider',
                pt: 2
              }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton 
                  onClick={() => {
                    setSelectedTrainer(trainer);
                    setModalOpen(true);
                  }}
                  color="primary"
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton color="error">
                    <Delete 
                    onClick={() => handleDeleteTrainer(trainer.id)}
                    fontSize="small"
                     />
                  </IconButton>
                </Box>
                <Button 
                  variant="text" 
                  size="small"
                  onClick={() => router.push(`/trainers/${trainer.id}`)}
                >
                  Ver detalles
                </Button>
              </Box>
            </Card>
          </Box>
        ))}

        <AddEditTrainerModal
          open={modalOpen}
          onSave={handleSaveTrainer}
          onClose={() => {
            setModalOpen(false);
            setSelectedTrainer(null);
          }}
          trainer={selectedTrainer}
        />

      </Box>
     
    </Container>
    </DashboardLayout>

  
  );
};

export default TrainersPage;