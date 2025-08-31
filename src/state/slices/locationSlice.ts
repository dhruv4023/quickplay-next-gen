import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../../schemas/Location/OwnerLocation.schema';

interface LocationState {
  locations: Location[];
  selectedLocation: Location | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  selectedLocation: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
      state.error = null;
    },
    setSelectedLocation: (state, action: PayloadAction<Location | null>) => {
      console.log("setSelectedLocation", action.payload);
      state.selectedLocation = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.locations.push(action.payload);
    },
    updateLocation: (state, action: PayloadAction<Location>) => {
      const index = state.locations.findIndex(loc => loc._id === action.payload._id);
      if (index !== -1) {
        state.locations[index] = action.payload;
      }
    },
    deleteLocation: (state, action: PayloadAction<string>) => {
      state.locations = state.locations.filter(loc => loc._id !== action.payload);
    },
  },
});

export const {
  setLocations,
  setSelectedLocation,
  setLoading,
  setError,
  addLocation,
  updateLocation,
  deleteLocation,
} = locationSlice.actions;

export default locationSlice.reducer; 