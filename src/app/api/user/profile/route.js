// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const token = req.headers.authorization?.split(" ")[1];
//     if(token){
//         jwt.verify(token, process.env.NEXTAUTH_SECRET || '', (err, decoded) => {
//           if (decoded) {
//             res.status(401).json({ status: false, statusCode: 401, message: "Unauthorized" });
//           }
//         });
//     }
//     res.status(200).json({ status: true, statusCode: 200, message: "Success" ,data: {}});
//   }
// }


import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null;

    if (!token) {
      return NextResponse.json(
        { status: false, statusCode: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const secret = process.env.NEXTAUTH_SECRET || "";
    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return NextResponse.json(
        { status: false, statusCode: 401, message: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { status: true, statusCode: 200, message: "Success", data: {} },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: false, statusCode: 401, message: "Invalid Token" },
      { status: 401 }
    );
  }
}
