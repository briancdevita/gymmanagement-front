"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  List,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Edit} from "@mui/icons-material";
import DashboardLayout from "@/components/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getWorkoutClass } from "@/store/slices/workoutClassSlice";
import WorkoutClassModal from "@/components/WorkoutClassModalProps";
import { createWorkoutClass, updateWorkoutClass } from "@/services/workoutClassService";
import toast from "react-hot-toast";
import { WorkoutClass } from "@/types/workoutClass";
import { WorkoutClassItem } from "@/components/WorkoutClassItem";




const getStatusColor = (status: string) => {

  switch (status) {
    case 'ACTIVE':
      return "success.main";
    case "CANCELLED":
      return "error.main";
    case "PENDING":
      return "warning.main";
    default:
      return "text.primary";
  }
};




const WorkoutClassPage = () => {


 const [modalOpen, setModalOpen] = useState(false);
 const [selectedWorkout, setSelectedWorkout] = useState<WorkoutClass | null>(null);


  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(getWorkoutClass());
      
    }, [dispatch]);


  const { workoutClass } = useSelector((state: RootState) => state.workoutClass);
  const router = useRouter();
  

  const handleSaveClient = async (workout: WorkoutClass) => {
    if (workout.id && workout.id !== 0) {
      await updateWorkoutClass(workout);
      toast.success("Class updated successfully!");
    } else {
      await createWorkoutClass(workout);
      toast.success("Class created successfully!");
    }
    dispatch(getWorkoutClass());
    setModalOpen(false);
    setSelectedWorkout(null);
  };

  // Callback para editar una clase
  const handleEditClass = (workout: WorkoutClass) => {
    setSelectedWorkout(workout);
    setModalOpen(true);
  };;

  

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
          Class Management

          </Typography>
          <Button
            variant="contained"
            startIcon={<Edit />}
            size="small"
            sx={{ borderRadius: 1 }}
            onClick={() => {
              setSelectedWorkout(null); 
              setModalOpen(true);
            }}
          >
            New Class
          </Button>
        </Stack>

        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <List sx={{ p: 0 }}>
            {workoutClass.map((cls, index) => (
              <WorkoutClassItem
                key={cls.id}
                cls={cls}
                router={router}
                onSave={()=>{}}
                onEdit={handleEditClass}
                getStatusColor={getStatusColor}
                isLast={index === workoutClass.length - 1}
              />
            ))}
          </List>
        </Paper>
        <WorkoutClassModal
          open={modalOpen}
          workoutClass={selectedWorkout}
          onClose={() => {
            setModalOpen(false);
            setSelectedWorkout(null);
          }}
          onEdit={handleEditClass}
          onSave={handleSaveClient}
        />
      </Box>
    </DashboardLayout>
  );
};

export default WorkoutClassPage;
