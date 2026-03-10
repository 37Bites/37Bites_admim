import { createSlice } from "@reduxjs/toolkit";

// 🔹 Load from localStorage
const storedAuth = JSON.parse(localStorage.getItem("auth"));

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
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.lastLogin = lastLogin;
      state.isAuthenticated = true;

      localStorage.setItem(
        "auth",
        JSON.stringify({ user, accessToken, refreshToken, lastLogin })
      );
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      const stored = JSON.parse(localStorage.getItem("auth")) || {};

      localStorage.setItem(
        "auth",
        JSON.stringify({
          ...stored,
          user: state.user,
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

export const { loginSuccess, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

/* ===========================
   🔥 Example Dashboard Component
   =========================== */

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, lastLogin } = useSelector((state) => state.auth);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user?.name}</h2>
      <p><strong>Mobile:</strong> {user?.mobile}</p>
      <p>
        <strong>Last Login:</strong>{" "}
        {lastLogin
          ? new Date(lastLogin).toLocaleString()
          : "First Login"}
      </p>

      <button
        onClick={() => dispatch(logout())}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};