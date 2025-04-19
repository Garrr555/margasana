import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";
import userServices from "@/services/user";
import ModalDeleteUser from "./ModalDeleteUser";
import { FaEdit, FaTrash } from "react-icons/fa";

type PropsType = {
  users: any;
};

interface User {
  fullname: string;
  email: string;
  phone: string;
  role: string;
}

export default function UserAdminView(props: PropsType) {
  const [usersData, setUsersData] = useState([]);
  const [updateUser, setUpdateUser] = useState<any>({});
  const [deleteUser, setDeleteUser] = useState<any>({});
  const { users } = props;
  console.log(users);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <div>
          <h1 className="text-accent text-3xl font-semibold mb-2">
            User Management
          </h1>
          <table className="w-full border-2 border-gray-900">
            <thead>
              <tr className="bg-gray-900">
                <th className="p-2 font-semibold">No</th>
                <th className="p-2 text-start font-semibold">Fullname</th>
                <th className="p-2 text-start font-semibold">Email</th>
                <th className="p-2 text-start font-semibold">Phone</th>
                <th className="p-2 font-semibold">Role</th>
                <th className="p-2 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user:User, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-primary"}
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="py-5">{user.fullname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="xl:flex-row flex flex-col items-center justify-center gap-2 py-4">
                    <Button
                      type="button"
                      textcolor="text-primary text-xl"
                      bgcolor="bg-accent"
                      onClick={() => setUpdateUser(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      type="button"
                      textcolor="text-white/80 text-xl"
                      bgcolor="bg-red-500"
                      onClick={() => setDeleteUser(user)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      {Object.keys(updateUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updateUser}
          setUpdatedUser={setUpdateUser}
          setUsersData={setUsersData}
        />
      )}
      {Object.keys(deleteUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deleteUser}
          setDeletedUser={setDeleteUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
}
