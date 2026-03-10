import { createSlice } from "@reduxjs/toolkit";

// Load saved auth
const storedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: storedAuth?.user || null,
  accessToken: storedAuth?.accessToken || null,
  refreshToken: storedAuth?.refreshToken || null,
  lastLogin: storedAuth?.lastLogin || null,
  isAuthenticated: storedAuth ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      const lastLogin = new Date().toISOString();

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.lastLogin = lastLogin;
      state.isAuthenticated = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          accessToken,
          refreshToken,
          lastLogin,
        })
      );
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.lastLogin = null;
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;