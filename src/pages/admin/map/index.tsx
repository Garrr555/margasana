import AdminLayout from "@/components/layouts/AdminLayout";
import dynamic from "next/dynamic";


const MapPage = dynamic(() => import("@/components/views/map/MapPage"), {
  ssr: false,
});

export default function AdminMapPage() {
  return (
    <>
      <AdminLayout>
        <MapPage kelamin={true} kepadatan={true} total={true} usia={true} />
      </AdminLayout>
    </>
  );
}
