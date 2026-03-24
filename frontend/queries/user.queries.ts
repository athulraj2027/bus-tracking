import { getUsersApi } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export const useGetUsersQuery = () =>
  useQuery({ queryKey: ["users"], queryFn: getUsersApi });
