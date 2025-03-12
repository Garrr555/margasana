import {
  deleteData,
  retriveData,
  updateData,
} from "../../../lib/firebase/services";

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
//     const { user } = req.query;
//     await deleteData("users", user[1], (result) => {
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
//   }
// }

export async function GET(req) {
  try {
    const users = await retriveData("users");
    const sanitizedUsers = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

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
      },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, data } = await req.json();
    const result = await new Promise((resolve) =>
      updateData("users", id, data, resolve)
    );

    if (result) {
      return Response.json({
        status: true,
        statusCode: 200,
        message: "Success",
      });
    }
    return Response.json(
      {
        status: false,
        statusCode: 400,
        message: "Failed",
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { user } = new URL(req.url).searchParams;
    const userId = user ? user.split("/")[1] : null;
    if (!userId) {
      return Response.json(
        {
          status: false,
          statusCode: 400,
          message: "User ID is required",
        },
        { status: 400 }
      );
    }

    const result = await new Promise((resolve) =>
      deleteData("users", userId, resolve)
    );

    if (result) {
      return Response.json({
        status: true,
        statusCode: 200,
        message: "Success",
      });
    }
    return Response.json(
      {
        status: false,
        statusCode: 400,
        message: "Failed",
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
