
import { Trainer } from '@/types/trainers';
import axiosInstance from '@/utils/axiosInstance';


export const fetchTrainers= async (): Promise<Trainer[]> => {
  try {
    const response = await axiosInstance.get('/trainers');
    return response.data;
  } catch (error) {
    console.error('Error fetching trainers:', error);
    throw error;
  }
};


export const updateTrainer= async (trainer: Trainer): Promise<Trainer> => {
  try {
    const response = await axiosInstance.put(`/trainers/${trainer.id}`, trainer);
    return response.data;
  } catch (error) {
    console.error('Error updating trainer:', error);
    throw error;
  }
}

export const createTrainer = async (trainer: Trainer): Promise<Trainer> => {
  try {
    const response = await axiosInstance.post('/trainers', trainer);
    return response.data;
  } catch (error) {
    console.error('Error creating trainer:', error);
    throw error;
  }
};


export const deleteTrainer = async (trainerId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/trainers/${trainerId}`);
  } catch (error) {
    console.error('Error deleting trainers:', error);
    throw error;
  }
}
