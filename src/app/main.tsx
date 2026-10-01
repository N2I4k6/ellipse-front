import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";

import { store } from "@/app/store";
import { ThemeProvider } from "@/app/providers/ThemeContext";
import { AppProviders } from "@/app/providers/AppProviders";
import { router } from "@/app/router/routes";

import "@/shared/i18n";

import "@/app/styles/variables.css";
import "@/app/styles/reset.css";
import "@/app/styles/base.css";
import "@/app/styles/index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root element #root not found in index.html");
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <AppProviders>
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                }}
              >
                <Spin size="large" />
              </div>
            }
          >
            <RouterProvider router={router} />
          </Suspense>
        </AppProviders>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
