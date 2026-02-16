"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:text-gray-300 transition-colors"
          aria-label="SecretSender Home"
        >
          Secret<span className="text-indigo-400">Sender</span>
        </Link>


        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>


        <div
          className={`${menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-gray-900/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none shadow-lg md:shadow-none py-4 px-6 md:p-0 gap-1 md:gap-4 items-stretch md:items-center transition-all duration-300`}
        >
          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-1 md:gap-2">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full md:w-auto justify-start md:justify-center text-white hover:text-indigo-400 hover:bg-white/10 md:hover:bg-transparent transition-colors"
              >
                Home
              </Button>
            </Link>

            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full md:w-auto justify-start md:justify-center text-white hover:text-indigo-400 hover:bg-white/10 md:hover:bg-transparent transition-colors"
              >
                Dashboard
              </Button>
            </Link>

            <Link href="/room" onClick={() => setMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full md:w-auto justify-start md:justify-center text-white hover:text-indigo-400 hover:bg-white/10 md:hover:bg-transparent transition-colors"
              >
                Room
              </Button>
            </Link>

            <Link href="/join" onClick={() => setMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full md:w-auto justify-start md:justify-center text-white hover:text-indigo-400 hover:bg-white/10 md:hover:bg-transparent transition-colors"
              >
                Join
              </Button>
            </Link>

            <Link href="/create" onClick={() => setMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full md:w-auto justify-start md:justify-center text-white hover:text-indigo-400 hover:bg-white/10 md:hover:bg-transparent transition-colors"
              >
                Create
              </Button>
            </Link>
          </div>

          {/* Divider for mobile */}
          <div className="md:hidden border-t border-gray-700 my-2"></div>

          {/* Auth Section */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
            {session ? (
              <>
                <span className="text-gray-300 text-sm px-3 py-2 md:px-0">
                  Welcome,{" "}
                  <span className="font-medium text-indigo-300">
                    {user.username || user.email?.split("@")[0]}
                  </span>
                </span>

                <Button
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                  className="w-full md:w-auto bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/sign-in" onClick={() => setMenuOpen(false)}>
                <Button className="w-full md:w-auto bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
