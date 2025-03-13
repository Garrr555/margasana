'use client'

import { useSession } from "next-auth/react";
import MemberLayout from "../../../layouts/MemberLayout";

export default function MemberProfileView() {
  const session = useSession()
  return (
    <MemberLayout>
      <div>
        <h1 className="text-accent text-3xl font-semibold mb-2">
          Profile Management
        </h1>
      </div>
    </MemberLayout>
  );
}
