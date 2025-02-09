import { FastifyRequest, FastifyReply } from "fastify";
import { MessageService } from "../services/message.service";

const messageService = new MessageService();

export class MessageController {
  async getAllMessages(request: FastifyRequest, reply: FastifyReply) {
    const messages = await messageService.getMessages();
    return messages;
  }

  async getMessagesByType(
    request: FastifyRequest<{
      Params: { type: string };
    }>,
    reply: FastifyReply,
  ) {
    const { type } = request.params;
    const messages = await messageService.getMessagesByType(type);
    return messages;
  }
}
