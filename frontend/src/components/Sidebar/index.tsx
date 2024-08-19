"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { sacramento } from "@/commons/helpers/FontHelper";
import { LuLink, LuKey } from "react-icons/lu";
import { RiImageCircleLine } from "react-icons/ri";
import { BsTags, BsXLg } from "react-icons/bs";
import { IoStatsChartOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import JWTHelper from "@/commons/helpers/JwtHelper";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <LuLink size={20} />,
        label: "Urls",
        route: "/url-management",
      },
      {
        icon: <BsTags size={20} />,
        label: "Url Tags",
        route: "/url-tags",
      },
      {
        icon: <RiImageCircleLine size={20} />,
        label: "Brand Logo",
        route: "/brand-logo",
      },
      {
        icon: <IoStatsChartOutline size={20} />,
        label: "Url Analytics",
        route: "/url-analytics",
      },
      {
        icon: <LuKey size={20} />,
        label: "API Keys",
        route: "/api-keys",
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const router = useRouter();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  useEffect(() => {
    // Perform cleanup or setup code if needed
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-token"); // Clear token from localStorage
      router.push("/login"); // Redirect to login page
    }
  };

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* SIDEBAR HEADER */}
        <div
          className={`flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 `}
        >
          <a href="#" className="mb-8 inline-block max-w-full text-black">
            <img
              width={32}
              height={32}
              src={"/assets/images/logo.png"}
              alt="Logo"
              className="inline-block"
            />
            <span className={` ${sacramento.className} text-primary text-3xl`}>
              link.ly
            </span>
          </a>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block "
          >
            <BsXLg />
          </button>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className={
                        "group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
                      }
                    >
                      <CiLogout size={20} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
