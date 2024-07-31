import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req, context) {
  const data = await req.json();
  const boardId = parseInt(context.params.id);
  const { task, destination, position } = data;

  try {
    // Find the task to move
    const the_task = await prisma.task.findUnique({
      where: { id: task },
    });

    if (!the_task) {
      // Task not found, return a 404 response
      return res.status(404).json({ error: "Task not found" });
    }

    // Update source positions
    await prisma.task.updateMany({
      where: {
        columnId: the_task.columnId,
        position: { gt: the_task.position },
      },
      data: { position: { decrement: 1 } },
    });

    // Update target positions
    await prisma.task.updateMany({
      where: { columnId: destination, position: { gte: position } },
      data: { position: { increment: 1 } },
    });

    // Update the task's columnId and position
    const updatedTask = await prisma.task.update({
      where: {
        id: task,
      },
      data: {
        columnId: destination,
        position: position,
      },
    });

    // Send the updated task as the response
    return NextResponse.json({ data: updatedTask });
  } catch (error) {
    // Handle errors and send a 500 response
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
