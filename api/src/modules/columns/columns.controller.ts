import { FastifyRequest, FastifyReply } from "fastify";
import { ColumnService } from "../../services/columns.service";

const columnService = new ColumnService();

export class ColumnController {
  async getColumns(request: FastifyRequest, reply: FastifyReply) {
    try {
      const columns = await columnService.getColumns();
      return { data: columns };
    } catch (error) {
      console.error("Error fetching columns:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async initializeColumns(request: FastifyRequest, reply: FastifyReply) {
    try {
      const columns = await columnService.initializeColumns();
      return { data: columns };
    } catch (error) {
      console.error("Error initializing columns:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
