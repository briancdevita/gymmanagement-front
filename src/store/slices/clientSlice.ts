import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClients } from '@/services/clientService';
import { Client } from '@/types/client';


export const getClients = createAsyncThunk('clients/fetchClients', async () => {
  const clients = await fetchClients();
  return clients;
});

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
}

const initialState: ClientsState = {
  clients: [],
  loading: false,
  error: null,
};


const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clients';
      });
  },
});

// 🚀 Exportamos el Reducer para el Store
export default clientSlice.reducer;
