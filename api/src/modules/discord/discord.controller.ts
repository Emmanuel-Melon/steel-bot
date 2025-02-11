import { FastifyRequest, FastifyReply } from "fastify";
import { DiscordService } from "../../services/discord.service";
import { TextChannel } from "discord.js";
import { Server, Channel } from "@prisma/client";

interface ChannelResponse {
  data: Partial<TextChannel>[];
}

interface ServerResponse {
  data: Server;
}

interface ChannelsResponse {
  data: Channel[];
}

interface GetChannelsRequest extends FastifyRequest {
  params: {
    guildId: string;
  };
}

interface AddServerRequest extends FastifyRequest {
  body: {
    serverId: string;
  };
}

interface AddChannelRequest extends FastifyRequest {
  params: {
    serverId: string;
    channelId: string;
  };
}

interface AddMultipleChannelsRequest extends FastifyRequest {
  params: {
    serverId: string;
  };
  body: {
    channelIds: string[];
  };
}

const discordService = new DiscordService();  

export class DiscordController {
  constructor() {}

  async getChannels(
    request: GetChannelsRequest,
    reply: FastifyReply
  ): Promise<ChannelResponse | FastifyReply> {
    try {
      const { guildId } = request.params;
      const channels = await discordService.getChannels(guildId);
      return { data: channels };
    } catch (error) {
      console.error("Error fetching channels:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async addServer(
    request: AddServerRequest,
    reply: FastifyReply
  ): Promise<ServerResponse | FastifyReply> {
    try {
      const { serverId } = request.body;
      const server = await discordService.addServer(serverId);
      return { data: server };
    } catch (error) {
      console.error("Error adding server:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async addChannel(
    request: AddChannelRequest,
    reply: FastifyReply
  ): Promise<ChannelsResponse | FastifyReply> {
    try {
      const { serverId, channelId } = request.params;
      const channel = await discordService.addChannel(serverId, channelId);
      return { data: [channel] };
    } catch (error) {
      console.error("Error adding channel:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async addMultipleChannels(
    request: AddMultipleChannelsRequest,
    reply: FastifyReply
  ): Promise<ChannelsResponse | FastifyReply> {
    try {
      const { serverId } = request.params;
      const { channelIds } = request.body;
      const channels = await discordService.addMultipleChannels(serverId, channelIds);
      return { data: channels };
    } catch (error) {
      console.error("Error adding multiple channels:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
