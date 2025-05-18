import { NextResponse } from "next/server";
import { PostgresClient } from "../../../../prisma/prisma_clients";

export async function GET() {
  // await PostgresClient.user.deleteMany({
  //   where: { email: null },
  // });
  // const r = await PostgresClient.user.create({
  //   data: {
  //     name: "user",
  //     email: "user@email.com",
  //   },
  // });
  // console.log(r);
  const users = await PostgresClient.user.findMany();
  return NextResponse.json({ users: users });
}
