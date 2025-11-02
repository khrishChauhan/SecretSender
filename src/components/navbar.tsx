'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition">
          SecretSender
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-gray-200">
              Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="ghost" className="text-white hover:bg-gray-800 hover:text-gray-200">
              Dashboard
            </Button>
          </Link>

          {session ? (
            <>
              <span className="hidden sm:inline text-gray-300">
                Welcome, {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-white text-black hover:bg-gray-200"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white text-black hover:bg-gray-200">
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
