"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { preconnect } from "react-dom";

export default function Home() {
  const { status } = useSession();
  preconnect("/user");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {status === "authenticated" ? (
        <Link href={"/user"}>
          <Button variant={"link"}>User Page</Button>
        </Link>
      ) : (
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      )}
    </main>
  );
}
