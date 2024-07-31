import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, context) {
  const data = await req.json();
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
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}
