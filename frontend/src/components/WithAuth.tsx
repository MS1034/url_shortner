"use client";
import JWTHelper from "@/commons/helpers/JwtHelper";
import { RootState } from "../redux/store";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

function withAuth(
  WrappedComponent: any,
  isAuthRequired: boolean,
  roles: string[]
) {
  console.log("hello");
  return function WithAuth(props: any) {
    let role;
    if (JWTHelper.isAuthenticated()) {
      const { user_role } = JWTHelper.getRole();
      role = user_role;
    }

    if (JWTHelper.isAuthenticated()) {
      if (role && roles.includes(role)) {
        return <WrappedComponent {...props} />;
      } else {
        redirect("/protected-route");
      }
    } else {
      redirect("/login");
    }
  };
}

export default withAuth;
