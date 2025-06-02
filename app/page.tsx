"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      <p>Welcome back, {user?.email}</p>
      <p>Streak: 2 days</p>
      <Button className="bg-blue-500 text-white hover:bg-blue-600">Start today's lesson</Button>
    </div>
  );
}
