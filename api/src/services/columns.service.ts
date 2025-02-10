import { prisma } from "../lib/prisma";
import { MessageType } from "@prisma/client";

export class ColumnService {
  async getColumns() {
    try {
      return await prisma.column.findMany({
        include: {
          messages: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async initializeColumns() {
    try {
      const columns: { channelId: string; title: string; type: MessageType }[] =
        [
          {
            channelId: process.env.FEEDBACK_CHANNEL_ID!,
            title: "Feedback",
            type: MessageType.FEEDBACK,
          },
          {
            channelId: process.env.GITHUB_CHANNEL_ID!,
            title: "GitHub",
            type: MessageType.QUESTION,
          },
        ];

      return await Promise.all(
        columns.map(async (column) => {
          return prisma.column.upsert({
            where: { channelId: column.channelId },
            update: {},
            create: column,
          });
        }),
      );
    } catch (error) {
      throw error;
    }
  }
}
