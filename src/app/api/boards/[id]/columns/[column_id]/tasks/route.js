import { algoliaIndex } from "@/algolia/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, context) {
  const data = await req.json();
  const columnId = parseInt(context.params.column_id);
  const { description, category, user } = data;
  let position = 0;

  const taskAggregate = await prisma.task.aggregate({
    _max: {
      position: true,
    },
    where: {
      columnId: columnId,
    },
  });

  if (taskAggregate._max.position !== null) {
    console.log(taskAggregate._max.position);
    position = taskAggregate._max.position + 1;
  } else {
    position = 0;
  }

  const result = await prisma.task.create({
    data: {
      description,
      columnId: columnId,
      position: position,
      category: category,
      user: user,
    },
  });

  await algoliaIndex.saveObject({
    objectID: result.id,
    ...result,
  });

  return NextResponse.json({ data: result });
}
