// import { retriveData } from "../../../lib/firebase/services";

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
//       .json({ status: true, statusCode: 200, message: "Success", data});
//   }
// }

import { retriveData } from "../../../lib/firebase/services";

export async function GET() {
  try {
    const users = await retriveData("users");

    // Hapus password dari setiap user
    const sanitizedUsers = users.map(({ password, ...rest }) => rest);

    console.log(sanitizedUsers);

    return Response.json({
      status: true,
      statusCode: 200,
      message: "Success",
      data: sanitizedUsers,
    });
  } catch (error) {
    return Response.json(
      { status: false, statusCode: 500, message: "Server Error", error },
      { status: 500 }
    );
  }
}


