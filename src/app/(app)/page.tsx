'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/message.json';
import UserCard from "@/components/UserCard";
import { useEffect, useState } from "react";
import { Loader2, RefreshCcw } from 'lucide-react';
import Footer from "@/components/Footer"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import MessageCarousel from '@/components/Carousel';
import AnimatedTagline from '@/components/AnimateTagline';

export default function Home() {

  const [users, setUsers] = useState<{ username: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    // re-fetch users
    fetch("/api/get-users")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUsers(data.users);
        else console.error("Error refreshing users:", data.message);
      })
      .catch((err) => console.error("Refresh failed:", err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/get-users");
        console.log(res)
        const data = await res.json();
        console.log(res)

        if (res.ok && data.success) setUsers(data.users)
        else console.error("Error fetching users:", data.message);

      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);



  return (
    <>


      <main className="flex grow flex-col items-center justify-center px-6 md:px-24 py-24 bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 text-white relative overflow-hidden">


        <div className="absolute inset-0 overflow-hidden  z-0">
          <div className="absolute top-10 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>


        <section className="relative text-center z-10 mt-10 mb-25">
          <AnimatedTagline/>
          
        </section>



        <MessageCarousel/>

        <div className='pt-30 z-5'>
          <div className="  py-10 px-5">


            <div className="pt-20 py-10 px-5 relative z-10 flex justify-center items-center gap-4 mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-center select-none">
                  Meet <span className="text-indigo-400">Secret Senders</span>
                </h1>

                <Button
                  type="button"
                  onClick={() => refresh()}
                  disabled={loading}
                  className="rounded-full border border-indigo-500/30 text-indigo-400 hover:text-white hover:bg-indigo-500/20 transition-all duration-300 active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-5 w-5" />
                  )}
                </Button>
            </div>


            <div className="grid gap-5  pt-3  justify-items-center  grid-cols-1 lg:grid-cols-2   ">
              {users
                .slice()
                .sort(() => Math.random() - 0.5)
                .map((user) => (
                  <UserCard key={user.username} username={user.username} />
                ))}
            </div>

          </div>
        </div>



      </main>

      <Footer />

    </>
  );
}