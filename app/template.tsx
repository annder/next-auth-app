"use client";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

const RootTemplate: FC<{ children: ReactNode; session: Session }> = ({
  children,
  session,
}) => {
  return (
    <div>
      <SessionProvider session={session}>{children}</SessionProvider>
    </div>
  );
};

export default RootTemplate;
