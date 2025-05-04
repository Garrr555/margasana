import AdminLayout from "@/components/layouts/AdminLayout";
import UserAdminView from "@/components/views/admin/Users";
import OrdersMemberView from "@/components/views/member/Orders";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

export default function MemberOrdersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  console.log(users);

  return (
    <>
      <OrdersMemberView />
    </>
  );
}
