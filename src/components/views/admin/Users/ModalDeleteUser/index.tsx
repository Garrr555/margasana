import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

export default function ModalDeleteUser(props:any){

    const {deletedUser, setDeletedUser, setUsersData} = props
    const session:any = useSession()
    console.log(session)

    const handleDelete = async () => {
         userServices.deleteUser(deletedUser.id, session.data?.accessToken);
         setDeletedUser({});
         const { data } = await userServices.getAllUsers();
         setUsersData(data.data);
    }

    return (
      <Modal onClose={() => setDeletedUser({})}>
        <h1 className="text-2xl font-semibold my-5">
          Delete <span className="text-accent">{deletedUser.email}</span> ?
        </h1>
        <Button
          type={"button"}
          onClick={() => handleDelete()}
          textcolor={"text-white mb-5"}
          bgcolor={"bg-red-500"}
        >
          Delete
        </Button>
      </Modal>
    );
}