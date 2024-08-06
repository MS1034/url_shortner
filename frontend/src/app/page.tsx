import JWTHelper from "@/commons/helpers/JwtHelper";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <Link href="/login">
          Login
          {/* {JWTHelper.isAuthenticated() ? "Logout" : "Login"} */}
        </Link>
      </div>
      <div>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </main>
  );
}
