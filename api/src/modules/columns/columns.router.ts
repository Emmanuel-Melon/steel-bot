import { FastifyInstance } from "fastify";
import { ColumnController } from "./columns.controller";

const columnController = new ColumnController();

const Column = {
  type: "object",
  properties: {
    id: { type: "string" },
    channelId: { type: "string" },
    title: { type: "string" },
    type: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    messages: {
      type: "array",
      items: { type: "object" }
    }
  },
} as const;

const GetColumnsResponse = {
  200: {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: Column,
      },
    },
  },
  500: {
    type: "object",
    properties: {
      error: { type: "string" }
    }
  }
} as const;

function routes(server: FastifyInstance) {
  server.get(
    "/columns",
    {
      schema: {
        summary: "Retrieve all columns",
        response: GetColumnsResponse,
      },
    },
    columnController.getColumns
  );

  server.post(
    "/columns/init",
    {
      schema: {
        summary: "Initialize default columns",
        response: GetColumnsResponse,
      },
    },
    columnController.initializeColumns
  );
}

export default routes;
