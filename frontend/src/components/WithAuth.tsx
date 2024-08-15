"use client";

import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JWTHelper from "@/commons/helpers/JwtHelper";
import { Triangle } from "react-loader-spinner";

function withAuth(
  WrappedComponent: React.ComponentType<any>,
  isAuthRequired: boolean,
  roles: string[]
) {
  return function WithAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const checkAuth = useCallback(() => {
      if (!JWTHelper.isAuthenticated()) {
        router.push("/login");
        return;
      }

      const { user_role } = JWTHelper.getRole();

      if (isAuthRequired && user_role && roles.includes(user_role)) {
        setIsLoading(false);
      } else {
        router.push("/protected-route");
      }
    }, [router, isAuthRequired, roles]);

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    if (isLoading) {
      return (
        <div className="h-screen w-full top-0 left-0 z-999999 bg-white flex fixed justify-center items-center">
          <Triangle
            height={100}
            width={100}
            color="#10B981"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
