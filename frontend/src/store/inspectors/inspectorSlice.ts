import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {Inspector} from "../../types/Inspector/inspector.type.ts";

const API_URL = "http://localhost:3000/inspectors";

interface InspectorState {
  inspectors: Inspector[];
  loading: boolean;
  error: string | null;
}

const initialState: InspectorState = {
  inspectors: [],
  loading: false,
  error: null,
};

export const fetchInspectors = createAsyncThunk("inspectors/fetchAll", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const getInspectorById = createAsyncThunk("inspectors/getById", async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const createInspector = createAsyncThunk("inspectors/create", async (inspector: Inspector) => {
  const response = await axios.post(API_URL, inspector);
  return response.data;
});

export const updateInspector = createAsyncThunk("inspectors/update", async ({ id, updatedData }: { id: string; updatedData: Inspector }) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
});

export const deleteInspector = createAsyncThunk("inspectors/delete", async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const inspectorSlice = createSlice({
  name: "inspector",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchInspectors.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchInspectors.fulfilled, (state, action: PayloadAction<Inspector[]>) => {
          state.loading = false;
          state.inspectors = action.payload;
        })
        .addCase(fetchInspectors.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Failed to fetch inspectors.";
        })
        .addCase(getInspectorById.fulfilled, (state, action: PayloadAction<Inspector>) => {
          state.inspectors = [action.payload];
        })
        .addCase(createInspector.fulfilled, (state, action: PayloadAction<Inspector>) => {
          state.inspectors.push(action.payload);
        })
        .addCase(updateInspector.fulfilled, (state, action: PayloadAction<Inspector>) => {
          const index = state.inspectors.findIndex((i) => i.id === action.payload.id);
          if (index !== -1) state.inspectors[index] = action.payload;
        })
        .addCase(deleteInspector.fulfilled, (state, action: PayloadAction<string>) => {
          state.inspectors = state.inspectors.filter((i) => i.id !== action.payload);
        });
  },
});

export default inspectorSlice.reducer;
