import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { MessageController } from "./controllers";

const messageController = new MessageController();

const Message = {
  type: "object",
  properties: {
    id: { type: "string" },
    messageId: { type: "string" },
    channelId: { type: "string" },
    authorId: { type: "string" },
    content: { type: "string" },
    type: { type: "string" },
    categories: {
      type: "array",
      items: { type: "string" },
    },
    createdAt: { type: "string", format: "date-time" },
  },
} as const;

const GetMessagesResponse = {
  200: {
    type: "array",
    items: Message,
  },
} as const;

const GetMessagesByTypeParams = {
  type: "object",
  properties: {
    type: { type: "string" },
  },
  required: ["type"],
} as const;

function routes(server: FastifyInstance) {
  server.get(
    "/messages",
    {
      schema: {
        summary: "Retrieve all messages",
        response: GetMessagesResponse,
      },
    },
    messageController.getAllMessages,
  );
}

export default routes;
