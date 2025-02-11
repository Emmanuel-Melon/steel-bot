import { 
    useQuery, 
    useMutation, 
    useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Channel {
    id: string;
    serverId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Server {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

// Get channels for a guild
export const useGuildChannels = (guildId: string) => {
    return useQuery({
        queryKey: ['discord', 'channels', guildId],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/api/discord/guilds/${guildId}/channels`);
            return data as { data: Channel[] };
        },
        enabled: !!guildId
    });
};

// Add a server
export const useAddServer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (guildId: string) => {
            const { data } = await axios.post(`${API_URL}/api/discord/guilds/${guildId}`);
            return data as { data: Server };
        },
        onSuccess: () => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['discord', 'servers'] });
        }
    });
};

// Add a single channel
export const useAddChannel = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ serverId, channelId }: { serverId: string; channelId: string }) => {
            const { data } = await axios.post(
                `${API_URL}/api/discord/guilds/${serverId}/channels/${channelId}`
            );
            return data as { data: Channel[] };
        },
        onSuccess: (_, variables) => {
            // Invalidate the channels query for this server
            queryClient.invalidateQueries({ 
                queryKey: ['discord', 'channels', variables.serverId] 
            });
        }
    });
};

// Add multiple channels
export const useAddMultipleChannels = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ 
            serverId, 
            channelIds 
        }: { 
            serverId: string; 
            channelIds: string[] 
        }) => {
            const { data } = await axios.post(
                `${API_URL}/api/discord/guilds/${serverId}/channels`,
                { channelIds }
            );
            return data as { data: Channel[] };
        },
        onSuccess: (_, variables) => {
            // Invalidate the channels query for this server
            queryClient.invalidateQueries({ 
                queryKey: ['discord', 'channels', variables.serverId] 
            });
        }
    });
};

// Example usage:
/*
const MyComponent = () => {
    const { data: channels, isLoading } = useGuildChannels('guild-id');
    const { mutate: addServer } = useAddServer();
    const { mutate: addChannel } = useAddChannel();
    const { mutate: addMultipleChannels } = useAddMultipleChannels();

    const handleAddServer = () => {
        addServer('guild-id');
    };

    const handleAddChannel = () => {
        addChannel({ serverId: 'server-id', channelId: 'channel-id' });
    };

    const handleAddMultipleChannels = () => {
        addMultipleChannels({ 
            serverId: 'server-id', 
            channelIds: ['channel-1', 'channel-2'] 
        });
    };

    return (
        // Your JSX here
    );
};
*/
