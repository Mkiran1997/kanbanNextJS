import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, context) {
  console.log("🚀 ~ POST ~ context:", context);
  const id = Number(context.params.board_id || 0);
  const { title } = await req.json();

  console.log("🚀 ~ POST ~ id:", id);
  console.log("🚀 ~ POST ~ title:", title);

  //   const boardId = parseInt(req.params["board_id"]);
  //   const { title } = req.body;
  let position = 0;
  const columnAggregate = await prisma.column.aggregate({
    _max: {
      position: true,
    },
    where: {
      boardId: boardId,
    },
  });

  if (columnAggregate._max.position !== null) {
    position = columnAggregate._max.position + 1;
  }

  const result = await prisma.column.create({
    data: { title, boardId: boardId, position: position },
  });

  return NextResponse.json({ data: result });
}

// Get all columns
export async function GET(req, context) {
  const boardId = Number(context.params.board_id || 0);
  const result = await prisma.column.findMany({ where: { boardId: boardId } });
  return NextResponse.json({ data: result });
}
