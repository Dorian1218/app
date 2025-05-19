import Image from "next/image";

export default function Home() {
  return (
    <div>
      <input placeholder="email"/>
      <input placeholder="password" type="password"/>
      <button>Login</button>
    </div>
  );
}
