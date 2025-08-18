"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const pathname = usePathname();

  const routesWithoutNavbar = ["/", "/login", "/signin", "/auth"];

  const shouldShowNavbar = !routesWithoutNavbar.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(route);
  });

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main className={shouldShowNavbar ? "pt-16" : ""}>{children}</main>
    </>
  );
};

export default LayoutWrapper;
