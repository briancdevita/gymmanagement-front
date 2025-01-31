import { Client } from '@/types/client';
import axiosInstance from '@/utils/axiosInstance';


export const fetchClients = async (): Promise<Client[]> => {
  try {
    const response = await axiosInstance.get('/clients');
    return response.data;
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw error;
  }
};


export const updateClinet = async (client: Client): Promise<Client> => {

  try {
    const response = await axiosInstance.put(`/clients/${client.id}`, client);
    return response.data;
  } catch (error) {
    console.error('Error updating client:', error);
    throw error;
  }
}

export const createClient = async (client: Client): Promise<Client> => {
  try {
    const response = await axiosInstance.post('/clients', client);
    return response.data;
  } catch (error) {
    console.error('Error creating client:', error);
    throw error;
  }
};


export const deleteClient = async (clientId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/clients/${clientId}`);
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error;
  }
}
