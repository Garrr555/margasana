import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type PropsType = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
  updatedUser: any;
  setUpdatedUser: React.Dispatch<React.SetStateAction<any>>;
  setUsersData: React.Dispatch<React.SetStateAction<any>>;
};

export default function ModalUpdateUser(props: PropsType) {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster } = props;
  const session: any = useSession();
  const [loading, setLoading] = useState(false)

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateUsers(updatedUser.id, data, session.data?.accessToken);

    console.log(result)

    if (result.status === 200) {
      setLoading(false);
      setUpdatedUser({})
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data)
      setToaster({ variant: "success", message: "Success to update user" });
    } 
    
    else {
      setLoading(false);
      setToaster({ variant: "error", message: "Failed to update user" });
    }
  };

  return (
    <div>
      <Modal onClose={() => setUpdatedUser({})}>
        <h1 className="text-2xl text-accent font-semibold">Update User</h1>
        <form onSubmit={handleUpdateUser}>
          <div className="my-4">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder={updatedUser.email}
              disable={true}
            />
          </div>
          <div className="my-4">
            <Input
              label="Fullname"
              name="fullname"
              type="text"
              placeholder={updatedUser.fullname}
            />
          </div>
          <div className="my-4">
            <Input
              label="Phone"
              name="phone"
              type="number"
              placeholder={updatedUser.phone}
            />
          </div>

          <Select
            label="Role"
            name="role"
            options={[
              { label: "Member", value: "member" },
              { label: "Admin", value: "admin" },
            ]}
            defaultValue={updatedUser.role}
          />
          <Button
            bgcolor={"bg-accent rounded-xl"}
            textcolor={"text-primary"}
            type={"submit"}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
