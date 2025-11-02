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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

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
      {/* Main content */}
      <main className="flex grow flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Every secret deserves to be heard
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            SecretSender - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className='pt-30 '>
          <div className="  py-10 px-5">
           <div className='flex justify-center items-center mb-10 gap-3'>
             <h1 className="text-3xl  font-bold text-center mt-3 ">
              Meet Secret Senders
            </h1>

            <div className="flex">
              <Button
                className="mt-4 rounded-full"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  refresh();
                }}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 text-black" />
                )}
              </Button>
            </div>
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

      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white flex justify-around">
        <div>© {new Date().getFullYear()} SecretSender. All rights reserved.</div>
      </footer>
    </>
  );
}