"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/client";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState<{ name: string; photo: string } | null>(
    null
  );
  const [isClient, setIsClient] = useState(false);

  const expandSidebar = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const collapseSidebar = useCallback(() => {
    setIsExpanded(false);
  }, []);

  useEffect(() => {
    // Mark as client-side after mounting
    setIsClient(true);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Anonymous",
          photo: currentUser.photoURL || "/user.png",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const menuItems = [
    { name: "Home", icon: "/home.svg", href: "/chat" },
    { name: "Projects", icon: "/folder.svg", href: "#" },
    { name: "Settings", icon: "/settings.svg", href: "/settings" },
  ];

  // Only render after client-side mounting
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`flex flex-col justify-between gap-5 py-5 px-2 border-r-2 border-[#DEDEDE] transition-all duration-300 ease-in-out ${
        isExpanded ? "w-60" : "w-14"
      }`}
      style={{ borderColor: "#DEDEDE" }}
      onMouseEnter={expandSidebar}
      onMouseLeave={collapseSidebar}
    >
      {/* Rest of the component remains the same */}
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 w-full">
          <Image src="/Logo.svg" alt="Logo" width={40} height={40} />
          <span
            className={`font-[500] text-black transition-opacity duration-300 ease-in-out ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            LeapFrog
          </span>
        </div>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-2 w-full pl-[0.4rem]"
          >
            <Image
              src={item.icon}
              alt={item.name.toLowerCase()}
              width={25}
              height={25}
              className={`${
                item.name === "Projects"
                  ? "min-w-[22px]"
                  : item.name === "Settings"
                  ? "min-w-[23px]"
                  : "min-w-[25px]"
              }`}
            />
            <span
              className={`transition-opacity duration-300 ease-in-out ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Image
          src={user?.photo || "/user.png"}
          alt="user"
          width={35}
          height={35}
          className="rounded-full ml-1"
        />
        <span
          className={`transition-opacity duration-300 ease-in-out ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          {user?.name || "Guest"}
        </span>
      </div>
    </div>
  );
}
