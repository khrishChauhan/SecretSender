"use client";

import React from "react";

export default function AnimatedTagline() {
  return (
    <div className="w-full px-4 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white inline-block shine-text">
        Every secret deserves to be heard
      </h1>

      <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 w-fit max-w-full">
        SecretSender — Where your identity remains a secret.
      </p>
    </div>
  );
}
