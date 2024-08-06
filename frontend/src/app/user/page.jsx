"use client";
import withAuth from "@/components/WithAuth";
import React from "react";

function page() {
  return <div className="text-6xl">I am User Dashboard</div>;
}

export default withAuth(page, true, ["user"]);
