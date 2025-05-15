import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function ProfilePage(props: PropTypes) {
  const { setToaster } = props;

  const [profile, setProfile] = useState<any>({});
  const session: any = useSession()

  useEffect(() => {
    if(session.data?.accessToken && Object.keys(profile).length === 0){
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        console.log(data);
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  const transaction:any = profile?.transaction
  console.log(transaction)

  return (
    <div>
      <ProfileMemberView profile={profile} setProfile={setProfile} session={session} setToaster={setToaster}/>
    </div>
  );
}
