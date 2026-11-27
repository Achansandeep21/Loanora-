import React, { StrictMode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import authReducer from "./redux/authSlice";
import Profile from "./Profile";

test("deduplicates profile requests in Strict Mode", async () => {
  const fetchMock = jest.fn().mockResolvedValue({
    status: 200,
    ok: true,
    json: jest.fn().mockResolvedValue({
      success: true,
      user: {
        user_id: 5,
        full_name: "Test Customer",
      },
    }),
  });
  global.fetch = fetchMock;

  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: "test-token",
        isLoggedIn: true,
      },
    },
  });

  render(
    <StrictMode>
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    </StrictMode>
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: "Test Customer" })
    ).toBeInTheDocument();
  });
  expect(fetchMock).toHaveBeenCalledTimes(1);
});
