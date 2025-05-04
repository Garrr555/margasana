import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token: any = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        const users = await retrieveData("users");
        let data: any = [];
        users.forEach((user: any) => {
          if (user.transaction) {
            console.log(user);
            const transaction = user.transaction.map((transaction: any) => {
              return {
                ...transaction,
                user: {
                    id: user.id,
                    fullname: user.fullname,
                },
              };
            });
            data = [...data, ...transaction];
          }
        });
        console.log(data);
        res
          .status(200)
          .json({ status: true, statusCode: 200, message: "success", data });
      }
    );
  }
}
