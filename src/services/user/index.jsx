import instance from "../../lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id, data) => instance.put("/api/user", { id, data }),
  deleteUser: (id) => instance.delete(`/api/user`, {data: {id}}),
};

export default userServices;
