"use client";

import React from "react";
import Link from "next/link";
import { Github,LinkedinIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-gray-800 to-black text-gray-300   border-t border-gray-700">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
       
        <div className="text-center md:text-left">
          <h1 className="text-xl font-bold tracking-tight text-white">
            Secret<span className="text-indigo-400">Sender</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Send messages secretly & securely 
          </p>
        </div>

       
        <div className="flex gap-4">
          <Link
            href="https://github.com/khrishChauhan"
            target="_blank"
            className="hover:text-indigo-400 transition-colors"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://linkedin.com/in/khrish-chauhan-58649034a/"
            target="_blank"
            className="hover:text-indigo-400 transition-colors"
          >
            <LinkedinIcon size={20} />
          </Link>
        </div>
      </div>

     
      <div className="border-t border-gray-700  py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SecretSender. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
