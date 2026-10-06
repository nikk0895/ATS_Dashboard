import { useMemo } from "react";
import { useMsal } from "@azure/msal-react";
import { createApiClient } from "./client";

export default function useApi() {
  const { instance } = useMsal();
  return useMemo(() => createApiClient(instance), [instance]);
}