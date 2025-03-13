'use client'

import { useEffect, useState } from "react";
import MemberProfileView from "../../../components/views/member/profile";
import userServices from "../../../services/user";
import { useSession } from "next-auth/react";

export default function MemberProfile() {
  // const [profile, setProfile] = useState({});
  // const session = useSession();
  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const { data } = await userServices.getProfile(session.data.accessToken);
  //     // setProfile(data.data);
  //   };
  //   getAllUsers();
  // }, [session]);
  return (
    <MemberProfileView>
    </MemberProfileView>
  );
}
