// app/api/user/register/route.js

import { signUp } from "../../../../lib/firebase/services";

// Fungsi untuk menangani POST request
export async function POST(req) {
  try {
    // Ambil data dari body request
    const userData = await req.json();

    // Panggil fungsi signUp untuk mendaftarkan user
    const status = await new Promise((resolve) => {
      signUp(userData, (status) => {
        resolve(status);
      });
    });

    // Jika registrasi sukses, beri respons status 200
    if (status) {
      return new Response(
        JSON.stringify({ status: true, message: "Success" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ status: false, message: "Failed" }),
        { status: 400 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ status: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
