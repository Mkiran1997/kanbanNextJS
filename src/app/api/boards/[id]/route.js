import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Board by id, with columns and tasks
export async function GET(req, context) {
  const id = Number(context.params.id || 0);
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      columns: {
        orderBy: {
          position: "asc",
        },
        include: {
          tasks: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ data: board });
}
