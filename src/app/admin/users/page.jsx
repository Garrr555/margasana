'use client'

import { useEffect, useState } from "react";
import AdminUserView from "../../../components/views/admin/users";
import userServices from '../../../services/user';

export default function AdminUser() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getAllUsers = async () => {
      const {data} = await userServices.getAllUsers();
      setUsers(data.data);
    }
    getAllUsers();
  }, [])
  console.log(users);
  return (
    <div>
      <AdminUserView users={users}/>
    </div>
  );
}
