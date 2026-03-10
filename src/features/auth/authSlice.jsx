import { createSlice } from "@reduxjs/toolkit";

// ✅ Safe localStorage parse
let storedAuth = null;
try {
  storedAuth = JSON.parse(localStorage.getItem("auth"));
} catch (error) {
  storedAuth = null;
}

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
      const { user, accessToken, refreshToken } = action.payload;

      const lastLogin = new Date().toISOString();

      state.user = user;
      state.accessToken = accessToken || null;
      state.refreshToken = refreshToken || null;
      state.lastLogin = lastLogin;
      state.isAuthenticated = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user,
          accessToken: accessToken || null,
          refreshToken: refreshToken || null,
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
        ...state.user,
        ...action.payload,
      };

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

export const { loginSuccess, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;