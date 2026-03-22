"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const useUser = () => {
  return {
    isLoggedIn: false,
    role: "PASSENGER", // DRIVER | ADMIN
    name: "Athul",
  };
};

const Navbar = () => {
  const { isLoggedIn, role, name } = useUser();

  return (
    <nav className="border-b fixed top-0 w-full">
      <div className="text-primary flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold tracking-tight cursor-pointer">
            BusTrack
          </h1>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          {/* Public link */}
          <Link
            href="#features"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Features
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              {/* Role-based navigation */}
              {role === "PASSENGER" && (
                <Link href="/dashboard/passenger/map">
                  <Button variant="ghost" size="sm">
                    Track Bus
                  </Button>
                </Link>
              )}

              {role === "DRIVER" && (
                <Link href="/dashboard/driver">
                  <Button variant="ghost" size="sm">
                    Start Trip
                  </Button>
                </Link>
              )}

              {role === "ADMIN" && (
                <Link href="/dashboard/admin">
                  <Button variant="ghost" size="sm">
                    Admin Panel
                  </Button>
                </Link>
              )}

              {/* Profile */}
              <span className="text-sm text-muted-foreground hidden sm:block">
                {name}
              </span>

              {/* Logout */}
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
