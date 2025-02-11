import { FastifyInstance, FastifyRequest } from "fastify";
import { DiscordController } from "./discord.controller";
import { DiscordService } from "../../services/discord.service";

const Channel = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    serverId: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
  },
} as const;

const GetChannelsResponse = {
  200: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: Channel,
      },
    },
  },
  500: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
  },
} as const;

const GetChannelsRequest = {
  type: "object",
  properties: {
    params: {
      type: "object",
      properties: {
        guildId: { type: "string" },
      },
    },
  },
} as const;

const AddChannelsRequest = {
  type: "object",
  required: ["channelIds"],
  properties: {
    channelIds: {
      type: "array",
      items: { type: "string" },
    },
  },
} as const;

const AddServerRequest = {
  type: "object",
  required: ["serverId"],
  properties: {
    serverId: { type: "string" },
  },
} as const;

const discordController = new DiscordController();


function routes(server: FastifyInstance) {

  server.get<{
    Params: { guildId: string }
  }>(
    "/discord/guilds/:guildId/channels",
    {
      schema: {
        response: GetChannelsResponse,
      },
    },
    (request: FastifyRequest<{
      Params: { guildId: string }
    }>, reply) => discordController.getChannels(request, reply)
  );

  server.post<{
    Body: { serverId: string }
  }>(
    "/discord/guilds",
    {
      schema: {
        body: AddServerRequest,
        response: GetChannelsResponse,
      },
    },
    (request, reply) => discordController.addServer(request, reply)
  );

  server.post<{
    Params: { serverId: string; channelId: string }
  }>(
    "/discord/guilds/:serverId/channels/:channelId",
    {
      schema: {
        response: GetChannelsResponse,
      },
    },
    (request, reply) => discordController.addChannel(request, reply)
  );

  server.post<{
    Params: { serverId: string };
    Body: { channelIds: string[] };
  }>(
    "/discord/guilds/:serverId/channels",
    {
      schema: {
        body: AddChannelsRequest,
        response: GetChannelsResponse,
      },
    },
    (request, reply) => discordController.addMultipleChannels(request, reply)
  );
}

export default routes;
