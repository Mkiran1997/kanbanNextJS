import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Get all columns
export async function GET(req, context) {
  const boardId = parseInt(context.params.id);
  const result = await prisma.column.findMany({
    where: { boardId: boardId },
  });
  return NextResponse.json({ data: result });
}
