"use client";

import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.route}
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-3 pt-6">
          <Link href="/sign-in" className="text-primary-500">
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/account.svg"
                alt="Login"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="primary-text-gradient max-lg:hidden">Login</span>
            </Button>
          </Link>
          <Link href="/sign-up" className="text-primary-500">
            <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded px-4 py-3 shadow-none">
              <Image
                src="/assets/icons/sign-up.svg"
                alt="Sign Up"
                width={20}
                height={20}
                className="invert-colors lg:hidden"
              />
              <span className="max-lg:hidden">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftSidebar;
