import { TaskCategories } from "@/utils/enum";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const categories = Object.values(TaskCategories);
  return NextResponse.json({ data: categories });
}
