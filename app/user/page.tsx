"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const Index = () => {
  const { data } = useSession();
  console.log(data)
  const onLogout = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="p-4">
      <div className="my-4">Here, {data?.user?.email}</div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};

export default Index;
