"use client";
import withAuth from "@/components/WithAuth";
import { Metadata } from "next";
import Link from "next/link";

const FormLayout = () => {
  return (
    <>
      <h1 className="text-5xl ">Welcome Back</h1>
    </>
  );
};

export default withAuth(FormLayout, true, ["admin", "user"]);
