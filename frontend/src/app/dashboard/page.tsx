"use client";
import { Button } from "@/components/ui/button";
import { useDescope } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DashboardPage() {
  const descope_sdk = useDescope();
  const router=useRouter()
  const [logginOut, setLogginOut] = useState(false);
  const handleLogout = async () => {
    if (logginOut) return;
    setLogginOut(true);

    try {
      await descope_sdk.logout()
      router.replace("/sign-in")
      router.refresh()
    } catch (error) {
      console.error(error)
      setLogginOut(false)
    }
  };

  return (
    <div>
      DashboardPage
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}

export default DashboardPage;
