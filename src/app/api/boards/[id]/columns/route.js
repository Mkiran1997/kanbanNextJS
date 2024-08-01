import { NextResponse } from "next/server";

// Get all columns
export async function GET(req, context) {
  const boardId = Number(context.params.id || 0);

  // Define default columns
  const defaultColumns = [
    {
      id: 1,
      title: "To Do",
      position: 0,
      boardId: 1,
    },
    {
      id: 2,
      title: "In Process",
      position: 1,
      boardId: 1,
    },
    {
      id: 3,
      title: "Done",
      position: 2,
      boardId: 1,
    },
    {
      id: 4,
      title: "Waiting",
      position: 3,
      boardId: 1,
    },
  ];

  return NextResponse.json({ data: defaultColumns });
}



