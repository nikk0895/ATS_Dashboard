import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { apiRequest } from "../authConfig";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function createApiClient(msalInstance) {
  async function getToken() {
    const account = msalInstance.getActiveAccount();
    if (!account) throw new Error("No signed-in account");
    try {
      const result = await msalInstance.acquireTokenSilent({ ...apiRequest, account });
      return result.accessToken;
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        await msalInstance.acquireTokenRedirect({ ...apiRequest, account });
      }
      throw err;
    }
  }

  async function request(path, options = {}) {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
    return res.json();
  }

  return {
    get: (path) => request(path),
    post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  };
}