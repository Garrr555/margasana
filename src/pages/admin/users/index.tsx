import AdminLayout from "@/components/layouts/AdminLayout";
import UserAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function AdminUsersPage(props: PropTypes) {
  const { setToaster } = props;

    const [users, setUsers] = useState([])

    useEffect(() => {
      const getAllUsers = async () => {
          const {data} = await userServices.getAllUsers();
          setUsers(data.data);
      }
      getAllUsers()
    }, [])

    console.log(users)

  return (
    <>
      <UserAdminView users={users} setToaster={setToaster}/>
    </>
  );
}
