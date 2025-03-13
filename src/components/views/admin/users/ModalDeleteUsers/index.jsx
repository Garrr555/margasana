import { useSession } from "next-auth/react";
import userServices from "../../../../../services/user";
import Button from "../../../../ui/button";
import Modal from "../../../../ui/modal";

export default function ModalDeleteUser({ deletedUser, setDeletedUser, setUserData }) {

  const session = useSession();
  const handleDelete = async() => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const {data}= await userServices.getAllUsers();
    setUserData(data.data);
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
