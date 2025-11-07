import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { UIContextProvider } from "../contexts/UIContext.jsx";
import { ThemeProvider } from "../contexts/ThemeProvider.jsx";
import queryClient from "../config/reactQuery.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UIContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </UIContextProvider>
    </BrowserRouter>
  </StrictMode>
);
