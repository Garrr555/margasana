
import Sidebar from "../../fragments/sidebar";

export default function AdminLayout(props){
    const {children} = props
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </div>
    );
}