import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

export function mainMiddleware() {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "admin",
  "user",
  "member",
  "mapview",
  "ai",
  "cart",
  "products",
  "rt-rw",
  "rtrw-stat",
]);
