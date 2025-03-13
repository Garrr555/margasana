import instance from "../../lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUsers: (id, data) => instance.put("/api/user", { id, data }),
  deleteUser: (id, token) => instance.delete(`/api/user`, {data: {id}}, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  }),
  getProfile: (token) => instance.get("/api/user/profile", {
    headers: {
      'authorization': `Bearer ${token}`
    },
  }),
};

export default userServices;
