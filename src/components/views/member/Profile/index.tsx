import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function ProfileMemberView({
  profile,
  setProfile,
  session,
  setToaster,
}: any) {
  console.log(session);
  console.log(profile);

  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  const [visible, setVisible] = useState(false);
  // const [profile2, setProfile2] = useState('');

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  // const getProfile = async () => {
  //   const {data} = await userServices.getProfile(
  //     session.data?.accessToken
  //   );
  //   setProfile2(data.data)
  // }
  // console.log(profile2)

  // useEffect(() => {
  //   getProfile()
  // }, [])

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("picture");
    const file = e.target[0]?.files[0];
    const newName = "profile." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          console.log(status);
          if (status) {
            const data = {
              image: newImageURL,
            };

            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );

            console.log(result);

            if (result.status === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setToaster({
                type: "success",
                message: "Success Update Profile",
              });
              console.log(profile);
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading("");
              setToaster({
                type: "error",
                message: "Failed Update Profile",
              });
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            setToaster({
              type: "error",
              message: "Failed Update Profile",
            });
          }
        }
      );
    }
  };

  async function handleChangeProfile(e: any) {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    console.log(result);

    if (result.status === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      setToaster({
        type: "success",
        message: "Success Update Profile",
      });
      form.reset();
    } else {
      setIsLoading("");
      setToaster({
        type: "error",
        message: "Failed Update Profile",
      });
    }
  }

  async function handleChangePassword(e: any) {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    console.log(data);
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    console.log(result);

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
    } else {
      setIsLoading("");
    }
  }

  console.log(changeImage);
  console.log(changeImage.name);
  console.log("profile: ", profile.image);

  return (
    <MemberLayout>
      <h1 className="text-4xl font-extrabold text-accent">Profile</h1>
      <div className="flex xl:flex-row flex-col gap-5 mt-10 w-full">
        {/* Avatar */}
        <div className="xl:w-[25%] w-[100%]  bg-secondary shadow-lg rounded-xl xl:p-10 p-5 ">
          <h2 className="px-10 pb-10 text-accent font-bold text-3xl text-center">
            Avatar
          </h2>
          <div className="flex xl:flex-col flex-row items-center justify-center gap-4 xl:gap-0">
            {profile.image ? (
              <Image
                className="rounded-full w-[80%] h-[80%] border border-accent "
                src={profile.image}
                alt="profile"
                width={200}
                height={200}
              />
            ) : (
              <div className="bg-secondary rounded-full w-[200px] h-[200px] flex items-center justify-center text-6xl font-bold">
                {profile?.fullname?.charAt(0)}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture} className="w-full">
              <label
                htmlFor="upload-image"
                className="mt-5 bg-primary text-third flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-xl border border-accent"
              >
                {changeImage.name ? (
                  <p>{changeImage.name}</p>
                ) : (
                  <>
                    <p>
                      Upload a new avatar, Large image will be resized
                      automatically
                    </p>
                    <p>
                      Maximum upload size is{" "}
                      <b className="font-extrabold text-accent">1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                className="opacity-0 absolute -z-10"
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <div className="w-full flex justify-center my-2">
                <Button
                  type="submit"
                  textcolor="text-primary"
                  bgcolor="bg-accent rounded-xl"
                >
                  {isLoading === "picture" ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Profile */}
        <div className="xl:w-[50%] w-[100%]  shadow-lg py-5 rounded-xl bg-secondary">
          <form onSubmit={handleChangeProfile}>
            <h2 className="px-10 py-5 font-bold text-accent xl:text-start text-center text-3xl">
              Profile
            </h2>
            <div className="px-10 py-5">
              <div className="font-semibold">Fullname</div>
              <div className=" rounded-xl border border-secondary">
                <Input
                  name="fullname"
                  placeholder={profile.fullname}
                  type="text"
                  disable={false}
                />
              </div>
            </div>
            <div className="py-5 px-10">
              <div className="font-semibold">Phone</div>
              <div className="rounded-xl border border-secondary">
                <Input
                  name="phone"
                  placeholder={profile.phone}
                  type="number"
                  disable={false}
                />
              </div>
            </div>
            <div className="py-5 px-10">
              <div className="font-semibold">Email</div>
              <div className="rounded-xl border border-secondary">
                <Input
                  name="email"
                  placeholder={profile.email}
                  type="email"
                  disable={true}
                />
              </div>
            </div>
            <div className="py-5 px-10">
              <div className="font-semibold">Role</div>
              <div className="rounded-xl border border-secondary">
                <Input
                  name="role"
                  placeholder={profile.role}
                  type="text"
                  disable={true}
                />
              </div>
            </div>
            {/* <div className="py-5 px-10">
            <div className="font-semibold">Password</div>
            <div className="pl-3 bg-gray-200 rounded-lg">
             <Input
              name="password"
              defaultValue={profile.password}
              type="password"
              visible={visible}
              handleVisible={handleVisible}
              disable={true}
            /></div>
          </div> */}
            <div className="w-full px-10 flex justify-end">
              <Button
                type="submit"
                bgcolor="bg-accent rounded-xl"
                textcolor="text-primary"
              >
                {isLoading === "profile" ? "loading..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>

        {/* Password */}
        <div className="xl:w-[25%] w-[100%] bg-secondary shadow-lg rounded-xl p-10 ">
          <h2 className="px-5 pb-10 font-bold text-3xl text-center text-accent">
            Change Password
          </h2>
          <form onSubmit={handleChangePassword}>
            <div className="pb-5 px-5">
              <div className="font-semibold">Old Password</div>
              <div className="rounded-xl border border-secondary flex flex-row relative">
                <div className="w-full">
                  <Input
                    name="old-password"
                    type={visible ? "text" : "password"}
                    disable={false}
                  />
                </div>
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="text-accent font-extrabold text-2xl absolute right-1 top-2"
                >
                  {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>
            <div className="py-5 px-5">
              <div className="font-semibold">New Password</div>
              <div className="rounded-xl border border-secondary relative">
                <div>
                  <Input
                    name="new-password"
                    type={visible ? "text" : "password"}
                    disable={false}
                  />
                </div>
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="text-accent font-extrabold text-2xl absolute right-1 top-2"
                >
                  {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>
            <div className="w-full px-5 flex justify-end">
              <Button
                type="submit"
                bgcolor="bg-accent rounded-xl"
                textcolor="text-primary"
              >
                {isLoading === "password" ? "loading..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
}
