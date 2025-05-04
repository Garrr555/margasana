import instance from "@/lib/axios/instance";

const transactionServices = {
  getTransaction: (order_id: string, token: string) =>
    instance.get(`/api/transaction?order_id=${order_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getAllTransaction: (token: string) =>
    instance.get(`/api/transaction/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  generatedTransaction: (data: any, token: string) =>
    instance.post("/api/transaction", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateTransaction: (order_id: string, token: string) =>
    instance.put(`/api/transaction?order_id=${order_id}`, {} ,{
      headers: { Authorization: `Bearer ${token}` },
    }),
};
export default transactionServices;
