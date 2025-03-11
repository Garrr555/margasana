import AdminLayout from "../../../layouts/AdminLayout";
import Button from '../../../ui/button';

export default function AdminUserView({ users }) {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-accent text-3xl font-semibold mb-2">
          User Management
        </h1>
        <table className="w-full border border-gray-900">
          <thead>
            <tr className="bg-gray-900 ">
              <th className="p-2 font-semibold">No</th>
              <th className="p-2 text-start font-semibold">Fullname</th>
              <th className="p-2 text-start font-semibold">Email</th>
              <th className="p-2 text-start font-semibold">Phone</th>
              <th className="p-2 font-semibold">Role</th>
              <th className="p-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-primary" : "bg-gray-900"}
              >
                <td className="text-center">{index + 1}</td>
                <td className="py-5">{user.fullname}</td>
                <td className="">{user.email}</td>
                <td className="">{user.phone}</td>
                <td className="text-center">{user.role}</td>
                <td className="xl:flex-row flex flex-col items-center justify-center gap-2 py-4">
                  <Button
                    type={"button"}
                    textcolor={"text-primary"}
                    bgcolor={"bg-accent"}
                  >
                    Update
                  </Button>
                  <Button
                    type={"button"}
                    textcolor={"text-primary"}
                    bgcolor={"bg-red-500"}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
