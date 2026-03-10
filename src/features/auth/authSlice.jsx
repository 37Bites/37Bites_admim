import { createSlice } from "@reduxjs/toolkit";

<<<<<<< HEAD
// Load saved auth
const storedAuth = JSON.parse(localStorage.getItem("auth"));
=======
let storedAuth = null;
try {
  storedAuth = JSON.parse(localStorage.getItem("auth"));
} catch (error) {
  storedAuth = null;
}
>>>>>>> 96546799e8b54ba2af9a2d707a8575da8f447bd2

const initialState = {
  user: storedAuth?.user || null,
  accessToken: storedAuth?.accessToken || null,
  refreshToken: storedAuth?.refreshToken || null,
  lastLogin: storedAuth?.lastLogin || null,
  isAuthenticated: !!storedAuth?.user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload || {};
      const user = payload.user || null;
      const accessToken = payload.accessToken || null;
      const refreshToken = payload.refreshToken || null;
      const lastLogin = new Date().toISOString();

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.lastLogin = lastLogin;
      state.isAuthenticated = !!user;

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

    updateUser: (state, action) => {
      state.user = {
        ...(state.user || {}),
        ...(action.payload || {}),
      };

      state.isAuthenticated = !!state.user;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          lastLogin: state.lastLogin,
        })
      );
    },
  },
});

<<<<<<< HEAD
export const { loginSuccess, logout } = authSlice.actions;
=======
export const { loginSuccess, logout, updateUser } = authSlice.actions;
>>>>>>> 96546799e8b54ba2af9a2d707a8575da8f447bd2
export default authSlice.reducer;