import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  user_id: string;
  user_name: string;
  email: string;
  role_id: number;
  user_role: string;
  token: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const tokenKey = "auth-token";
const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      console.log(`Testing Token: ${state.token}`);
      localStorage.setItem(tokenKey, action.payload.token);
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
  selectors: {
    selectisAuthenticated: (state) => state.isAuthenticated,
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
