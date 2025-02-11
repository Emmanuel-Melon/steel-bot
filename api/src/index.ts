import fastify from "fastify";
import { createDiscordClient } from "./lib/discord";
import { MessageService } from "./services/message.service";
import { DiscordService } from "./services/discord.service";
import messagesRoutes from "./modules/messages/router";
import columnsRoutes from "./modules/columns/columns.router";
import discordRoutes from "./modules/discord/discord.router";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: true, // Allow all origins
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

export const discord = createDiscordClient();
const messageService = new MessageService();
export const discordService = new DiscordService();

discordService.initialize();

messagesRoutes(server);
columnsRoutes(server);
discordRoutes(server);

const start = async () => {
  try {
    await discord.login(process.env.DISCORD_TOKEN);
    await server.listen({ port: 8000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
