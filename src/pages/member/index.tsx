import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardMemberView from "@/components/views/member/Dashboard";
import UserAdminView from "@/components/views/admin/Users";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function MemberPage(props: PropTypes) {
  const { setToaster } = props;
  return (
    <div>
      <DashboardMemberView />
    </div>
  );
}
