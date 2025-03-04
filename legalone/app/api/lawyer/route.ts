import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      license,
      experience,
      specialization,
    } = await req.json();
    const user = await prisma.lawyer.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        license,
        experience,
        specialization,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.lawyer.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}
