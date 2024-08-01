"use server";
import { algoliaIndex } from "@/algolia/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getColumns() {
  const result = await prisma.column.findMany({
    where: { boardId: 1 },
  });

  return { data: result };
}

export async function createTask(data) {

  const { description, category, user, column } = data;
  const columnId = parseInt(column);

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

  return { data: result };
}

export async function getTask(data) {
  console.log("data", data);
  const { users, categories, startDate, endDate, columnId } = data;

  try {
    // Construct the where condition object based on provided query parameters
    const whereCondition = {};

    if (Array.isArray(users) && users.length > 0) {
      whereCondition.user = {
        in: users,
      };
    }

    if (Array.isArray(categories) && categories.length > 0) {
      whereCondition.category = {
        in: categories,
      };
    }
    if (startDate && endDate) {
      // Validate and convert date strings to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);

      // Ensure the end date is not before the start date
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
        return NextResponse.json(
          { error: "Invalid date range" },
          { status: 400 }
        );
      }

      whereCondition.createdAt = {
        gte: start,
        lte: end,
      };
    }

    if (columnId !== undefined) {
      whereCondition.columnId = columnId;
    }

    // Perform the query with optional filtering
    const tasks = await prisma.task.findMany({
      where: whereCondition,
    });
    return tasks;
  } catch (error) {
    return { error: "Failed to fetch tasks" }, { status: 500 };
  }
}
