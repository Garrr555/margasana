// import {
//   deleteData,
//   retriveData,
//   updateData,
// } from "../../../lib/firebase/services";
// import jwt from "jsonwebtoken";

// export default async function handler(req, res) {
//   if (req.method === "GET") {
//     const users = await retriveData("users");
//     const data = users.map((user) => {
//       delete user.password;
//       return users;
//     });
//     console.log(users);
//     res
//       .status(200)
//       .json({ status: true, statusCode: 200, message: "Success", data });
//   } else if (req.method === "PUT") {
//     const { id, data } = req.body;
//     await updateData("users", id, data, (result) => {
//       if (result) {
//         res.status(200).json({
//           status: true,
//           statusCode: 200,
//           message: "Success",
//         });
//       } else {
//         res.status(400).json({
//           status: false,
//           statusCode: 400,
//           message: "Failed",
//         });
//       }
//     });
//   } else if (req.method === "DELETE") {
//     const { id } = req.body;
//     const token = req.headers.authorization?.split(" ")[1] || '';
//     jwt.verify(token, process.env.NEXTAUTH_SECRET || '', async (err, decoded) => {
//       if(decoded){
//         await deleteData("users", id, (result) => {
//           if (result) {
//             res.status(200).json({
//               status: true,
//               statusCode: 200,
//               message: "Success",
//             });
//           } else {
//             res.status(400).json({
//               status: false,
//               statusCode: 400,
//               message: "Failed",
//             });
//           }
//         });
//       } else{
//         res.status(403).json({
//           status: false,
//           statusCode: 403,
//           message: "Gk usah ganti api bang, kasihan boomer yg megang nih web",
//         })
//       }
      
//     })
   
    
//   }
// }

import {
  deleteData,
  retriveData,
  updateData,
} from "../../../lib/firebase/services";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const users = await retriveData("users");
    const sanitizedUsers = users.map(({ password, ...rest }) => rest);
    return Response.json({
      status: true,
      statusCode: 200,
      message: "Success",
      data: sanitizedUsers,
    });
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// export async function PUT(req) {
//   try {
//     const { id, data } = await req.json();
//     const result = await updateData("users", id, data);
//     if (result) {
//       return Response.json({
//         status: true,
//         statusCode: 200,
//         message: "Success",
//       });
//     }
//     return Response.json(
//       { status: false, statusCode: 400, message: "Failed" },
//       { status: 400 }
//     );
//   } catch (error) {
//     return Response.json(
//       {
//         status: false,
//         statusCode: 500,
//         message: "Internal Server Error",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req) {
  try {
    const { id, data } = await req.json();

    if (!id || !data) {
      return Response.json(
        { status: false, statusCode: 400, message: "Invalid request data" },
        { status: 400 }
      );
    }

    const result = await updateData("users", id, data);

    if (!result) {
      return Response.json(
        { status: false, statusCode: 400, message: "Failed to update user" },
        { status: 400 }
      );
    }

    return Response.json({
      status: true,
      statusCode: 200,
      message: "Success",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response(
      JSON.stringify({
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await deleteData("users", id);
    return Response.json({ status: true, statusCode: 200, message: "Success" });
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}





