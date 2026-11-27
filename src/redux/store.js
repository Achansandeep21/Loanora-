import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const AUTH_STORAGE_KEY = "loanora.auth";

const loadAuthState = () => {
  try {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!savedAuth) return undefined;

    const auth = JSON.parse(savedAuth);
    if (
      !auth ||
      typeof auth.token !== "string" ||
      !auth.user ||
      typeof auth.user !== "object"
    ) {
      throw new Error("Saved authentication data is invalid.");
    }

    return {
      auth: {
        ...auth,
        isLoggedIn: true,
      },
    };
  } catch (error) {
    console.error("Unable to restore saved authentication:", error);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: loadAuthState(),
});

store.subscribe(() => {
  const auth = store.getState().auth;

  if (auth.isLoggedIn && auth.token) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
});