import { Message } from "discord.js";
import { prisma } from "../lib/prisma";

interface Pattern {
  type: "QUESTION" | "FEATURE_REQUEST" | "FEEDBACK";
  patterns: string[];
}

const patterns: Pattern[] = [
  {
    type: "QUESTION",
    patterns: [
      // Question marks
      "\\?$",
      // Question starters
      "^(how|what|why|where|when|who|can|could|would|will|does|do|is|are|should)",
      // Technical inquiries
      "(how (to|do|can) .+(install|setup|configure|run|use|implement))",
      // Installation questions
      ".+(via|using|with) (docker|npm|yarn|pnpm)",
      ".+((installation|setup) (error|issue|problem))",
      // Configuration questions
      ".+(config|configuration|settings?|env|environment)",
      // Troubleshooting
      ".+(error|issue|problem|bug|fails?|failed|breaking|broken|crash|exception)",
      "getting .+(error|issue|problem)",
      // Usage questions
      ".+(possible|able) to .+\\?",
      "trying to .+",
      // Help requests
      "^help.+",
      "anyone.+(help|know|experience)",
      // Documentation queries
      ".+(docs?|documentation|example|tutorial)",
    ],
  },
  {
    type: "FEATURE_REQUEST",
    patterns: [
      // Direct feature requests
      ".+(feature|functionality|capability)",
      // Suggestions
      "(would|could|should) (be nice|add|have|include)",
      "wish.+(had|included)",
      "missing.+",
      // Improvements
      "improve.+",
      "better.+support",
      // Future possibilities
      "plan.+to add",
      "roadmap",
      // Integration requests
      "integrate.+with",
      "support for.+",
      // Enhancement suggestions
      "enhance.+",
      "extend.+",
      // User desires
      "want.+to (be able|have)",
      "need.+to (be able|have)",
      // Comparison-based requests
      "like.+in.+(other|different)",
    ],
  },
];

function matchesPatterns(content: string, patternGroup: Pattern): boolean {
  return patternGroup.patterns.some((pattern) =>
    new RegExp(pattern, "i").test(content),
  );
}

export function determineMessageType(
  content: string,
): "QUESTION" | "FEATURE_REQUEST" | "FEEDBACK" {
  const normalizedContent = content.trim().toLowerCase();

  if (!normalizedContent) {
    return "FEEDBACK";
  }

  if ((normalizedContent.match(/\?/g) || []).length >= 2) {
    return "QUESTION";
  }

  for (const patternGroup of patterns) {
    if (matchesPatterns(normalizedContent, patternGroup)) {
      return patternGroup.type;
    }
  }

  return "FEEDBACK";
}

export class MessageService {
  async saveMessage(message: Message) {
    const messageType = determineMessageType(message.content);

    // Ensure channel exists
    let channel = await prisma.channel.findUnique({
      where: { id: message.channelId }
    });

    if (!channel) {
      // Create the channel if it doesn't exist
      channel = await prisma.channel.create({
        data: {
          id: message.channelId,
          name: message.channel.name,
          server: {
            connectOrCreate: {
              where: { id: message.guildId! },
              create: {
                id: message.guildId!,
                name: message.guild?.name || 'Unknown Server'
              }
            }
          }
        }
      });
    }

    // Find or create a column for this message type
    let column = await prisma.column.findFirst({
      where: {
        channelId: channel.id,
        type: messageType,
      },
    });

    if (!column) {
      column = await prisma.column.create({
        data: {
          channelId: channel.id,
          title: messageType.toLowerCase(),
          type: messageType,
        },
      });
    }

    return await prisma.message.create({
      data: {
        id: message.id,
        channelId: channel.id,
        columnId: column.id,
        authorId: message.author.id,
        content: message.content,
        type: messageType,
        categories: [],
      },
    });
  }

  async getMessages(limit = 100) {
    return await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async getMessagesByType(type: string, limit = 50) {
    return await prisma.message.findMany({
      where: {
        type: type as any,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });
  }

  async getMessageById(id: string) {
    return await prisma.message.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getReactedForMessage(messageId: string) {
    return await prisma.message.findFirst({
      where: {
        id: messageId,
      },
    });
  }
}
