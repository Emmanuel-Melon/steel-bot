import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Server {
  id: string;
  name: string;
  icon?: string;
}

export function useServer(serverId: string) {
  return useQuery<Server>({
    queryKey: ["server", serverId],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/server`);
      return data?.data;
    },
    enabled: !!serverId,
  });
}
