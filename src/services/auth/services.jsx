import { addData, retriveDataByField } from "../../lib/firebase/services";
import bcrypt from "bcrypt";

export async function signUp(userData, callback) {
  const { email, password, role, fullname, phone, created_at, updated_at } =
    userData;
  const data = await retriveDataByField("users", "email", userData.email);

  console.log("data", data);
  if (data.length > 0) {
    callback(false);
  } else {
    if (!role) {
      userData.role = "member";
    }
    userData.password = await bcrypt.hash(password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result) => {
      callback(result);
    });
  }
}

export async function signIn(email) {
  const data = await retriveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data, callback) {
  const { email, password, role, fullname, phone, created_at, updated_at } =
    data;
  const user = await retriveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";
    await addData("users", data, (result) => {
      if (result) {
        callback(data);
      }
    });
  }
}
