

import { WorkoutClass } from '@/types/workoutClass';
import axiosInstance from '@/utils/axiosInstance';


export const fetchWorkoutClass= async (): Promise<WorkoutClass[]> => {
  try {
    const response = await axiosInstance.get('/workoutclass');
    return response.data;
  } catch (error) {
    console.error('Error fetching workoutClass:', error);
    throw error;
  }
};


export const updateWorkoutClass= async (workoutClass: WorkoutClass): Promise<WorkoutClass> => {
  try {
    const response = await axiosInstance.put(`/workoutclass/${workoutClass.id}`, workoutClass);
    return response.data;
  } catch (error) {
    console.error('Error updating workoutClass:', error);
    throw error;
  }
}

export const createWorkoutClass = async (workoutclass: WorkoutClass): Promise<WorkoutClass> => {
  try {
    const response = await axiosInstance.post('/workoutclass', workoutclass);
    return response.data;
  } catch (error) {
    console.error('Error creating workoutclass:', error);
    throw error;
  }
};


export const deleteWorkoutClass = async (workoutClass: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/workoutclass/${workoutClass}`);
  } catch (error) {
    console.error('Error deleting workoutClass:', error);
    throw error;
  }
}
