"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Textarea from "@/components/ui/TextArea";
import userServices from "@/services/user";
import { FaTrash, FaMapMarkerAlt, FaPencilAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type PropTypes = {
  profile: any;
  setChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedAddress: React.Dispatch<React.SetStateAction<number>>;
  selectedAddress: number;
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function ModalChangeAddress(props: PropTypes) {
  const {
    profile,
    setChangeAddress,
    selectedAddress,
    setSelectedAddress,
    setToaster,
    setProfile,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const session: any = useSession();
  const token = session.data?.accessToken;
  const id = session.data?.user.id;
  console.log(token);
  console.log(id);

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;
    if (profile.address) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }
    try {
      const result = await userServices.updateProfile(id, data, token);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({ message: "Success Add New Address", type: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ message: "Failed Change Address", type: "error" });
    }

    console.log(data);
  };

  const handleDeleteAddress = async (id: any) => {
    const address = [...profile.address];
    address.splice(id, 1);
    const data = {
      address: address,
    };
    console.log(data);
    console.log(id);

    try {
      const result = await userServices.updateProfile(
        session.data.user.id,
        data,
        token
      );
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({ message: "Success Delete Address", type: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ message: "Failed Delete Address", type: "error" });
    }
    console.log(data);
    console.log(id);
  };

  const handleChangeMainAddress = async (id: any) => {
    const address = profile.address;
    address.forEach((item: any, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address: address,
    };

    console.log(data);

    try {
      const result = await userServices.updateProfile(
        session.data.user.id,
        data,
        token
      );
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({ message: "Success Change Main Address", type: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ message: "Failed Change Main Address", type: "error" });
    }
  };

  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };

    const data = {
      address: address,
    };

    try {
      const result = await userServices.updateProfile(
        session.data.user.id,
        data,
        token
      );
      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({ message: "Success Add New Address", type: "success" });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({ message: "Failed Change Address", type: "error" });
    }

    console.log(data);
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="text-2xl font-semibold mb-5">Change Shipping Address?</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div key={item.addressLine}>
          <div
            className={`${
              id === selectedAddress && "border-accent"
            } bg-primary border p-3 rounded-lg mt-5 flex justify-between`}
          >
            <div
              className="flex flex-col gap-1 w-5/6 cursor-pointer"
              onClick={() => {
                setSelectedAddress(id);
                setChangeAddress(false);
              }}
            >
              <p
                className={`${
                  id === selectedAddress && "text-accent"
                } font-bold text-lg`}
              >
                Name: {item.recipient}
              </p>
              <p>Phone: {item.phone}</p>
              <p>Address: {item.addressLine}</p>
              <p>Note: {item.note}</p>
            </div>
            <div className="flex flex-col gap-3 justify-center items-start">
              <Button
                type="button"
                bgcolor="bg-accent rounded-lg"
                textcolor="text-primary"
                onClick={() => handleChangeMainAddress(id)}
                disabled={isLoading || item.isMain}
              >
                <FaMapMarkerAlt />
              </Button>
              <Button
                type="button"
                bgcolor="bg-yellow-500 rounded-lg"
                textcolor="text-primary"
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                disabled={isLoading}
              >
                <FaPencilAlt />
              </Button>
              <Button
                type="button"
                bgcolor="bg-red-500 rounded-lg"
                textcolor="text-primary"
                onClick={() => handleDeleteAddress(id)}
                disabled={isLoading || id === selectedAddress}
              >
                <FaTrash />
              </Button>
            </div>
          </div>
          {id === updateAddress && (
            <div className=" rounded-lg p-4">
              <form
                onSubmit={handleChangeAddress}
                className="flex flex-col gap-5"
              >
                <Input
                  type="text"
                  name="recipient"
                  placeholderreal="Insert Recipient"
                  label="Recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="number"
                  name="phone"
                  placeholderreal="Insert Phone"
                  label="Recipient Phone"
                  defaultValue={item.phone}
                />
                <Textarea
                  name="addressLine"
                  label="Address Line"
                  placeholderreal="Insert Address Line"
                  defaultValue={item.addressLine}
                />
                <Input
                  type="text"
                  name="note"
                  label="Note"
                  placeholderreal="Insert Note"
                  defaultValue={item.note}
                />
                <Button
                  type="submit"
                  bgcolor="bg-accent rounded-xl"
                  textcolor="text-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <div className="my-5">
        <Button
          type="button"
          bgcolor="bg-accent rounded-xl"
          textcolor="text-secondary"
          onClick={() => setIsAddNew(!isAddNew)}
        >
          {isAddNew ? "Cancel" : "Add New Address"}
        </Button>
      </div>
      {isAddNew && (
        <div className="border border-white/80 rounded-lg p-4">
          <form onSubmit={handleAddAddress} className="flex flex-col gap-5">
            <Input
              type="text"
              name="recipient"
              placeholderreal="Insert Recipient"
              label="Recipient"
            />
            <Input
              type="number"
              name="phone"
              placeholderreal="Insert Phone"
              label="Recipient Phone"
            />
            <Textarea
              name="addressLine"
              label="Address Line"
              placeholderreal="Insert Address Line"
            />
            <Input
              type="text"
              name="note"
              label="Note"
              placeholderreal="Insert Note"
            />
            <Button
              type="submit"
              bgcolor="bg-accent rounded-xl"
              textcolor="text-primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
