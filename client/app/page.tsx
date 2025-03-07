import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/signup">Sign Up</Link>
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
