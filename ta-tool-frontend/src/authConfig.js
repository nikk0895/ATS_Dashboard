// src/authConfig.js
//
// MSAL configuration for Microsoft Entra ID sign-in.
// Fill in the two values below from your App Registration
// (Entra Admin Center → App registrations → your app → Overview).

export const msalConfig = {
  auth: {
    clientId: "5478bc05-7691-4d60-8d8a-9f3193af8b42", // <-- from Entra App Registration
    authority: "https://login.microsoftonline.com/aabc3e64-9f41-41d7-aefe-7c009102d1b0", // <-- Directory (tenant) ID
    redirectUri: "http://localhost:5173/", // must exactly match a Redirect URI registered in Entra
      postLogoutRedirectUri: "http://localhost:5173/login",
  },
  cache: {
    cacheLocation: "sessionStorage", // safer default than localStorage for auth tokens
    storeAuthStateInCookie: false,
  },
};

// Scopes requested at login. "User.Read" is the minimal Microsoft Graph scope
// (lets you fetch basic profile info). Add your backend API's scope here later,
// e.g. "api://<your-backend-app-id>/access_as_user", once the backend is registered.
const apiClientId = import.meta.env.VITE_API_CLIENT_ID;

// The user's name/email come from the ID token (openid/profile are added
// automatically), so the API scope is all we need at login.
export const loginRequest = {
  scopes: [`api://${apiClientId}/access_as_user`],
};

export const apiRequest = {
  scopes: [`api://${apiClientId}/access_as_user`],
};