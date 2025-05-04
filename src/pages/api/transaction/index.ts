// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { arrayUnion } from "firebase/firestore";

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
        if (decoded.id) {
          const order_id = req.query.order_id;
          getTransaction(`${order_id}`, async (result: any) => {
            console.log(res);
            res.status(200).json({
              status: true,
              statusCode: 200,
              message: "success",
              data: result,
            });
          });
        }
      }
    );
  } else if (req.method === "POST") {
    const token: any = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        const payload = req.body;
        console.log(payload);
        console.log(payload.user.fullname);
        console.log(payload.user.email);
        console.log(payload.user.address.phone);

        console.log("JWT Error:", err);
        console.log("Decoded Token:", decoded);

        delete payload.user.address.isMain;

        const generatedOrderId = `${Date.now()}-${Math.random().toString(16)}`;
        console.log(generatedOrderId);

        const params = {
          transaction_details: {
            order_id: generatedOrderId,
            gross_amount: payload.transaction.total,
          },
          customer_details: {
            first_name: payload.user.fullname,
            email: payload.user.email,
            phone: payload.user.phone,
            shipping_address: {
              firts_name: payload.user.address.recipient,
              phone: payload.user.address.phone,
              address: payload.user.address.addressLine,
            },
            items_details: payload.transaction.items,
          },
        };
        createTransaction(
          params,
          async (transaction: { token: string; redirect_url: string }) => {
            const newTransaction = {
              ...payload.transaction,
              address: payload.user.address,
              token: transaction.token,
              redirect_url: transaction.redirect_url,
              status: "pending",
              order_id: generatedOrderId,
            };

            const data = {
              transaction: arrayUnion(newTransaction),
              carts: [],
            };

            await updateData("users", decoded.id, data, (result: boolean) => {
              if (result) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "success",
                  data: {
                    token: transaction.token,
                    redirect_url: transaction.redirect_url,
                  },
                } as any);
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "failed",
                });
              }
            });
          }
        );
      }
    );
  } else if (req.method === "PUT") {
    const token: any = req.headers.authorization?.split(" ")[1] || "";
    console.log(token);

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        console.log(decoded);
        if (decoded.id) {
          const order_id = req.query.order_id;
          getTransaction(`${order_id}`, async (result: any) => {
            console.log(res);
            const user: any = await retrieveDataById("users", decoded.id);
            const index = user.transaction.findIndex(
              (transaction: any) => transaction.order_id === order_id
            );

            if (index !== -1) {
              user.transaction[index].status = result.transaction_status;
            }

            const data = {
              transaction: user.transaction,
            };

            await updateData("users", decoded.id, data, (result: boolean) => {
              if (result) {
                res.status(200).json({
                  status: true,
                  statusCode: 200,
                  message: "success",
                });
              } else {
                res.status(400).json({
                  status: false,
                  statusCode: 400,
                  message: "failed",
                });
              }
            });
          });
        }
      }
    );
  }
}
