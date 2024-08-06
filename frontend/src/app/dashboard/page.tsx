"use client";
import JWTHelper from "@/commons/helpers/JwtHelper";
import withAuth from "@/components/WithAuth";
import Link from "next/link";

function page() {
  return (
    <Link
      href="/login"
      onClick={() => {
        JWTHelper.clearToken();
      }}
    >
      Logout
    </Link>
  );
}

export default withAuth(page, true, ["admin", "user"]);
