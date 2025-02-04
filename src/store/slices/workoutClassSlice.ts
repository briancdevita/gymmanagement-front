import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWorkoutClass } from '@/services/workoutClassService';
import { WorkoutClass } from '@/types/workoutClass';


export const getWorkoutClass = createAsyncThunk('workoutClass/fetchWorkoutClass', async () => {
  const workoutClass = await fetchWorkoutClass();
  return workoutClass;
});

interface WorkoutClassState {
  workoutClass: WorkoutClass[];
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutClassState = {
  workoutClass: [],
  loading: false,
  error: null,
};

const workoutClassSlice = createSlice({
  name: 'workoutClass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutClass.fulfilled, (state, action) => {
        state.loading = false;
        state.workoutClass = action.payload;
      })
      .addCase(getWorkoutClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch WorkoutClass';
      });
  },
});



// 🚀 Exportamos el Reducer para el Store
export default workoutClassSlice.reducer;
