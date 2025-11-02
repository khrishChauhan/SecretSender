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
    <nav className="sticky top-0 z-50 bg-linear-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight hover:text-gray-300 transition-colors"
        >
          Secret<span className="text-indigo-400">Sender</span>
        </Link>

       
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

   
        <div
          className={`${
            menuOpen ? " flex flex-row gap-18 " : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 gap-4 md:gap-6 items-center justify-center transition-all duration-300`}
        >
          
          <div>
            <Link href="/">
            <Button
              variant="ghost"
              className="text-white hover:text-indigo-400 hover:bg-transparent transition-colors"
            >
              Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-white hover:text-indigo-400 hover:bg-transparent transition-colors"
            >
              Dashboard
            </Button>
          </Link>

          </div>

          {session ? (
            <>
              <span className="hidden sm:inline text-gray-300 text-sm">
                Welcome,&nbsp;
                <span className="font-medium text-indigo-300">
                  {user.username || user.email?.split("@")[0]}
                </span>
              </span>

              <Button
                onClick={() => signOut()}
                className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-indigo-500 text-white hover:bg-indigo-600 transition-colors">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
