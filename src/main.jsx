// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

import { msalConfig } from "./authConfig";
import App from "./App";

const msalInstance = new PublicClientApplication(msalConfig);

const antdTheme = {
  token: {
    colorPrimary: "#1a56db",
    borderRadius: 8,
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
};

async function bootstrap() {
  await msalInstance.initialize();

  // Finish the redirect login (reads the response from the URL) BEFORE routing starts
  const result = await msalInstance.handleRedirectPromise();
  if (result?.account) {
    msalInstance.setActiveAccount(result.account);
  } else if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload?.account) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  });

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <ConfigProvider theme={antdTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfigProvider>
      </MsalProvider>
    </React.StrictMode>
  );
}

bootstrap();