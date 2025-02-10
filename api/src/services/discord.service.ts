import {
  Client,
  Message,
  MessageReaction,
  User,
  PartialMessageReaction,
  PartialUser,
  MessageReactionEventDetails,
} from "discord.js";
import { MessageService } from "./message.service";
import { createGitHubIssue } from "../lib/github";

export class DiscordService {
  private client: Client;
  private messageService: MessageService;

  constructor(client: Client) {
    this.client = client;
    this.messageService = new MessageService();
  }

  async handleReady() {
    console.log("Discord bot is ready!");
  }

  async handleMessageCreate(message: Message) {
    try {
      console.log("handling message", message);
      const savedMessage = await this.messageService.saveMessage(message);
      console.info({
        event: "message_logged",
        messageId: savedMessage?.id,
        channel: message.channel.id,
        author: message.author.tag,
        content:
          message.content.substring(0, 50) +
          (message.content.length > 50 ? "..." : ""),
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

      const dbMessage = await this.messageService.getReactedForMessage(
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

  initialize() {
    this.client.on("ready", this.handleReady.bind(this));
    this.client.on("messageCreate", this.handleMessageCreate.bind(this));
    this.client.on(
      "messageReactionAdd",
      this.handleMessageReactionAdd.bind(this),
    );
  }
}
