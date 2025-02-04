import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTrainers } from '@/services/trainerService';
import { Trainer } from '@/types/trainers';


export const getTrainers = createAsyncThunk('trainer/fetchTrainers', async () => {
  const trainers = await fetchTrainers();
  return trainers;
});

interface TrainerState {
  trainers: Trainer[];
  loading: boolean;
  error: string | null;
}

const initialState: TrainerState = {
  trainers: [],
  loading: false,
  error: null,
};

const trainerSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTrainers.fulfilled, (state, action) => {
        state.loading = false;
        state.trainers = action.payload;
      })
      .addCase(getTrainers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trainers';
      });
  },
});



// 🚀 Exportamos el Reducer para el Store
export default trainerSlice.reducer;
