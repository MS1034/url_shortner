"use client";
import React from "react";
import withAuth from "@/components/WithAuth";

function page() {
  return <div className="text-6xl">I am Admin Dashboard</div>;
}

export default withAuth(page, true, ["admin"]);
