import fastify from "fastify";
import { Message } from "discord.js";
import { createDiscordClient } from "./lib/discord";
import { MessageService } from "./services/messageService";
import routes from "./modules/router";

const server = fastify({ logger: true });
const discord = createDiscordClient();
const messageService = new MessageService();

discord.on("ready", () => {
  server.log.info("Discord bot is ready!");
});

discord.on("messageCreate", async (message: Message) => {
  if (message.author.bot || message.system) return;

  try {
    const savedMessage = await messageService.saveMessage(message);
    server.log.info({
      event: "message_logged",
      messageId: savedMessage.id,
      channel: message.channel.id,
      author: message.author.tag,
      content:
        message.content.substring(0, 50) +
        (message.content.length > 50 ? "..." : ""),
    });
  } catch (error) {
    console.log(error);
    server.log.error("Failed to save message:", error);
  }
});

routes(server);

const start = async () => {
  try {
    await discord.login(process.env.DISCORD_TOKEN);
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
