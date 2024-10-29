"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-pink-2 lg:hidden">
      <Image
        src={"/collections/logo/Wicked_Whimsy_Logo.svg"}
        alt="logo"
        width={150}
        height={70}
      />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-grey-1" : ""
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 items-center relative">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => {
            setDropdownMenu(!dropdownMenu);
          }}
        />
        {dropdownMenu && (
          <div className="absolute flex flex-col gap-8 top-10 right-6 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium "
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
