import {
  Client,
  Message,
  MessageReaction,
  User,
  PartialMessageReaction,
  PartialUser,
  MessageReactionEventDetails,
  GuildChannel,
  TextChannel,
} from "discord.js";
import { MessageService } from "./message.service";
import { createGitHubIssue } from "../lib/github";
import { prisma } from "../lib/prisma";
import { Server, Channel } from "@prisma/client";
import{ discord} from "../index";

const messageService = new MessageService();


export class DiscordService {

  constructor() {

  }

  async handleReady() {
    console.log("Discord bot is ready!");
  }

  async handleMessageCreate(message: Message) {
    try {
      const savedMessage = await messageService.saveMessage(message);
      console.info({
        event: "message_logged",
        messageId: savedMessage?.id,
        channel: message.channel.id
      });
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  }

  async handleMessageReactionAdd(
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
    _details: MessageReactionEventDetails,
  ) {
    try {
      if (reaction.partial) {
        reaction = await reaction.fetch();
      }
      if (user.partial) {
        user = await user.fetch();
      }

      if (user.bot) return;

      const emojiName = reaction.emoji.name;
      if (!["🐛", "🚀", "❓"].includes(emojiName || "")) {
        return;
      }

      const dbMessage = await messageService.getReactedForMessage(
        reaction.message.id,
      );

      if (dbMessage) {
        let label: string;
        switch (emojiName) {
          case "🐛":
            label = "bug";
            break;
          case "🚀":
            label = "feature";
            break;
          case "❓":
            label = "question";
            break;
          default:
            return;
        }

        await createGitHubIssue(dbMessage, label);
      } else {
        console.error(
          "Failed to create GitHub issue: Message not found in database",
        );
      }
    } catch (error) {
      console.error("Failed to handle reaction:", error);
    }
  }

  async getChannels(guildId: string): Promise<TextChannel[]> {
    try {
      const guild = await discord.guilds.fetch(guildId);
      const channels = await guild.channels.fetch();
      
      return channels
        .filter((channel): channel is TextChannel => 
          channel !== null && channel.type === 0
        )
        .map(channel => ({
          id: channel.id,
          name: channel.name,
          type: channel.type,
          position: channel.position,
        })) as TextChannel[];
    } catch (error) {
      console.error("Failed to fetch channels:", error);
      throw error;
    }
  }

  async addServer(guildId: string): Promise<Server> {
    try {
      const guild = await discord.guilds.fetch(guildId);
      return await prisma.server.create({
        data: {
          id: guildId,
          name: guild.name,
        }
      })
    } catch (error) {
      console.error("Failed to add server:", error);
      throw error;
    }
  }

  async addChannel(serverId: string, channelId: string): Promise<Channel> {
    try {
      const guild = await discord.guilds.fetch(serverId);
      const channel = await guild.channels.fetch(channelId);
      
      if (!channel || channel.type !== 0) {
        throw new Error("Invalid channel or not a text channel");
      }

      return await prisma.channel.upsert({
        where: { id: channelId },
        update: { 
          name: channel.name,
          serverId: serverId
        },
        create: {
          id: channelId,
          name: channel.name,
          serverId: serverId
        },
      });
    } catch (error) {
      console.error("Failed to add channel:", error);
      throw error;
    }
  }

  async addMultipleChannels(serverId: string, channelIds: string[]): Promise<Channel[]> {
    try {
      const results = await Promise.all(
        channelIds.map(channelId => this.addChannel(serverId, channelId))
      );
      return results;
    } catch (error) {
      console.error("Failed to add multiple channels:", error);
      throw error;
    }
  }

  initialize() {
    discord.on("ready", this.handleReady.bind(this));
    discord.on("messageCreate", this.handleMessageCreate.bind(this));
    discord.on(
      "messageReactionAdd",
      this.handleMessageReactionAdd.bind(this),
    );
  }
}
