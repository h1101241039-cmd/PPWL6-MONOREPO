import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { PrismaClient } from "./generated/prisma/client";
import { prisma } from '../prisma/db';
import type { ApiResponse, HealthCheck, User } from "shared";

const app = new Elysia()
  // Pastikan port frontend kamu sudah benar di sini (misal 5173 atau 5174)
  .use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }))
  .use(swagger())
  .get("/", (): ApiResponse<HealthCheck> => {
    return {
      data: { status: "ok" },
      message: "server running"
    }
  })

  .get("/users", async () => {
    const users = await prisma.user.findMany()
    const response: ApiResponse<User[]> = {
      data: users,
      message: "User list retrieved"
    }
    return response
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);