import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardAdminView from "@/components/views/admin/Dashboard";
import UserAdminView from "@/components/views/admin/Users";

export default function AdminPage(){
    return (
      <div>
        <DashboardAdminView/>
      </div>
    );
}