import { apiRequest } from "@/lib/apiRequest";

export const getUsersApi = () =>
  apiRequest({ path: "/auth/admin", method: "GET" });
