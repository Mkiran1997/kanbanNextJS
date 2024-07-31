import { Users } from "@/utils/enum";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const users = Object.values(Users);
  return NextResponse.json({ data: users });
}
