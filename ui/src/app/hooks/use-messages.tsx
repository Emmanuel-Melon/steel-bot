import { 
    useQuery, 
    useMutation, 
    useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Message {
    id: string;
    channelId: string;
    authorId: string;
    content: string;
    messageId: string;
    createdAt: string;
    type: 'QUESTION' | 'FEEDBACK' | 'FEATURE_REQUEST';
    categories: string[];
    resolved: boolean;
    solution?: string;
}

export interface MessageQueryParams {
    limit?: number;
    offset?: number;
    channelId?: string;
    authorId?: string;
    type?: string;
    resolved?: boolean;
}

export interface GitHubIssueParams {
    repository: string;
    title: string;
    labels: string[];
}

export const useMessages = (params: MessageQueryParams = {}) => {
    return useQuery({
        queryKey: ['messages', params],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/messages`, { params });
            return data as { data: Message[], total: number };
        }
    });
};