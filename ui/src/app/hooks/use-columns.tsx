import { useQuery } from "@tanstack/react-query";
import { Message, MessageType, Column } from "@prisma/client";
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


export function useColumns() {
  return useQuery<(Column & { messages: Message[] })[]>({
    queryKey: ["columns"],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/columns`);
      return data?.data;
    },
  });
}
