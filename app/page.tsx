import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Input placeholder="email"/>
      <Input placeholder="password" type="password"/>
      <Button>Login</Button>
    </div>
  );
}
