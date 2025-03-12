"use client";

import Modal from "../../../../ui/modal";
import Input from "../../../../ui/input";
import Select from "../../../../ui/select";
import Button from "../../../../ui/button";
import userServices from "../../../../../services/user";
import { useState } from "react";

export default function ModalUpdateUser({
  defaultValues,
  disable,
  updateUser,
  setUpdateUser,
  setUserData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target;
    const data = {
      role: form.role.value,
    };
    
    const result = await userServices.updateUsers(updateUser.id, data);
    // setUserData(result.data);
    console.log("Update result: ", result);

    if (result.status === 200) {
      setIsLoading(false);
      setUpdateUser({});
    } else {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Modal onClose={() => setUpdateUser({})}>
        <h1 className="text-2xl text-accent font-semibold">Update User</h1>
        <form onSubmit={handleUpdateUser}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder={updateUser.email}
            disable={true}
          />
          <Input
            label="Fullname"
            name="fullname"
            type="text"
            placeholder={updateUser.fullname}
          />
          <Input
            label="Phone"
            name="phone"
            type="number"
            placeholder={updateUser.phone}
          />
          <Select
            label="Role"
            name="role"
            options={[
              { label: "Member", value: "member" },
              { label: "Admin", value: "admin" },
            ]}
            defaultValue={updateUser.role}
          />
          <Button
            bgcolor={"bg-accent rounded-xl"}
            textcolor={"text-primary"}
            type={"submit"}
          >
            Update
          </Button>
        </form>
      </Modal>
    </div>
  );
}
