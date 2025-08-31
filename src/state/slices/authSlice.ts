import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Owner } from "../../schemas/AuthUser/User.schema";
import { Player } from "../../schemas/AuthUser/User.schema";

// Auth state interface
interface AuthState {
  mode: "light" | "dark";
  player: Player | null;
  owner: Owner | null;
  token: string | null;
  activeDialog: "ownerLogin" | "playerLogin" | "ownerSignup" | "owenerForgotPassword" | null;
  refreshToken: string | null;
}

// Initial auth state
const initialAuthState: AuthState = {
  mode: "light",
  player: null,
  owner: null,
  token: null,
  activeDialog: null,
  refreshToken: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setMode: (state: AuthState) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state: AuthState, action: PayloadAction<{ owner: Owner; token: string; refreshToken: string }>) => {
      state.owner = action.payload.owner;
      state.token = `Bearer ${action.payload.token}`;
      state.refreshToken = action.payload.refreshToken;
    },
    setPlayer: (state: AuthState, action: PayloadAction<{ player: Player; token: string }>) => {
      state.player = action.payload.player;
      state.token = `Bearer ${action.payload.token}`;
    },
    setToken: (state: AuthState, action: PayloadAction<{ token: string }>) => {
      state.token = `Bearer ${action.payload.token}`;
    },
    setActiveDialog: (state: AuthState, action: PayloadAction<{ activeDialog: AuthState['activeDialog'] }>) => {
      state.activeDialog = action.payload.activeDialog;
    },
    setClearOnUnload: (state: AuthState) => {
      state.activeDialog = null;
    },
    setLogout: (state: AuthState) => {
      state.player = null;
      state.owner = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setMode, setLogin, setPlayer, setToken, setActiveDialog, setClearOnUnload, setLogout } = authSlice.actions;
export default authSlice.reducer;