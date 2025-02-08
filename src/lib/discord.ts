import { Client, IntentsBitField } from "discord.js";

export const createDiscordClient = () => {
  const discord = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
  });

  discord.on("ready", () => {
    console.info("Discord bot is ready!");
  });

  return discord;
};
